"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import type { SponsorSlotRow } from "../../lib/sponsors";

type Props = {
  slots: SponsorSlotRow[];
  dataWarning?: string;
  needsLogoScaleMigration?: boolean;
};

type Preview = {
  logoUrl: string;
  logoScale: number;
};

function safeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
}

function getSlotKey(slot: SponsorSlotRow) {
  return `${slot.team_name}-${slot.package_code}`;
}

function clampLogoScale(value: FormDataEntryValue | null) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 100;
  return Math.min(150, Math.max(50, Math.round(parsed)));
}

export function SponsorSlotEditor({
  slots,
  dataWarning,
  needsLogoScaleMigration = false,
}: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState("");
  const [message, setMessage] = useState("");
  const [previews, setPreviews] = useState<Record<string, Preview>>({});

  async function saveSlot(event: React.FormEvent<HTMLFormElement>, slot: SponsorSlotRow) {
    event.preventDefault();
    const slotKey = getSlotKey(slot);
    setSaving(slotKey);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const supabase = createClient();
    const file = form.get("logo") as File;
    let logoUrl = String(form.get("current_logo_url") || "");
    const logoScale = clampLogoScale(form.get("logo_scale"));
    const sponsorName = String(form.get("sponsor_name") || "").trim();
    const sponsorUrl = String(form.get("sponsor_url") || "").trim();

    if (file?.size) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage("Sponsor logos must be smaller than 2 MB.");
        setSaving("");
        return;
      }

      const path = `${slot.team_name}/${slot.package_code}-${Date.now()}-${safeFileName(file.name)}`;
      const upload = await supabase.storage
        .from("sponsor-logos")
        .upload(path, file, { upsert: false });

      if (upload.error) {
        setMessage(upload.error.message);
        setSaving("");
        return;
      }

      logoUrl = supabase.storage.from("sponsor-logos").getPublicUrl(path).data.publicUrl;
    }

    const hasAnySponsorDetail = Boolean(sponsorName || sponsorUrl || logoUrl);
    const hasAllSponsorDetails = Boolean(sponsorName && sponsorUrl && logoUrl);

    if (hasAnySponsorDetail && !hasAllSponsorDetails) {
      setMessage(
        "Please provide sponsor name, website and logo before saving a sold slot. To make it available, remove all sponsor details."
      );
      setSaving("");
      return;
    }

    const payload = {
      team_name: slot.team_name,
      package_code: slot.package_code,
      label: slot.label,
      sponsor_name: sponsorName || null,
      sponsor_url: sponsorUrl || null,
      logo_url: logoUrl || null,
      logo_scale: logoScale,
    };

    let result = await supabase.from("sponsor_slots").upsert(payload);

    if (result.error?.message.includes("logo_scale")) {
      const { logo_scale: _logoScale, ...payloadWithoutScale } = payload;
      result = await supabase.from("sponsor_slots").upsert(payloadWithoutScale);
    }

    setSaving("");
    setMessage(
      result.error
        ? result.error.message
        : needsLogoScaleMigration
          ? "Sponsor slot saved. Run the logo_scale SQL migration before scale changes can be saved."
          : "Sponsor slot saved."
    );
    if (!result.error) router.refresh();
  }

  async function clearSlot(slot: SponsorSlotRow) {
    const slotKey = getSlotKey(slot);
    setSaving(slotKey);
    const supabase = createClient();
    let result = await supabase
      .from("sponsor_slots")
      .update({
        sponsor_name: null,
        sponsor_url: null,
        logo_url: null,
        logo_scale: 100,
      })
      .eq("team_name", slot.team_name)
      .eq("package_code", slot.package_code);

    if (result.error?.message.includes("logo_scale")) {
      result = await supabase
        .from("sponsor_slots")
        .update({
          sponsor_name: null,
          sponsor_url: null,
          logo_url: null,
        })
        .eq("team_name", slot.team_name)
        .eq("package_code", slot.package_code);
    }

    setSaving("");
    setMessage(result.error ? result.error.message : "Sponsor removed. The slot is available again.");
    if (!result.error) {
      setPreviews((current) => {
        const next = { ...current };
        delete next[slotKey];
        return next;
      });
      router.refresh();
    }
  }

  async function signOut() {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-bold text-slate-600">
          Update a sponsor, upload its logo, then save the slot.
        </p>
        <button
          type="button"
          onClick={signOut}
          className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-black text-slate-800 hover:bg-slate-50"
        >
          Sign out
        </button>
      </div>

      {message ? (
        <p className="mb-6 rounded-2xl bg-sky-50 px-4 py-3 text-sm font-bold text-sky-800">
          {message}
        </p>
      ) : null}

      {dataWarning ? (
        <p className="mb-6 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
          Supabase warning: {dataWarning}
        </p>
      ) : null}

      {needsLogoScaleMigration ? (
        <p className="mb-6 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
          Logo preview works, but saving scale needs the Supabase logo_scale
          migration to be run.
        </p>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        {slots.map((slot) => {
          const key = getSlotKey(slot);
          const preview = previews[key];
          const previewLogoUrl = preview?.logoUrl ?? slot.logo_url;
          const previewLogoScale = preview?.logoScale ?? slot.logo_scale ?? 100;
          return (
            <form
              key={key}
              onSubmit={(event) => saveSlot(event, slot)}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-sky-700">
                    {slot.team_name}
                  </p>
                  <h2 className="mt-1 text-xl font-black text-slate-950">{slot.label}</h2>
                </div>
                {previewLogoUrl ? (
                  <div className="relative flex h-12 w-28 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewLogoUrl}
                      alt=""
                      className="max-h-8 max-w-full object-contain"
                      style={{ transform: `scale(${previewLogoScale / 100})` }}
                    />
                  </div>
                ) : (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
                    Available
                  </span>
                )}
              </div>

              <input type="hidden" name="current_logo_url" value={slot.logo_url ?? ""} />
              <div className="space-y-4">
                <label className="block space-y-2 text-sm font-bold text-slate-700">
                  Sponsor name
                  <input name="sponsor_name" defaultValue={slot.sponsor_name ?? ""} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500" />
                </label>
                <label className="block space-y-2 text-sm font-bold text-slate-700">
                  Sponsor website
                  <input name="sponsor_url" type="url" defaultValue={slot.sponsor_url ?? ""} placeholder="https://" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500" />
                </label>
                <label className="block space-y-2 text-sm font-bold text-slate-700">
                  Sponsor logo
                  <input
                    name="logo"
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      if (!file) return;
                      setPreviews((current) => ({
                        ...current,
                        [key]: {
                          logoUrl: URL.createObjectURL(file),
                          logoScale: previewLogoScale,
                        },
                      }));
                    }}
                    className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-sky-100 file:px-4 file:py-2 file:font-black file:text-sky-700"
                  />
                </label>
                <label className="block space-y-2 text-sm font-bold text-slate-700">
                  Logo scale: {previewLogoScale}%
                  <input
                    name="logo_scale"
                    type="range"
                    min="50"
                    max="150"
                    step="5"
                    defaultValue={previewLogoScale}
                    onChange={(event) => {
                      const logoUrl = previewLogoUrl;
                      const logoScale = Number(event.currentTarget.value);
                      if (!logoUrl) return;
                      setPreviews((current) => ({
                        ...current,
                        [key]: {
                          logoUrl,
                          logoScale,
                        },
                      }));
                    }}
                    className="w-full accent-sky-600"
                  />
                </label>
              </div>

              <div className="mt-5 flex gap-3">
                <button type="submit" disabled={saving === key} className="flex-1 rounded-full bg-blue-950 px-5 py-3 text-sm font-black text-white hover:bg-sky-700 disabled:bg-slate-400">
                  {saving === key ? "Saving..." : "Save"}
                </button>
                {slot.sponsor_name ? (
                  <button type="button" onClick={() => clearSlot(slot)} disabled={saving === key} className="rounded-full bg-rose-100 px-5 py-3 text-sm font-black text-rose-700 hover:bg-rose-200">
                    Remove
                  </button>
                ) : null}
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}
