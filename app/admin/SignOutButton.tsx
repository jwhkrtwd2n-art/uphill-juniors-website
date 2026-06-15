"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="mt-6 rounded-full bg-blue-950 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-700"
    >
      Sign out
    </button>
  );
}
