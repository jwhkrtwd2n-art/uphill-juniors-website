import type { TeamSponsorPackageCode } from "./sponsor-packages";

export type AvailableSponsorTeamsByPackage = Record<
  TeamSponsorPackageCode,
  string[]
>;

export type SponsorSlotAvailabilityRow = {
  team_name: string;
  package_code: TeamSponsorPackageCode;
  sponsor_name: string | null;
  sponsor_url: string | null;
  logo_url: string | null;
};

export function isSponsorSlotSold(slot: SponsorSlotAvailabilityRow) {
  return Boolean(slot.sponsor_name && slot.sponsor_url && slot.logo_url);
}

export function getAvailableSponsorTeamsByPackage(
  slots: SponsorSlotAvailabilityRow[]
) {
  return slots.reduce<AvailableSponsorTeamsByPackage>(
    (available, slot) => {
      if (!isSponsorSlotSold(slot)) {
        available[slot.package_code].push(slot.team_name);
      }

      return available;
    },
    { main: [], back: [], training: [] }
  );
}

export function getSponsorAvailabilityCounts(
  slots: SponsorSlotAvailabilityRow[]
) {
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

export function isSponsorSlotAvailable(
  availableTeamsByPackage: AvailableSponsorTeamsByPackage,
  packageCode: TeamSponsorPackageCode,
  team: string
) {
  return availableTeamsByPackage[packageCode].includes(team);
}

