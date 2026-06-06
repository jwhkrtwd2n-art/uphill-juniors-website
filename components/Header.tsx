"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ClubBadge } from "./ClubBadge";
import { ButtonLink } from "./ButtonLink";
import { SponsorInquiryForm } from "./SponsorInquiryForm";
import { CLUB_SHOP_URL, pages, SPONSOR_EMAIL } from "../data/site";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-left">
          <ClubBadge className="h-14 w-14" size={72} />
          <div>
            <p className="text-lg font-black leading-tight text-slate-950">Uphill Juniors FC</p>
            <p className="text-xs font-bold text-sky-700">Football / Family / Community</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold text-slate-700 lg:flex" aria-label="Main navigation">
          {pages.map((page) => (
            <Link key={page.href} href={page.href} className={pathname === page.href ? "text-sky-700" : "hover:text-sky-700"}>
              {page.label}
            </Link>
          ))}
          <a
            href={CLUB_SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-700"
          >
            Shop
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-950 shadow-sm transition hover:bg-slate-50 lg:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2" aria-label="Mobile navigation">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-2xl px-4 py-3 text-left text-base font-black ${pathname === page.href ? "bg-sky-50 text-sky-700" : "text-slate-800 hover:bg-sky-50 hover:text-sky-700"}`}
              >
                {page.label}
              </Link>
            ))}
            <a
              href={CLUB_SHOP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-left text-base font-black text-slate-800 hover:bg-sky-50 hover:text-sky-700"
            >
              Shop
            </a>
          </nav>
          <div className="mx-auto mt-4 grid max-w-7xl gap-3 sm:grid-cols-2">
            <ButtonLink href="/contact" variant="sky">Contact the club</ButtonLink>
            <SponsorInquiryForm
              sponsorEmail={SPONSOR_EMAIL}
              className="w-full"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
