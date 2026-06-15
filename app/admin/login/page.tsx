import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { isSupabaseConfigured } from "../../../lib/supabase/config";
import { createClient } from "../../../lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-black text-slate-950">
          Admin setup required
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          Add the Supabase environment variables and run the setup SQL before
          using the members area.
        </p>
      </main>
    );
  }

  const supabase = createClient();
  const { data } = await supabase!.auth.getUser();
  if (data.user) {
    const { data: admin } = await supabase!
      .from("admins")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (admin) redirect("/admin");
    redirect("/admin/unauthorised");
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-700">
        Members area
      </p>
      <h1 className="mt-2 text-4xl font-black text-slate-950">Admin sign in</h1>
      <p className="mb-8 mt-3 leading-7 text-slate-600">
        Sign in with an approved club administrator account.
      </p>
      <LoginForm />
    </main>
  );
}
