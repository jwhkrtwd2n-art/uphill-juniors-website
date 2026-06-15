"use client";

import { useCallback, useState } from "react";

import { VOLUNTEER_EMAIL } from "../data/site";
import { AccessibleModal } from "./AccessibleModal";

type VolunteerInquiryFormProps = {
  buttonLabel?: string;
  buttonVariant?: "dark" | "sky" | "light";
};

const ROLE_OPTIONS = [
  "Coaching support",
  "Matchday help",
  "Admin help",
  "Fundraising",
  "Sponsorship support",
  "Event support",
  "Committee support",
  "Another role",
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  role: ROLE_OPTIONS[0],
  website: "",
};

export function VolunteerInquiryForm({
  buttonLabel = "Volunteer enquiry",
  buttonVariant = "dark",
}: VolunteerInquiryFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const openModal = useCallback(() => setIsOpen(true), []);
  const buttonClasses =
    buttonVariant === "light"
      ? "border border-slate-300 bg-white text-slate-950 hover:bg-slate-50"
      : buttonVariant === "sky"
        ? "bg-sky-600 text-white hover:bg-sky-700"
        : "bg-blue-950 text-white hover:bg-sky-700";

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/volunteer-inquiry", {
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

      setForm(emptyForm);
      setStatus("success");
    } catch {
      setError(
        `Unable to send the enquiry right now. Please email ${VOLUNTEER_EMAIL}.`
      );
      setStatus("error");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-black transition sm:w-auto ${buttonClasses}`}
      >
        {buttonLabel}
      </button>

      <AccessibleModal
        isOpen={isOpen}
        labelledBy="volunteer-enquiry-title"
        onClose={closeModal}
      >
        <form
          onSubmit={handleSubmit}
          className="my-auto w-full max-w-4xl space-y-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-700">
                Volunteer enquiry
              </p>
              <h2
                id="volunteer-enquiry-title"
                className="mt-2 text-3xl font-black text-slate-950"
              >
                Help Uphill Juniors
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tell us how you would like to help and the club will get in
                touch.
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-200"
              aria-label="Close volunteer enquiry form"
            >
              Close
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-bold text-slate-700">
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                maxLength={100}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="space-y-2 text-sm font-bold text-slate-700">
              Email address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                maxLength={254}
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
                autoComplete="tel"
                maxLength={30}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="space-y-2 text-sm font-bold text-slate-700">
              Role interested in
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
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

          <div aria-live="polite">
            {status === "success" ? (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                Your volunteer enquiry has been sent successfully.
              </p>
            ) : null}

            {status === "error" && error ? (
              <p
                className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700"
                role="alert"
              >
                {error}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-xs leading-5 text-slate-500">
              These details will only be used by the club to respond to your
              volunteer enquiry.
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {status === "sending" ? "Sending..." : "Send volunteer enquiry"}
            </button>
          </div>
        </form>
      </AccessibleModal>
    </div>
  );
}
