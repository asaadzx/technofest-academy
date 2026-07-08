---
title: Python Numbers
order: 6
---

Python supports three numeric types: `int`, `float`, and `complex`.

## int

`int` (integer) is a whole number, positive or negative, without decimals:

```python
x = 5
y = -10
z = 0
```

Integers have unlimited length:

```python
x = 123456789012345678901234567890
print(x)  # Python handles it just fine
```

## float

`float` is a number with a decimal point:

```python
x = 3.14
y = -2.5
z = 1.0
```

Floats can also be written in scientific notation with `e`:

```python
x = 35e3    # 35 × 10³ = 35000.0
y = 12E4    # 12 × 10⁴ = 120000.0
z = -87.7e100
```

## complex

`complex` numbers have a real and imaginary part, written with `j`:

```python
x = 3 + 5j
y = 5j
z = -5j
```

You'll mainly use `complex` numbers in advanced math and engineering.

## Type Conversion

Convert between types using constructor functions:

```python
# int to float
x = 5
y = float(x)   # 5.0

# float to int
x = 5.9
y = int(x)     # 5 (truncates, does NOT round)

# int to complex
x = 5
y = complex(x)  # (5+0j)
```

You cannot convert complex numbers to other numeric types.

## Random Numbers

Python doesn't have a `random()` function built in, but it has a built-in module called `random`:

```python
import random

print(random.randrange(1, 10))   # random int between 1 and 9
print(random.randint(1, 10))     # random int between 1 and 10 (inclusive)
```

## Key Takeaways

- `int` — whole numbers, unlimited length.
- `float` — decimal numbers, can use scientific notation.
- `complex` — numbers with an imaginary part (`j`).
- Use `int()` and `float()` to convert between numeric types.
- Use the `random` module to generate random numbers.

---

<script>
	import { MCQ, CodeQuiz, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="numbers-q1"
	lesson="python-numbers"
	question="What type does x = 3.14 create?"
	hint="Review the 'float' section."
	options={[
		{ label: "A", text: "int" },
		{ label: "B", text: "float" },
		{ label: "C", text: "complex" },
		{ label: "D", text: "str" }
	]}
	correct="B"
	explanation="Numbers with a decimal point are floats. 3.14 has a decimal, so it's a float."
/>

<CodeQuiz
	id="numbers-q2"
	lesson="python-numbers"
	code={`x = 5.9
y = int(x)
print(y)`}
	question="What does this code print?"
	hint="int() truncates — it does NOT round."
	correct="5"
	explanation="int(5.9) truncates the decimal part. Even though 5.9 is closer to 6, int() simply removes .9, resulting in 5."
/>

<Fill
	id="numbers-q3"
	lesson="python-numbers"
	question="The Python module used to generate random numbers is called ______."
	hint="Check the 'Random Numbers' section."
	correct="random"
	explanation="The random module provides functions like randrange() and randint() for generating random numbers."
/>