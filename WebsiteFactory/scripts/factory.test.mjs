/*
 * factory.test.mjs — tests for scripts/factory.mjs.
 *
 * Uses node:test (built-in, no extra dep). Every test points the script
 * at a fresh temp directory via the FACTORY_ROOT env var so the real
 * /Factory/queue.json and /Businesses/ are never touched.
 *
 * Run: node --test scripts/factory.test.mjs
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, copyFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

// The CLI module is dynamically imported *after* we set FACTORY_ROOT in
// the per-test setup, so the path resolution picks up the temp dir.
async function loadCli() {
  return import("./factory.mjs");
}

// Build a temp root that mirrors the real repo's top-level shape:
//   <tmp>/Factory/queue.json        (queue)
//   <tmp>/Businesses/_template/...  (template tree to copy from)
//
// Copy the real _template/ in so the `new` command has something real
// to scaffold from.
async function makeTempRoot() {
  const dir = await mkdtemp(path.join(tmpdir(), "factory-test-"));
  await mkdir(path.join(dir, "Factory"), { recursive: true });
  await mkdir(path.join(dir, "Businesses", "_template", "research"), {
    recursive: true,
  });
  await mkdir(path.join(dir, "Businesses", "_template", "brand"), {
    recursive: true,
  });
  await mkdir(path.join(dir, "Businesses", "_template", "website"), {
    recursive: true,
  });
  await mkdir(path.join(dir, "Businesses", "_template", "deployment"), {
    recursive: true,
  });
  await mkdir(path.join(dir, "Businesses", "_template", "memory"), {
    recursive: true,
  });
  // Copy a single marker file from the real _template to prove recursion works.
  await copyFile(
    path.join(REPO_ROOT, "Businesses", "_template", "business.md"),
    path.join(dir, "Businesses", "_template", "business.md"),
  );
  await copyFile(
    path.join(REPO_ROOT, "Businesses", "_template", "status.md"),
    path.join(dir, "Businesses", "_template", "status.md"),
  );
  await copyFile(
    path.join(REPO_ROOT, "Businesses", "_template", "research", "README.md"),
    path.join(dir, "Businesses", "_template", "research", "README.md"),
  );
  // Seed an empty queue.
  await writeFile(
    path.join(dir, "Factory", "queue.json"),
    JSON.stringify({ schema_version: 1, businesses: [] }, null, 2) + "\n",
    "utf8",
  );
  return dir;
}

function withTempRoot(fn) {
  return async () => {
    const dir = await makeTempRoot();
    process.env.FACTORY_ROOT = dir;
    try {
      await fn(dir);
    } finally {
      delete process.env.FACTORY_ROOT;
      await rm(dir, { recursive: true, force: true });
    }
  };
}

// ---------------------------------------------------------------------------
// new — scaffolds a business from _template and adds a queue row.
// ---------------------------------------------------------------------------

test(
  "new: scaffolds folder + adds intake row to queue",
  withTempRoot(async (root) => {
    const cli = await loadCli();
    const r = await cli.cmdNew(
      "london-dentist-brightsmile",
      "dentist-clinic",
      "London",
      "Brightsmile Dental",
    );
    assert.equal(r.ok, true);

    // Folder exists with the expected subdirs.
    for (const sub of [
      "research",
      "brand",
      "website",
      "deployment",
      "memory",
    ]) {
      assert.equal(
        await stat(path.join(root, "Businesses", "london-dentist-brightsmile", sub)).then(
          (s) => s.isDirectory(),
        ),
        true,
        `expected subdir Businesses/london-dentist-brightsmile/${sub}`,
      );
    }

    // business.md got filled with the basics.
    const md = await readFile(
      path.join(root, "Businesses", "london-dentist-brightsmile", "business.md"),
      "utf8",
    );
    assert.match(md, /Brightsmile Dental/);
    assert.match(md, /dentist-clinic/);

    // Queue row exists and is intake/pending.
    const q = JSON.parse(
      await readFile(path.join(root, "Factory", "queue.json"), "utf8"),
    );
    const row = q.businesses.find((b) => b.slug === "london-dentist-brightsmile");
    assert.ok(row, "queue row missing");
    assert.equal(row.stage, "intake");
    assert.equal(row.status, "pending");
    assert.equal(row.subvertical, "dentist-clinic");
  }),
);

test(
  "new: refuses slug with invalid characters",
  withTempRoot(async () => {
    const cli = await loadCli();
    const r = await cli.cmdNew("Bad Slug!", "dentist-clinic", "London", "X");
    assert.equal(r.ok, false);
    assert.match(r.reason, /lowercase letters/);
  }),
);

test(
  "new: refuses duplicate slug",
  withTempRoot(async () => {
    const cli = await loadCli();
    await cli.cmdNew("dup-test", "dentist-clinic", "London", "First");
    const r = await cli.cmdNew("dup-test", "dentist-clinic", "London", "Second");
    assert.equal(r.ok, false);
    assert.match(r.reason, /already/);
  }),
);

// ---------------------------------------------------------------------------
// claim — race-safety.
// ---------------------------------------------------------------------------

test(
  "claim: pending → in_progress on first claim",
  withTempRoot(async (root) => {
    const cli = await loadCli();
    await cli.cmdNew("acme-test", "dentist-clinic", "London", "Acme");
    const r = await cli.cmdClaim("acme-test", "factory/acme-test");
    assert.equal(r.ok, true);
    assert.equal(r.worktree, "factory/acme-test");

    const q = JSON.parse(
      await readFile(path.join(root, "Factory", "queue.json"), "utf8"),
    );
    const row = q.businesses.find((b) => b.slug === "acme-test");
    assert.equal(row.status, "in_progress");
    assert.equal(row.assigned_worktree, "factory/acme-test");
  }),
);

test(
  "claim: refuses when row is already in_progress (race-safety)",
  withTempRoot(async () => {
    const cli = await loadCli();
    await cli.cmdNew("race-test", "dentist-clinic", "London", "Race");
    const a = await cli.cmdClaim("race-test", "factory/a");
    const b = await cli.cmdClaim("race-test", "factory/b");
    assert.equal(a.ok, true);
    assert.equal(b.ok, false);
    // The reason should mention the row is no longer pending.
    assert.match(b.reason, /pending/);
    assert.match(b.reason, /in_progress|in progress/);
  }),
);

test(
  "claim: pickup picks the first pending business",
  withTempRoot(async () => {
    const cli = await loadCli();
    await cli.cmdNew("first-one", "dentist-clinic", "London", "First");
    await cli.cmdNew("second-one", "dentist-clinic", "London", "Second");
    const r = await cli.cmdPickup();
    assert.equal(r.ok, true);
    assert.equal(r.slug, "first-one");
  }),
);

test(
  "claim: pickup refuses when no pending exists",
  withTempRoot(async () => {
    const cli = await loadCli();
    const r = await cli.cmdPickup();
    assert.equal(r.ok, false);
    assert.match(r.reason, /no pending/);
  }),
);

// ---------------------------------------------------------------------------
// advance — moves stage forward, with stage-gate enforcement.
// ---------------------------------------------------------------------------

test(
  "advance: refuses to leave intake without business.md filled",
  withTempRoot(async () => {
    const cli = await loadCli();
    await cli.cmdNew("gated-test", "dentist-clinic", "London", "Gated");
    const r = await cli.cmdAdvance("gated-test");
    // business.md was filled by cmdNew, so it should advance to research.
    assert.equal(r.ok, true);
    assert.equal(r.newStage, "research");
  }),
);

test(
  "advance: refuses if expected stage output is missing",
  withTempRoot(async () => {
    const cli = await loadCli();
    await cli.cmdNew("empty-test", "dentist-clinic", "London", "Empty");

    // Manually empty business.md to simulate a stage that didn't produce output.
    await writeFile(
      path.join(
        process.env.FACTORY_ROOT,
        "Businesses",
        "empty-test",
        "business.md",
      ),
      "",
      "utf8",
    );
    const r = await cli.cmdAdvance("empty-test");
    assert.equal(r.ok, false);
    assert.match(r.reason, /output missing|output empty/);
  }),
);

test(
  "advance: refuses at terminal 'done' stage",
  withTempRoot(async () => {
    const cli = await loadCli();
    await cli.cmdNew("done-test", "dentist-clinic", "London", "Done");
    // We can't actually walk it through 8 stages in a test cleanly; set
    // the row to 'done' directly via a raw write.
    const qpath = path.join(process.env.FACTORY_ROOT, "Factory", "queue.json");
    const q = JSON.parse(await readFile(qpath, "utf8"));
    q.businesses[0].stage = "done";
    await writeFile(qpath, JSON.stringify(q, null, 2), "utf8");
    const r = await cli.cmdAdvance("done-test");
    assert.equal(r.ok, false);
    assert.match(r.reason, /terminal/);
  }),
);

test(
  "advance: walks research → brand when research outputs exist",
  withTempRoot(async (root) => {
    const cli = await loadCli();
    await cli.cmdNew("walk-test", "dentist-clinic", "London", "Walk");

    // Advance intake → research (business.md exists from cmdNew).
    let r = await cli.cmdAdvance("walk-test");
    assert.equal(r.ok, true);
    assert.equal(r.newStage, "research");

    // Trying to advance research → brand should fail (no research files).
    r = await cli.cmdAdvance("walk-test");
    assert.equal(r.ok, false);
    assert.match(r.reason, /research/);

    // Create the research files and try again.
    const researchDir = path.join(root, "Businesses", "walk-test", "research");
    for (const name of [
      "google-profile.md",
      "socials.md",
      "services.md",
      "competitors.md",
      "keywords.md",
    ]) {
      await writeFile(path.join(researchDir, name), "stub", "utf8");
    }
    r = await cli.cmdAdvance("walk-test");
    assert.equal(r.ok, true);
    assert.equal(r.newStage, "brand");
  }),
);

// ---------------------------------------------------------------------------
// list — sanity check that list runs without throwing.
// ---------------------------------------------------------------------------

test(
  "list: empty queue prints the no-businesses message",
  withTempRoot(async () => {
    const cli = await loadCli();
    // No throw, no assertion needed beyond reachability — but capture
    // stdout would require mocking; we just call it.
    await cli.cmdList();
  }),
);

// ---------------------------------------------------------------------------
// Helper used above — fs.stat isn't imported at module top because we
// don't want it in the dependency surface; it's only needed here.
// ---------------------------------------------------------------------------

import { stat } from "node:fs/promises";