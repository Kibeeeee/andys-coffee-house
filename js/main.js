/* ==========================================================================
   Andy's Coffee House — site behaviour
   Theme, mobile nav, scroll reveal, gallery lightbox and the WhatsApp
   order / booking composers all live here.
   ==========================================================================
   >>> EDIT YOUR DETAILS HERE <<<
   Everything the owner is likely to change sits in this one object.
   Phone numbers use full international format for wa.me (no +, no spaces).
   ========================================================================== */
const ANDYS = {
  name: "Andy's Coffee House",

  // WhatsApp number that receives orders & bookings (Kenya: 254 + number, no leading 0)
  whatsapp: "254724333916",

  // Voice / SMS numbers shown around the site (display + tel: link)
  phones: [
    { label: "0724 333 916", tel: "+254724333916" },
    { label: "0794 444 932", tel: "+254794444932" }
  ],

  // Where we are
  address: "Sirgoi Plaza, 2nd Floor, Oginga Odinga Street",
  city: "Eldoret, Kenya",
  mapsUrl: "https://maps.app.goo.gl/ivcRwbv4KA8uLJ9n7",

  // Opening hours. OPEN time (6:30 AM) is confirmed from the Google listing.
  // CLOSING time is an estimate — please confirm with the owner before publishing.
  hours: [
    { day: "Monday", time: "6:30 AM – 9:30 PM" },
    { day: "Tuesday", time: "6:30 AM – 9:30 PM" },
    { day: "Wednesday", time: "6:30 AM – 9:30 PM" },
    { day: "Thursday", time: "6:30 AM – 9:30 PM" },
    { day: "Friday", time: "6:30 AM – 9:30 PM" },
    { day: "Saturday", time: "6:30 AM – 9:30 PM" },
    { day: "Sunday", time: "6:30 AM – 9:30 PM" }
  ],
  hoursShort: "Open every day · 6:30 AM – late",

  // Social links — PLACEHOLDER handles, confirm/replace
  socials: {
    facebook:  "https://www.facebook.com/61573429738245",
    instagram: "https://www.instagram.com/andys_coffeehouse/",
    tiktok:    "https://www.tiktok.com/discover/andys-coffee-house-eldoret"
  },

  // Optional booking / email — PLACEHOLDER
  email: "hello@andyscoffeehouse.co.ke"
};

/* Handy: build a wa.me link from a message string */
function waLink(message) {
  return "https://wa.me/" + ANDYS.whatsapp + "?text=" + encodeURIComponent(message);
}

/* ---- Theme: system first visit, then remember the choice ---------------- */
(function theme() {
  const saved = localStorage.getItem("andys-theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const root = document.documentElement;
      const current = root.getAttribute("data-theme")
        || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("andys-theme", next);
    });
  });
})();

