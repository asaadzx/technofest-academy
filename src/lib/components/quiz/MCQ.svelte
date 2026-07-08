<script lang="ts">
	import { quizStore } from './quiz-store.svelte';

	let {
		id,
		lesson,
		question,
		hint,
		explanation,
		options,
		correct
	}: {
		id: string;
		lesson: string;
		question: string;
		hint: string;
		explanation: string;
		options: { label: string; text: string }[];
		correct: string;
	} = $props();

	let selected = $state<string | null>(null);
	let submitted = $state(false);
	const isCorrect = $derived(submitted ? selected === correct : null);

	function handleSubmit() {
		if (!selected || submitted) return;
		submitted = true;
		quizStore.recordResult(id, lesson, selected, selected === correct);
	}

	function handleRetry() {
		selected = null;
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

	<div class="mb-4 space-y-2">
		{#each options as opt}
			<button
				type="button"
				onclick={() => { if (!submitted) selected = opt.label; }}
				disabled={submitted}
				class="flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors {submitted ? (opt.label === correct ? 'border-green-500 bg-green-50 text-green-800' : selected === opt.label ? 'border-red-400 bg-red-50 text-red-700' : 'border-surface-200 bg-white text-surface-700') : selected === opt.label ? 'border-primary-500 bg-primary-50 text-primary-800' : 'border-surface-200 bg-white text-surface-700'}"
			>
				<span
					class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium {submitted ? (opt.label === correct ? 'border-green-500 text-green-600' : selected === opt.label ? 'border-red-400 text-red-600' : 'border-surface-300 text-surface-500') : selected === opt.label ? 'border-primary-500 text-primary-600' : 'border-surface-300 text-surface-500'}"
				>
					{#if submitted && opt.label === correct}
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
					{:else if submitted && selected === opt.label && opt.label !== correct}
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
					{:else}
						{opt.label}
					{/if}
				</span>
				<span>{opt.text}</span>
			</button>
		{/each}
	</div>

	{#if !submitted}
		<button
			type="button"
			onclick={handleSubmit}
			disabled={!selected}
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
			</p>
			<p>{explanation}</p>
		</div>
		<button
			type="button"
			onclick={handleRetry}
			class="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
		>
			Try again
		</button>
	{/if}
</div>
