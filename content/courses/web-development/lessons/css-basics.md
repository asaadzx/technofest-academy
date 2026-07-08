---
title: CSS Basics
description: Add colors, fonts, spacing, and style to your HTML pages
order: 4
---

HTML gives your page structure. CSS (Cascading Style Sheets) gives it style. Without CSS, every website would look like a plain white page with black text and blue links — exactly what the browser's default styles provide.

## Three Ways to Add CSS

### 1. Inline styles (avoid when possible)

Add the `style` attribute directly to an HTML element:

```html
<p style="color: red; font-size: 20px;">This is red text.</p>
```

Inline styles are hard to maintain — if you want to change all paragraphs, you'd have to edit every single one.

### 2. Internal stylesheet (good for single pages)

Use a `<style>` tag inside `<head>`:

```html
<head>
    <style>
        p {
            color: blue;
            font-size: 16px;
        }
    </style>
</head>
```

### 3. External stylesheet (best practice)

Create a `.css` file and link it in your HTML:

```html
<head>
    <link rel="stylesheet" href="style.css">
</head>
```

One CSS file can style every page on your site. Change one value, and the entire site updates.

## CSS Syntax

A CSS rule has a **selector** and a **declaration block**:

```css
selector {
    property: value;
    property: value;
}
```

Example:

```css
h1 {
    color: navy;
    font-size: 32px;
    text-align: center;
}
```

This says: "Every `<h1>` on the page should be navy, 32 pixels, and centered."

## Selectors

Selectors tell the browser which elements to style.

```css
/* Element selector — targets all elements of that type */
h1 { color: red; }
p { font-size: 16px; }

/* Class selector — targets elements with that class attribute */
.highlight { background-color: yellow; }

/* ID selector — targets the element with that id (use once per page) */
#logo { width: 150px; }

/* Descendant selector — targets elements inside other elements */
nav a { color: white; }          /* All links inside a <nav> */

/* Group selector — applies same styles to multiple elements */
h1, h2, h3 { font-family: Arial; }
```

### Classes vs IDs

| | Class | ID |
|---|---|---|
| Syntax | `.classname` | `#idname` |
| Usage | Multiple elements | One element per page |
| HTML | `class="highlight"` | `id="logo"` |
| Specificity | Lower | Higher |

**Rule of thumb:** Use classes for styling. Use IDs for JavaScript targeting or anchor links.

## Colors

CSS gives you several ways to specify colors:

```css
/* Named colors */
color: red;
color: navy;
color: tomato;

/* Hexadecimal (hex) — most common */
color: #ff0000;       /* red */
color: #3498db;       /* blue */
color: #2ecc71;       /* green */

/* RGB */
color: rgb(255, 0, 0);          /* red */
color: rgb(52, 152, 219);       /* blue */

/* RGBA — same as RGB but with opacity (alpha) */
color: rgba(255, 0, 0, 0.5);    /* semi-transparent red */

/* HSL — hue, saturation, lightness */
color: hsl(0, 100%, 50%);       /* red */
```

