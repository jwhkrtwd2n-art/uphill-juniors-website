import { teams, type Team } from "../data/teams";
import {
  getAvailableSponsorTeamsByPackage,
  getSponsorAvailabilityCounts,
  formatTeamsAvailable,
  isSponsorSlotAvailable,
} from "./sponsor-availability";
import type { TeamSponsorPackageCode } from "./sponsor-packages";
import { createClient } from "./supabase/server";

export type { AvailableSponsorTeamsByPackage } from "./sponsor-availability";
export {
  getAvailableSponsorTeamsByPackage,
  getSponsorAvailabilityCounts,
  formatTeamsAvailable,
  isSponsorSlotAvailable,
};
export type { TeamSponsorPackageCode as SponsorPackageCode } from "./sponsor-packages";

export type SponsorSlotRow = {
  team_name: string;
  package_code: TeamSponsorPackageCode;
  label: string;
  sponsor_name: string | null;
  sponsor_url: string | null;
  logo_url: string | null;
  logo_scale: number | null;
};

export type SponsorSlotsResult = {
  slots: SponsorSlotRow[];
  errorMessage?: string;
  needsLogoScaleMigration?: boolean;
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
  return (await getSponsorSlotsWithStatus()).slots;
}

export async function getSponsorSlotsWithStatus(): Promise<SponsorSlotsResult> {
  const supabase = createClient();
  if (!supabase) return { slots: getFallbackSponsorSlots() };

  const result = await supabase
    .from("sponsor_slots")
    .select(
      "team_name, package_code, label, sponsor_name, sponsor_url, logo_url, logo_scale"
    );

  if (result.error?.message.includes("logo_scale")) {
    const { data, error } = await supabase
      .from("sponsor_slots")
      .select("team_name, package_code, label, sponsor_name, sponsor_url, logo_url");

    if (error || !data) {
      return {
        slots: getFallbackSponsorSlots(),
        errorMessage:
          error?.message ??
          "Unable to load sponsor slots from Supabase. Showing fallback data.",
      };
    }

    return {
      slots: data.map((slot) => ({ ...slot, logo_scale: 100 })) as SponsorSlotRow[],
      needsLogoScaleMigration: true,
    };
  }

  const { data, error } = result;
  if (error || !data) {
    return {
      slots: getFallbackSponsorSlots(),
      errorMessage:
        error?.message ??
        "Unable to load sponsor slots from Supabase. Showing fallback data.",
    };
  }

  return { slots: data as SponsorSlotRow[] };
}
