import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { getSponsorSlotsWithStatus } from "../../lib/sponsors";
import { SponsorSlotEditor } from "./SponsorSlotEditor";

export const dynamic = "force-dynamic";

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

  const sponsorSlots = await getSponsorSlotsWithStatus();

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
            dataWarning={sponsorSlots.errorMessage}
            needsLogoScaleMigration={sponsorSlots.needsLogoScaleMigration}
            slots={sponsorSlots.slots}
          />
        </div>
      </div>
    </main>
  );
}
