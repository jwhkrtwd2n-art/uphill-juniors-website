import { Icon } from "../../components/Icon";
import { ButtonLink } from "../../components/ButtonLink";
import { SectionHeading } from "../../components/SectionHeading";
import { teams } from "../../data/teams";

export default function TeamsPage() {
  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Teams" title="Current age groups" text="Our age groups are shown for parent information. Availability can be limited because many groups are currently oversubscribed." />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
        {teams.map((team) => (
          <div key={team.name} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700"><Icon name="people" className="h-6 w-6" /></div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-sky-700">{team.schoolYear}</p>
              <h1 className="mt-2 text-2xl font-black text-slate-950">{team.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <p className="inline-flex rounded-full bg-blue-950 px-3 py-1 text-xs font-black text-white">{team.format}</p>
                {team.sponsorAvailability ? (
                  <p className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-700">{team.sponsorAvailability}</p>
                ) : null}
              </div>
              <p className="mt-4 text-sm font-bold text-slate-700">Born: {team.birthRange}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{team.description}</p>
            </div>
            {team.sponsorOpportunities?.length ? (
              <div className="mt-auto flex flex-wrap gap-3 pt-6 border-t border-slate-100">
                {team.sponsorOpportunities.map((opportunity) => (
                  <ButtonLink key={opportunity.label} href={opportunity.href} variant="sky" className="whitespace-nowrap">{opportunity.label}</ButtonLink>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}
