#!/usr/bin/env node
/*
 * factory.mjs — the Website Factory CLI.
 *
 * Drives Factory/queue.json and Businesses/<slug>/ scaffolding. The five
 * commands are:
 *
 *   factory list                          show all businesses + stage/status
 *   factory pickup                        claim the first pending business
 *   factory claim <slug>                  claim a specific business
 *   factory advance <slug>                move a business to its next stage
 *   factory new <slug> <subv> <city> <name>   scaffold a new business from _template
 *
 * See /Factory/queue-schema.md and /Factory/worktree-workflow.md for the
 * surrounding context. The claim/advance commands re-read queue.json
 * immediately before writing — see the race-safety note below.
 *
 * Run from the repo root:  node scripts/factory.mjs <command> [args...]
 */

import { existsSync, statSync } from "node:fs";
import { readFile, writeFile, copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Paths — resolved relative to the script's location, not CWD, so the CLI
// works the same whether you run it from the repo root or anywhere else.
//
// Overridable via FACTORY_ROOT env var so tests can point at a temp dir.
// Paths are computed lazily (function calls, not constants) because ESM
// caches module top-level values; lazy resolution lets the same imported
// module serve tests against multiple temp roots in one process.
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(__dirname, "..");
function repoRoot() {
  return path.resolve(process.env.FACTORY_ROOT ?? DEFAULT_ROOT);
}
function queuePath() {
  return path.join(repoRoot(), "Factory", "queue.json");
}
function businessesDir() {
  return path.join(repoRoot(), "Businesses");
}
function templateDir() {
  return path.join(businessesDir(), "_template");
}

// ---------------------------------------------------------------------------
// Constants — kept in sync with /Factory/queue-schema.md.
// ---------------------------------------------------------------------------

const STAGES = [
  "intake",
  "research",
  "brand",
  "content-seo",
  "build",
  "qa",
  "deploy",
  "done",
];

const STATUSES = ["pending", "in_progress", "blocked", "complete"];

// ---------------------------------------------------------------------------
// RefusalError — how a mutator tells modifyQueue to skip the write.
// Throwing is the cleanest signal because it carries the reason and never
// gets confused with the mutated queue object the mutator returns on success.
// ---------------------------------------------------------------------------

class RefusalError extends Error {
  constructor(reason) {
    super(reason);
    this.name = "RefusalError";
    this.reason = reason;
  }
}

// ---------------------------------------------------------------------------
// Tiny CLI plumbing — we intentionally avoid commander/yargs. Five commands
// is below the threshold where a dep is worth it.
// ---------------------------------------------------------------------------

function printHelp() {
  console.log(`factory.mjs — Website Factory CLI

Usage:
  node scripts/factory.mjs list
  node scripts/factory.mjs pickup [--worktree <name>]
  node scripts/factory.mjs claim <slug> [--worktree <name>]
  node scripts/factory.mjs advance <slug>
  node scripts/factory.mjs new <slug> <subvertical> <city> <business-name>
  node scripts/factory.mjs --help

Commands:
  list       Print every business with stage and status.
  pickup     Find the first pending business and claim it. Errors if none.
  claim      Claim a specific slug. Refuses if not pending (race-safety).
  advance    Move a business to the next stage. Refuses if the current
             stage's expected output file is missing or empty.
  new        Scaffold a new business from /Businesses/_template/ into
             /Businesses/<slug>/ and add an intake row to queue.json.

All commands exit 0 on success and 1 on error. Race-safety on claim/advance
is advisory (see /Factory/queue-schema.md) but the re-read-then-write
pattern is enforced.`);
}

// ---------------------------------------------------------------------------
// queue.json I/O. The two safety-critical operations are:
//   - readQueue(): always read fresh from disk; never cache across calls.
//   - writeQueue(): after a re-read, mutate, then write atomically.
// We use the read-modify-write helper for every mutation so callers can't
// forget the re-read step.
// ---------------------------------------------------------------------------

export async function readQueue() {
  const raw = await readFile(queuePath(), "utf8");
  return JSON.parse(raw);
}

export async function writeQueue(queue) {
  queue.schema_version = queue.schema_version ?? 1;
  queue.updated_at = new Date().toISOString();
  // Write to a sibling temp file then rename — rename is atomic on POSIX
  // and as good as it gets on Windows (which is what we run on here).
  const qp = queuePath();
  const tmpPath = qp + ".tmp";
  await writeFile(tmpPath, JSON.stringify(queue, null, 2) + "\n", "utf8");
  // Use copyFile + unlink on Windows where rename can fail across volumes.
  await copyFile(tmpPath, qp);
  const { unlink } = await import("node:fs/promises");
  await unlink(tmpPath);
}

/**
 * Read-modify-write helper. Re-reads the queue immediately before writing
 * (not from a cached copy), applies `mutator`, and returns the new queue.
 * If the mutator throws RefusalError, the write is skipped and the reason
 * is returned — that's how callers signal "row already taken", "missing
 * stage output", etc.
 */
export async function modifyQueue(mutator) {
  const before = await readQueue();
  try {
    const result = await mutator(before);
    const queue = result === undefined ? before : result;
    await writeQueue(queue);
    return { ok: true, queue, refused: false };
  } catch (err) {
    if (err instanceof RefusalError) {
      return { ok: false, queue: before, refused: true, reason: err.reason };
    }
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Per-row helpers.
// ---------------------------------------------------------------------------

function findRow(queue, slug) {
  return queue.businesses.find((b) => b.slug === slug);
}

function nowIso() {
  return new Date().toISOString();
}

// ---------------------------------------------------------------------------
// Command implementations. Each one is exported for the tests and also
// wired into the CLI dispatcher below.
// ---------------------------------------------------------------------------

/**
 * list — print every business with stage + status.
 */
export async function cmdList() {
  const queue = await readQueue();
  if (queue.businesses.length === 0) {
    console.log("(no businesses in queue)");
    return;
  }
  const slugWidth = Math.max(
    ...queue.businesses.map((b) => b.slug.length),
    "slug".length,
  );
  console.log(
    [
      "slug".padEnd(slugWidth),
      "stage".padEnd(12),
      "status".padEnd(12),
      "worktree".padEnd(30),
      "name",
    ].join("  "),
  );
  console.log("-".repeat(slugWidth + 12 + 12 + 30 + 30));
  for (const b of queue.businesses) {
    console.log(
      [
        b.slug.padEnd(slugWidth),
        (b.stage ?? "").padEnd(12),
        (b.status ?? "").padEnd(12),
        (b.assigned_worktree ?? "-").padEnd(30),
        b.business_name ?? "",
      ].join("  "),
    );
  }
}

/**
 * claim — find a row by slug and try to claim it.
 * Refuses (returns { ok: false, reason }) if the row is missing or not
 * in `pending` status. Race-safety: re-reads queue.json inside the
 * modifyQueue call so a stale snapshot can't win.
 */
export async function cmdClaim(slug, worktree) {
  if (!slug) {
    return { ok: false, reason: "slug required" };
  }
  const wt = worktree ?? `factory/${slug}`;
  const result = await modifyQueue((queue) => {
    const row = findRow(queue, slug);
    if (!row) {
      throw new RefusalError(`row not found in queue: ${slug}`);
    }
    if (row.status !== "pending") {
      throw new RefusalError(
        `row is '${row.status}', not 'pending' — claimed by ${row.assigned_worktree ?? "unknown"}`,
      );
    }
    row.status = "in_progress";
    row.assigned_worktree = wt;
    row.updated_at = nowIso();
    return queue;
  });
  if (!result.ok) return { ok: false, reason: result.reason };
  const row = findRow(result.queue, slug);
  if (row.status !== "in_progress") {
    return { ok: false, reason: "claim refused (status changed)" };
  }
  return { ok: true, slug, worktree: wt };
}

/**
 * pickup — find the first pending business and claim it.
 * Used by automated workers: `node scripts/factory.mjs pickup`.
 */
export async function cmdPickup(worktree) {
  const queue = await readQueue();
  const candidate = queue.businesses.find((b) => b.status === "pending");
  if (!candidate) {
    return { ok: false, reason: "no pending business" };
  }
  return cmdClaim(candidate.slug, worktree);
}

/**
 * advance — move a business from its current stage to the next one.
 * Refuses (returns { ok: false, reason }) if the current stage's expected
 * output file is missing or empty — see /Pipelines/00-overview.md stage
 * gate rule: "An agent should never mark a stage complete and move on
 * without having actually written the file."
 *
 * Expected outputs are listed inline below — kept in sync with the
 * /Pipelines/0X-*.md "Output:" lines.
 */
const STAGE_EXPECTED_OUTPUTS = {
  intake: ["business.md"],
  research: [
    "research/google-profile.md",
    "research/socials.md",
    "research/services.md",
    "research/competitors.md",
    "research/keywords.md",
  ],
  brand: [
    "brand/colors.md",
    "brand/typography.md",
    "brand/voice.md",
    "brand/animation.md",
  ],
  "content-seo": [
    "website/sitemap.md",
    "website/copy",
    "website/seo.md",
  ],
  build: ["website/src"],
  qa: ["website/qa-report.md"],
  deploy: ["deployment/log.md"],
  done: [],
};

export async function cmdAdvance(slug) {
  if (!slug) return { ok: false, reason: "slug required" };

  const businessDir = path.join(businessesDir(), slug);
  if (!existsSync(businessDir)) {
    return { ok: false, reason: `business folder missing: ${slug}` };
  }

  const result = await modifyQueue((queue) => {
    const row = findRow(queue, slug);
    if (!row) {
      throw new RefusalError(`row not found in queue: ${slug}`);
    }
    const idx = STAGES.indexOf(row.stage);
    if (idx === -1) {
      throw new RefusalError(`unknown stage: ${row.stage}`);
    }
    if (idx === STAGES.length - 1) {
      throw new RefusalError("already at terminal stage 'done'");
    }

    // Gate: refuse if expected outputs are missing or empty.
    const expected = STAGE_EXPECTED_OUTPUTS[row.stage] ?? [];
    for (const rel of expected) {
      const abs = path.join(businessDir, rel);
      if (!existsSync(abs)) {
        throw new RefusalError(
          `stage '${row.stage}' output missing: ${rel}`,
        );
      }
      // For files, also check they're non-empty.
      const stat = statSync(abs);
      if (stat.isFile() && stat.size === 0) {
        throw new RefusalError(
          `stage '${row.stage}' output empty: ${rel}`,
        );
      }
    }

    row.stage = STAGES[idx + 1];
    row.status = "pending";
    row.assigned_worktree = null;
    row.updated_at = nowIso();
    return queue;
  });

  if (!result.ok) return { ok: false, reason: result.reason };
  const row = findRow(result.queue, slug);
  return { ok: true, slug, newStage: row.stage };
}

/**
 * new — scaffold a fresh business from /Businesses/_template/.
 * Creates Businesses/<slug>/ with the same subfolder structure, and
 * inserts an intake row in queue.json.
 */
export async function cmdNew(slug, subvertical, city, businessName) {
  if (!slug || !subvertical || !city || !businessName) {
    return {
      ok: false,
      reason: "usage: new <slug> <subvertical> <city> <business-name>",
    };
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return {
      ok: false,
      reason:
        "slug must be lowercase letters, digits, and hyphens (see /Standards/naming-conventions.md)",
    };
  }
  const businessDir = path.join(businessesDir(), slug);
  if (existsSync(businessDir)) {
    return { ok: false, reason: `business folder already exists: ${slug}` };
  }
  if (!existsSync(templateDir())) {
    return { ok: false, reason: "_template/ missing in Businesses/" };
  }

  // Copy the template tree recursively. Node has no built-in copyTree,
  // so we walk it manually — small and clear.
  await copyTree(templateDir(), businessDir);

  // Fill business.md with the basics so Stage 01 (Intake) starts from a
  // half-decent state. The rest of business.md is filled during Stage 01
  // from real sources — see /Pipelines/01-intake.md.
  const businessMd = path.join(businessDir, "business.md");
  const filled = [
    "# Business",
    "",
    `- **Name:** ${businessName}`,
    `- **Sub-vertical:** ${subvertical}`,
    `- **City:** ${city}`,
    `- **Slug:** ${slug}`,
    `- **Google Business Profile URL:** (fill during Stage 01)`,
    `- **Instagram:**`,
    `- **Facebook:**`,
    `- **Existing website (if any):**`,
    `- **Phone:**`,
    `- **Address:**`,
    `- **Hours (if visible on source links):**`,
    "",
    "Filled in during Pipeline Stage 01 (Intake). Keep this file to facts",
    "as given — research and analysis belong in `research/`, not here.",
    "",
  ].join("\n");
  await writeFile(businessMd, filled, "utf8");

  // Insert into queue.json.
  const result = await modifyQueue((queue) => {
    if (queue.businesses.some((b) => b.slug === slug)) {
      throw new RefusalError(`slug already in queue: ${slug}`);
    }
    queue.businesses.push({
      slug,
      business_name: businessName,
      subvertical,
      city,
      stage: "intake",
      status: "pending",
      assigned_worktree: null,
      updated_at: nowIso(),
      notes: "",
    });
    return queue;
  });
  if (!result.ok) return { ok: false, reason: result.reason ?? "queue update failed" };

  return {
    ok: true,
    slug,
    businessDir: path.relative(repoRoot(), businessDir),
  };
}

// ---------------------------------------------------------------------------
// Recursive copy used by `new`. Inline so the script has no deps.
// ---------------------------------------------------------------------------

async function copyTree(src, dst) {
  await mkdir(dst, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      await copyTree(s, d);
    } else if (entry.isFile()) {
      await copyFile(s, d);
    }
  }
}

// ---------------------------------------------------------------------------
// CLI dispatcher.
// ---------------------------------------------------------------------------

async function main(argv) {
  const args = argv.slice(2);
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    printHelp();
    return 0;
  }

  // Pull --worktree out before positional parsing so any subcommand can
  // accept it.
  let worktree;
  const positional = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--worktree" && i + 1 < args.length) {
      worktree = args[i + 1];
      i++;
    } else {
      positional.push(args[i]);
    }
  }
  const [cmd, ...rest] = positional;

  try {
    switch (cmd) {
      case "list": {
        await cmdList();
        return 0;
      }
      case "pickup": {
        const r = await cmdPickup(worktree);
        if (!r.ok) {
          console.error(`pickup refused: ${r.reason}`);
          return 1;
        }
        console.log(`picked up ${r.slug} → worktree ${r.worktree}`);
        return 0;
      }
      case "claim": {
        const [slug] = rest;
        const r = await cmdClaim(slug, worktree);
        if (!r.ok) {
          console.error(`claim refused: ${r.reason}`);
          return 1;
        }
        console.log(`claimed ${r.slug} → worktree ${r.worktree}`);
        return 0;
      }
      case "advance": {
        const [slug] = rest;
        const r = await cmdAdvance(slug);
        if (!r.ok) {
          console.error(`advance refused: ${r.reason}`);
          return 1;
        }
        console.log(`${r.slug} → stage '${r.newStage}'`);
        return 0;
      }
      case "new": {
        const [slug, subvertical, city, ...nameParts] = rest;
        const businessName = nameParts.join(" ");
        const r = await cmdNew(slug, subvertical, city, businessName);
        if (!r.ok) {
          console.error(`new refused: ${r.reason}`);
          return 1;
        }
        console.log(`created ${r.businessDir} and queued as intake`);
        return 0;
      }
      default: {
        console.error(`unknown command: ${cmd}`);
        printHelp();
        return 1;
      }
    }
  } catch (err) {
    console.error(`error: ${err.message}`);
    return 1;
  }
}

// Only run main() when this file is invoked directly, not when it's
// imported by the test runner (or another script). The check below is
// the standard ESM entry-point pattern.
const __filename = fileURLToPath(import.meta.url);
const isMain = process.argv[1] === __filename;
if (isMain) {
  main(process.argv).then(
    (code) => process.exit(code),
    (err) => {
      console.error(err);
      process.exit(1);
    },
  );
}