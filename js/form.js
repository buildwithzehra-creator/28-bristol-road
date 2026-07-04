// ━━━━━━━━━━━━━━ FORM ━━━━━━━━━━━━━━
// Posts the inquiry to the serverless endpoint, which emails the agent.
async function submitInquiry(e) {
  e.preventDefault();
  const form = document.getElementById('inqForm');
  const btn = form.querySelector('.form-btn');
  const errEl = document.getElementById('formErr');

  const payload = {
    firstName: document.getElementById('fn').value.trim(),
    lastName:  document.getElementById('ln').value.trim(),
    email:     document.getElementById('em').value.trim(),
    phone:     document.getElementById('ph').value.trim(),
    message:   document.getElementById('msg').value.trim(),
    website:   document.getElementById('hp').value, // honeypot
  };

  btn.disabled = true;
  btn.textContent = 'Sending…';
  if (errEl) errEl.style.display = 'none';

  try {
    const r = await fetch('/api/inquire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!r.ok) throw new Error('send failed');

    form.style.display = 'none';
    document.getElementById('formOk').style.display = 'block';
  } catch (err) {
    btn.disabled = false;
    btn.textContent = 'Request Private Access';
    if (errEl) errEl.style.display = 'block';
  }
}
