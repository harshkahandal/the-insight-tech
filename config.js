/* ===================================================================
   THE INSIGHT TECH — Site Configuration
   Single source of truth for editable business information.
   Update the values below and every page updates automatically.
=================================================================== */

const SITE_CONFIG = {
  companyName: "THE INSIGHT TECH",
  tagline: "Where Technology Meets Business Growth",

  // -------- CONTACT: replace with real business information --------
  contact: {
    email: "theinsightmedia2@gmail.com",      // TODO: replace with real email
    phone: "+91 9112348531",               // TODO: replace with real phone
    phoneHref: "tel:+919112348531",         // TODO: replace with real tel: link
    whatsapp: "+91 9112348531",            // TODO: replace with real WhatsApp number
    whatsappHref: "https://wa.me/919112348531", // TODO: replace with real wa.me link
    location: "India"                        // TODO: replace with real city/region
  },

  // -------- SOCIAL: replace with real profile URLs --------
  social: {
    instagram: "https://instagram.com/theinsighttech",   // TODO
    linkedin: "https://linkedin.com/company/theinsighttech" // TODO
  },

  // -------- FORM SUBMISSION ENDPOINT --------
  // Connect this to your email/CRM backend (Formspree, custom API, etc.)
  // Until configured, the form logs to console and shows a success state.
  formEndpoint: "" // TODO: e.g. "https://formspree.io/f/xxxxxxx"
};

// Render contact/social info into any element marked with data-config
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-config]").forEach((el) => {
    const path = el.getAttribute("data-config").split(".");
    let val = SITE_CONFIG;
    path.forEach((k) => { val = val ? val[k] : undefined; });
    if (val === undefined) return;
    if (el.tagName === "A") {
      if (el.hasAttribute("data-config-href")) el.setAttribute("href", val);
      else el.textContent = val;
    } else {
      el.textContent = val;
    }
  });

  document.querySelectorAll("[data-config-href]").forEach((el) => {
    const path = el.getAttribute("data-config-href").split(".");
    let val = SITE_CONFIG;
    path.forEach((k) => { val = val ? val[k] : undefined; });
    if (val !== undefined) el.setAttribute("href", val);
  });
});
