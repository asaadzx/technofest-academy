---
title: Python Flask Intro
description: Build your first web server with Python and Flask
order: 8
---

So far you've built frontend — HTML, CSS, and JavaScript that run in the browser. Now you'll build the **backend** — a server that runs on Python, receives requests, and sends back responses. You'll use **Flask**, a lightweight Python web framework.

## What is Flask?

Flask is a Python library that makes it easy to build web applications. It handles:
- Receiving HTTP requests and routing them to the right code
- Rendering HTML templates
- Serving static files (CSS, JS, images)

Think of it as the "brain" behind a website — it decides what to show based on what the user asks for.

## Installing Flask

```bash
pip install flask
```

Or if you're using pip3:

```bash
pip3 install flask
```

To verify it's installed:

```bash
python -c "import flask; print(flask.__version__)"
```

## Your First Flask App

Create a file called `app.py`:

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "<h1>Hello, World!</h1>"

if __name__ == "__main__":
    app.run(debug=True)
```

Run it:

```bash
python app.py
```

Open your browser to `http://127.0.0.1:5000`. You should see "Hello, World!" as a heading. You just built a web server!

### What's happening?

1. `Flask(__name__)` creates your Flask application.
2. `@app.route("/")` is a **decorator** that tells Flask: "When someone visits the root URL `/`, run this function."
3. The function `home()` returns HTML that gets sent to the browser.
4. `app.run(debug=True)` starts the development server. `debug=True` means the server will reload automatically when you change the code.

## Routes

A **route** connects a URL to a Python function. You can create as many routes as you want:

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "<h1>Home Page</h1>"

@app.route("/about")
def about():
    return "<h1>About Us</h1><p>We teach web development.</p>"

@app.route("/contact")
def contact():
    return "<h1>Contact</h1><p>Email us at hello@example.com</p>"
```

Now visit:
- `http://127.0.0.1:5000/` → "Home Page"
- `http://127.0.0.1:5000/about` → "About Us"
- `http://127.0.0.1:5000/contact` → "Contact"

### Dynamic Routes

You can make routes that accept variable parts:

```python
@app.route("/user/<name>")
def user_profile(name):
    return f"<h1>Welcome, {name}!</h1>"
```

Visit `http://127.0.0.1:5000/user/Ali` → "Welcome, Ali!"
Visit `http://127.0.0.1:5000/user/Ahmed` → "Welcome, Ahmed!"

You can have multiple variables and specify types:

```python
@app.route("/post/<int:post_id>")
def show_post(post_id):
    return f"<h1>Post #{post_id}</h1>"

@app.route("/product/<category>/<int:item_id>")
def product(category, item_id):
    return f"<h1>{category.title()} - Item #{item_id}</h1>"
```

Available converters: `string` (default), `int`, `float`, `path`.

## Templates with Jinja2

Returning HTML strings directly in Python is messy. Flask uses **Jinja2** — a template engine that lets you write HTML files with dynamic data injected in.

### Step 1: Create a templates folder

```
your_project/
├── app.py
└── templates/
    └── index.html
```

### Step 2: Write a template

`templates/index.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>
</head>
<body>
    <h1>{{ heading }}</h1>
    <p>{{ message }}</p>
</body>
</html>
```

The `{{ }}` syntax is a **Jinja2 placeholder**. It gets replaced with actual values when the template is rendered.

### Step 3: Render the template

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", title="Home", heading="Welcome!", message="Hello from Flask!")
```

### Template Variables

Pass any Python variable to the template:

```python
@app.route("/user/<name>")
def user_profile(name):
    return render_template("profile.html", username=name, is_admin=False)
