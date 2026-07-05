<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		label,
		error,
		class: className = '',
		...restProps
	}: {
		label?: string;
		error?: string;
		class?: string;
	} & HTMLInputAttributes = $props();
</script>

<div class="flex flex-col gap-1.5">
	{#if label}
		<label for={restProps.id} class="text-sm font-medium text-surface-700">
			{label}
		</label>
	{/if}

	<input
		class="h-10 w-full rounded-lg border bg-white px-3 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden {error ? 'border-error focus:border-error focus:ring-error/20' : 'border-surface-300'} {className}"
		{...restProps}
	/>

	{#if error}
		<p class="text-xs text-error">{error}</p>
	{/if}
</div>
