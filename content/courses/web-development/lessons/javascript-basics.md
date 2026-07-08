---
title: JavaScript Basics
description: Add interactivity with variables, functions, and the DOM
order: 6
---

HTML gives structure. CSS gives style. JavaScript gives **behavior** — it makes your page respond to clicks, validate forms, animate elements, and communicate with servers.

## Adding JavaScript to a Page

```html
<!-- Inline (just before </body> is best) -->
<script>
    console.log("Hello from JS!");
</script>

<!-- External file (recommended) -->
<script src="script.js"></script>
```

Put `<script>` tags just before the closing `</body>` tag. This ensures the HTML has loaded before your JS runs.

## Variables

JavaScript has three ways to declare variables:

```javascript
let name = "Ali";        // can be reassigned
const age = 16;          // cannot be reassigned
// var — old way, avoid it
```

**Rules differ from Python:**
- Use `let` for values that change.
- Use `const` for values that stay the same. Always start with `const` unless you know the value needs to change.

```javascript
const firstName = "Ahmed";
let age = 17;

console.log(firstName);  // Ahmed
console.log(age);        // 17

age = 18;                // OK — let allows reassignment
// firstName = "Ali";    // Error — const cannot be reassigned
```

## Data Types

```javascript
// String
const name = "Ali";

// Number (both integers and decimals)
const age = 16;
const pi = 3.14;

// Boolean
const isStudent = true;
const isTeacher = false;

// Null (intentionally empty)
const result = null;

// Undefined (not yet assigned)
let something;

// Array (like Python lists)
const colors = ["red", "blue", "green"];
console.log(colors[0]);     // red (index starts at 0)
console.log(colors.length); // 3

// Object (like Python dictionaries)
const person = {
    name: "Ali",
    age: 16,
    isStudent: true
};
console.log(person.name);   // Ali
console.log(person["age"]); // 16
```

## Functions

Functions are reusable blocks of code. They're the building blocks of JavaScript programs.

```javascript
// Function declaration
function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Ali"));     // Hello, Ali!
console.log(greet("Ahmed"));   // Hello, Ahmed!

// Arrow function (modern, shorter)
const greet = (name) => {
    return `Hello, ${name}!`;
};

// Even shorter — implicit return (no curly braces needed)
const greet = (name) => `Hello, ${name}!`;
```

### Parameters vs Arguments

```javascript
function add(a, b) {    // a and b are parameters
    return a + b;
}

add(5, 3);              // 5 and 3 are arguments — returns 8
add(10, 20);            // returns 30
```

### Default Parameters

```javascript
function sayHello(name = "Guest") {
    return `Hello, ${name}!`;
}

console.log(sayHello("Ali"));   // Hello, Ali!
console.log(sayHello());        // Hello, Guest!
```

## Template Literals

Notice the backtick syntax `` ` `` above — these are **template literals**, a modern way to build strings:

```javascript
const name = "Ali";
const age = 16;

// Old way (concatenation)
const msg = name + " is " + age + " years old.";

// Modern way (template literal)
const msg = `${name} is ${age} years old.`;

console.log(msg);  // Ali is 16 years old.
```

Use template literals for any string that combines variables. They're cleaner and less error-prone.

## The DOM (Document Object Model)

The DOM is JavaScript's view of your HTML page. It's a tree of objects that you can read and modify with JavaScript.

```javascript
// Select elements
const heading = document.querySelector("h1");         // first h1
const allParagraphs = document.querySelectorAll("p");  // all paragraphs
const button = document.getElementById("submit-btn");  // by ID
const cards = document.querySelectorAll(".card");      // by class

// Change content
heading.textContent = "New Heading!";

// Change styles
heading.style.color = "red";
heading.style.fontSize = "32px";
heading.style.backgroundColor = "yellow";  // note: camelCase, not background-color

// Add/remove classes
heading.classList.add("highlight");
heading.classList.remove("old-style");
heading.classList.toggle("active");  // adds if missing, removes if present

