---
title: Python Data Types
order: 5
---

In Python, every value has a **type**. The type determines what operations you can perform on the value.

## Built-in Data Types

Python has these common data types:

| Type          | Example                   |
|---------------|---------------------------|
| Text          | `str` → `"Hello"`         |
| Numeric       | `int`, `float`, `complex` |
| Sequence      | `list`, `tuple`, `range`  |
| Mapping       | `dict`                    |
| Set           | `set`, `frozenset`        |
| Boolean       | `bool` → `True`, `False`  |
| Binary        | `bytes`, `bytearray`      |
| None          | `NoneType` → `None`       |

## Getting the Type

Use `type()` to check any value's type:

```python
print(type("Hello"))     # <class 'str'>
print(type(5))           # <class 'int'>
print(type(3.14))        # <class 'float'>
print(type(True))        # <class 'bool'>
print(type([1, 2, 3]))   # <class 'list'>
```

## Setting the Data Type

Python assigns the type automatically:

```python
x = "Hello World"   # str
x = 20              # int
x = 20.5            # float
x = 1j              # complex
x = ["apple", "banana", "cherry"]   # list
x = ("apple", "banana", "cherry")   # tuple
x = range(6)        # range
x = {"name": "John", "age": 36}     # dict
x = {"apple", "banana", "cherry"}   # set
x = True            # bool
x = None            # NoneType
```

## Setting with Constructor Functions

You can also create values using constructor functions:

```python
x = str("Hello")          # str
x = int(20)               # int
x = float(20.5)           # float
x = complex(1j)           # complex
x = list(("apple", "banana"))   # list
x = tuple(("apple", "banana"))  # tuple
x = range(6)              # range
x = dict(name="John", age=36)   # dict
x = set(("apple", "banana"))    # set
x = bool(5)               # bool
```

## Type Conversion

You can convert between types:

```python
x = 5           # int
y = float(x)    # convert to float → 5.0

x = 5.5         # float
y = int(x)      # convert to int → 5 (truncates decimal)

x = 5           # int
y = str(x)      # convert to string → "5"

x = "5"
y = int(x)      # convert string to int → 5
```

## Key Takeaways

- Every value has a type — use `type()` to check it.
- Python infers types automatically on assignment.
- You can convert between compatible types with `int()`, `float()`, `str()`, etc.
- The main types to know now: `str`, `int`, `float`, `bool`, `list`, `dict`.

---

<script>
	import { MCQ, CodeQuiz } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="datatypes-q1"
	lesson="python-data-types"
	question="How do you check the type of a value in Python?"
	hint="The lesson showed a function that returns the type."
	options={[
		{ label: "A", text: "checktype()" },
		{ label: "B", text: "typeof()" },
		{ label: "C", text: "type()" },
		{ label: "D", text: "gettype()" }
	]}
	correct="C"
	explanation="type() returns the type of any value. For example, type('Hello') returns <class 'str'>."
/>

<CodeQuiz
	id="datatypes-q2"
	lesson="python-data-types"
	code={`x = 5.5
y = int(x)
print(y)`}
	question="What does this code print?"
	hint="Remember how float-to-int conversion works."
	correct="5"
	explanation="int() converts a float to an integer by truncating (removing) the decimal part. It does NOT round — so 5.5 becomes 5."
/>

<MCQ
	id="datatypes-q3"
	lesson="python-data-types"
	question="What type does x = 'Hello' create?"
	hint="Review the 'Setting the Data Type' table."
	options={[
		{ label: "A", text: "str" },
		{ label: "B", text: "list" },
		{ label: "C", text: "bool" },
		{ label: "D", text: "int" }
	]}
	correct="A"
	explanation="Values in quotes are strings (str). Since 'Hello' is in quotes, x becomes a string type."
/>