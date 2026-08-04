import Link from "next/link";

/*
 * Engine root. Real per-business sites are produced by Stage 05 (Build)
 * inside /Businesses/<slug>/website/src/. This root page only exists so
 * the engine has a working "/" — see /demo for the component showcase.
 */

export default function Home() {
  return (
    <main
      className="mx-auto flex max-w-3xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24"
      style={{ color: "var(--color-ink)" }}
    >
      <p
        className="text-xs font-medium uppercase tracking-widest"
        style={{
          color: "var(--color-primary)",
          fontFamily: "var(--font-utility)",
          letterSpacing: "0.12em",
        }}
      >
        Website Factory — Engine
      </p>
      <h1
        className="text-4xl font-semibold leading-tight sm:text-5xl"
        style={{
          color: "var(--color-primary)",
          fontFamily: "var(--font-display)",
        }}
      >
        Component engine for local-services websites.
      </h1>
      <p
        className="max-w-xl text-base leading-relaxed"
        style={{ color: "var(--color-ink)", opacity: 0.8 }}
      >
        This is the build engine. It assembles sites from the component
        library themed with per-business brand tokens. The{" "}
        <Link
          href="/demo"
          className="font-medium underline-offset-4 hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          /demo route
        </Link>{" "}
        renders every component against clearly-labeled placeholder data.
      </p>
      <p
        className="max-w-xl text-sm"
        style={{ color: "var(--color-ink)", opacity: 0.6 }}
      >
        Real per-business sites are produced by{" "}
        <code
          className="rounded px-1.5 py-0.5"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            fontFamily: "var(--font-utility)",
          }}
        >
          /Businesses/&lt;slug&gt;/website/src/
        </code>{" "}
        during Pipeline Stage 05 (Build).
      </p>
    </main>
  );
}