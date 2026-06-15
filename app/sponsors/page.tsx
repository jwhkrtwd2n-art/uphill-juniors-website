import Image from "next/image";
import { Suspense } from "react";
import { Icon } from "../../components/Icon";
import { SectionHeading } from "../../components/SectionHeading";
import { SponsorInquiryFromUrl } from "../../components/SponsorInquiryFromUrl";
import { SponsorInquiryForm } from "../../components/SponsorInquiryForm";
import { SPONSOR_EMAIL } from "../../data/site";
import {
  sponsorClubValues,
  sponsorSocialPromo,
  sponsorWhy,
} from "../../data/sponsors";
import {
  formatTeamsAvailable,
  getAvailableSponsorTeamsByPackage,
  getSponsorAvailabilityCounts,
  getSponsorSlots,
  type SponsorPackageCode,
} from "../../lib/sponsors";

export const dynamic = "force-dynamic";

const sponsorMockups: {
  title: string;
  price: string;
  packageCode: SponsorPackageCode | "coaches";
  availability?: string;
  image: string;
  alt: string;
  detail: string;
}[] = [
  {
    title: "Main Kit Sponsor",
    price: "£650 per team",
    packageCode: "main",
    image: "/main-kit-sponsor.png",
    alt: "Main kit sponsor mock-up",
    detail:
      "Premium front-of-shirt sponsorship with maximum visibility on matchdays, social media and club photography.",
  },
  {
    title: "Back Sponsor",
    price: "£300 per team",
    packageCode: "back",
    image: "/back-sponsor.png",
    alt: "Back sponsor mock-up",
    detail:
      "Your logo displayed beneath the squad number on the rear of a team's playing shirt.",
  },
  {
    title: "Training Sponsor",
    price: "£500 per team",
    packageCode: "training",
    image: "/training-sponsor.png",
    alt: "Training sponsor mock-up",
    detail:
      "Featured on training apparel worn throughout the season at training sessions and club events.",
  },
  {
    title: "Coach Sponsor",
    price: "£600",
    packageCode: "coaches",
    availability: "Club-wide package",
    image: "/coach-sponsor.png",
    alt: "Coach sponsor mock-up",
    detail:
      "Prominent branding on coaching staff apparel, providing visibility across multiple age groups throughout the season.",
  },
];

export default async function SponsorsPage() {
  const sponsorSlots = await getSponsorSlots();
  const availableTeamsByPackage =
    getAvailableSponsorTeamsByPackage(sponsorSlots);
  const availabilityCounts = getSponsorAvailabilityCounts(sponsorSlots);

  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Sponsors"
        title="Support local football. Support local children."
        text="Uphill Juniors FC is a volunteer-led grassroots football club providing inclusive, affordable and community-focused football opportunities for children and young people. Sponsorship helps fund kit, equipment, facility costs and keeping football affordable for local families."
      />

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">
            About Uphill Juniors FC
          </p>
          <p className="text-base leading-7 text-slate-700">
            Based at Broadoak Academy, the club primarily serves the Bourville,
            Oldmixon and Coronation estates alongside Uphill, South Ward and the
            wider surrounding area.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-blue-950 p-8 text-white shadow-2xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">
            Sponsorship 2026/27
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Partner with Uphill Juniors FC
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Your business can help keep grassroots football affordable, support
            local young people and get visible community recognition.
          </p>
          <div className="mt-6">
            <Suspense fallback={null}>
              <SponsorInquiryFromUrl
                sponsorEmail={SPONSOR_EMAIL}
                availableTeamsByPackage={availableTeamsByPackage}
              />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-3">
        {sponsorWhy.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-black text-slate-950">
              {item.title}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {item.items.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">
          Sponsorship opportunities
        </p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">
          Support multiple teams with clear sponsor packages
        </h2>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Choose the right level of visibility for your business with main
          playing kit, back-of-shirt, coaches and training sponsorship options.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sponsorMockups.map((sponsor) => (
          <div
            key={sponsor.title}
            className="overflow-hidden rounded-3xl border border-sky-100 bg-sky-50 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-[380px] items-center justify-center bg-white p-4">
              <Image
                src={sponsor.image}
                alt={sponsor.alt}
                width={600}
                height={600}
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-xl font-black text-slate-950">
                {sponsor.title}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <p className="inline-flex rounded-full bg-blue-950 px-3 py-1 text-sm font-black text-white">
                  {sponsor.price}
                </p>
                <p className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-black text-sky-700">
                  {sponsor.packageCode === "coaches"
                    ? sponsor.availability
                    : formatTeamsAvailable(
                        availabilityCounts[sponsor.packageCode]
                      )}
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                {sponsor.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-4">
        {sponsorClubValues.map((value) => (
          <div
            key={value.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-black text-slate-950">
              {value.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">
          Social media & promotion
        </p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">
          Reach the local community
        </h2>
        <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
          {sponsorSocialPromo.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                <Icon name="check" className="h-3.5 w-3.5" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-12 max-w-7xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-700">
          Ready to support?
        </p>
        <p className="mt-3 text-base leading-7 text-slate-700">
          Contact the club to discuss sponsorship options, availability and
          brand placement for the season.
        </p>
        <div className="mt-6 flex justify-center">
          <SponsorInquiryForm
            sponsorEmail={SPONSOR_EMAIL}
            availableTeamsByPackage={availableTeamsByPackage}
          />
        </div>
      </div>
    </main>
  );
}
