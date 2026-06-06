import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { VOLUNTEER_EMAIL } from "../../../data/site";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM ?? SMTP_USER ?? VOLUNTEER_EMAIL;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getTransporter() {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "SMTP configuration is not set. Please provide SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS."
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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

    const transporter = getTransporter();
    await transporter.sendMail({
      from: EMAIL_FROM,
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
