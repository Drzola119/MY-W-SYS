/*
 * Site data — single source of truth for the practice's NAP, hours,
 * services, reviews, and social links. Per website/seo.md, this data
 * must match business.md and research/google-profile.md exactly.
 *
 * FICTIONAL TEST DATA. All numbers are invented for the test build.
 */

import type {
  HoursEntry,
  Review,
  ServiceItem,
  NavPage,
} from "@factory/engine/components";

export const SITE = {
  name: "Fictitious Dental Practice",
  brandName: "Fictitious Dental Practice",
  phone: "+44 20 7946 0999",
  phoneHref: "tel:+442079460999",
  address: "14 Fictitious Street, London NW1 0AA",
  url: "https://www.fictitious-dental-test.example.invalid",
} as const;

export const hours: HoursEntry[] = [
  { day: "Monday", open: "09:00", close: "18:00" },
  { day: "Tuesday", open: "09:00", close: "18:00" },
  { day: "Wednesday", open: "09:00", close: "18:00" },
  { day: "Thursday", open: "09:00", close: "20:00" },
  { day: "Friday", open: "09:00", close: "17:00" },
  { day: "Saturday", open: "10:00", close: "14:00" },
  { day: "Sunday", open: "", close: "", closed: true },
];

export const navPages: NavPage[] = [
  { label: "Services", href: "/services" },
  { label: "Whitening", href: "/whitening" },
  { label: "Emergency", href: "/emergency" },
  { label: "New patients", href: "/new-patients" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const services: ServiceItem[] = [
  {
    name: "New patient consultation",
    description: "30 minutes — exam, treatment plan, and time to answer questions.",
    icon: "Calendar",
  },
  {
    name: "Routine check-up",
    description: "Exam, scale, and polish in a single visit.",
    icon: "Stethoscope",
  },
  {
    name: "Hygiene-only clean",
    description: "30 or 45 minutes with a hygienist. Pick the slot that fits.",
    icon: "Sparkles",
  },
  {
    name: "Whitening (in-chair)",
    description: "Single-visit whitening with a noticeable improvement before you leave.",
    priceRange: "From £X",
    icon: "Sun",
    scheduleChip: "Anchor price",
  },
  {
    name: "Whitening (take-home)",
    description: "Custom trays and gel over a 2-week course, at your own pace.",
    icon: "Footprints",
  },
  {
    name: "Composite bonding",
    description: "Per-tooth bonding to repair chips, close gaps, or refine shape.",
    icon: "Wrench",
  },
  {
    name: "Crowns",
    description: "Porcelain-fused and full ceramic options, depending on the case.",
    icon: "HeartPulse",
  },
  {
    name: "Root canal treatment",
    description: "Single-visit where possible. We&rsquo;ll explain each step as we go.",
    icon: "Activity",
  },
  {
    name: "Emergency same-day",
    description: "Trauma, pain, or a lost crown — same-day slots most weekdays.",
    icon: "Zap",
    scheduleChip: "Same-day",
  },
  {
    name: "Children&rsquo;s dentistry",
    description: "NHS and private pathways. Patient with nervous kids — we know.",
    icon: "Baby",
  },
  {
    name: "Invisalign / clear aligners",
    description: "Provider-tier assessment at consultation. We&rsquo;ll tell you what&rsquo;s realistic.",
    icon: "Clock",
  },
];

export const reviews: Review[] = [
  {
    initial: "S",
    name: "S. K.",
    rating: 5,
    snippet:
      "Switched to this practice earlier this year — clean, on-time, the hygienist actually explained what she was doing. Will be back.",
    date: "2 weeks ago",
  },
  {
    initial: "M",
    name: "M. R.",
    rating: 5,
    snippet:
      "Booked an emergency appointment on a Saturday morning after chipping a tooth. Seen within an hour, fixed same day. Couldn't have asked for more.",
    date: "1 month ago",
  },
  {
    initial: "P",
    name: "P. D.",
    rating: 5,
    snippet:
      "Took my two kids for their first check-ups. They were nervous but the dentist was great with them — patient, used simple words, let them choose a sticker at the end.",
    date: "3 months ago",
  },
  {
    initial: "A",
    name: "A. N.",
    rating: 5,
    snippet:
      "Whitening results were better than I expected for the price. No pressure to upsell.",
    date: "4 months ago",
  },
  {
    initial: "T",
    name: "T. L.",
    rating: 4,
    snippet:
      "Friendly front desk, modern equipment. The dentist talked me through the X-ray findings without rushing. Reasonable pricing too.",
    date: "2 months ago",
  },
];

/*
 * Rating summary for the Hero. Per website/seo.md, the schema does NOT
 * include aggregateRating (no real review data). The Hero displays this
 * from research/google-profile.md for visual trust only — the page does
 * not claim an aggregate rating in the markup.
 */
export const rating = {
  score: 4.7,
  count: 86,
};

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/fictitious.dental.test" },
  { label: "Facebook", href: "https://www.facebook.com/fictitious-dental-test-page" },
];
