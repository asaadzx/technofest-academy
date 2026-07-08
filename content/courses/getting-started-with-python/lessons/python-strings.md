---
title: Python Strings
order: 7
---

Strings in Python are sequences of characters surrounded by quotes.

## Creating Strings

You can use single or double quotes:

```python
print("Hello")
print('Hello')
```

Triple quotes for multi-line strings:

```python
a = """This is a
multi-line
string"""
print(a)
```

## String Indexing

Each character in a string has an index, starting at `0`:

```python
txt = "Python"
#      012345

print(txt[0])  # P
print(txt[3])  # h
```

Negative indexing starts from the end:

```python
print(txt[-1])  # n (last character)
print(txt[-2])  # o
```

## Slicing

Get a range of characters using the slice syntax `[start:end]` (end is exclusive):

```python
txt = "Python"
print(txt[0:3])   # Pyt  (index 0, 1, 2)
print(txt[2:5])   # tho
```

Slice from the start:

```python
print(txt[:4])   # Pyth
```

Slice to the end:

```python
print(txt[2:])   # thon
```

Negative slicing:

```python
print(txt[-4:-1])  # tho
```

## String Length

Use `len()` to get the number of characters:

```python
txt = "Python"
print(len(txt))  # 6
```

## String Methods

Python has many built-in string methods:

```python
txt = "  Hello, World!  "

print(txt.upper())          # "  HELLO, WORLD!  "
print(txt.lower())          # "  hello, world!  "
print(txt.strip())          # "Hello, World!" (removes whitespace)
print(txt.replace("H", "J"))  # "  Jello, World!  "
print(txt.split(","))       # ['  Hello', ' World!  ']
```

Checking content:

```python
txt = "Hello, World!"
print(txt.startswith("Hello"))  # True
print(txt.endswith("!"))        # True
print(txt.find("World"))        # 7 (index where "World" starts)
print("Hello" in txt)           # True
```

## String Concatenation

Joining strings with `+`:

```python
a = "Hello"
b = "World"
c = a + " " + b
print(c)  # Hello World
```

## String Formatting

Combine strings with variables using **f-strings** (Python 3.6+):

```python
age = 16
txt = f"I am {age} years old"
print(txt)  # I am 16 years old
```

Format numbers inside f-strings:

```python
price = 59.95
txt = f"The price is {price:.2f} dollars"
print(txt)  # The price is 59.95 dollars
```

## Escape Characters

Use `\` to insert characters that would otherwise break the string:

```python
txt = "We are \"students\" from school."
print(txt)  # We are "students" from school.
```

Other common escapes:

| Code | Result        |
|------|---------------|
| `\'` | Single quote  |
| `\\` | Backslash     |
| `\n` | New line      |
| `\t` | Tab           |

## Key Takeaways

- Strings are sequences — indexable and sliceable.
- Use `len()` for length, `.upper()/.lower()` for case changes.
- Use **f-strings** (`f"..."`) for formatting variables into strings.
- Use `\` to escape special characters.

---

<script>
	import { MCQ, CodeQuiz, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="strings-q1"
	lesson="python-strings"
	question="What does txt[0:3] return if txt = 'Python'?"
	hint="Remember that slicing [start:end] is exclusive of the end index."
	options={[
		{ label: "A", text: "Pyth" },
		{ label: "B", text: "Pyt" },
		{ label: "C", text: "yth" },
		{ label: "D", text: "Python" }
	]}
	correct="B"
	explanation="String indices start at 0. txt[0:3] takes characters at indices 0, 1, and 2 (end is exclusive), giving 'Pyt'."
/>

<CodeQuiz
	id="strings-q2"
	lesson="python-strings"
	code={`txt = "  Hello, World!  "
print(txt.strip())`}
	question="What does this code print?"
	hint="strip() removes whitespace from both ends."
	correct="Hello, World!"
	explanation="strip() removes leading and trailing whitespace (spaces, tabs, newlines) from the string, resulting in 'Hello, World!'."
/>

<Fill
	id="strings-q3"
	lesson="python-strings"
	question="The len() function returns the ______ of a string."
	hint="Think about what len() told you for 'Python'."
	correct="length"
	explanation="len() returns the number of characters in a string. For 'Python', len() returns 6."
/>

<MCQ
	id="strings-q4"
	lesson="python-strings"
	question="Given age = 16, which syntax correctly inserts age into a string?"
	hint="Review the 'String Formatting' section about f-strings."
	options={[
		{ label: "A", text: "f'I am {age} years old'" },
		{ label: "B", text: "'I am {age} years old'" },
		{ label: "C", text: "'I am %age years old'" },
		{ label: "D", text: "'I am ' + age + ' years old'" }
	]}
	correct="A"
	explanation="f-strings (f'...') let you embed variables directly inside curly braces. This is the modern way to format strings in Python 3.6+."
/>