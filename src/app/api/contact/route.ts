import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper to validate email
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message, recaptchaToken } =
      await req.json();

    // Basic validation
    if (!name || !email || !subject || !message || !recaptchaToken) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi.' },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid.' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA v2
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      return NextResponse.json(
        { error: 'Konfigurasi reCAPTCHA belum lengkap.' },
        { status: 500 }
      );
    }
    const recaptchaRes = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      }
    );
    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: 'Verifikasi reCAPTCHA gagal. Silakan coba lagi.' },
        { status: 400 }
      );
    }

    // Setup nodemailer SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `Website Multitech <${process.env.SMTP_USER}>`,
      to: 'cvmultitech_tasik@yahoo.co.id',
      subject: `[Website Contact] ${subject}`,
      text: `Pesan baru dari website Multitech:\n\nNama: ${name}\nEmail: ${email}\nTelepon: ${phone || '-'}\n\nSubjek: ${subject}\nPesan:\n${message}`,
      html: `<h2>Pesan Baru dari Website Multitech</h2><p><b>Nama:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Telepon:</b> ${phone || '-'}<br/><b>Subjek:</b> ${subject}</p><p><b>Pesan:</b><br/>${message.replace(/\n/g, '<br/>')}</p>`,    };    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
