// ━━━━━━━━━━━━━━ INQUIRY ENDPOINT ━━━━━━━━━━━━━━
// Serverless function (Vercel). On every form submission, sends an email
// notification to the listing agent (+ CC) through the owner's Gmail via SMTP.
// Required env vars (set in Vercel → Settings → Environment Variables):
//   GMAIL_USER          — the Gmail address that sends the notification
//   GMAIL_APP_PASSWORD  — 16-char app password from myaccount.google.com/apppasswords
// Optional: INQUIRY_TO, INQUIRY_CC

import nodemailer from 'nodemailer';

const TO = process.env.INQUIRY_TO || 'aurel.garban@gibsonsir.com';
const CC = process.env.INQUIRY_CC || 'zzakcali@gmail.com, nicobitran@gmail.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, countryCode, phoneCountry, message, website } = req.body || {};

  // Honeypot: real users never fill the hidden "website" field
  if (website) return res.status(200).json({ ok: true });

  const plausibleName = value => {
    const clean = String(value || '').trim().replace(/\s+/g, ' ');
    if (clean.length < 2 || clean.length > 50) return false;
    if (!/^[\p{L}][\p{L}\p{M}'’ -]*[\p{L}\p{M}]$/u.test(clean)) return false;
    const letters = [...clean.toLocaleLowerCase().replace(/[^\p{L}]/gu, '')];
    return letters.length >= 2 && !(letters.length >= 3 && new Set(letters).size === 1);
  };
  const plausibleEmail = value => {
    const candidate = String(value || '').trim();
    if (candidate.length > 254) return false;
    const at = candidate.lastIndexOf('@');
    if (at < 1 || at !== candidate.indexOf('@')) return false;
    const local = candidate.slice(0, at);
    const domain = candidate.slice(at + 1).toLowerCase();
    if (local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
    if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local)) return false;
    const labels = domain.split('.');
    return labels.length >= 2 && /^[a-z]{2,24}$/i.test(labels.at(-1)) &&
      labels.every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
  };

  const fieldErrors = {};
  if (!plausibleName(firstName)) fieldErrors.firstName = 'Enter a valid first name using at least 2 letters.';
  if (!plausibleName(lastName)) fieldErrors.lastName = 'Enter a valid last name using at least 2 letters.';
  if (!plausibleEmail(email)) fieldErrors.email = 'Enter a complete email address, like name@example.com.';
  if (!/^\+\d{1,4}$/.test(String(countryCode || ''))) fieldErrors.phone = 'Select a valid country code.';
  const phoneDigits = String(phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 8 || phoneDigits.length > 19 || new Set(phoneDigits).size === 1) {
    fieldErrors.phone = 'Enter a valid phone number.';
  }
  if (Object.keys(fieldErrors).length) {
    return res.status(400).json({ ok: false, error: 'Invalid inquiry details', fieldErrors });
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
            <td style="padding:8px 0;border-bottom:1px solid #eee"><a href="tel:${esc(phone)}">${esc(phone)}</a>${phoneCountry ? ` · ${esc(phoneCountry)}` : ''}</td></tr>
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