/* ---- Everything else waits for the DOM ---------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

  /* Mobile nav ----------------------------------------------------------- */
  const burger   = document.querySelector(".hamburger");
  const links    = document.querySelector(".nav-links");
  const backdrop = document.querySelector(".nav-backdrop");
  const closeBtn = document.querySelector(".nav-close");

  function closeNav() {
    if (links) links.classList.remove("open");
    if (backdrop) backdrop.classList.remove("show");
  }
  if (burger && links) {
    burger.addEventListener("click", () => {
      links.classList.add("open");
      if (backdrop) backdrop.classList.add("show");
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
  if (backdrop) backdrop.addEventListener("click", closeNav);
  document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", closeNav));

  /* Fill contact details wherever they're referenced ---------------------- */
  document.querySelectorAll("[data-phone-primary]").forEach(el => {
    el.textContent = ANDYS.phones[0].label;
    if (el.tagName === "A") el.href = "tel:" + ANDYS.phones[0].tel;
  });
  document.querySelectorAll("[data-address]").forEach(el => {
    el.textContent = ANDYS.address + ", " + ANDYS.city;
  });
  document.querySelectorAll("[data-maps]").forEach(el => { el.href = ANDYS.mapsUrl; });
  document.querySelectorAll("[data-year]").forEach(el => {
    // no Date.now available issues here — normal browser runtime
    el.textContent = new Date().getFullYear();
  });
  document.querySelectorAll("[data-hours-short]").forEach(el => { el.textContent = ANDYS.hoursShort; });

  // Build the weekly hours list and highlight today
  document.querySelectorAll("[data-hours-table]").forEach(el => {
    const today = new Date().getDay(); // 0 = Sunday
    const order = [1, 2, 3, 4, 5, 6, 0]; // Mon → Sun to match our array
    el.innerHTML = ANDYS.hours.map((h, i) => {
      const isToday = order[i] === today;
      return `<div class="hours-row${isToday ? " today" : ""}">
        <span class="d">${h.day}${isToday ? " · Today" : ""}</span>
        <span class="t">${h.time}</span></div>`;
    }).join("");
  });

  // Multiple phones list
  document.querySelectorAll("[data-phones]").forEach(el => {
    el.innerHTML = ANDYS.phones
      .map(p => `<a href="tel:${p.tel}">${p.label}</a>`).join('<span class="sep"> · </span>');
  });

  /* Wire up any plain "chat to us" WhatsApp links ------------------------- */
  document.querySelectorAll("[data-wa-hello]").forEach(el => {
    el.href = waLink("Hi " + ANDYS.name + "! 👋 I'd like to make an enquiry.");
  });

  /* Scroll reveal --------------------------------------------------------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }

  /* Gallery lightbox ------------------------------------------------------ */
  const shots = Array.from(document.querySelectorAll("[data-lightbox]"));
  const lb = document.querySelector(".lightbox");
  if (shots.length && lb) {
    const lbImg   = lb.querySelector("img");
    const lbCount = lb.querySelector(".lb-count");
    let idx = 0;

    const show = (i) => {
      idx = (i + shots.length) % shots.length;
      const src = shots[idx].getAttribute("data-lightbox");
      const alt = shots[idx].getAttribute("data-alt") || "Andy's Coffee House";
      lbImg.src = src; lbImg.alt = alt;
      if (lbCount) lbCount.textContent = (idx + 1) + " / " + shots.length;
    };
    const open = (i) => { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; };
    const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };

    shots.forEach((s, i) => s.addEventListener("click", () => open(i)));
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-next").addEventListener("click", () => show(idx + 1));
    lb.querySelector(".lb-prev").addEventListener("click", () => show(idx - 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "ArrowLeft") show(idx - 1);
    });
  }

  /* ---- WhatsApp: Reserve a table --------------------------------------- */
  const reserveForm = document.querySelector("#reserve-form");
  if (reserveForm) {
    reserveForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = reserveForm;
      const msg =
`Hello ${ANDYS.name}! I'd like to reserve a table.

• Name: ${f.name.value}
• Date: ${f.date.value}
• Time: ${f.time.value}
• Guests: ${f.guests.value}
• Seating: ${f.seating.value}
• Occasion: ${f.occasion.value || "—"}
• Notes: ${f.notes.value || "—"}

My number: ${f.phone.value}`;
      window.open(waLink(msg), "_blank");
    });
  }

  /* ---- WhatsApp: Order food -------------------------------------------- */
  const orderForm = document.querySelector("#order-form");
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = orderForm;
      const msg =
`Hello ${ANDYS.name}! I'd like to place an order.

• Name: ${f.name.value}
• Order type: ${f.otype.value}
${f.otype.value === "Delivery" ? "• Delivery area: " + (f.area.value || "—") + "\n" : ""}• My order:
${f.items.value}

• Preferred time: ${f.time.value || "As soon as possible"}
My number: ${f.phone.value}`;
      window.open(waLink(msg), "_blank");
    });
  }

  /* ---- WhatsApp: General enquiry (contact) ----------------------------- */
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = contactForm;
      const msg =
`Hello ${ANDYS.name}!

• Name: ${f.name.value}
• Reason: ${f.topic.value}
• Message: ${f.message.value}

My number: ${f.phone.value}`;
      window.open(waLink(msg), "_blank");
    });
  }
});
