const services = [
  {
    id: "home-support",
    name: "Home support",
    category: "Everyday",
    icon: "⌂",
    short: "Practical help to make your home feel easier to manage.",
    description: "A flexible helping hand for everyday tasks around your home. Tell us what you need and we will start with a clear conversation about the right support.",
    benefits: ["Support shaped around your needs", "A clear first conversation", "Practical, thoughtful help"]
  },
  {
    id: "moving-help",
    name: "Moving help",
    category: "Everyday",
    icon: "↗",
    short: "A calmer way to get through the jobs that come with moving.",
    description: "From preparing a space to getting settled, moving help gives you a little more room to focus on what matters during a change of place.",
    benefits: ["Help with practical preparation", "Support through a busy transition", "A plan based on your priorities"]
  },
  {
    id: "garden-care",
    name: "Garden care",
    category: "Outdoor",
    icon: "✦",
    short: "Keep your outdoor space cared for, season by season.",
    description: "Simple, considerate care for the outdoor spaces you enjoy. Share the shape of your garden and the kind of help you are looking for.",
    benefits: ["Care for your regular needs", "Attention to the details", "A straightforward service request"]
  },
  {
    id: "personal-admin",
    name: "Personal admin",
    category: "Everyday",
    icon: "▤",
    short: "Make a little more space for the admin on your list.",
    description: "Support with practical personal tasks and the details that can be hard to get to. We begin by understanding exactly what would be useful.",
    benefits: ["A focused list of priorities", "Support with practical tasks", "Clear communication throughout"]
  },
  {
    id: "event-prep",
    name: "Event preparation",
    category: "Events",
    icon: "○",
    short: "Thoughtful preparation for gatherings big and small.",
    description: "Take some pressure out of preparing for a gathering. Let us know what you are planning and where an extra pair of hands would help.",
    benefits: ["Preparation around your event", "Support with the details", "A simple way to get started"]
  },
  {
    id: "local-errands",
    name: "Local errands",
    category: "Everyday",
    icon: "→",
    short: "A reliable way to take care of nearby jobs.",
    description: "For the practical errands that take time and attention, local errand support keeps things moving with a clear, personal approach.",
    benefits: ["Help with nearby errands", "A service shaped to your list", "Easy request submission"]
  }
];

const app = document.querySelector("#app");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

function getService(id) {
  return services.find((service) => service.id === id);
}

function serviceCard(service) {
  return `<article class="service-card">
    <div class="service-icon" aria-hidden="true">${service.icon}</div>
    <h3>${service.name}</h3>
    <p>${service.short}</p>
    <a class="text-link" href="#service/${service.id}">View details <span aria-hidden="true">→</span></a>
  </article>`;
}

function homePage() {
  return `<section class="hero"><div class="container hero-grid">
    <div><p class="eyebrow">Services that fit real life</p><h1>A little help can make a big difference.</h1>
    <p class="hero-copy">Browse practical, thoughtful services and find the right place to start. When you are ready, send us a request in just a few steps.</p>
    <a class="button" href="#services">Explore services <span aria-hidden="true">↗</span></a></div>
    <div class="hero-visual" aria-hidden="true"><div class="hero-stat">Made for your to-do list</div><div class="visual-panel"></div><div class="visual-copy">More time<br>for what matters.</div></div>
  </div></section>
  <section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Start here</p><h2>Find your kind of help.</h2></div><p>Explore a small selection of practical services designed to make everyday tasks feel more manageable.</p></div>
  <div class="service-grid">${services.slice(0, 3).map(serviceCard).join("")}</div></div></section>
  <section class="strip"><div class="container strip-inner"><h2>Have something specific in mind?</h2><a class="button" href="#services">See all services <span aria-hidden="true">→</span></a></div></section>`;
}

function servicesPage() {
  return `<section class="page-header"><div class="container"><p class="eyebrow">Our services</p><h1>Choose where to begin.</h1><p>Browse the services below or search for something specific.</p></div></section>
  <section class="section"><div class="container"><div class="services-toolbar"><div id="filters" class="filter-list" aria-label="Service categories"></div><label class="search-box"><span class="search-icon" aria-hidden="true">⌕</span><input id="service-search" type="search" placeholder="Search services" aria-label="Search services"></label></div><div id="service-results" class="service-grid"></div></div></section>`;
}

function detailPage(service) {
  if (!service) return notFoundPage();
  return `<section class="section"><div class="container detail-layout"><div><a class="back-link" href="#services">← Back to services</a><span class="detail-label">${service.category}</span><h1>${service.name}</h1><p class="detail-copy">${service.description}</p><h2>What you can expect</h2><ul class="benefits">${service.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}</ul><a class="button coral" href="#request/${service.id}">Request this service <span aria-hidden="true">↗</span></a></div><aside class="detail-aside"><h3>Ready to get started?</h3><p>Send a few details about what you need. The service will be selected for you in the request form.</p><a class="text-link" href="#request/${service.id}">Go to request form <span aria-hidden="true">→</span></a></aside></div></section>`;
}

