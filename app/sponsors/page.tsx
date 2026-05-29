import Image from "next/image";
import { ButtonLink } from "../../components/ButtonLink";
import { Icon } from "../../components/Icon";
import { SectionHeading } from "../../components/SectionHeading";
import { SponsorInquiryForm } from "../../components/SponsorInquiryForm";
import { SPONSOR_EMAIL } from "../../data/site";
import { sponsorClubValues, sponsorPackages, sponsorShowcase, sponsorSocialPromo, sponsorWhy } from "../../data/sponsors";

export default function SponsorsPage() {
  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Sponsors"
        title="Support local football. Support local children."
        text="Uphill Juniors FC is a volunteer-led grassroots football club providing inclusive, affordable and community-focused football opportunities for children and young people."
      />

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">About Uphill Juniors FC</p>
          <p className="text-base leading-7 text-slate-700">Based at Broadoak Academy, the club primarily serves the Bourville, Oldmixon and Coronation estates alongside Uphill, Southward and the wider surrounding area. We work across communities that include areas classified within IMD1 deciles, while remaining focused on creating positive, inclusive and affordable football opportunities for all local children and families.</p>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-950">We exist to provide</h2>
              <ul className="space-y-2 text-sm leading-6 text-slate-700">
                <li>Safe and structured football opportunities</li>
                <li>Affordable access to organised sport</li>
                <li>Positive role models and coaching</li>
                <li>Inclusive participation for local children</li>
                <li>Community engagement and development</li>
                <li>Long-term grassroots football opportunities</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-950">Volunteer-led club</h2>
              <p className="text-sm leading-6 text-slate-700">The club operates mixed teams and is committed to supporting participation opportunities for both boys and girls. Volunteers contribute through:</p>
              <ul className="space-y-2 text-sm leading-6 text-slate-700">
                <li>Coaching</li>
                <li>Safeguarding</li>
                <li>Team administration</li>
                <li>Fundraising</li>
                <li>Community engagement</li>
                <li>Event organisation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-blue-950 p-8 text-white shadow-2xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">Sponsorship 2026/27</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Partner with Uphill Juniors FC</h1>
          <p className="mt-5 text-base leading-7 text-slate-300">Your business can help keep grassroots football affordable, support local young people and get visible community recognition through kit, coaching and training sponsorship.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <SponsorInquiryForm sponsorEmail={SPONSOR_EMAIL} />
            <ButtonLink href="/Uphill_Juniors_Landscape_Sponsorship_Brochure.pdf" variant="light">View brochure</ButtonLink>
          </div>
          <div className="mt-10 rounded-3xl border border-slate-700 bg-slate-900 p-6">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">Sponsorship priorities</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">Sponsors may sponsor more than one team, subject to availability. Priority is given to securing main playing kit sponsors before secondary sponsorship positions are allocated. Back-of-shirt sponsorship is only available once a team has secured a main playing kit sponsor.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-3">
        {sponsorWhy.map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">{item.title}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {item.items.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-700">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">Sponsorship opportunities</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">Support multiple teams with clear sponsor packages</h2>
        <p className="mt-4 text-sm leading-6 text-slate-600">Choose the right level of visibility for your business with main playing kit, back-of-shirt, coaches and training sponsorship options.</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
        {sponsorPackages.map((sponsor) => (
          <div key={sponsor.title} className="flex h-full flex-col rounded-3xl border border-sky-100 bg-sky-50 p-6 shadow-sm">
            <Icon name="heart" className="h-8 w-8 text-sky-700" />
            <h2 className="mt-5 text-xl font-black text-slate-950">{sponsor.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <p className="inline-flex rounded-full bg-blue-950 px-3 py-1 text-sm font-black text-white">{sponsor.price}</p>
              <p className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-black text-sky-700">{sponsor.availability}</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-700">{sponsor.detail}</p>
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <p className="font-black text-slate-950">Includes</p>
              <ul className="space-y-2 pl-5 list-disc">
                {sponsor.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <p className="font-black text-slate-950">Benefits</p>
              <ul className="space-y-2 pl-5 list-disc">
                {sponsor.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">Example sponsor styles</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">Branding that works on kit</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">Sponsor logos can be adapted depending on brand requirements and shirt colour. Examples include:</p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700 pl-5 list-disc">
            <li>White logo</li>
            <li>Black logo</li>
            <li>Full colour logo</li>
            <li>Stacked logo layout</li>
            <li>Text-only logo treatment</li>
          </ul>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">Community impact</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">Making a difference locally</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700 pl-5 list-disc">
            <li>Structured weekly activity</li>
            <li>Positive social environments</li>
            <li>Confidence and teamwork development</li>
            <li>Physical activity opportunities</li>
            <li>Safe and supportive coaching</li>
            <li>Routine, structure and community connection</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-4">
        {sponsorClubValues.map((value) => (
          <div key={value.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-950">{value.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700">{value.description}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">Social media & promotion</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">Reach the local community</h2>
        <p className="mt-4 text-sm leading-6 text-slate-600">Sponsors may receive exposure through club communication channels and local events.</p>
        <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
          {sponsorSocialPromo.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-700">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-12 max-w-7xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-700">Ready to support?</p>
        <p className="mt-3 text-base leading-7 text-slate-700">Contact the club to discuss sponsorship options, availability and brand placement for the season.</p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <SponsorInquiryForm sponsorEmail={SPONSOR_EMAIL} />
          <ButtonLink href="/Uphill_Juniors_Landscape_Sponsorship_Brochure.pdf" variant="light">View brochure</ButtonLink>
        </div>
      </div>
    </main>
  );
}
