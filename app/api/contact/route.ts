import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, message } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MGE DNA Сайт" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO ?? "info@mgedna.kz",
      subject: `Новая заявка с сайта — ${name}`,
      text: `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message ?? "—"}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px">
          <h2 style="color:#C8A96E">Новая заявка с сайта mgedna.kz</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666">Имя:</td><td style="padding:8px 0;font-weight:bold">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Телефон:</td><td style="padding:8px 0;font-weight:bold">${phone}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Сообщение:</td><td style="padding:8px 0">${message ?? "—"}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact form error]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