Hex is the most widely used. Sites like [coolors.co](https://coolors.co) and [colorhunt.co](https://colorhunt.co) help you find beautiful color palettes.

## Typography

```css
body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-weight: normal;      /* or bold, or 400, 700 */
    line-height: 1.6;         /* space between lines */
    text-align: left;         /* left, center, right, justify */
    color: #333;
}
```

### Font stacks

Browsers only have certain fonts installed. A **font stack** provides fallbacks:

```css
font-family: "Open Sans", Arial, Helvetica, sans-serif;
```

The browser tries the first font. If it's not installed, it moves to the next, and so on.

### Web fonts

Use Google Fonts to add custom fonts without installation:

```html
<head>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Roboto', sans-serif; }
    </style>
</head>
```

## The Box Model

Every element on a web page is a rectangular box. The box model describes the spacing around each element:

```
┌─────────────────────────────────────┐
│            Margin (transparent)      │
│  ┌───────────────────────────────┐   │
│  │          Border               │   │
│  │  ┌─────────────────────────┐  │   │
│  │  │       Padding           │  │   │
│  │  │  ┌───────────────────┐  │  │   │
│  │  │  │     Content       │  │  │   │
│  │  │  └───────────────────┘  │  │   │
│  │  └─────────────────────────┘  │   │
│  └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

```css
.box {
    width: 300px;
    height: 200px;
    padding: 20px;       /* space INSIDE the border */
    border: 2px solid black;
    margin: 30px;        /* space OUTSIDE the border */
}
```

- **Content** — The actual text or image.
- **Padding** — Space between content and border. Think of it like a cushion.
- **Border** — A visible line around the element.
- **Margin** — Space between this element and other elements.

### Shorthand properties

```css
/* All four sides the same */
padding: 20px;
margin: 10px;

/* Top/Bottom Left/Right */
padding: 10px 20px;      /* top/bottom: 10px, left/right: 20px */

/* Top Right Bottom Left (clockwise) */
margin: 10px 15px 20px 25px;

/* Individual sides */
margin-top: 10px;
padding-left: 20px;
border-bottom: 2px solid blue;
```

## Backgrounds

```css
.hero {
    background-color: #1a1a2e;
    background-image: url('background.jpg');
    background-size: cover;       /* scale image to fill the element */
    background-position: center;  /* center the image */
    background-repeat: no-repeat; /* don't tile the image */
}
```

Shorthand:

```css
background: #1a1a2e url('bg.jpg') center / cover no-repeat;
```

## Styling a Page

Here's the About Me page from Lesson 2, now styled with CSS:

```html
<!DOCTYPE html>
<html>
<head>
    <title>About Me — Styled</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 40px;
            background-color: #f9f9f9;
            color: #333;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #2980b9;
        }
        img {
            border-radius: 10px;
            border: 2px solid #ddd;
            padding: 5px;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>Your Name</h1>
    <p>Hello! I'm learning web development.</p>
    <img src="photo.jpg" alt="Photo" width="200">
    <h2>Hobbies</h2>
    <ul>
        <li>Reading</li>
        <li>Coding</li>
    </ul>
</body>
</html>
```

## Exercise

Take the About Me page from Lesson 2 (or the template above) and:

1. Change the font family to a Google Font of your choice
2. Pick a color scheme — one color for headings, another for links
3. Add padding and margin to elements so there's breathing room
4. Add a border to the image with rounded corners
5. Make links change color when you hover over them (use `a:hover`)
6. Add a background color to the entire page

## Key Takeaways

- CSS separates style from structure — one CSS file can style your entire site.
- Selectors target elements by tag (`h1`), class (`.highlight`), or id (`#logo`).
- The box model (content → padding → border → margin) controls spacing.
- Use classes for styling, IDs for unique elements and JavaScript.
- External stylesheets are better than inline or internal CSS.

---

<script>
	import { MCQ, CodeQuiz, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="css-q1"
	lesson="css-basics"
	question="Which selector targets elements with class='highlight'?"
	hint="Think about the symbol used before the class name."
	options={[
		{ label: "A", text: "#highlight" },
		{ label: "B", text: ".highlight" },
		{ label: "C", text: "highlight" },
		{ label: "D", text: "*highlight" }
	]}
	correct="B"
	explanation="A dot (.) before the name targets elements by class. For example, .highlight targets all elements with class='highlight'."
/>

<CodeQuiz
	id="css-q2"
	lesson="css-basics"
	code={`p {
    color: red;
    font-size: 16px;
}`}
	question="What CSS property controls the text color?"
	hint="Look at the first property in the rule."
	correct="color"
	explanation="The 'color' property sets the text color. 'font-size' controls the size, not the color."
/>

<Fill
	id="css-q3"
	lesson="css-basics"
	question="In the box model, the space INSIDE the border but OUTSIDE the content is called ________."
	hint="It's like a cushion around the content."
	correct="padding"
	explanation="Padding is the space between the content and the border. Margin is the space outside the border between elements."
/>
