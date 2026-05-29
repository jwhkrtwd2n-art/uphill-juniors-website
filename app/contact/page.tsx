import { ButtonLink } from "../../components/ButtonLink";
import { SectionHeading } from "../../components/SectionHeading";
import { INFO_EMAIL, SPONSOR_EMAIL } from "../../data/site";

export default function ContactPage() {
  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Contact & Volunteers" title="Support the club off the pitch" text="We are not actively recruiting players while many age groups are oversubscribed, but adult volunteers and sponsors are always welcome." />
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">Volunteers</p>
          <h1 className="mt-3 text-3xl font-black">Adult volunteers are always welcome</h1>
          <p className="mt-4 text-sm leading-6 text-slate-300">Coaching help, matchday support, admin, fundraising, sponsorship support and committee assistance all make a real difference.</p>
          <div className="mt-6"><ButtonLink href={`mailto:${INFO_EMAIL}?subject=Volunteering%20with%20Uphill%20Juniors%20FC`} variant="sky">Ask about volunteering</ButtonLink></div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-700">Sponsorship</p>
          <h1 className="mt-3 text-3xl font-black text-slate-950">Sponsor enquiry</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">We can discuss shirt sponsorship, training wear, coach kit, social media mentions and wider community partnership options.</p>
          <div className="mt-6"><ButtonLink href={`mailto:${SPONSOR_EMAIL}?subject=Sponsorship%20Enquiry%20-%20Uphill%20Juniors%20FC`}>Send sponsor enquiry</ButtonLink></div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl rounded-3xl bg-sky-50 p-6 text-center">
        <p className="font-black text-slate-950">Email: <a className="text-sky-700 underline" href={`mailto:${INFO_EMAIL}`}>{INFO_EMAIL}</a></p>
      </div>
    </main>
  );
}
