import Image from "next/image";
import { ButtonLink } from "../../components/ButtonLink";
import { Icon } from "../../components/Icon";
import { SectionHeading } from "../../components/SectionHeading";
import { CLUB_EMAIL } from "../../data/site";
import { sponsorBenefits, sponsorPackages, sponsorShowcase } from "../../data/sponsors";

export default function SponsorsPage() {
  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Sponsors" title="See your brand. Support our community." text="Sponsorship helps fund kit, training equipment, coach development and affordable football for local families. We welcome enquiries from local businesses that want visible community impact." />

      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-2xl">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-white p-4 sm:p-6">
            <a href="/sponsor-mockups.png" target="_blank" rel="noreferrer noopener" className="block w-full transition hover:scale-[1.01]">
              <Image src="/sponsor-mockups.png" alt="Uphill Juniors FC sponsor mockups" width={1600} height={1000} className="w-full rounded-3xl border border-slate-200 object-cover shadow-sm" />
            </a>
          </div>
          <div className="flex flex-col justify-center p-8 text-white sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">Sponsorship 2026/27</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">Partner with Uphill Juniors FC</h1>
            <p className="mt-5 text-base leading-7 text-slate-300">Our sponsorship packages give local businesses clear visibility while directly supporting children, families and volunteer-led grassroots football.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ButtonLink href={`mailto:${CLUB_EMAIL}?subject=Sponsorship%20Enquiry%20-%20Uphill%20Juniors%20FC`} variant="sky">Send sponsor enquiry</ButtonLink>
              <ButtonLink href="/Uphill_Juniors_Landscape_Sponsorship_Brochure.pdf" variant="light">View brochure</ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
        {sponsorPackages.map((sponsor) => (
          <div key={sponsor.title} className="rounded-3xl border border-sky-100 bg-sky-50 p-6 shadow-sm">
            <Icon name="heart" className="h-8 w-8 text-sky-700" />
            <h2 className="mt-5 text-xl font-black text-slate-950">{sponsor.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <p className="inline-flex rounded-full bg-slate-950 px-3 py-1 text-sm font-black text-white">{sponsor.price}</p>
              <p className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-black text-sky-700">{sponsor.availability}</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-700">{sponsor.detail}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">Why sponsor us?</p>
          <h2 className="mt-3 text-3xl font-black">Local visibility with real impact</h2>
          <div className="mt-6 grid gap-3">
            {sponsorBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-white/5 p-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-400 text-xs font-black text-slate-950">✓</span>
                <p className="text-sm leading-6 text-slate-200">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-700">Sponsor downloads</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">Send the pack to potential sponsors</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">Use the polished brochure for email and web enquiries, and the printable pack for meetings, local businesses and committee use.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/Uphill_Juniors_Landscape_Sponsorship_Brochure.pdf">Landscape brochure</ButtonLink>
            <ButtonLink href="/Uphill_Juniors_Printable_Sponsorship_Pack.pdf" variant="light">Printable pack</ButtonLink>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl">
        <h2 className="mb-5 text-center text-2xl font-black text-slate-950">Sponsor showcase</h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-6 text-slate-600">New sponsors for next season can be featured here with their logo, package type and link to their business.</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {sponsorShowcase.map((sponsor) => (
            <div key={`${sponsor.name}-${sponsor.type}`} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-dashed border-sky-200 bg-sky-50 text-xs font-black text-sky-700">Logo</div>
              <h3 className="text-lg font-black text-slate-950">{sponsor.name}</h3>
              <p className="mt-2 text-sm font-bold text-sky-700">{sponsor.type}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{sponsor.note}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
