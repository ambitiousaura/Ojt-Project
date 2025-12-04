# SYNCLY - Task Management Application

A modern, feature-rich task management web application built with vanilla JavaScript, HTML, and CSS. SYNCLY helps you organize, prioritize, and track your tasks efficiently with an intuitive interface and powerful features.

**Repository:** [ambitiousaura/Ojt-Project](https://github.com/ambitiousaura/Ojt-Project)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Features Explained](#features-explained)
- [Architecture & Code Organization](#architecture--code-organization)
- [Keyboard & Performance Optimizations](#keyboard--performance-optimizations)
- [Future Enhancements](#future-enhancements)

---

## ✨ Features

### Core Task Management
- **Add Tasks**: Quickly create new tasks with a simple input field
- **Mark as Complete**: Toggle task completion status with a single click
- **Edit Tasks**: Modify task descriptions using an intuitive modal dialog
- **Delete Tasks**: Remove unwanted tasks from your list
- **Task Persistence**: All tasks are saved to browser localStorage automatically

### Advanced Filtering & Search
- **Filter Options**: View all tasks, only active tasks, or only completed tasks
- **Real-time Search**: Search through tasks as you type with debounced input
- **Smart Filtering**: Combine search filters for precise task discovery

### Sorting Capabilities
- **Sort by Default**: Display tasks in the order they were created
- **Alphabetical Sort (A→Z)**: Organize tasks alphabetically
- **Reverse Alphabetical (Z→A)**: Sort in reverse order
- **Completed First**: Prioritize completed tasks at the top

### Undo & Redo Functionality
- **Full History Tracking**: Undo and redo any action performed on tasks
- **Stack-based Implementation**: Professional-grade undo/redo system using state snapshots
- **Smart Button States**: Buttons automatically disable when no actions are available

### User Interface Enhancements
- **Dark/Light Theme Toggle**: Switch between professional light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Multilingual Support**: English and Hindi language options
- **Sticky Settings Panel**: Quick access to controls while browsing tasks
- **Smooth Animations**: Polished transitions and visual feedback

### Pagination
- **Organized Display**: Shows 5 tasks per page for better readability
- **Easy Navigation**: Previous/Next buttons for browsing multiple pages
- **Page Indicators**: See current position in task list (e.g., "Page 1 of 3")
- **Smart Reset**: Pagination resets when applying filters or searches

### Data Management
- **Export to JSON**: Save all tasks to a JSON file for backup
- **Import from JSON**: Load previously saved tasks
- **Demo Data Generator**: Populate app with sample tasks for testing

---

## 🛠️ Technology Stack

### Frontend Technologies
- **HTML5**: Semantic markup with accessibility attributes
- **CSS3**: Advanced styling with CSS custom properties (variables) and animations
- **Vanilla JavaScript (ES6+)**: No frameworks or libraries required
- **ES6 Modules**: Organized code structure with import/export

### Storage & Data
- **localStorage**: Persistent client-side data storage
- **JSON**: Data serialization format

### Key Techniques
- **Pub-Sub Pattern**: Event-driven architecture for reactive updates
- **Debouncing**: Optimized search input handling
- **State Management**: Centralized view state for predictable updates
- **Snapshot-based Undo/Redo**: Professional history management

---

## 📁 Project Structure

```
SYNCLY/
├── index.html            # Main HTML entry point
├── styles.css            # Complete stylesheet with themes
├── main.js               # Application entry point
├── ui.js                 # DOM manipulation and rendering
├── tasks.js              # Task data management and CRUD operations
├── storage.js            # localStorage persistence layer
├── i18n.js               # Internationalization (English & Hindi)
└── utils.js              # Helper utilities (debounce)
```

### File Purposes

**index.html**
- Semantic HTML5 structure
- ARIA labels for accessibility
- Form controls with proper labeling
- Modal for task editing
- References to CSS and JavaScript modules

**styles.css**
- CSS custom properties for theming
- Light and dark mode implementations
- Responsive grid layouts
- Component-based styling (panels, buttons, forms)
- Smooth transitions and animations
- Mobile-first media queries

**main.js**
- Entry point for the application
- Waits for DOM content to load before initializing the app

**ui.js** (Main Application Logic)
- Handles all DOM queries and element references
- Manages view state (search, sort, filter, pagination, page)
- Sets up event listeners for all user interactions
- Renders tasks based on current filter/sort/search state
- Implements pagination logic
- Manages modal dialogs for editing
- Theme toggle functionality

**tasks.js** (Data Management)
- In-memory task storage
- CRUD operations (Create, Read, Update, Delete)
- Pub-Sub pattern for change notifications
- Stack-based undo/redo system
- JSON serialization and deserialization
- localStorage integration

**storage.js** (Persistence Layer)
- Saves tasks to localStorage
- Loads tasks from localStorage on startup
- Error handling for corrupted data

**i18n.js** (Internationalization)
- Translation objects for English and Hindi
- Dynamic text replacement based on selected language
- Language preference persistence

**utils.js** (Utilities)
- Debounce function for search optimization

---

## ⚙️ Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ambitiousaura/Ojt-Project.git
   cd Ojt-Project
   ```

2. **Open in browser (recommended: serve from root)**
   ```bash
   # GitHub Pages expects a file named `index.html` at the repository root.
   # Option 1: Double-click `index.html` to open locally (file://)
   # Option 2: Run a local static server (recommended)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Start using SYNCLY**
   - Enter a task in the input field
   - Click "Add" or press Enter
   - Begin managing your tasks!

---

## 💡 Usage Guide

### Adding Tasks
1. Type your task description in the "New task" input field
2. Click the "Add" button or press **Enter**
3. Your task appears at the top of the list

### Completing Tasks
- Click the checkbox next to a task to mark it as complete
- Completed tasks display with strikethrough text
- Click again to unmark as complete

### Editing Tasks
1. Click the "Edit" button on any task
2. Modify the task description in the modal dialog
3. Click "Save" to confirm or "Cancel" to discard changes

### Deleting Tasks
- Click the "Delete" button (trash icon) on any task
- Task is immediately removed from the list

### Searching Tasks
1. Type in the search box to filter tasks in real-time
2. Search filters across all task descriptions
3. Clear the search to see all tasks again

### Sorting Tasks
1. Click the "Sort" dropdown menu
2. Choose from:
   - **Newest**: Most recently added tasks first
   - **A → Z**: Alphabetical order
   - **Z → A**: Reverse alphabetical order
   - **Completed first**: Completed tasks listed first

### Filtering Tasks
- **All**: Display every task in your list
- **Active**: Show only incomplete tasks
- **Completed**: Show only finished tasks

### Undo & Redo
- **Undo button**: Reverse the last action
- **Redo button**: Restore an undone action
- Buttons automatically disable when no history is available

### Pagination
- **Previous** button: Move to the previous page
- **Next** button: Move to the next page
- Page indicator shows your current position

### Themes
- Click the theme toggle button in the top bar
- Switch between light mode (blue tones) and dark mode (dark slates)
- Your preference is saved automatically

### Language
- Select "Language" dropdown in the top bar
- Choose between English and Hindi
- UI text updates instantly

### Export & Import
- **Export**: Save all your tasks as a JSON file for backup
- **Import**: Load tasks from a previously exported JSON file

---

## 🔧 Features Explained

### Architecture: Pub-Sub Pattern

The application uses the Pub-Sub (Publisher-Subscriber) pattern for reactive updates:

```
User Action → tasks.js (Model) → Notify Subscribers → ui.js (View) → Re-render DOM
```

When a task is created, edited, or deleted:
1. The action is performed in the task data layer
2. All subscribers are notified of the change
3. The UI re-renders with the updated task list
4. The view state (page, filter, sort) is maintained

### Undo & Redo Implementation

The undo/redo system uses snapshot-based state management:

```
undo() → Save current state to redo stack
       → Pop previous state from undo stack
       → Restore previous state to tasks array

redo() → Save current state to undo stack
      → Pop next state from redo stack
      → Restore next state to tasks array
```

Each action creates a JSON snapshot of the entire tasks array before modification, enabling perfect restoration of any previous state.

### Search & Filter Logic

Tasks are filtered through multiple layers:

1. **By completion status** (active/completed/all)
2. **By search query** (case-insensitive substring matching)
3. **By sort order** (newest/alphabetical/completed first)
4. **By pagination** (5 tasks per page)

### Debouncing Search

The search input uses a 200ms debounce to prevent excessive re-renders:
- User types → 200ms wait with no more input → Search executes
- Optimizes performance during rapid typing
- Improves browser responsiveness

### CSS Custom Properties (Variables)

The theme system uses CSS variables for easy switching:

```css
:root {
  --bg-primary: #f3f4f8;
  --text-primary: #222;
  --border-primary: #e2e5f0;
  ...
}

body.dark-theme {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  --border-primary: #334155;
  ...
}
```

All components reference these variables, enabling theme-wide changes with a single class toggle.

---

## ⌨️ Keyboard & Performance Optimizations

### Keyboard Support
- **Enter** to submit the task form
- **Tab** to navigate between form elements
- **Focus visible** indicators for accessibility

### Performance Features
- **Debounced search**: Reduces unnecessary renders (200ms delay)
- **Efficient DOM queries**: Elements cached at startup
- **Modular code**: Only necessary modules loaded
- **JSON snapshots for undo/redo**: Faster than tracking individual changes

### Accessibility Features
- **ARIA labels**: Screen reader support
- **Semantic HTML**: Proper heading hierarchy and form labels
- **Keyboard navigation**: Full keyboard support
- **Color contrast**: Meets WCAG accessibility standards
- **Focus indicators**: Visual feedback for keyboard users

---

## 🚀 Future Enhancements

Potential features for future development:

1. **Task Metadata**
   - Due dates and reminders
   - Priority levels (high, medium, low)
   - Tags and categories
   - Task descriptions

2. **Recurring Tasks**
   - Daily, weekly, monthly recurring tasks
   - Smart schedule management

3. **Collaboration**
   - Share task lists with others
   - Real-time synchronization
   - Comments and notes on tasks

4. **Integration**
   - Calendar integration (Google Calendar, Outlook)
   - Email notifications
   - Mobile app versions

5. **Analytics**
   - Productivity insights
   - Task completion statistics
   - Time tracking

6. **Cloud Sync**
   - Cloud storage integration
   - Cross-device synchronization
   - Backup and restore features

---

## 📝 License

This project is open source and available at [GitHub - ambitiousaura/Ojt-Project](https://github.com/ambitiousaura/Ojt-Project).

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests for any improvements or bug fixes.

---

**Built with ❤️ using vanilla JavaScript, HTML, and CSS**

*Last Updated: December 2025*