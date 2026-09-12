// ━━━━━━━━━━━━━━ INQUIRY FORM ━━━━━━━━━━━━━━
// Helper text is replaced by a specific correction without shifting the form.
const inquiryForm = document.getElementById('inqForm');

const fieldConfig = {
  firstName: { input: document.getElementById('fn'), help: document.getElementById('fnHelp'), helper: 'Use at least 2 letters.' },
  lastName:  { input: document.getElementById('ln'), help: document.getElementById('lnHelp'), helper: 'Use at least 2 letters.' },
  email:     { input: document.getElementById('em'), help: document.getElementById('emHelp'), helper: 'Use a complete address, like name@example.com.' },
  phone:     { input: document.getElementById('ph'), help: document.getElementById('phHelp'), helper: 'United States numbers use 10 digits.' },
};

const countrySelect = document.getElementById('countryCode');

function plausibleName(value) {
  const clean = value.trim().replace(/\s+/g, ' ');
  if (clean.length < 2 || clean.length > 50) return false;
  if (!/^[\p{L}][\p{L}\p{M}'’ -]*[\p{L}\p{M}]$/u.test(clean)) return false;
  const letters = [...clean.toLocaleLowerCase().replace(/[^\p{L}]/gu, '')];
  return letters.length >= 2 && !(letters.length >= 3 && new Set(letters).size === 1);
}

function plausibleEmail(value) {
  const email = value.trim();
  if (email.length > 254) return false;
  const at = email.lastIndexOf('@');
  if (at < 1 || at !== email.indexOf('@')) return false;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1).toLowerCase();
  if (local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local)) return false;
  const labels = domain.split('.');
  if (labels.length < 2 || !/^[a-z]{2,24}$/i.test(labels.at(-1))) return false;
  return labels.every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
}

function phoneDigits() {
  return fieldConfig.phone.input.value.replace(/\D/g, '');
}

function validateField(name) {
  const value = fieldConfig[name].input.value.trim();
  if (name === 'firstName' || name === 'lastName') {
    if (!value) return `Enter your ${name === 'firstName' ? 'first' : 'last'} name.`;
    if (!plausibleName(value)) return 'Use 2–50 letters; spaces, hyphens, and apostrophes are allowed.';
  }
  if (name === 'email') {
    if (!value) return 'Enter your email address.';
    if (!plausibleEmail(value)) return 'Enter a complete email address, like name@example.com.';
  }
  if (name === 'phone') {
    if (!countrySelect.value) return 'Select a country code.';
    if (!value) return 'Enter your phone number.';
    if (!/^[0-9\s().-]+$/.test(value)) return 'Use numbers only, with spaces, parentheses, or hyphens.';
    const digits = phoneDigits();
    if (digits.length < 7 || digits.length > 15 || new Set(digits).size === 1) return 'Enter a valid phone number.';
    const lengths = countrySelect.selectedOptions[0]?.dataset.lengths?.split(',').map(Number);
    if (lengths?.length && !lengths.includes(digits.length)) {
      const expected = lengths.length === 1 ? `${lengths[0]} digits` : `${lengths.join(' or ')} digits`;
      return `${countrySelect.selectedOptions[0].dataset.country} numbers use ${expected}.`;
    }
  }
  return '';
}

function renderFieldState(name, message) {
  const config = fieldConfig[name];
  const field = config.input.closest('.f-field');
  const invalid = Boolean(message);
  field.classList.toggle('has-error', invalid);
  config.input.setAttribute('aria-invalid', String(invalid));
  if (name === 'phone') countrySelect.setAttribute('aria-invalid', String(invalid));
  config.help.textContent = message || config.helper;
  config.help.setAttribute('aria-live', invalid ? 'polite' : 'off');
  return !invalid;
}

function checkField(name) {
  return renderFieldState(name, validateField(name));
}

function updatePhoneGuidance() {
  const option = countrySelect.selectedOptions[0];
  const country = option?.dataset.country || '';
  const lengths = option?.dataset.lengths?.split(',');
  fieldConfig.phone.helper = lengths?.length
    ? `${country} numbers use ${lengths.join(' or ')} digits.`
    : 'Enter the local number without the country code.';
  if (!fieldConfig.phone.input.dataset.touched) fieldConfig.phone.help.textContent = fieldConfig.phone.helper;
}

Object.entries(fieldConfig).forEach(([name, config]) => {
  config.input.addEventListener('blur', () => {
    config.input.dataset.touched = 'true';
    checkField(name);
  });
  config.input.addEventListener('input', () => {
    if (config.input.dataset.touched) checkField(name);
  });
});

countrySelect.addEventListener('change', () => {
  updatePhoneGuidance();
  if (fieldConfig.phone.input.dataset.touched) checkField('phone');
});
updatePhoneGuidance();

async function submitInquiry(event) {
  event.preventDefault();
  const btn = inquiryForm.querySelector('.form-btn');
  const errEl = document.getElementById('formErr');
  const summary = document.getElementById('formSummary');
  const names = Object.keys(fieldConfig);

  names.forEach(name => { fieldConfig[name].input.dataset.touched = 'true'; });
  const invalidNames = names.filter(name => !checkField(name));
  summary.hidden = invalidNames.length === 0;
  errEl.hidden = true;

  if (invalidNames.length) {
    const first = invalidNames[0] === 'phone' && !countrySelect.value
      ? countrySelect
      : fieldConfig[invalidNames[0]].input;
    first.focus();
    return;
  }

  const selectedCountry = countrySelect.selectedOptions[0];
  const payload = {
    firstName: fieldConfig.firstName.input.value.trim().replace(/\s+/g, ' '),
    lastName: fieldConfig.lastName.input.value.trim().replace(/\s+/g, ' '),
    email: fieldConfig.email.input.value.trim(),
    countryCode: countrySelect.value,
    phoneCountry: selectedCountry?.dataset.country || '',
    phone: `${countrySelect.value}${phoneDigits()}`,
    message: document.getElementById('msg').value.trim(),
    website: document.getElementById('hp').value,
  };

  btn.disabled = true;
  btn.textContent = 'Sending…';

  try {
    const response = await fetch('/api/inquire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([name, message]) => {
          if (fieldConfig[name]) renderFieldState(name, message);
        });
        summary.hidden = false;
        const firstName = names.find(name => result.fieldErrors[name]);
        if (firstName) fieldConfig[firstName].input.focus();
        return;
      }
      throw new Error('send failed');
    }

    inquiryForm.style.display = 'none';
    document.getElementById('formOk').style.display = 'block';
  } catch {
    errEl.hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Request Private Access';
  }
}
