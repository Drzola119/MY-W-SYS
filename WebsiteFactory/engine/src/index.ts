/**
 * Top-level @factory/engine barrel. Re-exports the component barrel so
 * consumers can write either:
 *
 *   import { Hero } from "@factory/engine";
 *   import { Hero } from "@factory/engine/components";
 *
 * The /components subpath exists for cases where consumers want to mirror
 * the engine's internal structure. They are identical.
 */

export * from "./components";
