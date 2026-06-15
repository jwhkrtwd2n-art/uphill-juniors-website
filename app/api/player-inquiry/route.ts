import { NextResponse } from "next/server";

import { PLAY_EMAIL } from "../../../data/site";
import { escapeHtml, sendClubEmail } from "../../../lib/mail";
import { getRateLimitResponse, isSpamTrapFilled } from "../../../lib/rate-limit";

export async function POST(request: Request) {
  try {
    const rateLimitResponse = getRateLimitResponse(request, "player-inquiry");
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();

    if (isSpamTrapFilled(body.website)) {
      return NextResponse.json({ success: true });
    }

    const parentName = String(body.parentName ?? "").trim();
    const childName = String(body.childName ?? "").trim();
    const childDob = String(body.childDob ?? "").trim();
    const parentPhone = String(body.parentPhone ?? "").trim();
    const parentEmail = String(body.parentEmail ?? "").trim();

    if (
      !parentName ||
      !childName ||
      !childDob ||
      !parentPhone ||
      !parentEmail
    ) {
      return NextResponse.json(
        { error: "Please complete every field before sending your enquiry." },
        { status: 400 }
      );
    }

    if (
      parentName.length > 100 ||
      childName.length > 100 ||
      parentPhone.length > 30 ||
      parentEmail.length > 254
    ) {
      return NextResponse.json(
        { error: "One or more fields are too long." },
        { status: 400 }
      );
    }

    const parsedDob = new Date(`${childDob}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(childDob) ||
      Number.isNaN(parsedDob.getTime()) ||
      parsedDob.toISOString().slice(0, 10) !== childDob ||
      parsedDob > new Date()
    ) {
      return NextResponse.json(
        { error: "Please provide a valid date of birth." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid parent or guardian email address." },
        { status: 400 }
      );
    }

    const subject = `Player enquiry - ${childName} - DOB ${childDob}`;
    const text = `Parent / guardian name: ${parentName}
Child's name: ${childName}
Child's date of birth: ${childDob}
Parent / guardian phone: ${parentPhone}
Parent / guardian email: ${parentEmail}`;
    const html = `
      <p><strong>Parent / guardian name:</strong> ${escapeHtml(parentName)}</p>
      <p><strong>Child's name:</strong> ${escapeHtml(childName)}</p>
      <p><strong>Child's date of birth:</strong> ${escapeHtml(childDob)}</p>
      <p><strong>Parent / guardian phone:</strong> ${escapeHtml(parentPhone)}</p>
      <p><strong>Parent / guardian email:</strong> ${escapeHtml(parentEmail)}</p>
    `;

    await sendClubEmail({
      fallbackFromEmail: PLAY_EMAIL,
      to: PLAY_EMAIL,
      replyTo: parentEmail,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Player inquiry error:", error);
    return NextResponse.json(
      { error: "Unable to send the enquiry right now. Please try again later." },
      { status: 500 }
    );
  }
}
