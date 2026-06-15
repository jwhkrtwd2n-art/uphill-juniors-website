import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT
  ? Number(process.env.SMTP_PORT)
  : undefined;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

let transporter: nodemailer.Transporter | null = null;

export function escapeHtml(value: string) {
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

  transporter ??= nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

export async function sendClubEmail({
  fallbackFromEmail,
  html,
  replyTo,
  subject,
  text,
  to,
}: {
  fallbackFromEmail: string;
  html: string;
  replyTo: string;
  subject: string;
  text: string;
  to: string;
}) {
  const emailFrom = process.env.EMAIL_FROM ?? SMTP_USER ?? fallbackFromEmail;

  await getTransporter().sendMail({
    from: emailFrom,
    to,
    replyTo,
    subject,
    text,
    html,
  });
}

