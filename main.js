/* ===================================================================
   THE INSIGHT TECH — Shared site behavior
=================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* Lucide icons */
  if (window.lucide) lucide.createIcons();

  /* Navbar solid-on-scroll */
  const nav = document.getElementById("site-nav");
  const setNavState = () => {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add("nav-solid");
    else nav.classList.remove("nav-solid");
  };
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });

  /* Mobile menu */
  const menuBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const openMenu = () => {
    mobileMenu?.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    mobileMenu?.classList.remove("open");
    document.body.style.overflow = "";
  };
  menuBtn?.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);
  mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  /* Reveal-on-scroll — one orchestrated fade per section, not per card */
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
  }

  /* Contact form validation + submit states */
  const form = document.getElementById("enquiry-form");
  if (form) {
    const submitBtn = document.getElementById("form-submit-btn");
    const successBox = document.getElementById("form-success");
    const errorBox = document.getElementById("form-error");

    const validators = {
      name: v => v.trim().length >= 2 || "Please enter your name.",
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Please enter a valid email address.",
      phone: v => v.trim().length >= 7 || "Please enter a valid phone number.",
      service: v => v !== "" || "Please select a service.",
      message: v => v.trim().length >= 10 || "Please tell us a little more (10+ characters)."
    };

    const showFieldError = (field, msg) => {
      const input = form.elements[field];
      const err = form.querySelector(`[data-error-for="${field}"]`);
      if (input) input.classList.toggle("field-error", !!msg);
      if (err) {
        err.textContent = typeof msg === "string" ? msg : "";
        err.classList.toggle("show", !!msg);
      }
    };

    const validateField = (field) => {
      const input = form.elements[field];
      if (!input) return true;
      const rule = validators[field];
      if (!rule) return true;
      const result = rule(input.value);
      showFieldError(field, result === true ? "" : result);
      return result === true;
    };

    Object.keys(validators).forEach(field => {
      form.elements[field]?.addEventListener("blur", () => validateField(field));
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errorBox?.classList.add("hidden");
      successBox?.classList.add("hidden");

      const fields = Object.keys(validators);
      const allValid = fields.map(validateField).every(Boolean);
      if (!allValid) return;

      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      submitBtn.style.opacity = "0.7";

      try {
        const endpoint = (window.SITE_CONFIG && window.SITE_CONFIG.formEndpoint) ||
          (typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.formEndpoint : "");

        if (endpoint) {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: new FormData(form)
          });
          if (!res.ok) throw new Error("Submission failed");
        } else {
          // No backend configured yet — simulate a successful send.
          await new Promise(r => setTimeout(r, 700));
          console.info("[THE INSIGHT TECH] Form endpoint not configured. Payload:",
            Object.fromEntries(new FormData(form).entries()));
        }

        form.reset();
        successBox?.classList.remove("hidden");
      } catch (err) {
        errorBox?.classList.remove("hidden");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = "1";
      }
    });
  }
});
