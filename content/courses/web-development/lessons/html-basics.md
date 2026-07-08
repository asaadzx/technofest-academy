---
title: HTML Basics
description: Write your first web page with headings, paragraphs, links, and images
order: 2
---

HTML (HyperText Markup Language) is the language of the web. Every website you've ever visited is built with HTML. It's not a programming language — it's a **markup language** that describes the structure of a page.

## Your First HTML Page

Create a file called `index.html` and type this:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
</body>
</html>
```

Open it in a browser (double-click the file). You'll see your page! Let's understand what each part does:

- `<!DOCTYPE html>` — Tells the browser this is an HTML5 document.
- `<html>` — The root element that wraps everything.
- `<head>` — Contains metadata (title, character encoding, CSS links). Not displayed.
- `<title>` — The text shown in the browser tab.
- `<body>` — Everything visible on the page goes here.
- `<h1>` — A heading (level 1, the most important).
- `<p>` — A paragraph of text.

## Tags, Elements, and Attributes

An **element** is made of an opening tag, content, and a closing tag:

```html
<p>This is a paragraph.</p>
```

Some elements are **self-closing** — they have no content and no closing tag:

```html
<br>
<img src="photo.jpg" alt="A photo">
```

**Attributes** add extra information to elements:

```html
<a href="https://example.com">Click here</a>
<img src="logo.png" alt="Logo" width="200">
```

The format is `name="value"`. Common attributes include `href`, `src`, `alt`, `class`, `id`, and `style`.

## Headings

HTML has six levels of headings, from `<h1>` (most important) to `<h6>` (least important):

```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Smaller Heading</h4>
<h5>Even Smaller</h5>
<h6>Smallest Heading</h6>
```

Use headings in order — don't skip from `<h1>` to `<h4>`. Search engines use headings to understand your page structure.

## Paragraphs and Text Formatting

```html
<p>This is a regular paragraph.</p>
<p><strong>This text is bold</strong> and <em>this text is italic</em>.</p>
<p>This is a<br>line break.</p>
<hr>
<p>A horizontal line (hr) separates sections.</p>
```

| Tag | Purpose |
|-----|---------|
| `<strong>` | Important text (renders bold) |
| `<em>` | Emphasized text (renders italic) |
| `<br>` | Line break inside a paragraph |
| `<hr>` | Thematic break (horizontal line) |

## Links

Links are what makes the web a "web." They connect pages together.

```html
<!-- Absolute URL — links to another website -->
<a href="https://google.com">Visit Google</a>

<!-- Relative URL — links to another page on the same site -->
<a href="/about.html">About Us</a>

<!-- Open in a new tab -->
<a href="https://example.com" target="_blank">Example</a>

<!-- Link to an email -->
<a href="mailto:hello@example.com">Email me</a>
```

Always use meaningful link text — "click here" is bad for accessibility and SEO. Instead, write "View our full course catalog."

## Images

```html
<img src="photo.jpg" alt="A description of the photo">
<img src="images/logo.png" alt="Company Logo" width="150" height="50">
<img src="https://example.com/banner.jpg" alt="Banner">
```

The `alt` attribute is **required** for accessibility — screen readers use it to describe images to visually impaired users. It also shows if the image fails to load.

## Lists

### Unordered lists (bullet points)

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
```

### Ordered lists (numbered)

```html
<ol>
    <li>Plan your site</li>
    <li>Write the HTML</li>
    <li>Style with CSS</li>
</ol>
```

### Nested lists

```html
<ul>
    <li>Frontend
        <ul>
            <li>HTML</li>
            <li>CSS</li>
        </ul>
    </li>
    <li>Backend
        <ul>
            <li>Python</li>
            <li>Flask</li>
        </ul>
    </li>
</ul>
```

## Exercise: About Me Page

Create an `index.html` file with:

1. A heading with your name
2. A paragraph introducing yourself
3. An image (use any image URL from the internet)
4. An unordered list of your hobbies
5. A link to your favorite website
6. A second paragraph with a line break in it

Open it in your browser — you've built a web page!

```html
<!DOCTYPE html>
<html>
<head>
    <title>About Me</title>
</head>
<body>
    <h1>Your Name</h1>
    <p>Hello! I'm learning web development. This is my first page.</p>
    <img src="https://via.placeholder.com/200" alt="Placeholder image">
    
    <h2>My Hobbies</h2>
    <ul>
        <li>Reading</li>
        <li>Coding</li>
        <li>Football</li>
    </ul>
    
    <p>
        Check out my favorite site:<br>
        <a href="https://example.com" target="_blank">Click here</a>
    </p>
</body>
</html>
```

## Key Takeaways

- HTML uses tags to define elements — most have opening and closing tags.
- Headings go from `<h1>` (most important) to `<h6>` (least important).
- Use `<a>` for links and `<img>` for images (always include `alt` text).
- Lists can be ordered (`<ol>`) or unordered (`<ul>`), and they can be nested.
- Every page needs `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>`.

---

<script>
	import { MCQ, CodeQuiz, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="html-q1"
	lesson="html-basics"
	question="Which tag is used to create a hyperlink in HTML?"
	hint="Think about what makes text clickable."
	options={[
		{ label: "A", text: "<link>" },
		{ label: "B", text: "<a>" },
		{ label: "C", text: "<href>" },
		{ label: "D", text: "<url>" }
	]}
	correct="B"
	explanation="The <a> (anchor) tag creates hyperlinks. The href attribute specifies the destination URL."
/>

<CodeQuiz
	id="html-q2"
	lesson="html-basics"
	code={`<ol>
    <li>First</li>
    <li>Second</li>
</ol>`}
	question="What kind of list does this HTML create?"
	hint="Look at the tag used for the list container."
	correct="ordered"
	explanation="The <ol> tag creates an ordered (numbered) list. <ul> would create an unordered (bulleted) list."
/>

<Fill
	id="html-q3"
	lesson="html-basics"
	question="The HTML attribute used to provide a text description for images is called ____."
	hint="It helps visually impaired users understand images."
	correct="alt"
	explanation="The alt attribute provides alternative text for images. It's displayed if the image fails to load and is read aloud by screen readers."
/>
