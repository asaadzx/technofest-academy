---
title: Final Project — Portfolio Website
description: Build a complete personal portfolio with HTML, CSS, JavaScript, and Flask
order: 11
---

You've learned HTML, CSS, JavaScript, and Flask. Now you'll put it all together into a **personal portfolio website** — a real project you can customize, deploy, and share with employers or college admissions.

## Project Requirements

Build a personal portfolio website with:

### Pages
1. **Home** (`/`) — Hero section with your name, tagline, and a profile image
2. **About** (`/about`) — Bio, skills, and interests
3. **Projects** (`/projects`) — Cards showing 3-4 sample projects
4. **Contact** (`/contact`) — A form that sends a message (saves to JSON file)

### Technical Requirements
1. All pages extend a `base.html` template with a nav bar and footer
2. A single `style.css` for all styling (responsive, mobile-friendly)
3. At least one JavaScript feature (dark mode toggle, smooth scroll, or nav highlight)
4. Flask route for each page
5. Contact form validates on the server and saves submissions to `messages.json`
6. A `/messages` admin page that lists all submitted messages (optional bonus)

## Suggested Structure

```
portfolio/
├── app.py
├── messages.json
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── templates/
    ├── base.html
    ├── home.html
    ├── about.html
    ├── projects.html
    ├── contact.html
    └── messages.html
```

## Starter Code

### app.py

```python
from flask import Flask, render_template, request, flash
import json
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = "portfolio-secret-key-change-in-production"

DATA_FILE = "messages.json"

def load_messages():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE) as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []

def save_message(data):
    messages = load_messages()
    messages.append(data)
    with open(DATA_FILE, "w") as f:
        json.dump(messages, f, indent=2)

@app.route("/")
def home():
    return render_template("home.html", title="Home")

@app.route("/about")
def about():
    skills = ["HTML", "CSS", "JavaScript", "Python", "Flask", "Git"]
    return render_template("about.html", title="About", skills=skills)

@app.route("/projects")
def projects():
    projects_list = [
        {
            "title": "To-Do App",
            "description": "A task manager built with JavaScript",
            "tech": "HTML, CSS, JS",
            "url": "https://github.com/yourusername/todo"
        },
        {
            "title": "Weather Dashboard",
            "description": "Real-time weather data from an API",
            "tech": "JavaScript, Fetch API",
            "url": "https://github.com/yourusername/weather"
        },
        {
            "title": "Blog Platform",
            "description": "A blog with Flask and SQLite",
            "tech": "Python, Flask, SQLite",
            "url": "https://github.com/yourusername/blog"
        }
    ]
    return render_template("projects.html", title="Projects", projects=projects_list)

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        message = request.form.get("message", "").strip()
        errors = []

        if not name:
            errors.append("Name is required.")
        if not email or "@" not in email:
            errors.append("A valid email is required.")
        if not message:
            errors.append("Message is required.")

        if not errors:
            entry = {
                "name": name,
                "email": email,
                "message": message,
                "timestamp": datetime.now().isoformat()
            }
            save_message(entry)
            flash(f"Thanks, {name}! Your message was sent.")
            return render_template("thanks.html", title="Thanks")

        return render_template("contact.html", title="Contact", errors=errors, name=name, email=email, message=message)

    return render_template("contact.html", title="Contact", errors=[])

@app.route("/messages")
def messages():
    all_messages = load_messages()
    return render_template("messages.html", title="Messages", messages=all_messages)
```

### templates/base.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} | My Portfolio</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body>
    <header>
        <nav>
            <a href="/" class="logo">MyPortfolio</a>
            <div class="nav-links">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/projects">Projects</a>
                <a href="/contact">Contact</a>
                <button id="themeToggle" aria-label="Toggle dark mode">🌙</button>
            </div>
        </nav>
    </header>

    <main>
        {% block content %}{% endblock %}
    </main>

    <footer>
        <p>&copy; 2026 My Portfolio. Built with Flask.</p>
    </footer>

    <script src="{{ url_for('static', filename='js/script.js') }}"></script>
</body>
</html>
```

### templates/projects.html

```html
{% extends "base.html" %}
{% block content %}
<section class="page">
    <h1>My Projects</h1>
    <div class="project-grid">
        {% for project in projects %}
        <div class="project-card">
            <h2>{{ project.title }}</h2>
            <p>{{ project.description }}</p>
            <p class="tech">{{ project.tech }}</p>
            <a href="{{ project.url }}" target="_blank" class="btn">View on GitHub</a>
        </div>
        {% endfor %}
    </div>
