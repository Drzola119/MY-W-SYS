/**
 * Component barrel. All Website Factory engine components are exported
 * here so consumers can import them from a single path:
 *
 *   import { Hero, AvailabilityStrip } from "@/components";
 *
 * See each component's source file for the per-component spec and props.
 */

export { default as AvailabilityStrip } from "./AvailabilityStrip";
export type {
  AvailabilityStatus,
  AvailabilityStripProps,
} from "./AvailabilityStrip";

export { default as Hero } from "./Hero";
export type { HeroProps, HeroImage, RatingBadge } from "./Hero";

export { default as ReviewsTicker } from "./ReviewsTicker";
export type { ReviewsTickerProps, Review } from "./ReviewsTicker";

export { default as BookingCTA } from "./BookingCTA";
export type { BookingCTAProps } from "./BookingCTA";

export { default as ServicesGrid } from "./ServicesGrid";
export type {
  ServicesGridProps,
  ServiceItem,
  ServiceIconName,
} from "./ServicesGrid";

export { default as StaffBios } from "./StaffBios";
export type { StaffBiosProps, StaffMember } from "./StaffBios";

export { default as FAQ } from "./FAQ";
export type { FAQProps, FAQItem } from "./FAQ";

export { default as ContactLocation } from "./ContactLocation";
export type {
  ContactLocationProps,
  HoursEntry,
} from "./ContactLocation";

export { default as NavbarFooter } from "./NavbarFooter";
export type {
  NavbarFooterProps,
  NavPage,
  SocialLink,
  HoursEntry as FooterHoursEntry,
} from "./NavbarFooter";