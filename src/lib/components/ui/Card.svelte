<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		description,
		class: className = '',
		padding = true,
		children,
		footer
	}: {
		title?: string;
		description?: string;
		class?: string;
		padding?: boolean;
		children?: Snippet;
		footer?: Snippet;
	} = $props();
</script>

<div
	class="rounded-xl border border-surface-200 bg-white shadow-xs {padding ? 'p-6' : ''} {className}"
>
	{#if title}
		<div class="mb-4">
			<h3 class="text-lg font-semibold text-surface-900">{title}</h3>
			{#if description}
				<p class="mt-1 text-sm text-surface-500">{description}</p>
			{/if}
		</div>
	{/if}

	{@render children?.()}

	{#if footer}
		<div class="mt-6 flex items-center gap-3 border-t border-surface-100 pt-4">
			{@render footer()}
		</div>
	{/if}
</div>
