// ━━━━━━━━━━━━━━ INQUIRY ENDPOINT ━━━━━━━━━━━━━━
// Serverless function (Vercel). On every form submission, sends an email
// notification to the listing agent (+ CC) through the owner's Gmail via SMTP.
// Required env vars (set in Vercel → Settings → Environment Variables):
//   GMAIL_USER          — the Gmail address that sends the notification
//   GMAIL_APP_PASSWORD  — 16-char app password from myaccount.google.com/apppasswords
// Optional: INQUIRY_TO, INQUIRY_CC

import nodemailer from 'nodemailer';

const TO = process.env.INQUIRY_TO || 'aurel.garban@gibsonsir.com';
const CC = process.env.INQUIRY_CC || 'zzakcali@gmail.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, message, website } = req.body || {};

  // Honeypot: real users never fill the hidden "website" field
  if (website) return res.status(200).json({ ok: true });

  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address' });
  }

  const esc = s => String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  })[c]);

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#19180F">
      <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#6D6660">
        28 Bristol Road &middot; Private Inquiry</p>
      <h2 style="font-weight:400">New inquiry from ${esc(firstName)} ${esc(lastName)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6D6660;width:120px">Name</td>
            <td style="padding:8px 0;border-bottom:1px solid #eee">${esc(firstName)} ${esc(lastName)}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6D6660">Email</td>
            <td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6D6660">Phone</td>
            <td style="padding:8px 0;border-bottom:1px solid #eee"><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>
        ${message ? `<tr><td style="padding:8px 0;color:#6D6660;vertical-align:top">Message</td>
            <td style="padding:8px 0">${esc(message)}</td></tr>` : ''}
      </table>
      <p style="font-size:12px;color:#6D6660;margin-top:24px">
        Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
        via 28bristolroad.com</p>
    </div>`;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"28 Bristol Road" <${process.env.GMAIL_USER}>`,
      to: TO,
      cc: CC,
      replyTo: email,
      subject: `New inquiry — ${firstName} ${lastName} · 28 Bristol Road`,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Inquiry handler error:', err?.message || err);
    return res.status(502).json({ ok: false, error: 'Email delivery failed' });
  }
}
