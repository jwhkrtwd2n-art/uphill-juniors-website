import { NextResponse } from "next/server";
import { SPONSOR_EMAIL } from "../../../data/site";
import { escapeHtml, sendClubEmail } from "../../../lib/mail";
import { getRateLimitResponse, isSpamTrapFilled } from "../../../lib/rate-limit";
import {
  getPackageCodeFromLabel,
  isTeamSponsorPackageCode,
} from "../../../lib/sponsor-packages";
import {
  getAvailableSponsorTeamsByPackage,
  getSponsorSlots,
  isSponsorSlotAvailable,
} from "../../../lib/sponsors";

export async function POST(request: Request) {
  try {
    const rateLimitResponse = getRateLimitResponse(
      request,
      "sponsor-inquiry"
    );
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();

    if (isSpamTrapFilled(body.website)) {
      return NextResponse.json({ success: true });
    }

    const name = String(body.name ?? "").trim();
    const business = String(body.business ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const packageType = String(body.package ?? "").trim();
    const team = String(body.team ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !packageType || !message) {
      return NextResponse.json(
        {
          error:
            "Please provide your name, email address, a sponsorship package and a message.",
        },
        { status: 400 }
      );
    }

    const packageCode = getPackageCodeFromLabel(packageType);
    if (isTeamSponsorPackageCode(packageCode)) {
      const availableTeamsByPackage = getAvailableSponsorTeamsByPackage(
        await getSponsorSlots()
      );

      if (
        !team ||
        !isSponsorSlotAvailable(availableTeamsByPackage, packageCode, team)
      ) {
        return NextResponse.json(
          {
            error:
              "That sponsorship slot is no longer available. Please choose another option.",
          },
          { status: 409 }
        );
      }
    }

    const subject = `Sponsorship enquiry - ${packageType} - ${
      team || "Club-wide"
    } - ${business || name}`;
    const text = `Name: ${name}
Business: ${business || "Not provided"}
Email: ${email}
Phone: ${phone || "Not provided"}
Package: ${packageType}
Team / age group: ${team || "Not specified"}

Message:
${message}`;

    const html = `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Business:</strong> ${escapeHtml(business || "Not provided")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
      <p><strong>Package:</strong> ${escapeHtml(packageType)}</p>
      <p><strong>Team / age group:</strong> ${escapeHtml(team || "Not specified")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `;

    await sendClubEmail({
      fallbackFromEmail: SPONSOR_EMAIL,
      to: SPONSOR_EMAIL,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sponsor inquiry error:", error);
    return NextResponse.json(
      { error: "Unable to send the enquiry right now. Please try again later." },
      { status: 500 }
    );
  }
}
