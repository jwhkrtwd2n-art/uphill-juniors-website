import {
  CLUB_SHOP_URL,
  FACEBOOK_URL,
  GOOGLE_MAPS_URL,
  INFO_EMAIL,
  INSTAGRAM_URL,
} from "../data/site";
import { ClubBadge } from "./ClubBadge";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="bg-blue-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-white/15 pb-8 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <div className="flex items-center gap-4">
            <ClubBadge className="h-16 w-16" size={84} />
            <div>
              <p className="text-xl font-black">Uphill Juniors FC</p>
              <p className="mt-1 text-sm font-bold text-sky-200">
                Football / Family / Community
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Friendly grassroots football based at Broadoak Academy.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <a
              className="rounded-2xl bg-sky-600 px-5 py-4 text-sm font-black text-white shadow-sm transition hover:bg-sky-700"
              href={CLUB_SHOP_URL}
              target="_blank"
              rel="noreferrer"
            >
              Club shop
            </a>
            <a
              className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-black text-sky-100 transition hover:bg-white/15"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-black text-sky-100 transition hover:bg-white/15"
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="grid gap-5 pt-8 md:grid-cols-2">
          <a
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Find Us
            </p>
            <p className="mt-3 flex items-start gap-2 text-sm font-bold text-slate-100">
              <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
              <span>Broadoak Academy on Google Maps</span>
            </p>
          </a>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Contact
            </p>
            <a className="mt-3 flex items-start gap-2 text-sm font-bold text-sky-200 hover:text-white" href={`mailto:${INFO_EMAIL}`}>
              <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{INFO_EMAIL}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
