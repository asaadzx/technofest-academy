---
title: Python Variables
order: 4
---

Variables are containers for storing data values. Unlike many other languages, Python has no command for declaring a variable — a variable is created the moment you assign a value to it.

## Creating Variables

```python
x = 5
y = "Hello"
print(x)
print(y)
```

No need to specify the type. Python figures it out automatically.

## Variable Names

Rules for naming variables:

- Must start with a letter or underscore (`_`)
- Cannot start with a number
- Can only contain letters, numbers, and underscores
- Names are case-sensitive (`age`, `Age`, and `AGE` are different)

Valid names:

```python
myvar = "John"
my_var = "John"
_my_var = "John"
myVar = "John"
MYVAR = "John"
myvar2 = "John"
```

Invalid names:

```python
2myvar = "John"  # ❌ starts with number
my-var = "John"  # ❌ hyphens not allowed
my var = "John"  # ❌ spaces not allowed
```

## Multi-Word Variable Names

Several conventions exist for naming variables with multiple words:

**camelCase**: Each word except the first starts with a capital letter.

```python
myVariableName = "John"
```

**PascalCase**: Every word starts with a capital letter.

```python
MyVariableName = "John"
```

**snake_case** (most common in Python): Words are separated by underscores.

```python
my_variable_name = "John"
```

## Assigning Multiple Values

Python lets you assign values to multiple variables in one line:

```python
x, y, z = "Orange", "Banana", "Cherry"
print(x)
print(y)
print(z)
```

Assign the same value to multiple variables:

```python
x = y = z = "Orange"
print(x)
print(y)
print(z)
```

## Unpack a Collection

If you have a list or tuple, you can extract values into variables:

```python
fruits = ["apple", "banana", "cherry"]
x, y, z = fruits
print(x)
print(y)
print(z)
```

## Output Variables

The `print()` function is used to output variables. You can combine text and variables with commas or the `+` operator:

```python
x = "Python"
print("I love", x)       # I love Python
print("I love " + x)     # I love Python
```

With numbers, `+` works as addition:

```python
x = 5
y = 10
print(x + y)  # 15
```

Mixing strings and numbers with `+` causes an error:

```python
x = 5
y = "John"
print(x + y)  # ❌ TypeError
```

But commas work fine:

```python
x = 5
y = "John"
print(x, y)  # 5 John
```

## Key Takeaways

- Variables are created on assignment — no declaration needed.
- Names must start with a letter or underscore, no spaces or special chars.
- Use **snake_case** for multi-word variable names (Python convention).
- Multiple variables can be assigned in one line.
- Use commas in `print()` when mixing types.

---

<script>
	import { MCQ, TF, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="variables-q1"
	lesson="python-variables"
	question="Which of the following is a valid Python variable name?"
	hint="Review the 'Variable Names' rules."
	options={[
		{ label: "A", text: "2myvar" },
		{ label: "B", text: "my-var" },
		{ label: "C", text: "my_var" },
		{ label: "D", text: "my var" }
	]}
	correct="C"
	explanation="Variable names can contain letters, numbers, and underscores, but cannot start with a number, contain hyphens, or contain spaces. my_var follows all rules."
/>

<TF
	id="variables-q2"
	lesson="python-variables"
	question="Python requires you to declare a variable's type before assigning a value."
	hint="Look at how variables were created in the examples."
	correct={false}
	explanation="Python has no command for declaring a variable type. A variable is created the moment you assign a value, and Python figures out the type automatically."
/>

<Fill
	id="variables-q3"
	lesson="python-variables"
	question="The most common naming convention for multi-word variables in Python is ________."
	hint="Review the 'Multi-Word Variable Names' section."
	correct="snake_case"
	explanation="snake_case (words separated by underscores) is the most common convention in Python — e.g., my_variable_name."
/>