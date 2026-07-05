<script lang="ts">
	import { page } from '$app/stores';
	import { getDoc } from '$lib/content/docs';
	import { Button } from '$lib/components/ui';

	const slug = $derived($page.params.slug ?? '');
	const doc = $derived(getDoc(slug));
	const DocComponent = $derived(doc?.component ?? null);
</script>

{#if !doc}
	<div class="mx-auto max-w-3xl px-6 py-24 text-center">
		<h1 class="text-3xl font-bold text-surface-900">Page not found</h1>
		<p class="mt-3 text-surface-500">This documentation page doesn't exist.</p>
		<div class="mt-6">
			<Button href="/docs">All Documentation</Button>
		</div>
	</div>
{:else}
	<div class="mx-auto flex max-w-6xl gap-8 px-6 py-12">
		<aside class="hidden w-56 shrink-0 lg:block">
			<div class="sticky top-28">
				<nav class="border-l-2 border-surface-200 pl-4">
					<p class="mb-3 text-xs font-semibold uppercase tracking-wider text-surface-400">On this page</p>
					<ul class="space-y-1.5">
						{#each doc.headings as heading}
							<li>
								<a
									href="#{heading.id}"
									class="block text-sm transition-colors hover:text-primary-600 {heading.level === 3 ? 'pl-3 text-surface-400' : 'font-medium text-surface-600'}"
								>
									{heading.text}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</aside>

		<div class="min-w-0 flex-1">
			<div class="mb-6">
				<a href="/docs" class="text-sm text-primary-600 hover:text-primary-700">
					&larr; All Documentation
				</a>
			</div>

			<article class="prose prose-surface max-w-none">
				{#if DocComponent}
					<DocComponent />
				{/if}
			</article>
		</div>
	</div>
{/if}
