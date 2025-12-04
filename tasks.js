// This module keeps task data in memory and talks to storage.
// It also implements undo and redo using stacks.

import { loadTasks, saveTasks } from "./storage.js";

let tasks = [];
const listeners = [];

// Each element in these stacks is a JSON string snapshot of the tasks array.
const undoStack = [];
const redoStack = [];

// Call this at start to load tasks from localStorage.
export function initTasks() {
  tasks = loadTasks();
  notify();
}

// Simple pub-sub: UI registers a callback to be called on every change.
export function onTasksChanged(callback) {
  listeners.push(callback);
  // Immediately call once so UI can render current state.
  callback(tasks);
}

function notify() {
  for (let i = 0; i < listeners.length; i++) {
    listeners[i](tasks);
  }
}

function save() {
  saveTasks(tasks);
  notify();
}

// Save current tasks array as a snapshot before we change it.
function saveStateForUndo() {
  const snapshot = JSON.stringify(tasks);
  undoStack.push(snapshot);
  // Whenever a new action happens, redo is cleared.
  redoStack.length = 0;
}

// Public helper so UI can know whether to enable/disable buttons.
export function canUndo() {
  return undoStack.length > 0;
}

export function canRedo() {
  return redoStack.length > 0;
}

/* CRUD operations */

export function addTask(text) {
  const trimmed = text.trim();
  if (trimmed === "") {
    return;
  }

  saveStateForUndo();

  const newTask = {
    id: Date.now().toString(), // simple unique id
    text: trimmed,
    completed: false
  };

  // Add to the start so newest is on top.
  tasks.unshift(newTask);
  save();
}

export function toggleTaskComplete(id) {
  saveStateForUndo();

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed;
      break;
    }
  }

  save();
}

export function deleteTask(id) {
  saveStateForUndo();

  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  save();
}

export function editTask(id, newText) {
  const trimmed = newText.trim();
  if (trimmed === "") {
    return;
  }

  saveStateForUndo();

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].text = trimmed;
      break;
    }
  }

  save();
}

/* Undo and Redo */

export function undo() {
  if (!canUndo()) {
    return;
  }

  // Save current state into redo stack
  const currentSnapshot = JSON.stringify(tasks);
  redoStack.push(currentSnapshot);

  // Restore previous state from undo stack
  const previousSnapshot = undoStack.pop();
  tasks = JSON.parse(previousSnapshot);

  saveTasks(tasks);
  notify();
}

export function redo() {
  if (!canRedo()) {
    return;
  }

  // Save current state into undo stack
  const currentSnapshot = JSON.stringify(tasks);
  undoStack.push(currentSnapshot);

  // Restore state from redo stack
  const nextSnapshot = redoStack.pop();
  tasks = JSON.parse(nextSnapshot);

  saveTasks(tasks);
  notify();
}

// Return a deep copy of all tasks
export function getAllTasks() {
  return JSON.parse(JSON.stringify(tasks));
}

// Replace all tasks with a new array, reset undo/redo
export function replaceAllTasks(newTasks) {
  tasks = JSON.parse(JSON.stringify(newTasks));
  undoStack.length = 0;
  redoStack.length = 0;
  saveTasks(tasks);
  notify();
}