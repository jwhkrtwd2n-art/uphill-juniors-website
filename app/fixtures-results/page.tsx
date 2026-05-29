import { FAFullTimeFeeds } from "../../components/FAFullTimeFeeds";
import { SectionHeading } from "../../components/SectionHeading";

export default function FixturesResultsPage() {
  return (
    <main className="bg-blue-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Fixtures & Results" title="FA Full-Time fixtures and results" text="Public fixture and result data is supplied by FA Full-Time. Spond remains the place for internal team communication, availability and last-minute updates." light />
      <FAFullTimeFeeds />
      <div className="mx-auto mt-8 max-w-5xl rounded-[2rem] border border-sky-300/20 bg-sky-300/10 p-6 text-center">
        <p className="text-sm leading-6 text-slate-200">Members should continue to check Spond for confirmed meet times, availability, venue changes and private team messages. The website should only display public FA fixture and result information.</p>
      </div>
    </main>
  );
}
