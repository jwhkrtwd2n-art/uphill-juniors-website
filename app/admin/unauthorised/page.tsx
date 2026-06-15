import { SignOutButton } from "../SignOutButton";

export default function UnauthorisedPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-rose-700">
        Access denied
      </p>
      <h1 className="mt-2 text-4xl font-black text-slate-950">
        This account is not an administrator
      </h1>
      <p className="mt-4 leading-7 text-slate-600">
        Ask an existing administrator to add this account to the approved
        administrators list.
      </p>
      <SignOutButton />
    </main>
  );
}
