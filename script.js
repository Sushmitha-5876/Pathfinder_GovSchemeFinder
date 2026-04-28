const state = {
  profile: {
    age: "",
    gender: "",
    category: "",
    state: "",
    income: "",
    occupation: ""
  },
  query: "",
  activeCategory: "all",
  sortBy: "match",
  saved: JSON.parse(localStorage.getItem("savedSchemes") || "[]")
};

const translations = {
  en: {
    heroTitle: "Find Government Schemes You Are Eligible For",
    heroSubtitle: "Answer simple questions and discover central and state welfare schemes for education, health, agriculture, women, housing, finance and more."
  },
  hi: {
    heroTitle: "अपनी पात्रता के अनुसार सरकारी योजनाएं खोजें",
    heroSubtitle: "आसान सवालों के जवाब दें और शिक्षा, स्वास्थ्य, कृषि, महिला, आवास और वित्त योजनाएं खोजें."
  },
  kn: {
    heroTitle: "ನಿಮಗೆ ಅರ್ಹವಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ",
    heroSubtitle: "ಸರಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ ಶಿಕ್ಷಣ, ಆರೋಗ್ಯ, ಕೃಷಿ, ಮಹಿಳಾ, ವಸತಿ ಮತ್ತು ಹಣಕಾಸು ಯೋಜನೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ."
  }
};

const categoryIcons = {
  education: "🎓",
  health: "⚕",
  agriculture: "🌿",
  women: "♀",
  finance: "₹",
  housing: "⌂"
};

const els = {
  form: document.querySelector("#profileForm"),
  grid: document.querySelector("#schemeGrid"),
  savedList: document.querySelector("#savedList"),
  resultCount: document.querySelector("#resultCount"),
  searchInput: document.querySelector("#searchInput"),
  searchBtn: document.querySelector("#searchBtn"),
  sortSelect: document.querySelector("#sortSelect"),
  resetBtn: document.querySelector("#resetBtn"),
  exportBtn: document.querySelector("#exportBtn"),
  modal: document.querySelector("#schemeModal"),
  modalContent: document.querySelector("#modalContent"),
  modalClose: document.querySelector("#modalClose"),
  loginBtn: document.querySelector("#loginBtn"),
  loginModal: document.querySelector("#loginModal"),
  loginClose: document.querySelector("#loginClose"),
  loginForm: document.querySelector("#loginForm"),
  loginName: document.querySelector("#loginName"),
  loginContact: document.querySelector("#loginContact"),
  loginStatus: document.querySelector("#loginStatus"),
  chatLog: document.querySelector("#chatLog"),
  chatForm: document.querySelector("#chatForm"),
  chatInput: document.querySelector("#chatInput"),
  assistantToggle: document.querySelector("#assistantToggle"),
  voiceBtn: document.querySelector("#voiceBtn"),
  languageSelect: document.querySelector("#languageSelect"),
  navToggle: document.querySelector("#navToggle"),
  navLinks: document.querySelector("#navLinks")
};

function getProfileFromForm() {
  Object.keys(state.profile).forEach((key) => {
    state.profile[key] = document.querySelector(`#${key}`).value;
  });
}

function scoreScheme(scheme) {
  const profileEntries = Object.entries(state.profile).filter(([, value]) => value);

  if (!profileEntries.length) {
    return 70;
  }

  let possible = 0;
  let matched = 0;

  profileEntries.forEach(([key, value]) => {
    possible += 1;

    if (key === "state") {
      if (value === "all" || scheme.states.includes("all") || scheme.states.includes(value)) {
        matched += 1;
      }
      return;
    }

    if (scheme.rules[key]?.includes(value)) {
      matched += 1;
    }
  });

  return Math.round((matched / possible) * 100);
}