</section>
{% endblock %}
```

### static/css/style.css

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --bg: #ffffff;
    --text: #333333;
    --accent: #2563eb;
    --card-bg: #f8f9fa;
}

body.dark {
    --bg: #1a1a2e;
    --text: #e0e0e0;
    --card-bg: #16213e;
}

body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    transition: background 0.3s, color 0.3s;
}

header {
    background: var(--accent);
    color: white;
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 100;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
}

.nav-links a:hover {
    opacity: 0.8;
}

#themeToggle {
    background: none;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    padding: 4px;
}

main {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
}

footer {
    background: var(--accent);
    color: white;
    text-align: center;
    padding: 1rem;
    margin-top: auto;
}

/* Hero */
.hero {
    text-align: center;
    padding: 5rem 2rem;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    opacity: 0.8;
    margin-bottom: 2rem;
}

/* Cards */
.project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.project-card {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.1);
}

.project-card h2 {
    margin-bottom: 0.5rem;
}

.tech {
    color: var(--accent);
    font-weight: bold;
    margin: 1rem 0;
}

.btn {
    display: inline-block;
    background: var(--accent);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
}

/* Contact Form */
.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.3rem;
    font-weight: bold;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

.form-group textarea {
    resize: vertical;
}

button[type="submit"] {
    background: var(--accent);
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

button[type="submit"]:hover {
    opacity: 0.9;
}

/* Errors */
.errors {
    background: #fee2e2;
    color: #991b1b;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
}

.errors ul {
    margin-left: 1.5rem;
}

/* Flash */
.flash-messages {
    background: #d1fae5;
    color: #065f46;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
}

/* Skills */
.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
}

.skill-tag {
    background: var(--accent);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
}

/* Messages table (admin) */
.messages-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 2rem;
}

.messages-table th,
.messages-table td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
}

.messages-table th {
    background: var(--accent);
    color: white;
}

@media (max-width: 600px) {
    .hero h1 { font-size: 2rem; }
    .project-grid { grid-template-columns: 1fr; }
}
```

### static/js/script.js

```javascript
// Dark mode toggle
const themeToggle = document.querySelector("#themeToggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
```

## Deployment

When ready, deploy your portfolio to a free hosting service:

### Option 1: Render.com (easiest)
1. Push your code to GitHub.
2. Go to [render.com](https://render.com), sign up with GitHub.
3. Click "New Web Service" → select your repo.
4. Set **Start Command** to `gunicorn app:app`.
5. It deploys automatically on every push.

### Option 2: PythonAnywhere
1. Go to [pythonanywhere.com](https://pythonanywhere.com).
2. Upload your files or clone from GitHub.
3. Set up a web app with manual Config (WSGI file pointing to your app).

## Extensions (Optional)

Want to go further? Add these:
- **Blog** — Add a `/blog` route that reads Markdown files and renders them as HTML.
- **SQLite Database** — Replace messages.json with a proper SQLite database.
- **API Endpoint** — Create `/api/projects` that returns projects as JSON.
- **Animations** — Add CSS animations (fade-in on scroll, hover effects).

## Deliverables

Submit your project as a GitHub repository containing:
- A working Flask application with all 4+ pages
- Responsive CSS styling
- At least one JavaScript feature
- Server-side form validation with flash messages
- Messages saved to a JSON file
- A clear README with setup instructions

## What You've Built

You started with raw HTML and went all the way to a full-stack web application. You now know:

- **HTML** — Structure content with semantic elements
- **CSS** — Style with layout, colors, and responsive design
- **JavaScript** — Add interactivity and DOM manipulation
- **Flask** — Build a server with routes, templates, and form handling

You're a web developer. Keep building. 🚀

---

<script>
	import { MCQ } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="final-q1"
	lesson="final-project"
	question="Which Flask server method should you use instead of app.run() when deploying to production?"
	hint="app.run() is only for development. Production servers need a WSGI server."
	options={[
		{ label: "A", text: "app.start()" },
		{ label: "B", text: "gunicorn (or another WSGI server)" },
		{ label: "C", text: "app.serve()" },
		{ label: "D", text: "app.deploy()" }
	]}
	correct="B"
	explanation="Flask's built-in server (app.run()) is for development only. In production, you use a WSGI server like gunicorn or waitress. For example: gunicorn app:app"
/>

<MCQ
	id="final-q2"
	lesson="final-project"
	question="What does the CSS property grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) do?"
	hint="Think about responsive design — cards that adjust to screen width."
	options={[
		{ label: "A", text: "Creates exactly 3 columns" },
		{ label: "B", text: "Creates a responsive grid where cards are at least 300px wide and fill available space" },
		{ label: "C", text: "Stacks items vertically" },
		{ label: "D", text: "Creates a single column layout" }
	]}
	correct="B"
	explanation="This creates a responsive grid. Each column is at least 300px wide, and repeat(auto-fit) creates as many columns as fit the container. On smaller screens, it collapses to fewer columns."
/>

<MCQ
	id="final-q3"
	lesson="final-project"
	question="When saving form data to a JSON file, why should you load existing data first before appending?"
	hint="What would happen if you just wrote the new data directly?"
	options={[
		{ label: "A", text: "To prevent the server from crashing" },
		{ label: "B", text: "To keep all previous submissions instead of overwriting them" },
		{ label: "C", text: "To make the file smaller" },
		{ label: "D", text: "To validate the data format" }
	]}
	correct="B"
	explanation="If you just write new data without reading existing data first, you'd overwrite the file with only the latest submission. Loading existing data first and appending preserves all previous entries."
/>
