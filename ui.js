// Handles all DOM work: rendering, event listeners, search/sort/pagination.

import {
  initTasks,
  onTasksChanged,
  addTask,
  editTask,
  deleteTask,
  toggleTaskComplete,
  undo,
  redo,
  canUndo,
  canRedo,
  getAllTasks,
  replaceAllTasks
} from "./tasks.js";

import { debounce } from "./utils.js";
import { applyTranslations, initLanguageSelect, saveLang } from "./i18n.js";

// How many tasks to show per page
const PAGE_SIZE = 5;

export function initApp() {
  const elements = getDomElements();
  const viewState = getInitialViewState();

  subscribeToTaskChanges(viewState, elements);
  initializeTasksAndLanguage(elements);
  setupAllEventListeners(viewState, elements);
}

function getDomElements() {
  return {
    taskForm: document.getElementById("task-form"),
    taskInput: document.getElementById("task-input"),
    taskList: document.getElementById("task-list"),

    searchInput: document.getElementById("search-input"),
    sortSelect: document.getElementById("sort-select"),

    filterAllBtn: document.getElementById("filter-all"),
    filterActiveBtn: document.getElementById("filter-active"),
    filterCompletedBtn: document.getElementById("filter-completed"),

    undoBtn: document.getElementById("undo-btn"),
    redoBtn: document.getElementById("redo-btn"),

    prevBtn: document.getElementById("prev-page"),
    nextBtn: document.getElementById("next-page"),
    pageInfo: document.getElementById("page-info"),

    langSelect: document.getElementById("lang-select"),

    exportBtn: document.getElementById("export-json"),
    importBtn: document.getElementById("import-json"),
    demoBtn: document.getElementById("demo-tests"),
  };
}

function getInitialViewState() {
  return {
    search: "",
    sort: "default",
    filter: "all", // all | active | completed
    page: 1,
    tasks: []
  };
}

function subscribeToTaskChanges(viewState, elements) {
  onTasksChanged(tasks => {
    viewState.tasks = tasks;
    render(viewState, elements);
  });
}

function initializeTasksAndLanguage(elements) {
  initTasks();
  initLanguageSelect(elements.langSelect);
}

function setupAllEventListeners(viewState, elements) {
  setupTaskFormListener(viewState, elements);
  setupSearchListener(viewState, elements);
  setupSortListener(viewState, elements);
  setupFilterListeners(viewState, elements);
  setupUndoRedoListeners(elements);
  setupPaginationListeners(viewState, elements);
  setupLanguageListener(elements);
  setupExportImportListeners(viewState, elements);
  setupDemoListener(viewState, elements);
  setupTaskListListeners(viewState, elements);
}

function setupTaskFormListener(viewState, elements) {
  elements.taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTask(elements.taskInput.value);
    elements.taskInput.value = "";
    elements.taskInput.focus();
  });
}
