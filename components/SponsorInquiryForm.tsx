"use client";

import { useState } from "react";

type SponsorInquiryFormProps = {
  sponsorEmail: string;
};

const PACKAGE_OPTIONS = [
  "Main Playing Kit Sponsor",
  "Back of Shirt Sponsor",
  "Coaches Sponsor",
  "Training Sponsor",
  "General sponsorship enquiry",
];

export function SponsorInquiryForm({ sponsorEmail }: SponsorInquiryFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    package: PACKAGE_OPTIONS[0],
    message: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/sponsor-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          business: form.business,
          package: form.package,
          message: form.message,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data?.error || `Request failed with status ${response.status}`);
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", business: "", package: PACKAGE_OPTIONS[0], message: "" });
    } catch (err) {
      setError("Unable to send the enquiry right now. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-700 sm:w-auto"
      >
        Send sponsor enquiry
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

          <label className="space-y-2 text-sm font-bold text-slate-700">
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>

          <div className="space-y-3">
            {status === "success" ? (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">Your enquiry has been sent successfully.</p>
            ) : null}
            {status === "error" && error ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-slate-600">This will submit your enquiry directly to the club without opening an email app.</p>
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
