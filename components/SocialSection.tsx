import { FACEBOOK_URL, INSTAGRAM_URL } from "../data/site";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";
import { SectionHeading } from "./SectionHeading";

export function SocialSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Social feeds" title="Follow matchdays and club life" text="Live feed blocks are ready for Instagram and Facebook embeds when the site is connected." />
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3"><Icon name="instagram" className="h-7 w-7 text-sky-700" /><h2 className="text-2xl font-black">Instagram</h2></div>
            <ButtonLink href={INSTAGRAM_URL} variant="light">Open</ButtonLink>
          </div>
          <div className="flex h-80 items-center justify-center rounded-3xl border-2 border-dashed border-sky-200 bg-sky-50 p-8 text-center">
            <div><Icon name="camera" className="mx-auto h-10 w-10 text-sky-700" /><p className="mt-4 font-black text-slate-950">Embedded Instagram feed placeholder</p><p className="mt-2 text-sm text-slate-600">Connect @uphill_juniors_fc using an approved Instagram embed/feed provider.</p></div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3"><Icon name="facebook" className="h-7 w-7 text-sky-700" /><h2 className="text-2xl font-black">Facebook</h2></div>
            <ButtonLink href={FACEBOOK_URL} variant="light">Open</ButtonLink>
          </div>
          <div className="flex h-80 items-center justify-center rounded-3xl border-2 border-dashed border-sky-200 bg-sky-50 p-8 text-center">
            <div><Icon name="megaphone" className="mx-auto h-10 w-10 text-sky-700" /><p className="mt-4 font-black text-slate-950">Embedded Facebook feed placeholder</p><p className="mt-2 text-sm text-slate-600">Connect the Uphill Juniors FC Facebook page using Meta page plugin or feed widget.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
