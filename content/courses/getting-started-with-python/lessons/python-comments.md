---
title: Python Comments
order: 3
---

Comments are text notes that Python ignores. They help you (and others) understand what the code does.

## Single-Line Comments

Start with `#`:

```python
# This is a comment
print("Hello, World!")
```

Comments can go at the end of a line:

```python
print("Hello, World!")  # This is an inline comment
```

## Multi-Line Comments

Python doesn't have a dedicated multi-line comment syntax, but you can use multiple `#` lines:

```python
# This is a comment
# written in
# more than one line
```

Or use a multi-line string (triple quotes) that isn't assigned to a variable:

```python
"""
This is also a comment
written in
more than one line
"""
print("Hello, World!")
```

This is technically a **string literal**, but since it's not assigned or printed, Python ignores it — making it work like a comment.

## Why Use Comments?

- Explain **why** you did something, not what (the code shows what).
- Leave notes for yourself or teammates.
- Temporarily disable code during debugging:

```python
# print("This won't run")
print("But this will")
```

## Key Takeaways

- Use `#` for single-line comments.
- Use `"""` triple quotes for multi-line comments (or notes).
- Comments improve readability and help with debugging.

---

<script>
	import { MCQ, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="comments-q1"
	lesson="python-comments"
	question="Which symbol is used for single-line comments in Python?"
	hint="Look at the comment examples at the start of the lesson."
	options={[
		{ label: "A", text: "//" },
		{ label: "B", text: "<!-- -->" },
		{ label: "C", text: "#" },
		{ label: "D", text: "/* */" }
	]}
	correct="C"
	explanation="In Python, the # symbol starts a comment. Everything after # on that line is ignored by Python."
/>

<MCQ
	id="comments-q2"
	lesson="python-comments"
	question="What is the main purpose of comments in code?"
	hint="Think about what the 'Why Use Comments?' section said."
	options={[
		{ label: "A", text: "To make the code run faster" },
		{ label: "B", text: "To explain why you did something" },
		{ label: "C", text: "To add new features" },
		{ label: "D", text: "To check for errors" }
	]}
	correct="B"
	explanation="Comments explain why you did something (the reasoning), not what the code does (the code itself shows that). They also help with debugging by temporarily disabling code."
/>

<Fill
	id="comments-q3"
	lesson="python-comments"
	question="In Python, multi-line strings enclosed in triple quotes (&quot;&quot;&quot; &quot;&quot;&quot;) that aren't assigned to a variable act like __________."
	hint="Think about what Python does with unassigned strings."
	correct="comments"
	explanation="Python ignores string literals that aren't assigned or printed, so triple-quoted strings effectively work as multi-line comments."
/>