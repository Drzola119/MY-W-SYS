"use client";

import {
  AvailabilityStrip,
  BookingCTA,
  ContactLocation,
  FAQ,
  Hero,
  NavbarFooter,
  ReviewsTicker,
  ServicesGrid,
  StaffBios,
} from "@/components";
import type {
  FAQItem,
  Review,
  ServiceItem,
  SocialLink,
  StaffMember,
} from "@/components";

/*
 * /demo — assembles every component in the engine against clearly-labeled
 * placeholder content. Nothing on this page is meant to be confused with a
 * real local-services business; the brand name says "Component Demo" and
 * copy is prefixed with [Demo] where it would otherwise read as real.
 */

const demoHours = [
  { day: "Monday", open: "9:00", close: "18:00" },
  { day: "Tuesday", open: "9:00", close: "18:00" },
  { day: "Wednesday", open: "9:00", close: "18:00" },
  { day: "Thursday", open: "9:00", close: "20:00" },
  { day: "Friday", open: "9:00", close: "17:00" },
  { day: "Saturday", open: "10:00", close: "14:00" },
  { day: "Sunday", open: "", close: "", closed: true },
];

const demoServices: ServiceItem[] = [
  {
    name: "[Demo] Routine check-up",
    description:
      "[Demo description — placeholder copy showing how a service card reads when research has supplied a real service and a real description.]",
    icon: "Stethoscope",
  },
  {
    name: "[Demo] Whitening",
    description:
      "[Demo description — replace this paragraph with the actual whitening service description from research/google-profile.md or research/services.md.]",
    priceRange: "Price TBD",
    icon: "Sparkles",
  },
  {
    name: "[Demo] Emergency visit",
    description:
      "[Demo description — emergency and same-day bookings are typically highlighted separately and wired to a fast-track booking flow.]",
    icon: "HeartPulse",
  },
  {
    name: "[Demo] Restoration",
    description:
      "[Demo description — restoration work ranges from fillings to crowns; the actual list comes from research, never invented.]",
    icon: "Wrench",
  },
  {
    name: "[Demo] Hygienist clean",
    description:
      "[Demo description — 30/45/60-minute slots, frequency guidance is set per the business's published hygiene schedule.]",
    icon: "Calendar",
  },
  {
    name: "[Demo] Consultation",
    description:
      "[Demo description — first-visit consultation copy is where the warm, reassuring tone note from Templates/dentist-clinic.md shows up strongest.]",
  },
];

const demoStaff: StaffMember[] = [
  {
    name: "[Demo] Dr. A. Placeholder",
    role: "Principal dentist",
    bio: "[Demo bio — one line per staff member, drawn verbatim from research/about.md. Never invented.]",
  },
  {
    name: "[Demo] Dr. B. Placeholder",
    role: "Associate dentist",
    bio: "[Demo bio — sourced from the About page, social bios, or Google profile captions during Stage 02.]",
  },
  {
    name: "[Demo] C. Placeholder",
    role: "Hygienist",
    bio: "[Demo bio — replace this sentence with the real hygienist bio pulled in by the research stage.]",
  },
];

const demoReviews: Review[] = [
  {
    initial: "R",
    name: "[Demo] R.",
    rating: 5,
    snippet:
      "[Demo snippet — replace with a real Google review line. Reviews are passed in as-is; the component does not invent or paraphrase them.]",
    date: "2 weeks ago",
  },
  {
    initial: "M",
    name: "[Demo] M.",
    rating: 5,
    snippet:
      "[Demo snippet — longer review that demonstrates how the card wraps to a second line.]",
    date: "1 month ago",
  },
  {
    initial: "T",
    name: "[Demo] T.",
    rating: 4,
    snippet:
      "[Demo snippet — four-star review to show the partial-fill star row.]",
    date: "2 months ago",
  },
  {
    initial: "S",
    name: "[Demo] S.",
    rating: 5,
    snippet:
      "[Demo snippet — short praise line; the marquee loops the list so the row never runs out of cards.]",
    date: "3 months ago",
  },
];

const demoFAQ: FAQItem[] = [
  {
    question: "[Demo question] Do you take new patients?",
    answer:
      "[Demo answer — questions and answers are sourced from the FAQ suggestions in Templates/<subvertical>.md and the business's own existing FAQ if research found one.]",
  },
  {
    question: "[Demo question] What insurance do you accept?",
    answer:
      "[Demo answer — only list insurers the business actually accepts, per research. Never invent a list.]",
  },
  {
    question: "[Demo question] Do you handle emergencies?",
    answer:
      "[Demo answer — same-day or next-day emergency policy, if research supports it. Otherwise omit the question.]",
  },
  {
    question: "[Demo question] What should I bring to my first visit?",
    answer:
      "[Demo answer — ID, insurance card, list of current medications. Pulled from the business's new-patient documentation in research.]",
  },
];

const demoPages = [
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Visit us", href: "#contact" },
];

const demoSocials: SocialLink[] = [
  // Pass empty array to show the "No social profiles yet." footer state.
];

export default function DemoPage() {
  return (
    <>
      <NavbarFooter
        brandName="Acme Dental — Component Demo"
        pages={demoPages}
        phone="+44 20 0000 0000"
        address="[Demo] 1 Example Street, London, UK"
        hours={demoHours}
        socials={demoSocials}
      >

      <AvailabilityStrip
        status="open"
        nextAvailable="2:30pm today"
        acceptingNew
        ctaLabel="Book a demo appointment"
      />

      <Hero
        headline="[Demo headline — replace with the real one from website/copy/]"
        subhead="[Demo subhead — one specific line answering who this is for, where they are, and what to do next. Specific beats aspirational.]"
        ctaLabel="Book a demo appointment"
        ratingBadge={{ score: 4.9, count: 214 }}
        // No real image — the demo deliberately omits it so the layout
        // shows the single-column fallback rather than fabricating a stock
        // photo as a real photo.
      />

      <ServicesGrid
        heading="[Demo] Services"
        intro="[Demo intro — one sentence on the service area, drawn from research. Card content below is placeholder.]"
        items={demoServices}
        columns={3}
      />

      <BookingCTA
        headline="[Demo] Ready to book?"
        subtext="[Demo] Placeholder reassurance line — only included if the actual business offers this kind of guarantee."
        ctaLabel="Book a demo appointment"
        phone="+44 20 0000 0000"
      />

      <section id="reviews">
        <ReviewsTicker reviews={demoReviews} />
      </section>

      <section id="team">
        <StaffBios
          heading="[Demo] Meet the team"
          intro="[Demo intro — team section intro is one line, no more."
          staff={demoStaff}
        />
      </section>

      <section id="faq">
        <FAQ
          heading="[Demo] Common questions"
          intro="[Demo intro — pre-empt the real visitor objections from Templates/<subvertical>.md."
          items={demoFAQ}
        />
      </section>

      <section id="contact">
        <ContactLocation
          heading="[Demo] Visit us"
          address="[Demo] 1 Example Street, London, UK"
          phone="+44 20 0000 0000"
          hours={demoHours}
          mapEmbedUrl=""
        />
      </section>

      <BookingCTA
        tone="primary"
        headline="[Demo] One last call to action"
        subtext="[Demo] Final closer — uses the inverted tone to bookend the page."
        ctaLabel="Book a demo appointment"
        phone="+44 20 0000 0000"
      />
      </NavbarFooter>
    </>
  );
}