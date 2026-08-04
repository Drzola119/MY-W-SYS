import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const siteUrl = "https://www.fictitious-dental-test.example.invalid";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fictitious Dental Practice (test data) | Camden Dentist",
    template: "%s | Fictitious Dental Practice (test data)",
  },
  description:
    "Calm, expert dental care in Camden. 30-minute new-patient appointments, same-day emergency slots most weekdays, and Saturday mornings for emergencies.",
  openGraph: {
    type: "website",
    siteName: "Fictitious Dental Practice (test data)",
    locale: "en_GB",
    url: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
