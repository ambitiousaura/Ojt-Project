// Very simple i18n helper for English + Hindi.

const translations = {
  en: {
    title: "SYNCLY",
    languageLabel: "Language",
    newTaskLabel: "New task",
    addButton: "Add",
    sortLabel: "Sort",
    undoButton: "Undo",
    redoButton: "Redo",
    previousButton: "Previous",
    nextButton: "Next"
  },
  hi: {
    title: "SYNCLY",
    languageLabel: "भाषा",
    newTaskLabel: "नया कार्य",
    addButton: "जोड़ें",
    sortLabel: "क्रमबद्ध करें",
    undoButton: "पूर्ववत करें",
    redoButton: "फिर से करें",
    previousButton: "पिछला",
    nextButton: "अगला"
  }
};

const LANG_STORAGE_KEY = "task-board-lang";

function getSavedLang() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && translations[saved]) {
    return saved;
  }
  return "en";
}

export function saveLang(lang) {
  localStorage.setItem(LANG_STORAGE_KEY, lang);
}

// Main function: change text on the page
export function applyTranslations(lang) {
  const chosen = translations[lang] ? lang : "en";
  const t = translations[chosen];

  const titleEl = document.querySelector("[data-i18n='title']");
  if (titleEl) titleEl.textContent = t.title;

  const langLabel = document.querySelector("[data-i18n='languageLabel']");
  if (langLabel) langLabel.textContent = t.languageLabel;

  const newTaskLabel = document.querySelector("[data-i18n='newTaskLabel']");
  if (newTaskLabel) newTaskLabel.textContent = t.newTaskLabel;

  const addBtn = document.querySelector("[data-i18n='addButton']");
  if (addBtn) addBtn.textContent = t.addButton;

  const sortLabel = document.querySelector("[data-i18n='sortLabel']");
  if (sortLabel) sortLabel.textContent = t.sortLabel;

  const undoBtn = document.querySelector("[data-i18n='undoButton']");
  if (undoBtn) undoBtn.textContent = t.undoButton;

  const redoBtn = document.querySelector("[data-i18n='redoButton']");
  if (redoBtn) redoBtn.textContent = t.redoButton;

  const prevBtn = document.querySelector("[data-i18n='previousButton']");
  if (prevBtn) prevBtn.textContent = t.previousButton;

  const nextBtn = document.querySelector("[data-i18n='nextButton']");
  if (nextBtn) nextBtn.textContent = t.nextButton;
}

// Helper to set initial language when app loads
export function initLanguageSelect(selectElement) {
  const savedLang = getSavedLang();
  if (selectElement) {
    selectElement.value = savedLang;
  }
  applyTranslations(savedLang);
}