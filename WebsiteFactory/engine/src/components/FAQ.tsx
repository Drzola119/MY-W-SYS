"use client";

/*
 * FAQ — accessible accordion. Keyboard-accessible (Enter/Space toggle),
 * proper aria-expanded state. See /Components/FAQ/spec.md and
 * /Skills/accessibility-review.md before editing.
 */

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  heading?: string;
  intro?: string;
  items: FAQItem[];
}

export default function FAQ({
  heading = "Common questions",
  intro,
  items,
}: FAQProps) {
  const groupId = useId();
  // Allow multiple panels open at once — feels less restrictive for a
  // 4–6 question accordion, and matches what real visitors compare.
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  if (items.length === 0) return null;

  const toggle = (index: number): void => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--color-surface)" }}
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h2
          id="faq-heading"
          className="text-3xl font-semibold sm:text-4xl"
          style={{
            color: "var(--color-primary)",
            fontFamily: "var(--font-display)",
          }}
        >
          {heading}
        </h2>
        {intro && (
          <p
            className="mt-3 text-base"
            style={{ color: "var(--color-ink)", opacity: 0.75 }}
          >
            {intro}
          </p>
        )}

        <ul className="mt-10 divide-y" style={{ borderColor: "var(--color-border)" }}>
          {items.map((item, idx) => {
            const isOpen = openSet.has(idx);
            const panelId = `${groupId}-panel-${idx}`;
            const buttonId = `${groupId}-button-${idx}`;
            return (
              <li
                key={`${item.question}-${idx}`}
                className="py-2"
                style={{ borderColor: "var(--color-border)" }}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium motion-reduce:transition-none"
                    style={{ color: "var(--color-ink)" }}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform motion-reduce:transition-none ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      style={{ color: "var(--color-primary)" }}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-4 pr-8 text-sm leading-relaxed"
                  style={{ color: "var(--color-ink)", opacity: 0.8 }}
                >
                  {item.answer}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}