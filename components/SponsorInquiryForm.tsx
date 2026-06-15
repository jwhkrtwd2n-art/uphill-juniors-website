"use client";

import { useCallback, useState } from "react";
import type { AvailableSponsorTeamsByPackage } from "../lib/sponsor-availability";
import {
  CLUB_WIDE_OPTIONS,
  MAIN_BACK_TEAM_OPTIONS,
  PACKAGE_OPTIONS,
  TRAINING_TEAM_OPTIONS,
  getPackageCodeFromLabel,
  getPackageFromCode,
  isTeamSponsorPackageCode,
} from "../lib/sponsor-packages";
import { AccessibleModal } from "./AccessibleModal";

type SponsorInquiryFormProps = {
  sponsorEmail: string;
  initialPackage?: string;
  initialTeam?: string;
  autoOpen?: boolean;
  availableTeamsByPackage?: Partial<AvailableSponsorTeamsByPackage>;
  buttonLabel?: string;
  buttonVariant?: "dark" | "sky" | "light" | "available";
  className?: string;
};

function getPackageOptions(
  availableTeamsByPackage?: Partial<AvailableSponsorTeamsByPackage>
) {
  return PACKAGE_OPTIONS.filter((option) => {
    if (isTeamSponsorPackageCode(option.code)) {
      const availableTeams = availableTeamsByPackage?.[option.code];
      return !availableTeams || availableTeams.length > 0;
    }

    return true;
  }).map((option) => option.label);
}

function getTeamOptions(
  selectedPackage: string,
  availableTeamsByPackage?: Partial<AvailableSponsorTeamsByPackage>
) {
  const packageCode = getPackageCodeFromLabel(selectedPackage);

  if (packageCode === "coaches") return CLUB_WIDE_OPTIONS;

  if (packageCode === "main" || packageCode === "back") {
    const availableTeams = availableTeamsByPackage?.[packageCode];
    if (availableTeams) return availableTeams;
    return MAIN_BACK_TEAM_OPTIONS;
  }

  if (packageCode === "training") {
    const availableTeams = availableTeamsByPackage?.training;
    if (availableTeams) return availableTeams;
    return TRAINING_TEAM_OPTIONS;
  }

  return CLUB_WIDE_OPTIONS;
}

function getInitialTeam(
  selectedPackage: string,
  initialTeam?: string,
  availableTeamsByPackage?: Partial<AvailableSponsorTeamsByPackage>
) {
  const options = getTeamOptions(selectedPackage, availableTeamsByPackage);
  return initialTeam && options.includes(initialTeam) ? initialTeam : options[0];
}

function shouldShowTeam(selectedPackage: string) {
  return isTeamSponsorPackageCode(getPackageCodeFromLabel(selectedPackage));
}

export function SponsorInquiryForm({
  sponsorEmail,
  initialPackage,
  initialTeam,
  autoOpen = false,
  availableTeamsByPackage,
  buttonLabel = "Sponsor enquiry",
  buttonVariant = "sky",
  className = "",
}: SponsorInquiryFormProps) {
  const availablePackageOptions = getPackageOptions(availableTeamsByPackage);
  const requestedPackage = getPackageFromCode(initialPackage);
  const startingPackage = availablePackageOptions.includes(requestedPackage)
    ? requestedPackage
    : availablePackageOptions[0];
  const startingTeam = getInitialTeam(
    startingPackage,
    initialTeam,
    availableTeamsByPackage
  );

  const [isOpen, setIsOpen] = useState(autoOpen);
  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    package: startingPackage,
    team: startingTeam,
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const openModal = useCallback(() => setIsOpen(true), []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "package") {
      setForm((current) => ({
        ...current,
        package: value,
        team: getTeamOptions(value, availableTeamsByPackage)[0],
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
        website: "",
      });
    } catch {
      setError(`Unable to send the enquiry right now. Please email ${sponsorEmail}.`);
      setStatus("error");
    }
  };

  const availableTeamOptions = getTeamOptions(
    form.package,
    availableTeamsByPackage
  );
  const showTeam = shouldShowTeam(form.package);
  const buttonClasses =
    buttonVariant === "light"
      ? "border border-slate-300 bg-white text-slate-950 hover:bg-slate-50"
      : buttonVariant === "dark"
        ? "bg-blue-950 text-white hover:bg-sky-700"
        : buttonVariant === "available"
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-sky-600 text-white hover:bg-sky-700";

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-black transition sm:w-auto ${buttonClasses} ${className}`}
      >
        {buttonLabel}
      </button>

      <AccessibleModal
        isOpen={isOpen}
        labelledBy="sponsor-enquiry-title"
        onClose={closeModal}
        zIndexClassName="z-[60]"
      >
        <form
          onSubmit={handleSubmit}
          className="my-auto w-full max-w-4xl space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
        >
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
                Tell us about your business and the sponsorship opportunity you
                are interested in.
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
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

          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
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
                {availablePackageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
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
                    <option key={option} value={option}>
                      {option}
                    </option>
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

          <div className="space-y-3" aria-live="polite">
            {status === "success" && (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                Your enquiry has been sent successfully.
              </p>
            )}

            {status === "error" && error && (
              <p
                className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700"
                role="alert"
              >
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-slate-600">
                This will submit your enquiry directly to the club without
                opening an email app.
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
      </AccessibleModal>
    </div>
  );
}
