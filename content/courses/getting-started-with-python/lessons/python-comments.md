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