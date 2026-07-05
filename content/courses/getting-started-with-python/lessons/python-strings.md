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