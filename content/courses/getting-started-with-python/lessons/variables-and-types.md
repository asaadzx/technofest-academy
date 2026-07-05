---
title: Variables & Data Types
description: Store and work with data using variables
order: 3
---

## Variables

A **variable** is a named container that stores a value.

```python
name = "Alice"
age = 25
height = 1.68
```

Python figures out the type automatically — you don't need to declare it.

### Common data types

| Type      | Example        | Description            |
|-----------|----------------|------------------------|
| `str`     | `"hello"`      | Text                   |
| `int`     | `42`           | Whole numbers          |
| `float`   | `3.14`         | Decimal numbers        |
| `bool`    | `True`         | True / False           |

### Type checking

Use `type()` to see what type a variable is:

```python
print(type(name))   # <class 'str'>
print(type(age))    # <class 'int'>
```

### Exercise

Create variables for your name, age, and favorite color, then print them all.
