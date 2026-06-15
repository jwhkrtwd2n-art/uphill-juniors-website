import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  formatTeamsAvailable,
  getAvailableSponsorTeamsByPackage,
  getSponsorAvailabilityCounts,
  isSponsorSlotAvailable,
  isSponsorSlotSold,
} from "../lib/sponsor-availability.ts";

const slots = [
  {
    team_name: "U16s",
    package_code: "main",
    sponsor_name: "Sold Sponsor",
    sponsor_url: "https://example.com",
    logo_url: "https://example.com/logo.png",
  },
  {
    team_name: "U15s",
    package_code: "main",
    sponsor_name: null,
    sponsor_url: null,
    logo_url: null,
  },
  {
    team_name: "U13s",
    package_code: "back",
    sponsor_name: "Partial Sponsor",
    sponsor_url: "https://partial.example",
    logo_url: null,
  },
  {
    team_name: "U11s",
    package_code: "training",
    sponsor_name: null,
    sponsor_url: null,
    logo_url: null,
  },
  {
    team_name: "U09s",
    package_code: "training",
    sponsor_name: "Training Sponsor",
    sponsor_url: "https://training.example",
    logo_url: "https://training.example/logo.png",
  },
];

describe("sponsor availability filtering", () => {
  it("treats a slot as sold only when name, URL and logo are all present", () => {
    assert.equal(isSponsorSlotSold(slots[0]), true);
    assert.equal(isSponsorSlotSold(slots[2]), false);
    assert.equal(isSponsorSlotSold(slots[3]), false);
  });

  it("excludes sold slots and keeps unsold or partial slots available", () => {
    assert.deepEqual(getAvailableSponsorTeamsByPackage(slots), {
      main: ["U15s"],
      back: ["U13s"],
      training: ["U11s"],
    });
  });

  it("counts available slots by package", () => {
    assert.deepEqual(getSponsorAvailabilityCounts(slots), {
      main: 1,
      back: 1,
      training: 1,
    });
  });
});

describe("sold/available sponsor slot behaviour", () => {
  it("checks whether a requested team is still available for a package", () => {
    const availableTeamsByPackage = getAvailableSponsorTeamsByPackage(slots);

    assert.equal(
      isSponsorSlotAvailable(availableTeamsByPackage, "main", "U15s"),
      true
    );
    assert.equal(
      isSponsorSlotAvailable(availableTeamsByPackage, "main", "U16s"),
      false
    );
  });

  it("formats availability counts for public labels", () => {
    assert.equal(formatTeamsAvailable(0), "Fully sponsored");
    assert.equal(formatTeamsAvailable(1), "1 team available");
    assert.equal(formatTeamsAvailable(3), "3 teams available");
  });
});
