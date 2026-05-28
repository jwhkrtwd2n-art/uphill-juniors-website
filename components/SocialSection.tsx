import { FACEBOOK_URL, INSTAGRAM_URL } from "../data/site";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";
import { SectionHeading } from "./SectionHeading";

export function SocialSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Social feeds"
        title="Follow matchdays and club life"
        text="Keep up with club updates, photos, matchdays and community news through our social channels."
      />

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="instagram" className="h-7 w-7 text-sky-700" />
              <h2 className="text-2xl font-black">Instagram</h2>
            </div>

            <ButtonLink href={INSTAGRAM_URL} variant="light">
              Open
            </ButtonLink>
          </div>

          <div className="flex h-[600px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-sky-50 to-slate-100 p-8 text-center">
            <Icon name="camera" className="h-12 w-12 text-sky-700" />

            <h3 className="mt-4 text-xl font-black text-slate-950">
              Follow us on Instagram
            </h3>

            <p className="mt-3 max-w-sm text-sm text-slate-600">
              Match photos, tournament days, training sessions, club news and everything happening around Uphill Juniors FC.
            </p>

            <a
              href="https://www.instagram.com/uphill_juniors_fc"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 rounded-full bg-sky-700 px-6 py-3 font-bold text-white transition hover:bg-sky-800"
            >
              @uphill_juniors_fc
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="facebook" className="h-7 w-7 text-sky-700" />
              <h2 className="text-2xl font-black">Facebook</h2>
            </div>

            <ButtonLink href={FACEBOOK_URL} variant="light">
              Open
            </ButtonLink>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <iframe
              title="Uphill Juniors FC Facebook feed"
src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FUphillJuniorsFC&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"              width="100%"
              height="600"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </div>
      </div>
    </section>
  );
}