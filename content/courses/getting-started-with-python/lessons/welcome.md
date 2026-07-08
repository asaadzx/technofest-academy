---
title: Welcome
description: What to expect and how to follow along
order: 1
---

## Welcome to the Course!

This course is designed for **absolute beginners**. You don't need any prior programming experience.

### What you'll need

- A computer (Windows, macOS, or Linux)
- A text editor ([VS Code](https://code.visualstudio.com/) is recommended)
- Python 3 installed on your system

### How this course works

Each lesson contains:

1. **Concepts** — New ideas explained clearly
2. **Examples** — Code you can run yourself
3. **Exercises** — Practice to reinforce what you've learned

> "The only way to learn programming is by writing code." — Every programmer ever

### Resource

- [W3Schools Python Tutorial](https://www.w3schools.com/python/default.asp) — Use this as a companion reference throughout the course. It has interactive examples for every topic we cover.

Let's get started!

---

<script>
	import { MCQ, TF } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="welcome-q1"
	lesson="welcome"
	question="Who is this course designed for?"
	hint="Think about the very first sentence of the lesson."
	options={[
		{ label: "A", text: "Experienced programmers who want to learn Python" },
		{ label: "B", text: "Absolute beginners with no programming experience" },
		{ label: "C", text: "Web developers only" },
		{ label: "D", text: "Computer science students" }
	]}
	correct="B"
	explanation="The lesson clearly states: 'This course is designed for absolute beginners. You don't need any prior programming experience.' Anyone can start here!"
/>

<TF
	id="welcome-q2"
	lesson="welcome"
	question="You must have Python 3 installed on your system before starting the course."
	hint="Check 'What you'll need' section."
	correct={true}
	explanation="Yes! To write and run Python programs, you need Python 3 installed. The lesson mentions this as a requirement, along with a text editor like VS Code."
/>
