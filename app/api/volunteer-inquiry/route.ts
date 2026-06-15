import { NextResponse } from "next/server";

import { VOLUNTEER_EMAIL } from "../../../data/site";
import { escapeHtml, sendClubEmail } from "../../../lib/mail";
import { getRateLimitResponse, isSpamTrapFilled } from "../../../lib/rate-limit";

export async function POST(request: Request) {
  try {
    const rateLimitResponse = getRateLimitResponse(request, "volunteer-inquiry");
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();

    if (isSpamTrapFilled(body.website)) {
      return NextResponse.json({ success: true });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const role = String(body.role ?? "").trim();

    if (!name || !email || !phone || !role) {
      return NextResponse.json(
        { error: "Please complete every field before sending your enquiry." },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      phone.length > 30 ||
      role.length > 100
    ) {
      return NextResponse.json(
        { error: "One or more fields are too long." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const subject = `Volunteer enquiry - ${role} - ${name}`;
    const text = `Name: ${name}
Email: ${email}
Phone: ${phone}
Role interested in: ${role}`;
    const html = `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Role interested in:</strong> ${escapeHtml(role)}</p>
    `;

    await sendClubEmail({
      fallbackFromEmail: VOLUNTEER_EMAIL,
      to: VOLUNTEER_EMAIL,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Volunteer inquiry error:", error);
    return NextResponse.json(
      { error: "Unable to send the enquiry right now. Please try again later." },
      { status: 500 }
    );
  }
}