```

`templates/profile.html`:

```html
<h1>Profile: {{ username }}</h1>
{% if is_admin %}
    <p>You have admin access.</p>
{% else %}
    <p>You are a regular user.</p>
{% endif %}
```

### Control Flow in Templates

Jinja2 uses `{% %}` for logic:

```python
# In Python:
items = ["HTML", "CSS", "JavaScript"]
return render_template("list.html", items=items)
```

```html
<ul>
{% for item in items %}
    <li>{{ item }}</li>
{% endfor %}
</ul>
```

```html
{% if items %}
    <p>You have {{ items|length }} items.</p>
{% else %}
    <p>No items found.</p>
{% endif %}
```

### Template Filters

Modify variables with filters using the pipe `|`:

```html
<p>{{ name|upper }}</p>        <!-- ALI -->
<p>{{ name|lower }}</p>        <!-- ali -->
<p>{{ name|capitalize }}</p>   <!-- Ali -->
<p>{{ name|length }}</p>       <!-- 3 -->
<p>{{ price|round(2) }}</p>    <!-- 19.99 -->
```

## Complete Example: Multi-Page Site

Directory structure:
```
multi_page/
├── app.py
└── templates/
    ├── base.html
    ├── home.html
    └── about.html
```

`templates/base.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}My Site{% endblock %}</title>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
    </nav>
    <main>
        {% block content %}{% endblock %}
    </main>
</body>
</html>
```

`templates/home.html`:
```html
{% extends "base.html" %}
{% block title %}Home{% endblock %}
{% block content %}
    <h1>Welcome</h1>
    <p>This is the home page.</p>
{% endblock %}
```

`templates/about.html`:
```html
{% extends "base.html" %}
{% block title %}About{% endblock %}
{% block content %}
    <h1>About Us</h1>
    <p>We teach web development.</p>
{% endblock %}
```

`app.py`:
```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html")
```

**Template inheritance** with `{% extends %}` and `{% block %}` lets you define a base layout once and reuse it across all pages.

## Exercise

Build a Flask app with:
1. Three routes: `/`, `/about`, `/contact`
2. Each route renders a separate template using Jinja2
3. A `base.html` template that includes a nav bar and is extended by all pages
4. Pass at least one dynamic variable to one of the templates (e.g., show the current year)

## Key Takeaways

- Flask routes URLs to Python functions using `@app.route()`.
- `render_template()` renders Jinja2 HTML files from the `templates/` folder.
- `{{ }}` outputs variables, `{% %}` runs logic (loops, conditionals).
- `{% extends "base.html" %}` lets you reuse a common layout across pages.
- Dynamic routes like `@app.route("/user/<name>")` capture URL segments.

---

<script>
	import { MCQ, CodeQuiz, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="flask-q1"
	lesson="flask-intro"
	question="What does the @app.route('/about') decorator do?"
	hint="Think about what happens when you visit a URL."
	options={[
		{ label: "A", text: "Creates a new HTML file" },
		{ label: "B", text: "Connects the '/about' URL to a Python function" },
		{ label: "C", text: "Installs Flask" },
		{ label: "D", text: "Starts the server" }
	]}
	correct="B"
	explanation="The @app.route() decorator maps a URL path to a Python function. When a user visits /about, Flask runs the function below the decorator and returns its result."
/>

<CodeQuiz
	id="flask-q2"
	lesson="flask-intro"
	code={`@app.route("/user/<name>")
def profile(name):
    return f"Hello, {name}!"`}
	question="If you visit /user/Ahmed, what will the page display?"
	hint="The URL segment after /user/ becomes the 'name' variable."
	correct="Hello, Ahmed!"
	explanation="The <name> in the route captures the URL segment and passes it as the 'name' parameter to the function. Visiting /user/Ahmed prints 'Hello, Ahmed!'."
/>

<Fill
	id="flask-q3"
	lesson="flask-intro"
	question="In Jinja2 templates, variables are output using double ____."
	hint="Look at the syntax used to display dynamic values in templates."
	correct="curly braces"
	explanation="Jinja2 uses {{ }} (double curly braces) to output variables. For example, {{ name }} displays the value of the 'name' variable."
/>
