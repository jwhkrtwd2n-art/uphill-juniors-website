import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SPONSOR_EMAIL } from "../../../data/site";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM ?? SMTP_USER ?? SPONSOR_EMAIL;

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

    const transporter = getTransporter();
const subject = `Sponsorship enquiry - ${packageType} - ${team || "Club-wide"} - ${business || name}`;
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

    await transporter.sendMail({
      from: EMAIL_FROM,
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