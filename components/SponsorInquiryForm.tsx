"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

type SponsorInquiryFormProps = {
  sponsorEmail: string;
  initialPackage?: string;
  initialTeam?: string;
  autoOpen?: boolean;
  buttonLabel?: string;
  buttonVariant?: "dark" | "sky" | "light" | "available";
  className?: string;
};

const PACKAGE_OPTIONS = [
  "Main Playing Kit Sponsor - GBP 650",
  "Training Top Sponsor - GBP 500",
  "Back of Shirt Sponsor - GBP 300",
  "Coaches Kit Sponsor - GBP 600",
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
  if (packageCode === "main") return "Main Playing Kit Sponsor - GBP 650";
  if (packageCode === "training") return "Training Top Sponsor - GBP 500";
  if (packageCode === "back") return "Back of Shirt Sponsor - GBP 300";
  if (packageCode === "coaches") return "Coaches Kit Sponsor - GBP 600";
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
  buttonLabel = "Sponsor enquiry",
  buttonVariant = "sky",
  className = "",
}: SponsorInquiryFormProps) {
  const startingPackage = getPackageFromCode(initialPackage);
  const startingTeam = getInitialTeam(startingPackage, initialTeam);

  const [isOpen, setIsOpen] = useState(autoOpen);
  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
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
  email: "",
  phone: "",
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
  const buttonClasses =
    buttonVariant === "light"
      ? "border border-slate-300 bg-white text-slate-950 hover:bg-slate-50"
      : buttonVariant === "dark"
        ? "bg-blue-950 text-white hover:bg-sky-700"
        : buttonVariant === "available"
          ? "bg-green-100 text-green-700 hover:bg-green-200"
        : "bg-sky-600 text-white hover:bg-sky-700";
  const modal = isOpen ? (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-blue-950/80 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sponsor-enquiry-title"
    >
      <form onSubmit={handleSubmit} className="my-auto w-full max-w-4xl space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-700">
              Sponsor enquiry
            </p>
            <h2
              id="sponsor-enquiry-title"
              className="mt-2 text-3xl font-black text-slate-950"
            >
              Partner with Uphill Juniors
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Tell us about your business and the sponsorship opportunity
              you are interested in.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-200"
            aria-label="Close sponsor enquiry form"
          >
            Close
          </button>
        </div>

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
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-bold text-slate-700">
            Email address
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="space-y-2 text-sm font-bold text-slate-700">
            Phone number
            <input
              type="tel"
              name="phone"
              value={form.phone}
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
              {status === "sending" ? "Sending..." : "Send enquiry"}
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-black transition sm:w-auto ${buttonClasses} ${className}`}
      >
        {buttonLabel}
      </button>

      {modal && typeof document !== "undefined"
        ? createPortal(modal, document.body)
        : null}
    </div>
  );
}
