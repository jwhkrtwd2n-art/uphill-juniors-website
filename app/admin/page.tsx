import { redirect } from "next/navigation";
import { teams } from "../../data/teams";
import { createClient } from "../../lib/supabase/server";
import type { SponsorSlotRow } from "../../lib/sponsors";
import { SponsorSlotEditor } from "./SponsorSlotEditor";

export const dynamic = "force-dynamic";

function fallbackSlots(): SponsorSlotRow[] {
  return teams.flatMap((team) =>
    team.sponsorOpportunities.map((opportunity) => ({
      team_name: team.name,
      package_code: opportunity.package,
      label: opportunity.label,
      sponsor_name: opportunity.sponsor?.name ?? null,
      sponsor_url: opportunity.sponsor?.href ?? null,
      logo_url: opportunity.sponsor?.logo ?? null,
      logo_scale: opportunity.sponsor?.logoScale ?? 100,
    }))
  );
}

export default async function AdminPage() {
  const supabase = createClient();
  if (!supabase) redirect("/admin/login");

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", auth.user.id)
    .maybeSingle();

  if (!admin) {
    redirect("/admin/unauthorised");
  }

  const result = await supabase
    .from("sponsor_slots")
    .select("team_name, package_code, label, sponsor_name, sponsor_url, logo_url, logo_scale")
    .order("team_name", { ascending: false })
    .order("package_code");
  let slots = result.data as SponsorSlotRow[] | null;
  const needsLogoScaleMigration = result.error?.message.includes("logo_scale") ?? false;

  if (needsLogoScaleMigration) {
    const { data } = await supabase
      .from("sponsor_slots")
      .select("team_name, package_code, label, sponsor_name, sponsor_url, logo_url")
      .order("team_name", { ascending: false })
      .order("package_code");

    slots =
      data?.map((slot) => ({ ...slot, logo_scale: 100 })) as SponsorSlotRow[] | null;
  }

  return (
    <main className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-700">
          Members area
        </p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">
          Team sponsor management
        </h1>
        <div className="mt-8">
          <SponsorSlotEditor
            needsLogoScaleMigration={needsLogoScaleMigration}
            slots={slots ?? fallbackSlots()}
          />
        </div>
      </div>
    </main>
  );
}
