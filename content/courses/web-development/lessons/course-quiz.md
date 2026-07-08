---
title: Course Quiz
description: Test everything you've learned in this course
order: 12
---

You've completed all the lessons! Now it's time to test your knowledge with a comprehensive quiz covering HTML, CSS, JavaScript, and Flask.

<script>
	import { MCQ, TF, CodeQuiz, Fill } from '$lib/components/quiz/index.js';
</script>

## Comprehensive Quiz

<TF
	id="wquiz-q1"
	lesson="course-quiz"
	question="HTML stands for HyperText Markup Language."
	hint="Think about what each letter in HTML represents."
	correct={true}
	explanation="HTML stands for HyperText Markup Language — it's the standard language for creating web pages."
/>

<MCQ
	id="wquiz-q2"
	lesson="course-quiz"
	question="Which CSS property makes a layout responsive to screen size?"
	hint="Think about the layout methods we covered for flexible designs."
	options={[
		{ label: "A", text: "position" },
		{ label: "B", text: "flexbox" },
		{ label: "C", text: "background" },
		{ label: "D", text: "color" }
	]}
	correct="B"
	explanation="Flexbox (display: flex) is a CSS layout module that creates flexible, responsive layouts. It adjusts elements based on available space, making it ideal for responsive design."
/>

<CodeQuiz
	id="wquiz-q3"
	lesson="course-quiz"
	code={`console.log(10 + "5");`}
	question="What does this JavaScript code output?"
	hint="When you use + with a number and a string, JavaScript converts the number to a string."
	correct="105"
	explanation="When using + between a number and a string, JavaScript coerces the number to a string and concatenates. The result is the string '105', not the number 15."
/>

<Fill
	id="wquiz-q4"
	lesson="course-quiz"
	question="In Flask, the variable inside angle brackets in a route like /user/&lt;name&gt; is called a ____ converter."
	hint="These capture segments of the URL and pass them to the function."
	correct="dynamic"
	explanation="Dynamic route converters like <name> capture variable parts of a URL and pass them as parameters to the route function."
/>

<MCQ
	id="wquiz-q5"
	lesson="course-quiz"
	question="What does the HTML &lt;article&gt; element represent?"
	hint="Think about the semantic meaning — independent, self-contained content."
	options={[
		{ label: "A", text: "A navigation menu" },
		{ label: "B", text: "A sidebar" },
		{ label: "C", text: "A self-contained piece of content like a blog post" },
		{ label: "D", text: "A footer section" }
	]}
	correct="C"
	explanation="The <article> element represents a self-contained piece of content (like a blog post, news article, or forum post) that could stand alone."
/>

<TF
	id="wquiz-q6"
	lesson="course-quiz"
	question="In CSS, the selector .my-class selects elements by their ID."
	hint="Remember the difference between class selectors and ID selectors."
	correct={false}
	explanation=".my-class selects elements with class='my-class', not id='my-class'. ID selectors use # (e.g., #my-id)."
/>

<CodeQuiz
	id="wquiz-q7"
	lesson="course-quiz"
	code={`document.querySelector("button").addEventListener("click", () => {
    console.log("clicked!");
});`}
	question="What happens when the button is clicked?"
	hint="Focus on the function inside addEventListener."
	correct="clicked! is logged to the console"
	explanation="addEventListener('click', handler) runs the handler function when the element is clicked. The handler calls console.log('clicked!')."
/>

<MCQ
	id="wquiz-q8"
	lesson="course-quiz"
	question="What folder does Flask use to store HTML template files?"
	hint="Flask looks for templates in a specific directory by default."
	options={[
		{ label: "A", text: "html/" },
		{ label: "B", text: "pages/" },
		{ label: "C", text: "templates/" },
		{ label: "D", text: "views/" }
	]}
	correct="C"
	explanation="Flask automatically looks for templates in a folder called 'templates/' in the project root directory."
/>

<Fill
	id="wquiz-q9"
	lesson="course-quiz"
	question="The JavaScript method used to prevent a form from reloading the page is event.________()."
	hint="Think about stopping the default browser behavior."
	correct="preventDefault"
	explanation="event.preventDefault() stops the browser's default action for an event, such as a form submission reloading the page or a link navigating to a URL."
/>

<MCQ
	id="wquiz-q10"
	lesson="course-quiz"
	question="What does the CSS property justify-content: center do in a flex container?"
	hint="Think about alignment along the main axis (horizontal by default)."
	options={[
		{ label: "A", text: "Centers items vertically" },
		{ label: "B", text: "Centers items horizontally along the main axis" },
		{ label: "C", text: "Centers the container itself" },
		{ label: "D", text: "Adds space between items" }
	]}
	correct="B"
	explanation="justify-content controls alignment along the main axis in a flex container. With the default flex-direction (row), justify-content: center centers items horizontally."
/>

<CodeQuiz
	id="wquiz-q11"
	lesson="course-quiz"
	code={`@app.route("/greet/<name>")
def greet(name):
    return render_template("greet.html", person=name)`}
	question="In the greet.html template, how would you display the person variable?"
	hint="Remember the Jinja2 syntax for outputting variables."
	correct="{{ person }}"
	explanation="Jinja2 uses {{ }} to output variables. In the template, {{ person }} would display the value passed as person=name."
/>

<MCQ
	id="wquiz-q12"
	lesson="course-quiz"
	question="What is the correct way to include an external JavaScript file in HTML?"
	hint="Think about the tag that loads JavaScript files."
	options={[
		{ label: "A", text: "&lt;script href='script.js'&gt;" },
		{ label: "B", text: "&lt;script src='script.js'&gt;&lt;/script&gt;" },
		{ label: "C", text: "&lt;js src='script.js'&gt;&lt;/js&gt;" },
		{ label: "D", text: "&lt;link rel='script' href='script.js'&gt;" }
	]}
	correct="B"
	explanation="The <script> tag with the src attribute loads an external JavaScript file. It must have a closing </script> tag."
/>

<TF
	id="wquiz-q13"
	lesson="course-quiz"
	question="In Flask, request.args contains data from a POST form submission."
	hint="Compare how GET and POST data are accessed in Flask."
	correct={false}
	explanation="request.args contains query string parameters from GET requests. POST form data is accessed through request.form."
/>

<MCQ
	id="wquiz-q14"
	lesson="course-quiz"
	question="What does CSS media query @media (max-width: 600px) do?"
	hint="Think about how we make sites work on different devices."
	options={[
		{ label: "A", text: "Applies styles when the screen is wider than 600px" },
		{ label: "B", text: "Applies styles when the screen is 600px or narrower" },
		{ label: "C", text: "Only works on mobile phones" },
		{ label: "D", text: "Changes the page title" }
	]}
	correct="B"
	explanation="@media (max-width: 600px) applies the enclosed CSS rules when the viewport is 600 pixels wide or less, making it perfect for mobile-friendly responsive design."
/>

<Fill
	id="wquiz-q15"
	lesson="course-quiz"
	question="In Flask, the Jinja2 template syntax for a for loop is: &#123;% ____ item in items %&#125;"
	hint="This is a Python keyword used for iteration."
	correct="for"
	explanation="Jinja2 uses &#123;% for item in items %&#125; to loop through a list. It must be closed with &#123;% endfor %&#125;."
/>

<div class="mt-10 rounded-xl border-2 border-primary-200 bg-primary-50 p-6 text-center">
	<p class="text-lg font-bold text-primary-800">Congratulations on completing the course!</p>
	<p class="mt-2 text-sm text-primary-600">
		You've tested your knowledge across HTML, CSS, JavaScript, and Flask. Keep building projects and happy coding!
	</p>
</div>
