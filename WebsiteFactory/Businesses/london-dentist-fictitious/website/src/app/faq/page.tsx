"use client";

import {
  AvailabilityStrip,
  BookingCTA,
  FAQ,
  NavbarFooter,
} from "@factory/engine/components";
import type { FAQItem, SocialLink } from "@factory/engine/components";
import { Globe } from "lucide-react";

import { Schema } from "@/app/Schema";
import { hours, navPages, SITE } from "@/lib/site";

/*
 * /faq — FICTIONAL TEST DATA.
 * Per website/copy/faq.md and Templates/dentist-clinic.md, FAQ covers
 * insurance, pain management, and emergency policy. Insurance list is
 * a known content gap — answered with "call us to confirm" line.
 */

const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/fictitious.dental.test", Icon: Globe },
  { label: "Facebook", href: "https://www.facebook.com/fictitious-dental-test-page", Icon: Globe },
];

const faqItems: FAQItem[] = [
  {
    question: "Do you accept my dental insurance?",
    answer:
      "We accept several major plans, but we don't publish the full list — it changes often, and we'd rather give you a straight answer than a stale one. Call us with your plan details and we'll confirm in a minute.",
  },
  {
    question: "Are you an NHS practice?",
    answer:
      "We see both NHS and private patients. We'll explain what's covered under NHS at your visit, and we won't push you toward private treatment if the NHS route is the right one for you.",
  },
  {
    question: "Do you have a fee guide?",
    answer:
      "We publish one anchor price — in-chair whitening — and we're happy to give you a written quote for any specific treatment at your consultation. We don't publish a full fee guide online because the prices vary too much case by case.",
  },
  {
    question: "Will it hurt?",
    answer:
      "Most routine check-ups and cleans are painless. For treatments like fillings or root canals, we use local anaesthetic so you don't feel the work being done. If you're nervous about pain, tell us — we can take longer, explain each step, and pause when you need.",
  },
  {
    question: "I'm scared of the dentist. Can you help?",
    answer:
      "You're not alone — many of our patients started out nervous. Tell us when you book, and we'll plan a longer appointment, talk you through everything, and go at your pace. There's no judgement, and we won't rush you.",
  },
  {
    question: "What if I have a problem after my appointment?",
    answer:
      "Call us. If it's within our opening hours, we'll usually see you the same day. If it's out of hours and urgent, call 111 or visit A&E.",
  },
  {
    question: "What counts as a dental emergency?",
    answer:
      "Toothache that won't settle, a broken or knocked-out tooth, a lost crown or filling that's causing pain, swelling, or bleeding that won't stop. If you're not sure, call us and we'll tell you when to come in.",
  },
  {
    question: "Can I get a same-day appointment?",
    answer:
      "Most weekdays, yes. We hold emergency slots specifically for this. Saturday mornings are also available for emergencies by appointment. Call us as early as you can — the earlier you ring, the more flexibility we have.",
  },
  {
    question: "What if you're closed?",
    answer:
      "Call 111 (NHS) for advice. For severe swelling, difficulty breathing or swallowing, or trauma you can't manage, go to A&E.",
  },
  {
    question: "Where are you?",
    answer:
      "14 Fictitious Street, London NW1 0AA. See our contact page for the map and full directions.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "Monday–Wednesday 09:00–18:00, Thursday 09:00–20:00, Friday 09:00–17:00, Saturday 10:00–14:00 (emergencies by appointment), Sunday closed.",
  },
  {
    question: "Are you accepting new patients?",
    answer:
      "Yes. A new-patient appointment is 30 minutes, so we have time to examine, plan, and answer your questions. Book online or call us.",
  },
  {
    question: "Do you do cosmetic work?",
    answer:
      "We offer whitening, composite bonding, and crowns. We don't do implants, veneers, or orthodontics beyond Invisalign. We'll always tell you if a treatment isn't right for your teeth.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Schema />
      <NavbarFooter
        brandName={SITE.name}
        pages={navPages}
        phone={SITE.phone}
        address={SITE.address}
        hours={hours}
        socials={socials}
      >

      <AvailabilityStrip
        status="open"
        acceptingNew
        ctaLabel="Book a check-up"
      />

      <section
        className="w-full"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          <h1
            className="text-4xl font-semibold leading-tight sm:text-5xl"
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            Frequently asked questions
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            The questions we get asked most often. If yours isn&rsquo;t here,
            call us on +44 20 7946 0999 — we&rsquo;re happy to answer.
          </p>
        </div>
      </section>

      <FAQ
        heading="Common questions"
        intro="Insurance, pain management, and emergency policy — the things visitors most often want to know upfront."
        items={faqItems}
      />

      <BookingCTA
        headline="Have a question?"
        subtext="If we haven't answered it above, call us on +44 20 7946 0999 — we're happy to talk."
        ctaLabel="Call us"
        phone={SITE.phone}
      />
      </NavbarFooter>
    </>
  );
}
