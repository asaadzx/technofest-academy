<script lang="ts">
	import { quizStore } from './quiz-store.svelte';

	let {
		id,
		lesson,
		question,
		hint,
		explanation,
		correct
	}: {
		id: string;
		lesson: string;
		question: string;
		hint: string;
		explanation: string;
		correct: string;
	} = $props();

	let answer = $state('');
	let submitted = $state(false);
	const isCorrect = $derived(submitted ? answer.trim().toLowerCase() === correct.trim().toLowerCase() : null);

	function handleSubmit() {
		if (!answer.trim() || submitted) return;
		submitted = true;
		quizStore.recordResult(id, lesson, answer.trim().toLowerCase() === correct.trim().toLowerCase());
	}

	function handleRetry() {
		answer = '';
		submitted = false;
	}

	const saved = $derived(quizStore.wasCorrect(id));
</script>

<div
	class="my-8 rounded-xl border border-surface-200 bg-white p-6 shadow-xs"
	class:opacity-75={saved !== null && !submitted}
>
	<div class="mb-4 flex items-start gap-3">
		<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547Z"/></svg>
		</div>
		<p class="text-sm italic text-surface-500">{hint}</p>
	</div>

	<p class="mb-4 text-base font-medium text-surface-900">{question}</p>

	<div class="mb-4">
		<input
			type="text"
			bind:value={answer}
			disabled={submitted}
			placeholder="Type your answer..."
			class="w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-surface-900 outline-none transition-colors placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 disabled:opacity-50"
			onkeydown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
		/>
	</div>

	{#if !submitted}
		<button
			type="button"
			onclick={handleSubmit}
			disabled={!answer.trim()}
			class="rounded-lg bg-primary-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-40"
		>
			Check Answer
		</button>
	{:else}
		<div
			class="rounded-lg border p-4 text-sm {isCorrect ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-800'}"
		>
			<p class="mb-1 font-semibold">
				{isCorrect ? 'Correct!' : 'Not quite.'}
				{#if !isCorrect}
					The expected answer is: <code class="rounded bg-surface-200 px-1.5 py-0.5 text-xs font-mono">{correct}</code>
				{/if}
			</p>
			<p>{explanation}</p>
		</div>
		<button type="button" onclick={handleRetry} class="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700">
			Try again
		</button>
	{/if}
</div>
