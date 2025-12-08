// Handles saving and loading tasks from localStorage.

const STORAGE_KEY = "task-board-tasks";

export function loadTasks() {
  console.log("loadTasks called"); // Debug log
  const json = localStorage.getItem(STORAGE_KEY);

  if (!json) {
    return [];
  }

  try {
    const tasks = JSON.parse(json);
    if (Array.isArray(tasks)) {
      return tasks;
    }
    return [];
  } catch (error) {
    console.error("Could not parse tasks from localStorage", error);
    return [];
  }
}

export function saveTasks(tasks) {
  console.log("saveTasks called", tasks); // Debug log
  const json = JSON.stringify(tasks);
  localStorage.setItem(STORAGE_KEY, json);
}
