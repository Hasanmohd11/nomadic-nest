// ===========================
// NAVBAR: transparent on hero, white on scroll
// ===========================
const navbar = document.getElementById('navbar');
const hero = document.getElementById('home');

function handleNavbar() {
  const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
  const scrollY = window.scrollY;

  if (scrollY < heroBottom - 80) {
    navbar.classList.add('hero-top');
  } else {
    navbar.classList.remove('hero-top');
  }
}
handleNavbar();
window.addEventListener('scroll', handleNavbar, { passive: true });

// ===========================
// MOBILE HAMBURGER
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 80;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { passive: true });

// ===========================
// SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll(
  '.why-card, .pkg-card, .stay-card, .cab-card, .gallery-item, .contact-form-wrap, .contact-info-wrap'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ===========================
// DATE INPUT: min = today
// ===========================
const dateInput = document.getElementById('date');
if (dateInput) {
  dateInput.min = new Date().toISOString().split('T')[0];
}

// ===========================
// WHATSAPP BOOKING FORM
// ===========================
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const date    = document.getElementById('date').value;
    const guests  = document.getElementById('guests').value.trim();
    const pkg     = document.getElementById('package').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !date || !guests || !pkg) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const text = `Hi Nomadic Nest! 🏔️\n\nI'd like to book a tour.\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📅 Date: ${formatDate(date)}\n👥 Guests: ${guests}\n📦 Package: ${pkg}${message ? `\n💬 Note: ${message}` : ''}\n\nPlease confirm availability!`;
    const url = `https://wa.me/918270885405?text=${encodeURIComponent(text)}`;
    const newWindow = window.open(url, '_blank');
    
    if (newWindow) {
      showToast('Redirecting to WhatsApp! 🎉', 'success');
    } else {
      // Graceful fallback if popup blocker blocks window.open
      showToast('Popup blocked! Click here to chat.', 'success');
      const toast = document.querySelector('.toast');
      if (toast) {
        toast.style.cursor = 'pointer';
        toast.onclick = () => window.location.href = url;
      }
    }
    
    bookingForm.reset();
  });
}

function formatDate(str) {
  if (!str) return '';
  return new Date(str).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function showToast(msg, type = 'success') {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%) translateY(20px);background:${type==='success'?'#10b981':'#ef4444'};color:#fff;padding:12px 26px;border-radius:50px;font-family:Inter,sans-serif;font-size:0.9rem;font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,0.2);z-index:9999;opacity:0;transition:all .35s ease;white-space:nowrap`;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 3500);
}

// ===========================
// GALLERY LIGHTBOX
// ===========================
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const label = item.querySelector('.gallery-overlay span');
    if (!img) return;

    if (!document.getElementById('lb-style')) {
      const s = document.createElement('style');
      s.id = 'lb-style';
      s.textContent = '@keyframes lbFade{from{opacity:0}to{opacity:1}}';
      document.head.appendChild(s);
    }

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;cursor:zoom-out;animation:lbFade .25s ease';

    const wrap = document.createElement('div');
    wrap.style.cssText = 'max-width:90vw;max-height:90vh;position:relative;text-align:center';

    const lbImg = document.createElement('img');
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbImg.style.cssText = 'max-width:100%;max-height:82vh;object-fit:contain;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.6)';

    const cap = document.createElement('p');
    cap.textContent = label?.textContent || img.alt;
    cap.style.cssText = 'color:rgba(255,255,255,0.75);margin-top:14px;font-size:0.95rem;font-family:Inter,sans-serif;font-weight:500';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = 'position:absolute;top:-12px;right:-12px;background:#fff;color:#333;border:none;width:34px;height:34px;border-radius:50%;font-size:1rem;cursor:pointer;font-weight:800;box-shadow:0 4px 12px rgba(0,0,0,0.3)';
    closeBtn.onclick = (ev) => { ev.stopPropagation(); overlay.remove(); document.body.style.overflow = ''; };

    wrap.append(lbImg, cap, closeBtn);
    overlay.appendChild(wrap);
    overlay.addEventListener('click', () => { overlay.remove(); document.body.style.overflow = ''; });
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  });
});
