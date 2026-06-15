import type { Metadata } from "next";
import { PlayerInquiryForm } from "../../components/PlayerInquiryForm";
import { SectionHeading } from "../../components/SectionHeading";
import { SponsorInquiryForm } from "../../components/SponsorInquiryForm";
import { VolunteerInquiryForm } from "../../components/VolunteerInquiryForm";
import { INFO_EMAIL, SPONSOR_EMAIL } from "../../data/site";
import {
  getAvailableSponsorTeamsByPackage,
  getSponsorSlots,
} from "../../lib/sponsors";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Uphill Juniors FC about player enquiries, volunteering, sponsorship and general club questions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Uphill Juniors FC",
    description:
      "Get in touch about joining, volunteering, sponsorship or general club enquiries.",
    url: "/contact",
  },
};

export default async function ContactPage() {
  const availableTeamsByPackage = getAvailableSponsorTeamsByPackage(
    await getSponsorSlots()
  );

  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch with Uphill Juniors FC"
        text="Choose the right enquiry route and we will make sure your message reaches the right person at the club."
      />

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] bg-blue-950 p-8 text-white shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">
            Players
          </p>
          <h2 className="mt-3 text-3xl font-black">Ask about joining</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            For age group availability, waiting lists and player enquiries,
            send the club a message with your child's age group.
          </p>
          <div className="mt-6">
            <PlayerInquiryForm />
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-700">
            Volunteers
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            Help off the pitch
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Coaching help, matchday support, admin, fundraising and committee
            assistance all make a real difference.
          </p>
          <div className="mt-6">
            <VolunteerInquiryForm />
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-sky-50 p-8 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-700">
            Sponsorship
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            Support the club
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Discuss shirt sponsorship, training wear, coach kit, social media
            mentions and wider community partnership options.
          </p>
          <div className="mt-6">
            <SponsorInquiryForm
              sponsorEmail={SPONSOR_EMAIL}
              availableTeamsByPackage={availableTeamsByPackage}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl rounded-3xl bg-sky-50 p-6 text-center">
        <p className="font-black text-slate-950">
          Email:{" "}
          <a className="text-sky-700 underline" href={`mailto:${INFO_EMAIL}`}>
            {INFO_EMAIL}
          </a>
        </p>
      </div>
    </main>
  );
}
