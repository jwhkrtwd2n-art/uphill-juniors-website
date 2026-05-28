import { CLUB_EMAIL } from "../data/site";
import { ClubBadge } from "./ClubBadge";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <ClubBadge className="h-14 w-14" size={72} />
          <div>
            <p className="font-black">Uphill Juniors FC</p>
            <p className="text-sm text-slate-300">Friendly grassroots football for the local community.</p>
          </div>
        </div>
        <a className="flex items-center gap-2 text-sm font-bold text-sky-200 hover:text-white" href={`mailto:${CLUB_EMAIL}`}>
          <Icon name="mail" className="h-4 w-4" /> {CLUB_EMAIL}
        </a>
      </div>
    </footer>
  );
}
