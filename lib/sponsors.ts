import { teams, type Team } from "../data/teams";
import { createClient } from "./supabase/server";

export type SponsorPackageCode = "main" | "back" | "training";

export type SponsorSlotRow = {
  team_name: string;
  package_code: SponsorPackageCode;
  label: string;
  sponsor_name: string | null;
  sponsor_url: string | null;
  logo_url: string | null;
  logo_scale: number | null;
};

function getFallbackSponsorSlots(): SponsorSlotRow[] {
  return teams.flatMap((team) =>
    team.sponsorOpportunities.map((opportunity) => ({
      team_name: team.name,
      package_code: opportunity.package,
      label: opportunity.label,
      sponsor_name: opportunity.sponsor?.name ?? null,
      sponsor_url: opportunity.sponsor?.href ?? null,
      logo_url: opportunity.sponsor?.logo ?? null,
      logo_scale: opportunity.sponsor?.logoScale ?? 100,
    }))
  );
}

function isSponsorSlotSold(slot: SponsorSlotRow) {
  return Boolean(slot.sponsor_name && slot.sponsor_url && slot.logo_url);
}

export function getAvailableSponsorTeamsByPackage(slots: SponsorSlotRow[]) {
  return slots.reduce<Record<SponsorPackageCode, string[]>>(
    (available, slot) => {
      if (!isSponsorSlotSold(slot)) {
        available[slot.package_code].push(slot.team_name);
      }

      return available;
    },
    { main: [], back: [], training: [] }
  );
}

export function getSponsorAvailabilityCounts(slots: SponsorSlotRow[]) {
  const available = getAvailableSponsorTeamsByPackage(slots);

  return {
    main: available.main.length,
    back: available.back.length,
    training: available.training.length,
  };
}

export function formatTeamsAvailable(count: number) {
  if (count === 0) return "Fully sponsored";
  if (count === 1) return "1 team available";
  return `${count} teams available`;
}

export function mergeSponsorSlots(
  baseTeams: Team[],
  slots: SponsorSlotRow[]
): Team[] {
  return baseTeams.map((team) => ({
    ...team,
    sponsorOpportunities: team.sponsorOpportunities.map((opportunity) => {
      const slot = slots.find(
        (item) =>
          item.team_name === team.name &&
          item.package_code === opportunity.package
      );

      if (!slot?.sponsor_name || !slot.sponsor_url || !slot.logo_url) {
        return { ...opportunity, sponsor: undefined };
      }

      return {
        ...opportunity,
        label: slot.label || opportunity.label,
        sponsor: {
          name: slot.sponsor_name,
          href: slot.sponsor_url,
          logo: slot.logo_url,
          logoScale: slot.logo_scale ?? 100,
        },
      };
    }),
  }));
}

export async function getTeamsWithSponsors() {
  return mergeSponsorSlots(teams, await getSponsorSlots());
}

export async function getSponsorSlots() {
  const supabase = createClient();
  if (!supabase) return getFallbackSponsorSlots();

  const result = await supabase
    .from("sponsor_slots")
    .select(
      "team_name, package_code, label, sponsor_name, sponsor_url, logo_url, logo_scale"
    );

  if (result.error?.message.includes("logo_scale")) {
    const { data, error } = await supabase
      .from("sponsor_slots")
      .select("team_name, package_code, label, sponsor_name, sponsor_url, logo_url");

    if (error || !data) return getFallbackSponsorSlots();
    return data.map((slot) => ({ ...slot, logo_scale: 100 })) as SponsorSlotRow[];
  }

  const { data, error } = result;
  if (error || !data) return getFallbackSponsorSlots();
  return data as SponsorSlotRow[];
}
