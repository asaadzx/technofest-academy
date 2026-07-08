---
title: Course Quiz
description: Test everything you've learned in this course
order: 10
---

You've completed all the lessons! Now it's time to put your knowledge to the test with a comprehensive quiz covering every topic in this course.

<script>
	import { MCQ, TF, CodeQuiz, Fill } from '$lib/components/quiz/index.js';
</script>

## Comprehensive Quiz

<MCQ
	id="quiz-q1"
	lesson="course-quiz"
	question="What is the correct file extension for Python files?"
	hint="Think back to your first program."
	options={[
		{ label: "A", text: ".pyth" },
		{ label: "B", text: ".pt" },
		{ label: "C", text: ".py" },
		{ label: "D", text: ".txt" }
	]}
	correct="C"
	explanation="Python files use the .py extension (e.g., hello.py, script.py)."
/>

<MCQ
	id="quiz-q2"
	lesson="course-quiz"
	question="Which of these is used to mark a code block in Python?"
	hint="Review the syntax lesson — Python is special."
	options={[
		{ label: "A", text: "Curly braces &#123;&#125;" },
		{ label: "B", text: "Square brackets []" },
		{ label: "C", text: "Indentation (spaces/tabs)" },
		{ label: "D", text: "Parentheses ()" }
	]}
	correct="C"
	explanation="Python uses indentation to define code blocks — this is mandatory and a key difference from languages like JavaScript or C++."
/>

<TF
	id="quiz-q3"
	lesson="course-quiz"
	question="In Python, variable names can start with a number."
	hint="Check the variable naming rules."
	correct={false}
	explanation="Variable names must start with a letter or underscore. They cannot start with a number. 2myvar would be invalid."
/>

<CodeQuiz
	id="quiz-q4"
	lesson="course-quiz"
	code={`print(type(3.14))`}
	question="What does this code print?"
	hint="The output will include the word 'class'."
	correct="<class 'float'>"
	explanation="type(3.14) returns <class 'float'> because 3.14 is a floating-point number."
/>

<MCQ
	id="quiz-q5"
	lesson="course-quiz"
	question="What does the strip() method do to a string?"
	hint="Remember the string methods from the strings lesson."
	options={[
		{ label: "A", text: "Removes the first and last character" },
		{ label: "B", text: "Removes whitespace from both ends" },
		{ label: "C", text: "Converts the string to lowercase" },
		{ label: "D", text: "Splits the string into a list" }
	]}
	correct="B"
	explanation="strip() removes leading and trailing whitespace, tabs, and newlines from a string."
/>

<Fill
	id="quiz-q6"
	lesson="course-quiz"
	question="Python comments start with the symbol ____."
	hint="Think about how you write a single-line comment."
	correct="#"
	explanation="The # symbol starts a comment in Python. Everything after # on that line is ignored by Python."
/>

<MCQ
	id="quiz-q7"
	lesson="course-quiz"
	question="What will print(10 == 9) output?"
	hint="The == operator compares two values."
	options={[
		{ label: "A", text: "10 == 9" },
		{ label: "B", text: "True" },
		{ label: "C", text: "False" },
		{ label: "D", text: "Error" }
	]}
	correct="C"
	explanation="The == operator checks if two values are equal. 10 is not equal to 9, so it returns False."
/>

<CodeQuiz
	id="quiz-q8"
	lesson="course-quiz"
	code={`txt = "Python"
print(txt[-1])`}
	question="What does this code print?"
	hint="Negative indexing starts from the end."
	correct="n"
	explanation="In negative indexing, -1 refers to the last character. 'Python' has 6 characters, so -1 is 'n'."
/>

<TF
	id="quiz-q9"
	lesson="course-quiz"
	question="int(5.9) returns 6 because it rounds to the nearest integer."
	hint="Remember how int() handles decimal numbers."
	correct={false}
	explanation="int() truncates (removes) the decimal part — it does NOT round. int(5.9) returns 5, not 6."
/>

<MCQ
	id="quiz-q10"
	lesson="course-quiz"
	question="Which f-string correctly displays 'I am 16 years old'?"
	hint="Review the string formatting syntax."
	options={[
		{ label: "A", text: "f'I am 16 years old'" },
		{ label: "B", text: "f'I am {age} years old' (where age = 16)" },
		{ label: "C", text: "'I am {age} years old' (where age = 16)" },
		{ label: "D", text: "f'I am age years old'" }
	]}
	correct="B"
	explanation="f-strings use curly braces &#123;&#125; to embed variables. With age = 16, f'I am &#123;age&#125; years old' produces 'I am 16 years old'."
/>

<Fill
	id="quiz-q11"
	lesson="course-quiz"
	question="The function used to get the length of a string is ____()."
	hint="Think about what tells you the number of characters."
	correct="len"
	explanation="len() returns the number of characters in a string. For example, len('Python') returns 6."
/>

<CodeQuiz
	id="quiz-q12"
	lesson="course-quiz"
	code={`x = 5
y = "John"
print(x, y)`}
	question="What does this code print?"
	hint="Commas in print() add a space between values."
	correct="5 John"
	explanation="When you use commas in print(), Python adds a space between each value. So print(x, y) outputs '5 John'."
/>

<MCQ
	id="quiz-q13"
	lesson="course-quiz"
	question="What does bool([]) return?"
	hint="Think about which values evaluate to False."
	options={[
		{ label: "A", text: "True" },
		{ label: "B", text: "False" },
		{ label: "C", text: "None" },
		{ label: "D", text: "Error" }
	]}
	correct="B"
	explanation="Empty collections like [], (), and &#123;&#125; all evaluate to False in a boolean context."
/>

<div class="mt-10 rounded-xl border-2 border-primary-200 bg-primary-50 p-6 text-center">
	<p class="text-lg font-bold text-primary-800">Great job completing the course!</p>
	<p class="mt-2 text-sm text-primary-600">
		You've tested your knowledge across all Python fundamentals. Keep practicing by writing code every day!
	</p>
</div>
