import Image from "next/image";
import { ClubBadge } from "../components/ClubBadge";
import { Icon } from "../components/Icon";
import { SocialSection } from "../components/SocialSection";
import { SponsorInquiryForm } from "../components/SponsorInquiryForm";
import { VolunteerInquiryForm } from "../components/VolunteerInquiryForm";
import { SPONSOR_EMAIL } from "../data/site";

const stats = [
  { label: "Founded", value: "2021" },
  { label: "Age groups", value: "U6-U16" },
  { label: "Award", value: "Somerset FA 2022" },
  { label: "Club model", value: "Volunteer-led" },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-sky-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(14,165,233,0.20),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(30,64,175,0.12),transparent_26%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-800 shadow-sm">
              <Icon name="map" className="h-4 w-4" />
              Based at Broadoak Academy
            </div>

            <div className="mb-6 flex items-center gap-5">
              <ClubBadge className="h-24 w-24 sm:h-28 sm:w-28" size={128} />
              <div className="h-20 w-px bg-slate-300" />
              <p className="max-w-xs text-xl font-black leading-tight text-slate-950 sm:text-2xl">
                FORZA UPHILL.
              </p>
            </div>

            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              A friendly grassroots club at the heart of the community.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Uphill Juniors FC provides inclusive, affordable and community-focused football for children and young people across Uphill, Bournville, Oldmixon, Coronation Estate, South Ward and the wider local area.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <VolunteerInquiryForm
                buttonLabel="Volunteer with us"
                buttonVariant="sky"
              />
              <SponsorInquiryForm
                sponsorEmail={SPONSOR_EMAIL}
                buttonLabel="Sponsor the club"
                buttonVariant="light"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-sky-200/60 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white shadow-2xl">
              <div className="relative h-[420px] bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1400&q=80"
                  alt="Children playing football"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/30 to-blue-950/60" />
                <div className="absolute inset-x-6 bottom-6 rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur">
                  <div className="flex items-center gap-4">
                    <ClubBadge className="h-20 w-20" size={96} />
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-700">
                        Welcome to Uphill Juniors
                      </p>
                      <h2 className="mt-1 text-2xl font-black text-slate-950">
                        Families, volunteers and sponsors
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-8">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-700">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-black text-blue-950">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">
              Volunteers wanted
            </p>
            <h2 className="mt-3 text-4xl font-black">
              Our age group availability can be limited, but adult volunteers are always welcome.
            </h2>
          </div>

          <div className="rounded-[2rem] bg-white p-8 text-slate-950 shadow-xl">
            <p className="text-base leading-7 text-slate-700">
              The club is always looking for adults who can support coaching, matchdays, admin, fundraising, sponsorship and events.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Coaching support", icon: "people" },
                { label: "Matchday help", icon: "calendar" },
                { label: "Fundraising", icon: "heart" },
                { label: "Sponsorship support", icon: "megaphone" },
                { label: "Admin help", icon: "mail" },
                { label: "Event support", icon: "calendar" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-sky-50 p-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white">
                    <Icon name={item.icon} className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <VolunteerInquiryForm
                buttonLabel="Ask about volunteering"
                buttonVariant="sky"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-8">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: "people", title: "Inclusive", text: "Football for children of all backgrounds." },
            { icon: "heart", title: "Volunteer-led", text: "Powered by local coaches and helpers." },
            { icon: "calendar", title: "Development-first", text: "Confidence, enjoyment and teamwork." },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                <Icon name={item.icon} className="h-7 w-7" />
              </div>
              <div>
                <p className="font-black text-slate-950">{item.title}</p>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SocialSection />
    </main>
  );
}
