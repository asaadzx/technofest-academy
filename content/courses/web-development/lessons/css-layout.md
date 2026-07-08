---
title: CSS Layout
description: Create responsive multi-column layouts with flexbox and grid
order: 5
---

In the last lesson you styled individual elements. But real web pages need structure — a navigation bar across the top, a sidebar beside the main content, cards arranged in a grid. This lesson teaches you how to create those layouts.

## The Problem with Normal Flow

By default, HTML elements stack top-to-bottom:

```html
<div>Block 1</div>
<div>Block 2</div>
<div>Block 3</div>
```

Each `<div>` takes the full width and appears below the previous one. To create a 3-column layout, you need a layout system. Enter **flexbox** and **grid**.

## Flexbox

Flexbox is designed for **one-dimensional** layouts — either a row OR a column. It's perfect for navigation bars, centering content, and distributing items evenly.

### The Basics

```css
.container {
    display: flex;
}
```

That's it. The container becomes a flex container, and its children become flex items that sit side by side.

```html
<div style="display: flex;">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>
```

### Main Properties

#### On the container

```css
.container {
    display: flex;
    flex-direction: row;        /* row (default), column, row-reverse */
    justify-content: center;    /* horizontal alignment */
    align-items: center;        /* vertical alignment */
    flex-wrap: wrap;            /* allow items to wrap to next line */
    gap: 20px;                  /* space between items */
}
```

| `justify-content` | Effect |
|---|---|
| `flex-start` | Items packed at the start (default) |
| `center` | Items centered |
| `space-between` | Equal space between items, none at ends |
| `space-around` | Equal space around each item |
| `space-evenly` | Equal space everywhere |

#### On the children

```css
.item {
    flex: 1;           /* grow/shrink equally */
    flex: 0 0 300px;   /* don't grow, don't shrink, fixed at 300px */
    align-self: center; /* override container's align-items */
}
```

### Flexbox Examples

**Centering a div (the classic problem):**
```css
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
}
```

**Navigation bar:**
```css
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: #333;
}
nav a {
    color: white;
    text-decoration: none;
}
```

**Card grid that wraps:**
```css
.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.card {
    flex: 1 1 300px;  /* grow, shrink, base width */
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
}
```

## CSS Grid

Grid is for **two-dimensional** layouts — rows AND columns at the same time. It's best for page-level layouts and complex grids.

### The Basics

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;  /* three columns */
    grid-template-rows: auto;               /* rows sized by content */
    gap: 20px;
}
```

The `fr` unit means "fraction of available space." `1fr` takes one share. `2fr` takes twice as much.

### Grid Examples

**Page layout:**
```css
.page {
    display: grid;
    grid-template-columns: 250px 1fr;  /* sidebar + main */
    grid-template-rows: auto 1fr auto;  /* header + content + footer */
    min-height: 100vh;
}
header { grid-column: 1 / -1; }  /* span all columns */
footer { grid-column: 1 / -1; }
```

**Three equal columns:**
```css
.grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}
```

**Responsive grid (auto-adjusting columns):**
```css
.auto-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}
```

This creates as many 300px-wide columns as will fit. On a narrow screen it becomes 1 column. On a wide screen it becomes 3 or 4.

## Responsive Design

Responsive design means your site looks good on every screen — phone, tablet, laptop, desktop.

### The Viewport Meta Tag

Without this, mobile browsers pretend to be a desktop screen and zoom out:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Always include this in your `<head>`.

### Media Queries

Media queries apply CSS only when a condition is true:

```css
/* Default: desktop styles */
.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

