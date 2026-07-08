---
title: HTML Structure & Semantics
description: Build multi-section pages with semantic tags and forms
order: 3
---

In the last lesson you built a simple page. Real websites are more complex — they have navigation bars, multiple sections, sidebars, footers, and forms. This lesson teaches you how to structure those pages properly.

## Why Semantic HTML Matters

Semantic HTML means using tags that describe **what the content is**, not just how it looks.

**Bad (non-semantic):**
```html
<div class="header">
<div class="nav">
<div class="main">
```

**Good (semantic):**
```html
<header>
<nav>
<main>
```

Semantic HTML helps:
- **Accessibility** — Screen readers navigate by landmarks. A blind user can jump straight to `<nav>` or `<main>`.
- **SEO** — Search engines rank content higher when they understand the structure.
- **Maintainability** — Other developers can read your code and immediately know what each section does.
- **Future-proofing** — Browsers give semantic elements useful default behavior.

## Semantic Layout Elements

```html
<body>
    <header>
        <!-- Logo, site title, navigation -->
    </header>

    <nav>
        <!-- Main navigation links -->
    </nav>

    <main>
        <!-- Primary page content -->
        <section>
            <!-- A themed section (e.g., "Features") -->
        </section>

        <article>
            <!-- Self-contained content (blog post, news item) -->
        </article>

        <aside>
            <!-- Sidebar, related links, ads -->
        </aside>
    </main>

    <footer>
        <!-- Copyright, contact info, sitemap -->
    </footer>
</body>
```

### When to Use Each Tag

| Tag | Purpose | Example |
|-----|---------|---------|
| `<header>` | Introductory content or navigation links | Site header with logo and menu |
| `<nav>` | Navigation links | Main menu, table of contents |
| `<main>` | The page's unique content (use once per page) | Article body, product listing |
| `<section>` | A thematic group of content | "Features" section, "Pricing" section |
| `<article>` | Self-contained, reusable content | Blog post, news story, comment |
| `<aside>` | Content indirectly related to the main content | Sidebar, related articles, ads |
| `<footer>` | Closing content for a page or section | Copyright, contact links |

## Building a Landing Page

Here's a complete landing page structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>

    <main>
        <section id="hero">
            <h1>Welcome to My Site</h1>
            <p>This is what I do.</p>
        </section>

        <section id="features">
            <h2>Features</h2>
            <article>
                <h3>Fast</h3>
                <p>Optimized for speed.</p>
            </article>
            <article>
                <h3>Secure</h3>
                <p>Your data is safe.</p>
            </article>
            <article>
                <h3>Reliable</h3>
                <p>99.9% uptime.</p>
            </article>
        </section>

        <section id="contact">
            <h2>Get in Touch</h2>
            <p>Email us at hello@example.com</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 My Website. All rights reserved.</p>
    </footer>
</body>
</html>
```

## HTML Forms

Forms are how users send data to your server — logging in, signing up, searching, posting comments.

### Basic Form Structure

```html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="you@example.com">

    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4"></textarea>

    <button type="submit">Send</button>
</form>
```

### Input Types

| Type | Purpose | Example |
|------|---------|---------|
| `text` | Single-line text | Name, username |
| `email` | Email address | you@example.com |
| `password` | Hidden text | Login form |
| `number` | Numbers | Age, quantity |
| `date` | Date picker | Birth date |
| `file` | File upload | Profile picture |
| `checkbox` | Multiple choices | Subscribe to newsletter |
| `radio` | Single choice | Gender, payment method |

### Form Attributes

| Attribute | Purpose |
|-----------|---------|
| `action` | URL where the form data is sent |
| `method` | HTTP method — `GET` or `POST` |
| `name` | Key used when data is sent to the server |
| `placeholder` | Hint text inside the input |
| `required` | Field must be filled before submission |
| `value` | Default value |
| `disabled` | Field cannot be edited or submitted |

### Labels are Important

Always use `<label>` elements with your inputs. They make forms accessible — clicking the label focuses the input:

```html
<!-- Bad — no label -->
<input type="text" placeholder="Enter your name">

<!-- Good — label connected by for/id -->
<label for="username">Username:</label>
<input type="text" id="username" name="username">
```

## Putting It All Together

A complete page with semantic structure, a form, and a navigation:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Academy - Contact</title>
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/courses">Courses</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>

    <main>
        <section>
            <h1>Contact Us</h1>
            <p>Have a question? Send us a message.</p>

            <form action="/contact" method="POST">
                <div>
                    <label for="name">Full Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div>
                    <label for="subject">Subject:</label>
                    <select id="subject" name="subject">
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="feedback">Feedback</option>
                    </select>
                </div>
                <div>
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <div>
                    <input type="checkbox" id="newsletter" name="newsletter">
                    <label for="newsletter">Subscribe to our newsletter</label>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 Tech Academy</p>
    </footer>
</body>
</html>
```

## Exercise

Build a complete landing page for a fictional school club with:
1. A `<header>` with a `<nav>` containing 3 links
2. A `<main>` with at least 3 `<section>` elements (Hero, About, Contact)
3. A contact `<form>` with name, email, subject (dropdown), and message fields
4. A `<footer>` with copyright text
5. Use proper semantic tags throughout

## Key Takeaways

- Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) describe content meaning, not just appearance.
- Forms collect user data — always pair `<label>` with `<input>` using `for`/`id`.
- Use `method="POST"` for forms that change data (sign up, login, submit) and `method="GET"` for searches.
- The `<main>` tag should appear only once per page.

---

<script>
	import { MCQ, TF, CodeQuiz } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="semantics-q1"
	lesson="html-semantics"
	question="Which semantic HTML tag should you use for the main navigation menu of a page?"
	hint="Think about the tag that specifically means 'navigation links'."
	options={[
		{ label: "A", text: "<header>" },
		{ label: "B", text: "<nav>" },
		{ label: "C", text: "<menu>" },
		{ label: "D", text: "<aside>" }
	]}
	correct="B"
	explanation="The <nav> tag is specifically for navigation links. It helps screen readers and search engines identify the site's navigation."
/>

<TF
	id="semantics-q2"
	lesson="html-semantics"
	question="A page can have multiple <main> elements."
	hint="Think about whether <main> represents the primary content."
	correct={false}
	explanation="The <main> element should be used only once per page — it represents the unique, primary content. Multiple <main> elements would be confusing."
/>

<CodeQuiz
	id="semantics-q3"
	lesson="html-semantics"
	code={`<form action="/signup" method="POST">
    <input type="email" name="email">
    <button type="submit">Sign Up</button>
</form>`}
	question="What HTTP method will this form use when submitted?"
	hint="Check the method attribute."
	correct="POST"
	explanation="The method attribute is set to 'POST', so the form data will be sent as an HTTP POST request. POST is used when submitting data that changes something on the server."
/>