function getFilteredSchemes() {
  const normalizedQuery = state.query.trim().toLowerCase();

  let result = schemes
    .map((scheme) => ({
      ...scheme,
      match: scoreScheme(scheme)
    }))
    .filter((scheme) => state.activeCategory === "all" || scheme.category === state.activeCategory)
    .filter((scheme) => {
      if (!normalizedQuery) return true;
      const haystack = [
        scheme.name,
        scheme.category,
        scheme.provider,
        scheme.benefit,
        scheme.benefitAmount,
        ...scheme.tags
      ].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    })
    .filter((scheme) => scheme.match >= 30);

  if (state.sortBy === "match") {
    result.sort((a, b) => b.match - a.match);
  }

  if (state.sortBy === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (state.sortBy === "category") {
    result.sort((a, b) => a.category.localeCompare(b.category));
  }

  return result;
}

function renderSchemes() {
  const filtered = getFilteredSchemes();
  els.resultCount.textContent = `${filtered.length} schemes found`;

  if (!filtered.length) {
    els.grid.innerHTML = `
      <article class="scheme-card">
        <h3>No matching schemes found</h3>
        <p>Try changing income, occupation, state or category. In a real deployment, this result would query a larger verified scheme database.</p>
      </article>
    `;
    return;
  }

  els.grid.innerHTML = filtered.map((scheme) => `
    <article class="scheme-card ${scheme.category}">
      <div class="scheme-top">
        <div class="scheme-icon">${categoryIcons[scheme.category] || "✓"}</div>
        <div>
          <h3 class="scheme-title">${scheme.name}</h3>
          <div class="scheme-meta">${capitalize(scheme.category)} · ${scheme.provider}</div>
        </div>
        <button class="save-btn" data-save="${scheme.id}" aria-label="Save ${scheme.name}">
          ${state.saved.includes(scheme.id) ? "Saved" : "Save"}
        </button>
      </div>
      <p>${scheme.benefit}</p>
      <div class="match-row">
        <span>Benefits<br>${scheme.benefitAmount}</span>
        <span class="match-score">Eligibility Match<br>${scheme.match}%</span>
      </div>
      <div class="card-actions">
        <button data-details="${scheme.id}">View Details</button>
        <a href="${scheme.link}" data-portal-link>Apply Link</a>
      </div>
    </article>
  `).join("");
}

function renderSaved() {
  const savedSchemes = schemes.filter((scheme) => state.saved.includes(scheme.id));

  if (!savedSchemes.length) {
    els.savedList.innerHTML = `<p>No saved schemes yet. Click Save on any scheme to build your shortlist.</p>`;
    return;
  }

  els.savedList.innerHTML = savedSchemes.map((scheme) => `
    <div class="saved-item">
      <div>
        <strong>${scheme.name}</strong>
        <span>${scheme.benefitAmount} · ${capitalize(scheme.category)}</span>
      </div>
      <button class="link-btn" data-save="${scheme.id}">Remove</button>
    </div>
  `).join("");
}

function openDetails(id) {
  const scheme = schemes.find((item) => item.id === id);
  if (!scheme) return;

  const match = scoreScheme(scheme);
  els.modalContent.innerHTML = `
    <p class="eyebrow">${capitalize(scheme.category)} · ${scheme.provider}</p>
    <h2>${scheme.name}</h2>
    <p>${scheme.benefit}</p>
    <p><strong>Benefit:</strong> ${scheme.benefitAmount}</p>
    <p><strong>Your eligibility match:</strong> ${match}%</p>
    <div class="modal-columns">
      <div>
        <h3>Eligibility</h3>
        <ul>${scheme.eligibility.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div>
        <h3>Documents</h3>
        <ul>${scheme.documents.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div>
        <h3>How to apply</h3>
        <ol>${scheme.steps.map((item) => `<li>${item}</li>`).join("")}</ol>
      </div>
      <div>
        <h3>Official link</h3>
        <p>Use the official link and verify the latest rules before applying.</p>
        <a class="primary-btn" href="${scheme.link}" data-portal-link>Open Portal</a>
      </div>
    </div>
  `;
  els.modal.showModal();
}

function toggleSaved(id) {
  if (state.saved.includes(id)) {
    state.saved = state.saved.filter((savedId) => savedId !== id);
  } else {
    state.saved.push(id);
  }

  localStorage.setItem("savedSchemes", JSON.stringify(state.saved));
  renderSchemes();
  renderSaved();
}

function addMessage(text, type = "bot") {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  els.chatLog.appendChild(message);
  els.chatLog.scrollTop = els.chatLog.scrollHeight;
}

function answerAssistant(question) {
  const q = question.toLowerCase();
  const topSchemes = getFilteredSchemes().slice(0, 3);

  if (q.includes("document")) {
    return topSchemes.length
      ? `For your top match, keep these ready: ${topSchemes[0].documents.join(", ")}.`
      : "Fill your profile first so I can suggest the correct document list.";
  }

  if (q.includes("apply") || q.includes("how")) {
    return topSchemes.length
      ? `Start with ${topSchemes[0].name}: ${topSchemes[0].steps.join(" ")}`
      : "Use Check Eligibility first, then open View Details for step-by-step application guidance.";
  }

  if (q.includes("farmer")) {
    state.activeCategory = "agriculture";
    setActiveCategoryButton();
    renderSchemes();
    return "I filtered agriculture schemes. Add your state and income for better farmer scheme matching.";
  }

  if (q.includes("student") || q.includes("scholarship")) {
    state.activeCategory = "education";
    setActiveCategoryButton();
    renderSchemes();
    return "I filtered education schemes. Choose occupation as Student and income level for stronger matches.";
  }

  if (q.includes("women") || q.includes("girl")) {
    state.activeCategory = "women";
    setActiveCategoryButton();
    renderSchemes();
    return "I filtered women-focused schemes. Select gender and age to refine eligibility.";
  }

  return topSchemes.length
    ? `Based on your current profile, top options are: ${topSchemes.map((scheme) => `${scheme.name} (${scheme.match}%)`).join(", ")}.`
    : "Tell me your age, income, state and occupation, then I will suggest relevant schemes.";
}

function setActiveCategoryButton() {
  document.querySelectorAll(".category-tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.category === state.activeCategory);
  });
}