function requestPage(service) {
  if (!service) return notFoundPage();
  const serviceOptions = services.map((availableService) => `<option value="${availableService.id}"${availableService.id === service.id ? " selected" : ""}>${availableService.name}</option>`).join("");
  return `<section class="section"><div class="container form-layout"><div><a class="back-link" href="#service/${service.id}">← Back to ${service.name}</a><p class="eyebrow">Request a service</p><h1>Let’s get started.</h1><p class="form-intro">Tell us a little about what you need. We will use these details to understand your request.</p><form id="request-form" class="request-form" novalidate><div class="field"><label for="service">Selected service</label><select id="service" name="service">${serviceOptions}</select></div><div class="form-row"><div class="field"><label for="name">Name <span class="required">*</span></label><input id="name" name="name" autocomplete="name" required></div><div class="field"><label for="contact">Email or phone <span class="required">*</span></label><input id="contact" name="contact" autocomplete="email" required></div></div><div class="field"><label for="message">What would you like help with? <span class="required">*</span></label><textarea id="message" name="message" required></textarea></div><p id="form-error" class="form-error" role="alert">Please complete the required fields before sending your request.</p><button class="button coral" type="submit">Send request <span aria-hidden="true">↗</span></button><p class="form-note">Required fields are marked with an asterisk.</p></form></div></div></section>`;
}

function confirmationPage() {
  return `<section class="section"><div class="container"><div class="confirmation"><div class="confirmation-icon" aria-hidden="true">✓</div><p class="eyebrow">Request received</p><h1>Thanks for getting in touch.</h1><p>Your service request has been submitted. We have the details and will be in touch using the contact information you provided.</p><a class="button" href="#services">Browse more services <span aria-hidden="true">→</span></a></div></div></section>`;
}

function aboutPage() {
  return `<section class="page-header"><div class="container"><p class="eyebrow">A little about us</p><h1>Practical help, made personal.</h1><p>Kindred brings together straightforward services for the everyday things that deserve a little more care.</p></div></section><section class="section"><div class="container about-layout"><div><h2>Start with a conversation.</h2><p>Every request begins with understanding what you need. Browse our services, choose the closest fit, and share a few details so we can take the next step with you.</p><p>We keep the process simple, clear, and focused on the service you are looking for.</p></div><aside class="contact-panel"><h3>Contact</h3><ul class="contact-list"><li><strong>Email</strong><a href="mailto:hello@kindred.example">hello@kindred.example</a></li><li><strong>Phone</strong><a href="tel:+10000000000">+1 (000) 000-0000</a></li></ul></aside></div></section>`;
}

function notFoundPage() {
  return `<section class="section"><div class="container confirmation"><p class="eyebrow">Page not found</p><h1>Let’s find the right place.</h1><p>The page you are looking for is not available.</p><a class="button" href="#home">Go home</a></div></section>`;
}

function renderServices() {
  const results = document.querySelector("#service-results");
  const search = document.querySelector("#service-search");
  const filters = document.querySelector("#filters");
  const categories = ["All", ...new Set(services.map((service) => service.category))];
  let activeCategory = "All";
  filters.innerHTML = categories.map((category) => `<button class="filter-button${category === "All" ? " active" : ""}" type="button" data-category="${category}">${category}</button>`).join("");
  function update() {
    const query = search.value.toLowerCase().trim();
    const matching = services.filter((service) => (activeCategory === "All" || service.category === activeCategory) && `${service.name} ${service.short}`.toLowerCase().includes(query));
    results.innerHTML = matching.length ? matching.map(serviceCard).join("") : `<div class="empty-state">No services match that search yet.</div>`;
  }
  filters.addEventListener("click", (event) => { const button = event.target.closest("button"); if (!button) return; activeCategory = button.dataset.category; filters.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button)); update(); });
  search.addEventListener("input", update);
  update();
}

function render() {
  const hashParts = location.hash.replace(/^#/, "").split("/");
  const route = hashParts[0] || "home";
  const id = hashParts[1];
  if (route === "home" || route === "services") app.innerHTML = route === "services" ? servicesPage() : homePage();
  else if (route === "service") app.innerHTML = detailPage(getService(id));
  else if (route === "request") app.innerHTML = requestPage(getService(id));
  else if (route === "confirmation") app.innerHTML = confirmationPage();
  else if (route === "about") app.innerHTML = aboutPage();
  else app.innerHTML = notFoundPage();
  updateNavigation(route);
  app.focus();
  if (route === "services") renderServices();
  const form = document.querySelector("#request-form");
  if (form) form.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredFields = [...form.querySelectorAll("[required]")];
    const valid = requiredFields.every((field) => field.value.trim());
    const formError = document.querySelector("#form-error");
    formError.classList.toggle("visible", !valid);
    if (!valid) return;
    location.hash = "confirmation";
  });
}

function updateNavigation(route) {
  document.querySelectorAll("[data-nav]").forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${route || "home"}`));
  mainNav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => { const open = mainNav.classList.toggle("open"); menuToggle.setAttribute("aria-expanded", String(open)); });
window.addEventListener("hashchange", render);
render();
