import Link from "next/link";

import { Icon } from "../../components/Icon";
import { SectionHeading } from "../../components/SectionHeading";
import { SponsorInquiryForm } from "../../components/SponsorInquiryForm";
import { SPONSOR_EMAIL } from "../../data/site";
import { teams } from "../../data/teams";

function isRecruiting(status?: string) {
  return status === "Recruiting";
}

function getStatusClasses(status?: string) {
  if (isRecruiting(status)) {
    return "bg-green-100 text-green-700";
  }

  if (status === "Limited Spaces") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-rose-100 text-rose-700";
}

export default function TeamsPage() {
  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Teams"
        title="Current age groups"
        text="Our age groups are shown for parent information. Availability can be limited because many groups are currently oversubscribed."
      />

      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
        {teams.map((team) => (
          <div
            key={team.name}
            className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <Icon name="people" className="h-6 w-6" />
              </div>

              <p className="text-sm font-black uppercase tracking-[0.14em] text-sky-700">
                {team.schoolYear}
              </p>

              <h1 className="mt-2 text-2xl font-black text-slate-950">
                {team.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <p className="inline-flex rounded-full bg-blue-950 px-3 py-1 text-xs font-black text-white">
                  {team.format}
                </p>

                {team.status ? (
                  <span
                    className={
                      isRecruiting(team.status)
                        ? "relative inline-flex items-center"
                        : "inline-flex"
                    }
                  >
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${getStatusClasses(
                        team.status
                      )}`}
                    >
                      {team.status}
                    </span>

                    {isRecruiting(team.status) ? (
                      <Link
                        href="/contact#player-enquiry"
                        className="absolute right-0 top-0 z-10 inline-flex translate-x-1/3 -translate-y-3/4 animate-pulse rounded-full bg-green-700 px-3 py-1 text-xs font-black text-white shadow-sm transition hover:bg-green-800"
                      >
                        Enquire
                      </Link>
                    ) : null}
                  </span>
                ) : null}

                {team.sponsorAvailability ? (
                  <p className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-700">
                    {team.sponsorAvailability}
                  </p>
                ) : null}
              </div>

              <p className="mt-4 text-sm font-bold text-slate-700">
                Born: {team.birthRange}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {team.description}
              </p>
            </div>

            {team.sponsorOpportunities?.length ? (
              <div className="mt-auto flex flex-wrap gap-3 border-t border-slate-100 pt-6">
                {team.sponsorOpportunities.map((opportunity) => (
                  <SponsorInquiryForm
                    key={opportunity.label}
                    sponsorEmail={SPONSOR_EMAIL}
                    initialPackage={
                      new URLSearchParams(opportunity.href.split("?")[1]).get(
                        "package"
                      ) ?? undefined
                    }
                    initialTeam={team.name}
                    buttonLabel={opportunity.label}
                    className="whitespace-nowrap"
                  />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}
