---
title: Flask + Static Files
description: Serve CSS, JavaScript, and images through Flask
order: 9
---

In the last lesson, your Flask pages had no styling — just raw HTML. Now you'll add CSS, JavaScript, and images, just like a real website. Flask has a dedicated `static/` folder for these files.

## The Static Folder

Flask automatically serves files from a folder called `static/` in your project root:

```
your_project/
├── app.py
├── templates/
│   ├── base.html
│   └── home.html
└── static/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── images/
        └── logo.png
```

Any file in `static/` is automatically accessible at `/static/...`. No route needed.

## Linking Static Files in Templates

Use `url_for('static', filename='...')` to generate the correct URL:

```html
<link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
<script src="{{ url_for('static', filename='js/script.js') }}"></script>
<img src="{{ url_for('static', filename='images/logo.png') }}" alt="Logo">
```

Always use `url_for()` instead of hardcoding paths like `/static/css/style.css`. If your site's URL structure changes, `url_for()` will still generate the correct path.

## Building a Styled Flask App

### app.py

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html", title="Home", name="Visitor")

@app.route("/about")
def about():
    return render_template("about.html", title="About")
```

### templates/base.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} — My Site</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body>
    <header>
        <nav>
            <a href="/" class="logo">MySite</a>
            <div class="nav-links">
                <a href="/">Home</a>
                <a href="/about">About</a>
            </div>
        </nav>
    </header>

    <main>
        {% block content %}{% endblock %}
    </main>

    <footer>
        <p>&copy; 2026 My Site</p>
    </footer>

    <script src="{{ url_for('static', filename='js/script.js') }}"></script>
</body>
</html>
```

### static/css/style.css

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

header {
    background: #2c3e50;
    color: white;
    padding: 1rem 2rem;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav a {
    color: white;
    text-decoration: none;
    margin-left: 1.5rem;
}

nav a:hover {
    color: #3498db;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

main {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}

footer {
    background: #2c3e50;
    color: white;
    text-align: center;
    padding: 1rem;
    margin-top: auto;
}

.hero {
    text-align: center;
    padding: 4rem 2rem;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 2rem;
}

.hero h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    color: #666;
}
```

### static/js/script.js

```javascript
// Highlight the current page in the nav
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.style.color = "#3498db";
            link.style.fontWeight = "bold";
        }
    });
});
```

## Template Inheritance with Styling

The magic of template inheritance is that `base.html` handles everything common (structure, CSS, JS), and each page only supplies its unique content:

### templates/home.html

```html
{% extends "base.html" %}

{% block content %}
<section class="hero">
    <h1>Welcome, {{ name }}!</h1>
    <p>Learn web development from scratch.</p>
</section>

<section>
    <h2>What We Offer</h2>
    <div class="features">
        <div class="card">
            <h3>HTML</h3>
            <p>Structure your content.</p>
        </div>
        <div class="card">
            <h3>CSS</h3>
            <p>Style your pages.</p>
        </div>
        <div class="card">
            <h3>Flask</h3>
            <p>Build the backend.</p>
        </div>
    </div>
</section>
{% endblock %}
```

### templates/about.html

```html
{% extends "base.html" %}

{% block content %}
<h1>About Us</h1>
<p>We teach people to build websites from scratch using HTML, CSS, JavaScript, and Python Flask.</p>

<h2>Our Mission</h2>
<p>Make web development accessible to everyone.</p>
{% endblock %}
```

## Passing Data from Python to Templates

You can pass any Python data structure to templates:

```python
@app.route("/team")
def team():
    members = [
        {"name": "Ali", "role": "Instructor"},
        {"name": "Ahmed", "role": "Content Creator"},
        {"name": "Sara", "role": "Designer"}
    ]
    return render_template("team.html", members=members)
```

```html
{% extends "base.html" %}
{% block content %}
<h1>Our Team</h1>
<div class="team-grid">
    {% for member in members %}
    <div class="team-card">
        <h3>{{ member.name }}</h3>
        <p>{{ member.role }}</p>
    </div>
    {% endfor %}
</div>
{% endblock %}
```

## Adding Images

Place images in `static/images/` and reference them:

```python
# Pass image filename from Python
@app.route("/profile/<name>")
def profile(name):
    return render_template("profile.html", name=name, avatar="default.png")
```

```html
<img src="{{ url_for('static', filename='images/' + avatar) }}" alt="{{ name }}">
```

Or hardcode in the template if the image is fixed:

```html
<img src="{{ url_for('static', filename='images/logo.png') }}" alt="Logo">
```

## Exercise

Build a Flask app with:
1. A `base.html` template with a styled nav bar (logo left, links right), a main content area, and a footer
2. A `static/css/style.css` file with colors, fonts, and spacing
3. A `static/js/script.js` file that highlights the current page in the nav
4. At least 3 pages (home, about, team) each extending `base.html`
5. A list of team members passed as a Python list and rendered with a `{% for %}` loop
6. The nav should use `flexbox` for layout

## Key Takeaways

- Flask serves files from `static/` automatically at `/static/...`.
- Use `url_for('static', filename='...')` in templates to reference static files.
- Template inheritance (`{% extends %}`, `{% block %}`) keeps your layout DRY.
- Any Python data (lists, dicts, strings) can be passed to templates with `render_template()`.
- Keep CSS in `static/css/`, JS in `static/js/`, images in `static/images/`.

---

<script>
	import { MCQ, CodeQuiz, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="flaskstatic-q1"
	lesson="flask-static-files"
	question="Which folder does Flask use to serve static files like CSS and JavaScript?"
	hint="Think about the special folder name Flask looks for automatically."
	options={[
		{ label: "A", text: "assets/" },
		{ label: "B", text: "public/" },
		{ label: "C", text: "static/" },
		{ label: "D", text: "files/" }
	]}
	correct="C"
	explanation="Flask automatically serves files from the static/ folder. Files in static/css/style.css are accessible at /static/css/style.css."
/>

<CodeQuiz
	id="flaskstatic-q2"
	lesson="flask-static-files"
	code={`<link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">`}
	question="What path will this generate in the browser?"
	hint="url_for generates URLs relative to the static folder."
	correct="/static/css/style.css"
	explanation="url_for('static', filename='css/style.css') generates the URL '/static/css/style.css', pointing to the CSS file in your static folder."
/>

<Fill
	id="flaskstatic-q3"
	lesson="flask-static-files"
	question="The Flask function used to generate URLs for static files is url____()."
	hint="It takes the endpoint name as the first argument."
	correct="_for"
	explanation="url_for() generates URLs for Flask endpoints. url_for('static', filename='...') returns the correct URL to a file in the static folder."
/>
