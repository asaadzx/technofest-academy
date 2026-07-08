---
title: Flask Forms & Data
description: Handle form submissions, validate data, and work with files
order: 10
---

Your Flask app can serve styled pages. Now you'll make it interactive — accept user input through forms, validate it, and store or process it on the server.

## Form Setup

In Flask, forms send data to a route that processes it. Most forms use the `POST` method, which sends data in the request body (not in the URL).

### The Form HTML

```html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <button type="submit">Submit</button>
</form>
```

Important: the `name` attribute on each input is what Flask uses to access the value.

### The Flask Route

```python
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("form.html")

@app.route("/submit", methods=["POST"])
def submit():
    name = request.form["name"]
    email = request.form["email"]
    return f"<h1>Thanks, {name}! We'll contact you at {email}.</h1>"
```

### GET vs POST

| Method | Data Location | Use Case |
|--------|-------------|----------|
| GET | URL query string | Searching, filtering |
| POST | Request body | Submitting forms, creating data |

A search form typically uses GET:

```html
<form action="/search" method="GET">
    <input type="text" name="q" placeholder="Search...">
    <button type="submit">Search</button>
</form>
```

```python
@app.route("/search")
def search():
    query = request.args.get("q", "")
    return f"<h1>Search results for: {query}</h1>"
```

`request.args` for GET data, `request.form` for POST data.

## Complete Form with Validation

Let's build a contact form that validates data on the server and shows feedback.

### app.py

```python
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

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
            # In a real app, you'd email this or save to database
            return render_template("thanks.html", name=name)

        return render_template("contact.html", errors=errors, name=name, email=email, message=message)

    return render_template("contact.html", errors=[])
```

### templates/contact.html

```html
{% extends "base.html" %}
{% block content %}
<h1>Contact Us</h1>

{% if errors %}
<div class="errors">
    <ul>
    {% for error in errors %}
        <li>{{ error }}</li>
    {% endfor %}
    </ul>
</div>
{% endif %}

<form action="/contact" method="POST">
    <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"
               value="{{ name or '' }}" required>
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email"
               value="{{ email or '' }}" required>
    </div>
    <div>
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="5"
                  required>{{ message or '' }}</textarea>
    </div>
    <button type="submit">Send Message</button>
</form>
{% endblock %}
```

The `{{ name or '' }}` pattern ensures old input is preserved after a validation error, so users don't have to re-type everything.

## Working with JSON Data

Modern web apps often send data as JSON instead of form-encoded data. Flask handles this too:

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/api/data", methods=["POST"])
def api_data():
    data = request.get_json()
    name = data.get("name")
    age = data.get("age")
    return jsonify({
        "message": f"Hello {name}, you are {age} years old",
        "received": True
    })
```

`request.get_json()` parses the JSON body into a Python dict. `jsonify()` converts a Python dict into a JSON response.

## Saving Data to a File

For data that persists between server restarts, save to a file:

```python
import json

DATA_FILE = "data.json"

def load_data():
    try:
        with open(DATA_FILE) as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

@app.route("/submit", methods=["POST"])
def submit():
    entry = {
        "name": request.form["name"],
        "email": request.form["email"],
        "timestamp": __import__("datetime").datetime.now().isoformat()
    }
    data = load_data()
    data.append(entry)
    save_data(data)
    return render_template("thanks.html", name=entry["name"])
```

## Flash Messages

Flask has a built-in system for one-time messages:

```python
from flask import Flask, render_template, request, flash

app = Flask(__name__)
app.secret_key = "your-secret-key-here"  # Required for flash messages

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        flash(f"Thanks, {name}! Your message was sent.")
        return render_template("thanks.html", name=name)

    return render_template("contact.html")
```

In your template, display flash messages:

```html
{% with messages = get_flashed_messages() %}
    {% if messages %}
    <div class="flash-messages">
        {% for message in messages %}
        <p class="flash">{{ message }}</p>
        {% endfor %}
    </div>
    {% endif %}
{% endwith %}
```

The secret key is required for session-based features. In production, you'd use an environment variable, not a hardcoded string.

## Exercise

Build a Flask app with:
1. A registration form with fields: username, email, password, and confirm password
2. A POST route that validates:
   - Username is at least 3 characters
   - Email contains @
   - Password is at least 6 characters
   - Passwords match
3. If validation fails, show errors AND preserve the user's input
4. If validation passes, save the data to a JSON file and show a success page
5. Bonus: Add a GET route that displays all registered users from the JSON file

## Key Takeaways

- `request.form` contains POST data; `request.args` contains GET (query string) data.
- Always **validate** on the server — client-side validation can be bypassed.
- Use `.get("key", "")` instead of `["key"]` to avoid KeyError when a field is missing.
- Flash messages (`flash()`) are good for one-time status notifications.
- `request.get_json()` + `jsonify()` handles JSON-based APIs.
- Save submitted data to a file or database for persistence.

---

<script>
	import { MCQ, CodeQuiz, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="flaskforms-q1"
	lesson="flask-forms-data"
	question="Which Flask object holds data from a POST form submission?"
	hint="Think about how Flask provides access to different parts of the HTTP request."
	options={[
		{ label: "A", text: "request.args" },
		{ label: "B", text: "request.form" },
		{ label: "C", text: "request.data" },
		{ label: "D", text: "request.body" }
	]}
	correct="B"
	explanation="request.form is a dictionary-like object that contains all form data sent with a POST request. request.args is for GET parameters."
/>

<CodeQuiz
	id="flaskforms-q2"
	lesson="flask-forms-data"
	code={`@app.route("/search")
def search():
    q = request.args.get("q", "")
    return f"Searching for: {q}"`}
	question="What is the second argument '' (empty string) used for?"
	hint="What happens if the user visits /search without the q parameter?"
	correct="Default value if q is missing"
	explanation="The second argument to .get() is the default value returned when the key doesn't exist. Without it, visiting /search without ?q= would return None."
/>

<Fill
	id="flaskforms-q3"
	lesson="flask-forms-data"
	question="The Flask function used to convert a Python dictionary into a JSON response is ____()."
	hint="It starts with 'json' and is imported from Flask."
	correct="jsonify"
	explanation="jsonify() takes a Python dictionary and returns a Response with Content-Type: application/json. It's used for building JSON APIs with Flask."
/>
