---
title: Python Booleans
order: 8
---

Booleans represent one of two values: `True` or `False`.

## The bool() Function

You can evaluate any value and get `True` or `False`:

```python
print(bool("Hello"))   # True
print(bool(15))        # True
print(bool(0))         # False
print(bool(""))        # False
```

Almost any value is `True` if it has some content:

- Any string is `True` except empty strings.
- Any number is `True` except `0`.
- Any list, tuple, set, or dict is `True` except empty ones.

```python
print(bool("abc"))     # True
print(bool(123))       # True
print(bool(["a", "b"]))   # True
```

Values that evaluate to `False`:

```python
print(bool(False))     # False
print(bool(None))      # False
print(bool(0))         # False
print(bool(""))        # False
print(bool(()))        # False (empty tuple)
print(bool([]))        # False (empty list)
print(bool({}))        # False (empty dict)
```

## Comparing Values

Comparison operators return boolean results:

```python
print(10 > 9)    # True
print(10 == 9)   # False
print(10 < 9)    # False
```

You can use comparisons in conditions:

```python
a = 200
b = 33

if b > a:
    print("b is greater than a")
else:
    print("b is not greater than a")
```

## Boolean Operators

Combine booleans with `and`, `or`, and `not`:

```python
x = 5
print(x > 3 and x < 10)   # True (both conditions true)
print(x > 3 or x < 4)     # True (at least one true)
print(not(x > 3))         # False (inverts the result)
```

## isinstance()

Use `isinstance()` to check if a value is a certain type — it returns `True` or `False`:

```python
x = 5
print(isinstance(x, int))     # True
print(isinstance(x, str))     # False
```

## Key Takeaways

- Booleans are `True` or `False`.
- `bool()` tells you the truth value of any expression.
- Comparison operators (`>`, `<`, `==`, etc.) return booleans.
- Use `and`, `or`, `not` to combine/invert boolean values.
- Use `isinstance()` to type-check values.

---

<script>
	import { MCQ, TF, CodeQuiz } from '$lib/components/quiz/index.js';
</script>

## Think About It

<TF
	id="booleans-q1"
	lesson="python-booleans"
	question="In Python, bool(0) and bool('') both return True."
	hint="Check the examples showing values that evaluate to False."
	correct={false}
	explanation="Both 0 and empty strings evaluate to False. bool(0) → False, bool('') → False. Only non-zero numbers and non-empty strings evaluate to True."
/>

<CodeQuiz
	id="booleans-q2"
	lesson="python-booleans"
	code={`print(10 > 9)
print(10 == 9)`}
	question="What does this code print?"
	hint="Comparison operators return boolean values."
	correct="True\nFalse"
	explanation="10 > 9 is True, and 10 == 9 is False. Both are boolean results from comparison operators."
/>

<MCQ
	id="booleans-q3"
	lesson="python-booleans"
	question="What does isinstance(5, str) return?"
	hint="Review the isinstance() section at the end of the lesson."
	options={[
		{ label: "A", text: "True" },
		{ label: "B", text: "False" },
		{ label: "C", text: "5" },
		{ label: "D", text: "Error" }
	]}
	correct="B"
	explanation="isinstance() checks if a value is a certain type. 5 is an int, not a str, so isinstance(5, str) returns False."
/>