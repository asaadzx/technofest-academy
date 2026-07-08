---
title: JS Events & Interactivity
description: Make pages respond to clicks, input, and form submissions
order: 7
---

You can select elements and change their content. Now it's time to make your pages **react** when users interact with them.

## What Are Events?

Events are signals that something happened — a click, a key press, a form submission, a page load. You write event listeners that "listen" for these events and run code when they occur.

```javascript
button.addEventListener("click", () => {
    console.log("Button was clicked!");
});
```

This says: "When the button is clicked, run this function."

## Common Events

| Event | Fires When |
|-------|-----------|
| `click` | Element is clicked |
| `dblclick` | Element is double-clicked |
| `mouseover` | Mouse enters an element |
| `mouseout` | Mouse leaves an element |
| `keydown` | A key is pressed |
| `keyup` | A key is released |
| `input` | Value of input/textarea changes |
| `change` | Value of select/checkbox/radio changes |
| `submit` | A form is submitted |
| `scroll` | Page is scrolled |
| `DOMContentLoaded` | HTML is fully loaded (before images) |

## Click Events

The most common event. Clicks can happen on any visible element — buttons, links, images, divs.

```javascript
const button = document.querySelector("#myButton");
const heading = document.querySelector("h1");

button.addEventListener("click", () => {
    heading.textContent = "Button was clicked!";
    heading.style.color = "green";
});
```

### The Event Object

Every event handler receives an **event object** with details about what happened:

```javascript
button.addEventListener("click", (event) => {
    console.log(event.target);     // the element that was clicked
    console.log(event.type);       // "click"
    console.log(event.clientX);    // mouse X position
    console.log(event.clientY);    // mouse Y position
});
```

`event.target` is especially useful — it tells you exactly what element was clicked, even if you have multiple elements sharing the same listener.

## Input Events

Listen for changes in text inputs and show live feedback:

```javascript
const nameInput = document.querySelector("#name");
const greeting = document.querySelector("#greeting");

nameInput.addEventListener("input", () => {
    const name = nameInput.value || "Guest";
    greeting.textContent = `Hello, ${name}!`;
});
```

As the user types, the greeting updates in real time. This is how search autocomplete, character counters, and live previews work.

## Form Submission

When a form is submitted, the browser normally sends the data to the server and reloads the page. With JavaScript, you can intercept the submission, validate the data, and send it without reloading:

```javascript
const form = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const errorDiv = document.querySelector("#errors");

form.addEventListener("submit", (event) => {
    event.preventDefault();  // stop the page from reloading

    // Clear previous errors
    errorDiv.textContent = "";

    // Validate
    if (nameInput.value.trim() === "") {
        errorDiv.textContent = "Name is required.";
        return;
    }
    if (!emailInput.value.includes("@")) {
        errorDiv.textContent = "Please enter a valid email.";
        return;
    }

    // If we get here, data is valid
    console.log("Form data:", {
        name: nameInput.value,
        email: emailInput.value
    });
    alert("Form submitted successfully!");
});
```

### event.preventDefault()

This is one of the most important methods you'll use. Many HTML elements have default behaviors:
- A form submits and reloads the page.
- A link navigates to a URL.
- A checkbox toggles checked state.

`event.preventDefault()` stops that default behavior so you can handle it with JavaScript instead.

## Creating and Removing Elements

You can build new HTML elements entirely in JavaScript:

```javascript
// Create
const newItem = document.createElement("li");
newItem.textContent = "Learn JavaScript";
newItem.classList.add("completed");

// Insert
const list = document.querySelector("#todo-list");
list.appendChild(newItem);    // at the end
// list.prepend(newItem);     // at the beginning

// Remove
newItem.remove();
```

## Class Toggling for UI Patterns

The `classList.toggle` method is incredibly useful for common UI patterns:

```javascript
// Dark mode toggle
const toggleBtn = document.querySelector("#darkModeToggle");
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
```

With CSS:
```css
body.dark-mode {
    background-color: #1a1a2e;
    color: #eee;
}
```

## Complete Example: To-Do List

This combines everything — events, DOM manipulation, and form handling.

```html
<!DOCTYPE html>
<html>
<head>
    <title>To-Do List</title>
    <style>
        body { font-family: Arial; max-width: 500px; margin: 40px auto; }
        .todo-item { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #ddd; }
        .done { text-decoration: line-through; color: #999; }
        .error { color: red; font-size: 14px; }
    </style>
</head>
<body>
    <h1>My To-Do List</h1>
    <form id="todoForm">
        <input type="text" id="todoInput" placeholder="Add a task..." required>
        <button type="submit">Add</button>
    </form>
    <p id="error" class="error"></p>
    <ul id="todoList"></ul>

    <script>
        const form = document.querySelector("#todoForm");
        const input = document.querySelector("#todoInput");
        const list = document.querySelector("#todoList");
        const error = document.querySelector("#error");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = input.value.trim();

            if (text === "") {
                error.textContent = "Please enter a task.";
                return;
            }
            error.textContent = "";

            // Create todo item
            const item = document.createElement("li");
            item.className = "todo-item";

            const span = document.createElement("span");
            span.textContent = text;

            // Click to toggle done
            span.addEventListener("click", () => {
                span.classList.toggle("done");
            });

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                item.remove();
            });

            item.appendChild(span);
            item.appendChild(deleteBtn);
            list.appendChild(item);

            input.value = "";  // Clear input
        });
    </script>
</body>
</html>
```

## Exercise

Build a page with:
1. A text input and a button labeled "Add Item"
2. An empty `<ul>` list
3. When the button is clicked:
   - Add the input text as a new `<li>` in the list
   - Clear the input field
4. Each list item should:
   - Show the item text
   - Have a "Delete" button that removes it
5. Bonus: Add a "Mark Complete" button that toggles a `done` CSS class (strikethrough)

## Key Takeaways

- `addEventListener(event, handler)` makes elements respond to user interaction.
- `event.preventDefault()` stops default browser behavior (form reload, link navigation).
- `event.target` identifies which element triggered the event.
- `document.createElement()` + `.textContent` + `.appendChild()` builds new HTML elements in JS.
- `classList.toggle()` is perfect for dark mode, dropdowns, and other toggle patterns.

---

<script>
	import { MCQ, CodeQuiz, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="jsevents-q1"
	lesson="javascript-events"
	question="What does event.preventDefault() do?"
	hint="Think about forms and links — they do things automatically."
	options={[
		{ label: "A", text: "Stops the event from running any code" },
		{ label: "B", text: "Prevents the browser's default behavior for that event" },
		{ label: "C", text: "Removes the element from the page" },
		{ label: "D", text: "Reloads the page" }
	]}
	correct="B"
	explanation="event.preventDefault() stops the browser's default action — like a form reloading the page or a link navigating to a URL — so you can handle it with JavaScript instead."
/>

<CodeQuiz
	id="jsevents-q2"
	lesson="javascript-events"
	code={`btn.addEventListener("click", (e) => {
    console.log(e.type);
});`}
	question="If the button is clicked, what will be logged?"
	hint="The event object's type property tells you what kind of event occurred."
	correct="click"
	explanation="e.type returns the event type as a string. When a click happens, e.type equals 'click'."
/>

<Fill
	id="jsevents-q3"
	lesson="javascript-events"
	question="The DOM method used to add a new element as the last child of a parent is .________()."
	hint="Think about adding a new item to the end of a list."
	correct="appendChild"
	explanation="appendChild() adds a new child element at the end of the parent. For example, list.appendChild(newItem) adds a new li at the end of a ul."
/>
