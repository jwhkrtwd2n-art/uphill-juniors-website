export type SponsorPackageCode =
  | "main"
  | "training"
  | "back"
  | "coaches"
  | "general";

export type TeamSponsorPackageCode = "main" | "back" | "training";

export const PACKAGE_OPTIONS: {
  code: SponsorPackageCode;
  label: string;
}[] = [
  { code: "main", label: "Main Playing Kit Sponsor - £650" },
  { code: "training", label: "Training Top Sponsor - £500" },
  { code: "back", label: "Back of Shirt Sponsor - £300" },
  { code: "coaches", label: "Coaches Kit Sponsor - £600" },
  { code: "general", label: "General sponsorship enquiry" },
];

export const MAIN_BACK_TEAM_OPTIONS = [
  "U16s",
  "U15s",
  "U13s",
  "U11s",
  "U09s",
  "U08s",
  "U07s",
];

export const TRAINING_TEAM_OPTIONS = [
  "U16s",
  "U15s",
  "U13s",
  "U11s",
  "U09s",
  "U08s",
  "U07s",
  "U06s",
];

export const CLUB_WIDE_OPTIONS = ["Club-wide / not team specific"];

export function isTeamSponsorPackageCode(
  packageCode: SponsorPackageCode | null | undefined
): packageCode is TeamSponsorPackageCode {
  return (
    packageCode === "main" ||
    packageCode === "back" ||
    packageCode === "training"
  );
}

export function getPackageFromCode(packageCode?: string) {
  return (
    PACKAGE_OPTIONS.find((option) => option.code === packageCode)?.label ??
    "General sponsorship enquiry"
  );
}

export function getPackageCodeFromLabel(
  selectedPackage: string
): SponsorPackageCode {
  return (
    PACKAGE_OPTIONS.find((option) => option.label === selectedPackage)?.code ??
    "general"
  );
}