function exportResults() {
  const printable = getFilteredSchemes().slice(0, 8).map((scheme) => (
    `${scheme.name}\nCategory: ${capitalize(scheme.category)}\nBenefit: ${scheme.benefitAmount}\nMatch: ${scheme.match}%\nApply: ${scheme.link}`
  )).join("\n\n");

  const report = `
SchemeFinder Eligibility Report
Generated from your current profile

${printable || "No schemes found."}

Note: Verify latest official rules before final application.
  `.trim();

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`<pre style="font-family: Arial; white-space: pre-wrap; line-height: 1.6">${report}</pre>`);
  printWindow.document.close();
  printWindow.print();
}

function setupVoiceSearch() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    els.voiceBtn.title = "Voice search is not supported in this browser.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.interimResults = false;

  els.voiceBtn.addEventListener("click", () => {
    els.voiceBtn.textContent = "…";
    recognition.start();
  });

  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript;
    els.searchInput.value = transcript;
    state.query = transcript;
    renderSchemes();
  });

  recognition.addEventListener("end", () => {
    els.voiceBtn.textContent = "🎙";
  });
}

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = translations[lang]?.[key] || translations.en[key];
  });
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function bindEvents() {
  els.form.addEventListener("submit", (event) => {
    event.preventDefault();
    getProfileFromForm();
    renderSchemes();
    addMessage("I updated your matches using your profile. Open View Details for eligibility, documents and application steps.");
    document.querySelector("#schemes").scrollIntoView({ behavior: "smooth" });
  });

  els.searchBtn.addEventListener("click", () => {
    state.query = els.searchInput.value;
    renderSchemes();
  });

  els.searchInput.addEventListener("input", () => {
    state.query = els.searchInput.value;
    renderSchemes();
  });

  document.querySelector(".category-tabs").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    state.activeCategory = button.dataset.category;
    setActiveCategoryButton();
    renderSchemes();
  });

  document.body.addEventListener("click", (event) => {
    const saveButton = event.target.closest("[data-save]");
    const detailsButton = event.target.closest("[data-details]");

    if (saveButton) {
      toggleSaved(saveButton.dataset.save);
    }

    if (detailsButton) {
      openDetails(detailsButton.dataset.details);
    }
  });

  document.body.addEventListener("click", (event) => {
    const portalLink = event.target.closest("[data-portal-link]");
    if (!portalLink) return;

    event.preventDefault();
    window.location.href = portalLink.href;
  });

  els.sortSelect.addEventListener("change", () => {
    state.sortBy = els.sortSelect.value;
    renderSchemes();
  });

  els.resetBtn.addEventListener("click", () => {
    els.form.reset();
    Object.keys(state.profile).forEach((key) => {
      state.profile[key] = "";
    });
    state.query = "";
    state.activeCategory = "all";
    els.searchInput.value = "";
    setActiveCategoryButton();
    renderSchemes();
  });

  els.exportBtn.addEventListener("click", exportResults);

  els.modalClose.addEventListener("click", () => els.modal.close());

  els.loginBtn.addEventListener("click", () => {
    const savedUser = JSON.parse(localStorage.getItem("schemeFinderUser") || "null");
    els.loginStatus.textContent = savedUser
      ? `Logged in locally as ${savedUser.name}.`
      : "";
    els.loginModal.showModal();
  });

  els.loginClose.addEventListener("click", () => els.loginModal.close());

  els.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = {
      name: els.loginName.value.trim(),
      contact: els.loginContact.value.trim()
    };

    localStorage.setItem("schemeFinderUser", JSON.stringify(user));
    els.loginStatus.textContent = `Welcome, ${user.name}. Your demo profile is saved in this browser.`;
    els.loginBtn.textContent = user.name;
  });

  els.chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = els.chatInput.value.trim();
    if (!question) return;
    addMessage(question, "user");
    els.chatInput.value = "";
    setTimeout(() => addMessage(answerAssistant(question)), 350);
  });

  els.assistantToggle.addEventListener("click", () => {
    document.querySelector(".assistant-card").classList.toggle("is-minimized");
  });

  els.languageSelect.addEventListener("change", () => {
    applyLanguage(els.languageSelect.value);
  });

  els.navToggle.addEventListener("click", () => {
    const isOpen = els.navLinks.classList.toggle("open");
    els.navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

bindEvents();
setupVoiceSearch();
applyLanguage("en");
renderSchemes();
renderSaved();
addMessage("Hello! I can help you find schemes. Fill your profile or ask me about student, farmer, women, documents or how to apply.");
