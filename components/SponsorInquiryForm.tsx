"use client";

import { useState } from "react";

type SponsorInquiryFormProps = {
  sponsorEmail: string;
  initialPackage?: string;
  initialTeam?: string;
  autoOpen?: boolean;
};

const PACKAGE_OPTIONS = [
  "Main Playing Kit Sponsor - £750",
  "Training Top Sponsor - £500",
  "Back of Shirt Sponsor - £300",
  "Coaches Kit Sponsor - £600",
  "General sponsorship enquiry",
];

const MAIN_BACK_TEAM_OPTIONS = [
  "U16s",
  "U15s",
  "U13s",
  "U11s",
  "U09s",
  "U08s",
  "U07s",
];

const TRAINING_TEAM_OPTIONS = [
  "U16s",
  "U15s",
  "U13s",
  "U11s",
  "U09s",
  "U08s",
  "U07s",
  "U06s",
];

const CLUB_WIDE_OPTIONS = ["Club-wide / not team specific"];

function getPackageFromCode(packageCode?: string) {
  if (packageCode === "main") return "Main Playing Kit Sponsor - £750";
  if (packageCode === "training") return "Training Top Sponsor - £500";
  if (packageCode === "back") return "Back of Shirt Sponsor - £300";
  if (packageCode === "coaches") return "Coaches Kit Sponsor - £600";
  return "General sponsorship enquiry";
}

function getTeamOptions(selectedPackage: string) {
  if (selectedPackage.startsWith("Coaches Kit Sponsor")) return CLUB_WIDE_OPTIONS;

  if (
    selectedPackage.startsWith("Main Playing Kit Sponsor") ||
    selectedPackage.startsWith("Back of Shirt Sponsor")
  ) {
    return MAIN_BACK_TEAM_OPTIONS;
  }

  if (selectedPackage.startsWith("Training Top Sponsor")) {
    return TRAINING_TEAM_OPTIONS;
  }

  return CLUB_WIDE_OPTIONS;
}

function getInitialTeam(selectedPackage: string, initialTeam?: string) {
  const options = getTeamOptions(selectedPackage);
  return initialTeam && options.includes(initialTeam) ? initialTeam : options[0];
}

function shouldShowTeam(selectedPackage: string) {
  return !(
    selectedPackage.startsWith("Coaches Kit Sponsor") ||
    selectedPackage.startsWith("General sponsorship")
  );
}

export function SponsorInquiryForm({
  sponsorEmail,
  initialPackage,
  initialTeam,
  autoOpen = false,
}: SponsorInquiryFormProps) {
  const startingPackage = getPackageFromCode(initialPackage);
  const startingTeam = getInitialTeam(startingPackage, initialTeam);

  const [isOpen, setIsOpen] = useState(autoOpen);
  const [form, setForm] = useState({
    name: "",
    business: "",
    package: startingPackage,
    team: startingTeam,
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === "package") {
      setForm((current) => ({
        ...current,
        package: value,
        team: getTeamOptions(value)[0],
      }));
      return;
    }

    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/sponsor-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data?.error || `Request failed with status ${response.status}`);
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({
        name: "",
        business: "",
        package: startingPackage,
        team: startingTeam,
        message: "",
      });
    } catch {
      setError(`Unable to send the enquiry right now. Please email ${sponsorEmail}.`);
      setStatus("error");
    }
  };

  const availableTeamOptions = getTeamOptions(form.package);
  const showTeam = shouldShowTeam(form.package);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-700 sm:w-auto"
      >
        {isOpen ? "Close sponsor enquiry" : "Send sponsor enquiry"}
      </button>

      {isOpen ? (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-bold text-slate-700">
              Your name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="space-y-2 text-sm font-bold text-slate-700">
              Business name
              <input
                name="business"
                value={form.business}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </label>
          </div>

          <div className={showTeam ? "grid gap-4 sm:grid-cols-2" : "grid gap-4"}>
            <label className="space-y-2 text-sm font-bold text-slate-700">
              Sponsorship type
              <select
                name="package"
                value={form.package}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                {PACKAGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>

            {showTeam ? (
              <label className="space-y-2 text-sm font-bold text-slate-700">
                Team / age group
                <select
                  name="team"
                  value={form.team}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  {availableTeamOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>

          <label className="space-y-2 text-sm font-bold text-slate-700">
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <div className="space-y-3">
            {status === "success" && (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                Your enquiry has been sent successfully.
              </p>
            )}

            {status === "error" && error && (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-slate-600">
                This will submit your enquiry directly to the club without opening an email app.
              </p>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {status === "sending" ? "Sending…" : "Send enquiry"}
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
}