// Create and add elements
const newParagraph = document.createElement("p");
newParagraph.textContent = "I was created by JavaScript!";
document.body.appendChild(newParagraph);
```

## The DOM Tree

Every HTML document becomes a tree of objects:

```
document
 └── html
      ├── head
      │    └── title
      └── body
           ├── h1
           ├── p
           └── div
                ├── p
                └── span
```

You navigate this tree using `querySelector` and `querySelectorAll` with CSS selectors:

```javascript
// CSS selector examples that all work in querySelector
document.querySelector("p");              // first paragraph
document.querySelector(".card");          // first element with class="card"
document.querySelector("#hero");          // element with id="hero"
document.querySelector("nav a");          // link inside nav
document.querySelector("ul > li");        // direct child li of ul
document.querySelector("h2, h3");         // first h2 or h3
```

## Complete Example: Interactive Counter

```html
<!DOCTYPE html>
<html>
<head>
    <title>Counter</title>
</head>
<body>
    <h1 id="count">0</h1>
    <button id="increase">+1</button>
    <button id="reset">Reset</button>

    <script>
        let counter = 0;
        const countDisplay = document.querySelector("#count");
        const increaseBtn = document.querySelector("#increase");
        const resetBtn = document.querySelector("#reset");

        increaseBtn.addEventListener("click", () => {
            counter++;
            countDisplay.textContent = counter;
        });

        resetBtn.addEventListener("click", () => {
            counter = 0;
            countDisplay.textContent = counter;
        });
    </script>
</body>
</html>
```

## console.log for Debugging

`console.log()` is the JavaScript equivalent of Python's `print()`. It prints values to the DevTools console.

```javascript
const x = 42;
console.log("The value of x is:", x);
console.log({ x });  // prints as an object with a label
console.table([1, 2, 3]);  // prints as a table
```

Always have DevTools open (F12 → Console tab) while writing JavaScript. It shows errors and your `console.log` output.

## Exercise

Create a page that:
1. Has an `<h1>` with some text
2. Has a paragraph with your name
3. Has a `<div>` with the class "info"
4. Has a button
5. When clicked, the button should:
   - Change the `<h1>` text to "Hello from JavaScript!"
   - Change the paragraph text to your name in uppercase
   - Add the class "highlight" to the `<div>`
6. Use `const` for all variables, `let` only if reassignment is needed

## Key Takeaways

- Use `const` by default, `let` when you need to reassign.
- Functions bundle reusable logic — use arrow functions for modern JavaScript.
- Template literals (`` `${var}` ``) make string building clean and readable.
- `document.querySelector()` selects HTML elements using CSS selectors.
- `.textContent`, `.style`, and `.classList` let you modify elements.
- Always keep DevTools open when working with JavaScript.

---

<script>
	import { MCQ, CodeQuiz, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="jsbasics-q1"
	lesson="javascript-basics"
	question="Which keyword should you use to declare a variable that won't be reassigned?"
	hint="Think about what's safest — changing a value you didn't intend to is a common bug."
	options={[
		{ label: "A", text: "let" },
		{ label: "B", text: "const" },
		{ label: "C", text: "var" },
		{ label: "D", text: "static" }
	]}
	correct="B"
	explanation="const declares a variable that cannot be reassigned. Use it by default, and switch to let only when you need to reassign the value."
/>

<CodeQuiz
	id="jsbasics-q2"
	lesson="javascript-basics"
	code={`const name = "Ali";
const age = 16;
console.log(\`\${name} is \${age}\`);`}
	question="What will this code print?"
	hint="The backtick syntax allows variable embedding."
	correct="Ali is 16"
	explanation="Template literals (backticks) allow you to embed variables with &#36;&#123;&#125;. The output is 'Ali is 16'."
/>

<Fill
	id="jsbasics-q3"
	lesson="javascript-basics"
	question="The JavaScript method used to select an element by a CSS selector string is document.__________()."
	hint="It works the same way as CSS selectors like 'p' or '.class' or '#id'."
	correct="querySelector"
	explanation="document.querySelector() returns the first element matching a CSS selector. For all matches, use document.querySelectorAll()."
/>
