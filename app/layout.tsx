import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Uphill Juniors FC",
  description: "Friendly grassroots football for the Uphill, Bournville, Oldmixon, Coronation Estate and wider local community.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
