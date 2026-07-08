---
title: Your First Program
description: Write and run your very first Python program
order: 2
---

## Hello, World!

Open your text editor, type the following, and save it as `hello.py`:

```python
print("Hello, World!")
```

Then open a terminal and run:

```bash
python hello.py
```

You should see:

```
Hello, World!
```

Congratulations — you've written your first program!

### How `print` works

`print()` is a **function** that displays text to the console. Anything between the parentheses and inside quotes will be printed.

Try changing the message:

```python
print("Python is fun!")
```

---

<script>
	import { MCQ, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="first-program-q1"
	lesson="your-first-program"
	question="What function displays text to the console in Python?"
	hint="Look at the code example you wrote in this lesson."
	options={[
		{ label: "A", text: "output()" },
		{ label: "B", text: "display()" },
		{ label: "C", text: "print()" },
		{ label: "D", text: "write()" }
	]}
	correct="C"
	explanation="print() is Python's built-in function for displaying output. Anything inside the parentheses and quotes gets printed to the console."
/>

<MCQ
	id="first-program-q2"
	lesson="your-first-program"
	question="What will this program output?"
	hint="Each print() call adds a new line after its text."
	options={[
		{ label: "A", text: "HelloWorld" },
		{ label: "B", text: "Hello World" },
		{ label: "C", text: "Hello (new line) World" },
		{ label: "D", text: "An error" }
	]}
	correct="C"
	explanation="Each print() statement outputs its text followed by a newline. So 'Hello' appears on the first line and 'World' on the second."
/>

<Fill
	id="first-program-q3"
	lesson="your-first-program"
	question="Python source files are saved with the extension .___"
	hint="Look at the filename in 'hello.py'."
	correct="py"
	explanation="Python source files use the .py extension — hello.py, script.py, etc."
/>
