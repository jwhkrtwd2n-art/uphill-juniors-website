import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL } from "../data/site";
import {
  getAvailableSponsorTeamsByPackage,
  getSponsorSlots,
} from "../lib/sponsors";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Uphill Juniors FC",
    template: "%s | Uphill Juniors FC",
  },
  description:
    "Friendly grassroots football for the Uphill, Bournville, Oldmixon, Coronation Estate and wider local community.",
  applicationName: "Uphill Juniors FC",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Uphill Juniors FC",
    title: "Uphill Juniors FC",
    description:
      "Friendly grassroots football for children and young people across Uphill and the wider local community.",
    images: [
      {
        url: "/uphill-juniors-badge.png",
        width: 512,
        height: 512,
        alt: "Uphill Juniors FC badge",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Uphill Juniors FC",
    description:
      "Friendly grassroots football for children and young people across Uphill and the wider local community.",
    images: ["/uphill-juniors-badge.png"],
  },
  verification: {
    google: "la-VS5ZOjjODSwzN6Uqda7N8iDiD3-8oiVxMJQLm7MY",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const availableTeamsByPackage = getAvailableSponsorTeamsByPackage(
    await getSponsorSlots()
  );

  return (
    <html lang="en-GB">
      <body>
        <Header availableTeamsByPackage={availableTeamsByPackage} />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
