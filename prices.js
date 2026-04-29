// ============================================================
//  NOMADIC NEST — PRICE CONFIGURATION FILE
//  ✏️  Edit the values below to update prices across the website
//  No other file needs to be changed when prices change!
// ============================================================

const PRICES = {

  // ── TOUR PACKAGES ──────────────────────────────────────────
  packages: {
    weekend: {
      label:      "2D/1N Weekend Escape",
      duration:   "2 Days / 1 Night",
      price:      3999,        // ← change this number to update price
      currency:   "₹",
      unit:       "per person",
    },
    complete: {
      label:      "3D/2N Complete Package",
      duration:   "3 Days / 2 Nights",
      price:      6999,        // ← change this number to update price
      currency:   "₹",
      unit:       "per person",
    },
  },

  // ── STAY OPTIONS ───────────────────────────────────────────
  stays: {
    budget: {
      label:    "Budget Stay",
      minPrice: 499,           // ← change min price per night
      maxPrice: 999,           // ← change max price per night
      currency: "₹",
      unit:     "night",
    },
    standard: {
      label:    "Standard Stay",
      minPrice: 1200,          // ← change min price per night
      maxPrice: 2500,          // ← change max price per night
      currency: "₹",
      unit:     "night",
    },
    premium: {
      label:    "Premium Retreat",
      minPrice: 2500,          // ← change min price per night
      maxPrice: 5000,          // ← change max price per night
      currency: "₹",
      unit:     "night",
    },
  },

  // ── CAB SERVICES ───────────────────────────────────────────
  cabs: {
    madurai: {
      label:  "Madurai Pickup",
      price:  2500,            // ← change this number to update price
      currency: "₹",
    },
    dindigul: {
      label:  "Dindigul Pickup",
      price:  1800,            // ← change this number to update price
      currency: "₹",
    },
    sightseeing: {
      label:  "Local Sightseeing",
      price:  2000,            // ← change this number to update price
      currency: "₹",
    },
    halfday: {
      label:  "Half Day Tour",
      price:  1200,            // ← change this number to update price
      currency: "₹",
    },
  },

};

// ============================================================
//  DO NOT EDIT BELOW THIS LINE
//  This code automatically applies the prices to the page
// ============================================================

function fmt(currency, price) {
  return `${currency}${price.toLocaleString("en-IN")}`;
}

function fmtRange(currency, min, max, unit) {
  return `${currency}${min.toLocaleString("en-IN")} – ${currency}${max.toLocaleString("en-IN")}/${unit}`;
}

function applyPrices() {

  // ── Tour Packages ──
  const pkgPriceEls = document.querySelectorAll("[data-price]");
  pkgPriceEls.forEach(el => {
    const key = el.dataset.price;           // e.g. "weekend", "complete"
    const pkg = PRICES.packages[key];
    if (pkg) {
      el.textContent = fmt(pkg.currency, pkg.price);
    }
  });

  // ── Dropdown options ──
  const select = document.getElementById("package");
  if (select) {
    const w = PRICES.packages.weekend;
    const c = PRICES.packages.complete;
    select.querySelectorAll("option").forEach(opt => {
      if (opt.dataset.pkgKey === "weekend") {
        opt.value = `${w.label} - ${fmt(w.currency, w.price)}/${w.unit.replace("per ","")}`;
        opt.textContent = `2D/1N – Weekend Escape (${fmt(w.currency, w.price)}/${w.unit.replace("per ","")})`;
      }
      if (opt.dataset.pkgKey === "complete") {
        opt.value = `${c.label} - ${fmt(c.currency, c.price)}/${c.unit.replace("per ","")}`;
        opt.textContent = `3D/2N – Complete Package (${fmt(c.currency, c.price)}/${c.unit.replace("per ","")})`;
      }
    });
  }

  // ── Stay price chips ──
  const stayChips = document.querySelectorAll("[data-stay]");
  stayChips.forEach(el => {
    const key = el.dataset.stay;
    const s = PRICES.stays[key];
    if (s) {
      el.textContent = fmtRange(s.currency, s.minPrice, s.maxPrice, s.unit);
    }
  });

  // ── Cab prices ──
  const cabEls = document.querySelectorAll("[data-cab]");
  cabEls.forEach(el => {
    const key = el.dataset.cab;
    const cab = PRICES.cabs[key];
    if (cab) {
      el.textContent = fmt(cab.currency, cab.price);
    }
  });
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyPrices);
} else {
  applyPrices();
}
