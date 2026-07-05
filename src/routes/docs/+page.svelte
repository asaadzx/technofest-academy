<script lang="ts">
	import { getDocs } from '$lib/content/docs';

	const docs = $derived(getDocs());
</script>

<div class="mx-auto max-w-3xl px-6 py-16">
	<header class="mb-12 text-center">
		<h1 class="text-3xl font-bold text-surface-900">Documentation</h1>
		<p class="mt-3 text-surface-500">Guides and references for working on this project</p>
	</header>

	<div class="space-y-3">
		{#each docs as doc}
			<a
				href="/docs/{doc.slug}"
				class="flex items-center justify-between rounded-xl border border-surface-200 bg-white p-5 transition-colors hover:border-primary-300 hover:bg-primary-50/50"
			>
				<div class="flex items-center gap-3">
					<div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-100">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-surface-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
					</div>
					<div>
						<span class="font-medium text-surface-900">{doc.title}</span>
						{#if doc.description}
							<p class="mt-0.5 text-sm text-surface-500">{doc.description}</p>
						{/if}
					</div>
				</div>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0 text-surface-400"><polyline points="9 18 15 12 9 6"/></svg>
			</a>
		{/each}
	</div>
</div>
