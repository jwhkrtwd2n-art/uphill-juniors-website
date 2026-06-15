"use client";

import { useCallback, useEffect, useState } from "react";

import { PLAY_EMAIL } from "../data/site";
import { AccessibleModal } from "./AccessibleModal";

const emptyForm = {
  parentName: "",
  childName: "",
  childDob: "",
  parentPhone: "",
  parentEmail: "",
  website: "",
};

export function PlayerInquiryForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const openModal = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#player-enquiry") {
        setIsOpen(true);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/player-inquiry", {
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
        `Unable to send the enquiry right now. Please email ${PLAY_EMAIL}.`
      );
      setStatus("error");
    }
  };

  return (
    <div id="player-enquiry">
      <button
        type="button"
        onClick={openModal}
        className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-700 sm:w-auto"
      >
        Player enquiry
      </button>

      <AccessibleModal
        isOpen={isOpen}
        labelledBy="player-enquiry-title"
        onClose={closeModal}
      >
        <form
          onSubmit={handleSubmit}
          className="my-auto w-full max-w-4xl space-y-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-700">
                Player enquiry
              </p>
              <h2
                id="player-enquiry-title"
                className="mt-2 text-3xl font-black text-slate-950"
              >
                Ask about joining Uphill Juniors
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Complete the form and the club will check availability for your
                child&apos;s age group.
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-200"
              aria-label="Close player enquiry form"
            >
              Close
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-bold text-slate-700">
              Parent or guardian name
              <input
                name="parentName"
                value={form.parentName}
                onChange={handleChange}
                autoComplete="name"
                maxLength={100}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="space-y-2 text-sm font-bold text-slate-700">
              Child&apos;s name
              <input
                name="childName"
                value={form.childName}
                onChange={handleChange}
                maxLength={100}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="space-y-2 text-sm font-bold text-slate-700">
              Child&apos;s date of birth
              <input
                type="date"
                name="childDob"
                value={form.childDob}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="space-y-2 text-sm font-bold text-slate-700">
              Parent or guardian phone number
              <input
                type="tel"
                name="parentPhone"
                value={form.parentPhone}
                onChange={handleChange}
                autoComplete="tel"
                maxLength={30}
                required
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

          <label className="block space-y-2 text-sm font-bold text-slate-700">
            Parent or guardian email address
            <input
              type="email"
              name="parentEmail"
              value={form.parentEmail}
              onChange={handleChange}
              autoComplete="email"
              maxLength={254}
              required
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <div aria-live="polite">
            {status === "success" ? (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                Your player enquiry has been sent successfully.
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
              These details will only be used by the club to respond to this
              player enquiry and check the appropriate age group.
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {status === "sending" ? "Sending..." : "Send player enquiry"}
            </button>
          </div>
        </form>
      </AccessibleModal>
    </div>
  );
}