/* Tablets: 2 columns */
@media (max-width: 768px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Phones: 1 column */
@media (max-width: 480px) {
    .card-grid {
        grid-template-columns: 1fr;
    }
}
```

### Mobile-First vs Desktop-First

**Mobile-first** means you write the mobile styles as default, then add `min-width` media queries for larger screens:

```css
/* Mobile first — 1 column by default */
.card-grid {
    display: grid;
    gap: 20px;
}

/* Tablet and up */
@media (min-width: 768px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .card-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

Mobile-first is the modern approach because most web traffic is mobile.

## Units: px vs em vs rem vs %

| Unit | Relative to | Best for |
|------|-------------|----------|
| `px` | Nothing (absolute) | Borders, images |
| `%` | Parent element | Widths, heights |
| `em` | Parent's font size | Padding, margins |
| `rem` | Root font size (`html`) | Font sizes, spacing |
| `vh` | Viewport height (1% = 1% of screen) | Full-screen sections |
| `vw` | Viewport width | Full-width elements |

```css
html { font-size: 16px; }

h1 { font-size: 2rem; }     /* 32px */
p { font-size: 1rem; }      /* 16px */
.hero { height: 100vh; }    /* full screen height */
```

Using `rem` for font sizes ensures everything scales proportionally if the user changes their browser's default font size.

## Complete Example: Responsive Landing Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Academy</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background: #2c3e50;
            color: white;
        }
        nav a { color: white; text-decoration: none; margin-left: 1rem; }

        .hero {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 60vh;
            background: #3498db;
            color: white;
            text-align: center;
            padding: 2rem;
        }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            padding: 4rem 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 2rem;
            text-align: center;
        }

        @media (max-width: 768px) {
            nav { flex-direction: column; gap: 1rem; }
            .hero { height: 40vh; }
        }
    </style>
</head>
<body>
    <nav>
        <strong>Tech Academy</strong>
        <div>
            <a href="#">Home</a>
            <a href="#">Courses</a>
            <a href="#">Contact</a>
        </div>
    </nav>

    <section class="hero">
        <h1>Learn to Build the Web</h1>
        <p>From HTML to full-stack applications</p>
    </section>

    <section class="features">
        <div class="card"><h3>HTML</h3><p>Structure your content</p></div>
        <div class="card"><h3>CSS</h3><p>Style your pages</p></div>
        <div class="card"><h3>JavaScript</h3><p>Add interactivity</p></div>
    </section>
</body>
</html>
```

## Exercise

Build a responsive page with:
1. A navigation bar with the logo on the left and links on the right (flexbox)
2. A hero section that's centered horizontally and vertically (flexbox)
3. A 3-column card section (grid)
4. At 768px and below: nav stacks vertically, grid becomes 1 column
5. Use `rem` for font sizes and spacing

## Key Takeaways

- Flexbox is for one-dimensional layouts (row OR column). Use it for navs, centering, and distributing items.
- Grid is for two-dimensional layouts. Use it for page structure and card grids.
- Responsive design uses media queries to adapt layouts to different screen sizes.
- Mobile-first approach: write base styles for mobile, add `min-width` queries for larger screens.
- Use `rem` for font sizes, `%` for widths, `vh` for full-screen sections.

---

<script>
	import { MCQ, CodeQuiz, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="layout-q1"
	lesson="css-layout"
	question="Which CSS property makes a container use flexbox layout?"
	hint="It's the fundamental property that enables flexbox."
	options={[
		{ label: "A", text: "display: block" },
		{ label: "B", text: "display: flex" },
		{ label: "C", text: "display: grid" },
		{ label: "D", text: "display: inline" }
	]}
	correct="B"
	explanation="display: flex turns an element into a flex container. Its children become flex items that can be aligned and distributed easily."
/>

<CodeQuiz
	id="layout-q2"
	lesson="css-layout"
	code={`display: grid;
grid-template-columns: 1fr 1fr 1fr;`}
	question="How many equal-width columns does this grid create?"
	hint="Each '1fr' represents one fraction of the available space."
	correct="3"
	explanation="Three '1fr' values create three equal-width columns, each taking one fraction (one third) of the available space."
/>

<Fill
	id="layout-q3"
	lesson="css-layout"
	question="The CSS unit equal to 1% of the viewport height is ____."
	hint="It's useful for making sections fill the entire screen."
	correct="vh"
	explanation="vh stands for 'viewport height'. 100vh equals the full height of the browser window, regardless of screen size."
/>
