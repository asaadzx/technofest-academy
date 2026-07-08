---
title: Python Syntax
order: 2
---

Python syntax is the set of rules that defines how a Python program is written and interpreted. It's known for being clean and readable — much closer to plain English than many other languages.

## Hello World (Revisited)

You already wrote your first Python program. Let's look at it again:

```python
print("Hello, World!")
```

That single line is valid Python. No semicolons at the end, no curly braces around blocks. Python uses **indentation** to define structure.

## Python Indentation

Indentation refers to the spaces at the beginning of a code line. In Python, indentation is **required** — it tells Python where blocks of code begin and end.

```python
if 5 > 2:
    print("Five is greater than two!")
```

The `print()` is indented (usually 4 spaces) to show it belongs to the `if` statement. If you forget the indentation, Python gives an error:

```python
if 5 > 2:
print("Five is greater than two!")  # ❌ IndentationError
```

You must use consistent indentation throughout your program (spaces are preferred over tabs).

## Multi-Line Blocks

Any group of statements that belong together can be indented:

```python
if 10 > 5:
    print("Ten is greater")
    print("This is also part of the if block")
    print("So is this")

print("This is OUTSIDE the if block")
```

Only the indented lines are part of the `if` block. The last `print` runs regardless.

## Comments

Comments start with `#` and are ignored by Python:

```python
# This is a comment
print("Hello")  # This is an inline comment
```

Comments are for humans — use them to explain your code.

## Variables

Variables are created the moment you assign a value — no type declaration needed:

```python
x = 5
name = "Ali"
```

## Case Sensitivity

Python is case-sensitive. `Name` and `name` are different variables:

```python
name = "Ali"
Name = "Ahmed"
# name and Name are two different variables
```

## Key Takeaways

- Python uses **indentation** (spaces/tabs) to define code blocks — this is mandatory.
- Comments start with `#`.
- Variables don't need type declarations.
- Python is **case-sensitive**.

---

<script>
	import { MCQ, TF } from '$lib/components/quiz/index.js';
</script>

## Think About It

<TF
	id="syntax-q1"
	lesson="python-syntax"
	question="Python uses curly braces &#123;&#125; to define code blocks, like many other languages."
	hint="Think about how the if statement was written in this lesson."
	correct={false}
	explanation="Python uses indentation (spaces or tabs) to define code blocks — not curly braces. Indentation is mandatory in Python."
/>

<MCQ
	id="syntax-q2"
	lesson="python-syntax"
	question="What happens when you have incorrect indentation in Python?"
	hint="The lesson showed what happens if the print() isn't indented."
	options={[
		{ label: "A", text: "The code runs with a warning" },
		{ label: "B", text: "Python shows an IndentationError" },
		{ label: "C", text: "Python ignores the indentation" },
		{ label: "D", text: "The code runs but produces wrong output" }
	]}
	correct="B"
	explanation="Python requires correct indentation. If you forget it, Python raises an IndentationError and refuses to run the code."
/>

<MCQ
	id="syntax-q3"
	lesson="python-syntax"
	question="Given: name = 'Ali' and Name = 'Ahmed', what will print(name) display?"
	hint="Review the case sensitivity section."
	options={[
		{ label: "A", text: "Ahmed" },
		{ label: "B", text: "Ali" },
		{ label: "C", text: "Both" },
		{ label: "D", text: "Error" }
	]}
	correct="B"
	explanation="Python is case-sensitive. name and Name are two different variables. name holds 'Ali', Name holds 'Ahmed'."
/>