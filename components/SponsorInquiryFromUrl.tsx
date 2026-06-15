"use client";

import { useSearchParams } from "next/navigation";
import { SponsorInquiryForm } from "./SponsorInquiryForm";

type Props = {
  sponsorEmail: string;
  availableTeamsByPackage?: Parameters<
    typeof SponsorInquiryForm
  >[0]["availableTeamsByPackage"];
};

export function SponsorInquiryFromUrl({
  sponsorEmail,
  availableTeamsByPackage,
}: Props) {
  const searchParams = useSearchParams();

  const packageParam = searchParams.get("package") ?? undefined;
  const teamParam = searchParams.get("team") ?? undefined;

  const autoOpen = Boolean(packageParam || teamParam);

  return (
    <SponsorInquiryForm
      sponsorEmail={sponsorEmail}
      initialPackage={packageParam}
      initialTeam={teamParam}
      autoOpen={autoOpen}
      availableTeamsByPackage={availableTeamsByPackage}
    />
  );
}
