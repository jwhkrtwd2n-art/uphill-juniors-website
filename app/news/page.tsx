import type { Metadata } from "next";
import { Icon } from "../../components/Icon";
import { SectionHeading } from "../../components/SectionHeading";
import { news } from "../../data/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Read the latest Uphill Juniors FC club updates, announcements, sponsor news and community stories.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "News | Uphill Juniors FC",
    description:
      "Latest club updates, announcements and community news from Uphill Juniors FC.",
    url: "/news",
  },
};

export default function NewsPage() {
  return (
    <main className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="News" title="Latest club updates" text="A simple news area for announcements, match reports, coach updates and sponsor thank-yous." />
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {news.map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Icon name="megaphone" className="h-8 w-8 text-sky-700" />
            <h2 className="mt-5 text-xl font-black text-slate-950">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
