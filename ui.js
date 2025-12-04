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

function setupSearchListener(viewState, elements) {
  elements.searchInput.addEventListener("input", debounce(function () {
    viewState.search = elements.searchInput.value;
    viewState.page = 1;
    render(viewState, elements);
  }, 200));
}

function setupSortListener(viewState, elements) {
  elements.sortSelect.addEventListener("change", function () {
    viewState.sort = elements.sortSelect.value;
    viewState.page = 1;
    render(viewState, elements);
  });
}

function setupFilterListeners(viewState, elements) {
  elements.filterAllBtn.addEventListener("click", function () {
    viewState.filter = "all";
    viewState.page = 1;
    render(viewState, elements);
  });
  elements.filterActiveBtn.addEventListener("click", function () {
    viewState.filter = "active";
    viewState.page = 1;
    render(viewState, elements);
  });
  elements.filterCompletedBtn.addEventListener("click", function () {
    viewState.filter = "completed";
    viewState.page = 1;
    render(viewState, elements);
  });
}

function setupUndoRedoListeners(elements) {
  elements.undoBtn.addEventListener("click", function () {
    undo();
  });
  elements.redoBtn.addEventListener("click", function () {
    redo();
  });
}

function setupPaginationListeners(viewState, elements) {
  elements.prevBtn.addEventListener("click", function () {
    if (viewState.page > 1) {
      viewState.page--;
      render(viewState, elements);
    }
  });
  elements.nextBtn.addEventListener("click", function () {
    viewState.page++;
    render(viewState, elements);
  });
}

function setupLanguageListener(elements) {
  elements.langSelect.addEventListener("change", function (event) {
    const newLang = event.target.value;
    saveLang(newLang);
    applyTranslations(newLang);
  });
}

function setupExportImportListeners(viewState, elements) {
  elements.exportBtn.addEventListener("click", function () {
    const tasks = getAllTasks();
    const json = JSON.stringify(tasks, null, 2);
    window.alert("A prompt will show your tasks JSON. Copy it to save.");
    window.prompt("Copy your tasks JSON:", json);
  });
  elements.importBtn.addEventListener("click", function () {
    const json = window.prompt("Paste tasks JSON to import:");
    if (!json) return;
    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed)) {
        window.alert("Invalid JSON format. Expected an array.");
        return;
      }
      replaceAllTasks(parsed);
      viewState.page = 1;
    } catch (error) {
      window.alert("Could not parse JSON: " + error.message);
    }
  });
}

function setupDemoListener(viewState, elements) {
  elements.demoBtn.addEventListener("click", function () {
    const sampleTasks = [];
    for (let i = 1; i <= 12; i++) {
      sampleTasks.push({
        id: "demo-" + i,
        text: `[Demo] task ${i}`,
        completed: i % 3 === 0
      });
    }
    replaceAllTasks(sampleTasks);
    viewState.page = 1;
  });
}

function setupTaskListListeners(viewState, elements) {
  elements.taskList.addEventListener("click", function (event) {
    const target = event.target;
    const li = target.closest(".task-item");
    if (!li) return;
    const id = li.dataset.id;
    if (target.classList.contains("edit-btn")) {
      const currentText = li.querySelector(".task-text").textContent;
      const newText = window.prompt("Edit task", currentText);
      if (newText !== null) {
        editTask(id, newText);
      }
    } else if (target.classList.contains("delete-btn")) {
      const ok = window.confirm("Delete this task?");
      if (ok) {
        deleteTask(id);
      }
    }
  });
}

// Apply search, filter, sort, and pagination on the full tasks list
function getVisibleTasks(viewState) {
  const searchLower = viewState.search.toLowerCase();

  // Filter by search text
  let filtered = viewState.tasks.filter(function (task) {
    return task.text.toLowerCase().includes(searchLower);
  });

  // Filter by status (all/active/completed)
  if (viewState.filter === "active") {
    filtered = filtered.filter(function (task) {
      return !task.completed;
    });
  } else if (viewState.filter === "completed") {
    filtered = filtered.filter(function (task) {
      return task.completed;
    });
  }

  // Sorting
  if (viewState.sort === "az") {
    filtered.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    });
  } else if (viewState.sort === "za") {
    filtered.sort(function (a, b) {
      return b.text.localeCompare(a.text);
    });
  } else if (viewState.sort === "completed") {
    filtered.sort(function (a, b) {
      return (b.completed === true) - (a.completed === true);
    });
  }
  // default: newest first, already handled by insertion order.

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (viewState.page > totalPages) {
    viewState.page = totalPages;
  }

  const startIndex = (viewState.page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, endIndex);

  return {
    items: pageItems,
    totalPages: totalPages,
    totalItems: filtered.length
  };
}

// Render function: draws the current view into the DOM
function render(viewState, elements) {
  elements.taskList.innerHTML = "";
  const result = getVisibleTasks(viewState);
  const items = result.items;

  if (items.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No tasks yet.";
    li.className = "task-item empty";
    li.setAttribute("role", "listitem");
    elements.taskList.appendChild(li);
  } else {
    items.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task-item";
      li.setAttribute("role", "listitem");
      li.dataset.id = task.id;

      const label = document.createElement("label");
      label.className = "task-label";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", "Mark task as complete");

      const span = document.createElement("span");
      span.className = "task-text";
      if (task.completed) {
        span.classList.add("completed");
      }
      span.textContent = task.text;

      label.appendChild(checkbox);
      label.appendChild(span);

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.textContent = "Edit";
      editBtn.className = "task-btn edit-btn";

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "task-btn delete-btn";

      li.appendChild(label);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      elements.taskList.appendChild(li);
    });
  }

  // Pagination controls
  elements.pageInfo.textContent = viewState.page + " / " + result.totalPages;
  elements.prevBtn.disabled = viewState.page <= 1;
  elements.nextBtn.disabled = viewState.page >= result.totalPages;

  // Undo/redo buttons
  elements.undoBtn.disabled = !canUndo();
  elements.redoBtn.disabled = !canRedo();

  // Filter chip active state
  elements.filterAllBtn.classList.toggle("chip--active", viewState.filter === "all");
  elements.filterActiveBtn.classList.toggle("chip--active", viewState.filter === "active");
  elements.filterCompletedBtn.classList.toggle("chip--active", viewState.filter === "completed");
}
