import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  CLUB_WIDE_OPTIONS,
  MAIN_BACK_TEAM_OPTIONS,
  PACKAGE_OPTIONS,
  TRAINING_TEAM_OPTIONS,
  getPackageCodeFromLabel,
  getPackageFromCode,
  isTeamSponsorPackageCode,
} from "../lib/sponsor-packages.ts";

describe("sponsor package validation", () => {
  it("maps package codes to public labels", () => {
    assert.equal(
      getPackageFromCode("main"),
      "Main Playing Kit Sponsor - £650"
    );
    assert.equal(
      getPackageFromCode("training"),
      "Training Top Sponsor - £500"
    );
    assert.equal(
      getPackageFromCode("not-a-package"),
      "General sponsorship enquiry"
    );
  });

  it("maps public labels back to package codes", () => {
    for (const option of PACKAGE_OPTIONS) {
      assert.equal(getPackageCodeFromLabel(option.label), option.code);
    }

    assert.equal(getPackageCodeFromLabel("Unknown package"), "general");
  });

  it("identifies only team-specific sponsor packages", () => {
    assert.equal(isTeamSponsorPackageCode("main"), true);
    assert.equal(isTeamSponsorPackageCode("back"), true);
    assert.equal(isTeamSponsorPackageCode("training"), true);
    assert.equal(isTeamSponsorPackageCode("coaches"), false);
    assert.equal(isTeamSponsorPackageCode("general"), false);
    assert.equal(isTeamSponsorPackageCode(undefined), false);
  });
});

describe("sponsor package team options", () => {
  it("keeps main and back package teams aligned", () => {
    assert.deepEqual(MAIN_BACK_TEAM_OPTIONS, [
      "U16s",
      "U15s",
      "U13s",
      "U11s",
      "U09s",
      "U08s",
      "U07s",
    ]);
  });

  it("includes U06s only for training sponsorship", () => {
    assert.equal(MAIN_BACK_TEAM_OPTIONS.includes("U06s"), false);
    assert.equal(TRAINING_TEAM_OPTIONS.includes("U06s"), true);
  });

  it("uses a club-wide option for non-team-specific packages", () => {
    assert.deepEqual(CLUB_WIDE_OPTIONS, ["Club-wide / not team specific"]);
  });
});
