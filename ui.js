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
