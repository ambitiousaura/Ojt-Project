SYNCLY - Modular Task Board


SYNCLY is a lightweight, framework-free task management application built entirely with Vanilla JavaScript (ES6 Modules), HTML5, and CSS3. It is designed to demonstrate modern web development fundamentals including modular architecture, state management, accessibility (a11y), and data persistence.


🚀 Features
Core Task Management: Add, Edit, Delete, and toggle "Mark as Complete".

Undo & Redo System: Robust stack-based history to reverse destructive actions.

Smart Search: Debounced search bar for optimized performance while typing.

Advanced Sorting & Filtering:

Filter by: All, Active, Completed.

Sort by: Newest, A-Z, Z-A, Completion Status.

Pagination: Handles large lists efficiently by displaying tasks in pages.

Internationalization (i18n): Instant switching between English and Hindi.

Data Persistence: Auto-saves all data to the browser's localStorage.

Data Portability: Export and Import your tasks via JSON for backup.

Developer Tools: Built-in "Demo Mode" to populate the board with test data for debugging.

Accessible Design: Semantic HTML, high-contrast colors, and ARIA labels for screen readers.



🛠️ Tech Stack
Frontend: HTML5, CSS3 (Grid/Flexbox).

Logic: Vanilla JavaScript (ES6 Modules).

Storage: Web Storage API (localStorage).

Versioning: Git.

No external frameworks or libraries used.



📂 Project Structure
The project uses a Modular Architecture to keep concerns separated:

/
├── index.html      # Main entry point (HTML Skeleton)
├── style.css       # Global styles, variables, and responsive layout
├── app.js          # Bootstrapper (Initializes the app)
├── ui.js           # View Layer (DOM manipulation, Event Listeners, Rendering)
├── tasks.js        # Model Layer (State management, Undo/Redo Stacks)
├── storage.js      # Service Layer (Handles LocalStorage Input/Output)
├── utils.js        # Helpers (Debounce function)
└── i18n.js         # Translation logic (English/Hindi dictionary)


⚙️ Installation & Setup
Because this project uses ES6 Modules (type="module"), it cannot be run directly by opening the file in a browser (due to CORS security policies). You must serve it over a local server.



Prerequisites
VS Code (Recommended IDE)

Live Server Extension for VS Code.

Steps to Run
Clone the repository:

Bash

git clone <your-repo-link>
cd syncly-task-board
Open in VS Code: Open the project folder in Visual Studio Code.

Start Local Server:

Right-click on index.html.

Select "Open with Live Server".

The app will automatically open in your default browser at http://127.0.0.1:5500.




📖 Usage Guide
Adding Tasks: Type in the input box and press Enter or click "Add".

Undo/Redo: If you accidentally delete or edit a task, use the Undo button in the top bar.

Search: Start typing in the search bar. The list filters automatically (with a 300ms debounce delay).

Language: Use the dropdown in the top right to switch the interface to Hindi.

Backup: Click "Export JSON" to copy your data. Save it to a text file. To restore, click "Import JSON" and paste the data back.



🧪 Testing
The app includes a built-in Smoke Test:

Click the "Quick e2e smoke test" link in the settings panel.

This will instantly generate demo tasks.

Use this data to verify pagination, sorting, and bulk deletion.



🤝 Contributing
Fork the repository.

Create a feature branch (git checkout -b feature-name).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature-name).

Open a Pull Request.




📄 License
This project is open-source and available for educational purposes.
