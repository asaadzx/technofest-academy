<script lang="ts">
	import { onMount } from 'svelte';

	interface SearchEntry {
		id: string;
		type: 'course' | 'lesson' | 'doc';
		title: string;
		description: string;
		slug: string;
		courseSlug?: string;
		courseTitle?: string;
		text: string;
		snippet: string;
	}

	let query = $state('');
	let index = $state<SearchEntry[]>([]);
	let results = $state<SearchEntry[]>([]);
	let loaded = $state(false);

	onMount(async () => {
		try {
			const res = await fetch('/search-index.json');
			index = await res.json();
			loaded = true;
		} catch {}
	});

	let debounce: ReturnType<typeof setTimeout>;
	function onInput(e: Event) {
		const value = (e.target as HTMLInputElement).value;
		clearTimeout(debounce);
		debounce = setTimeout(() => {
			query = value;
			search();
		}, 200);
	}

	function search() {
		const q = query.toLowerCase().trim();
		if (!q) {
			results = [];
			return;
		}
		results = index.filter(
			(entry) =>
				entry.title.toLowerCase().includes(q) ||
				entry.description.toLowerCase().includes(q) ||
				entry.text.toLowerCase().includes(q)
		);
	}

	function highlight(text: string): string {
		if (!query.trim()) return text;
		const q = query.trim();
		const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
		return text.slice(0, 300).replace(regex, '<mark>$1</mark>');
	}

	const grouped = $derived.by(() => {
		const g: Record<string, SearchEntry[]> = {};
		for (const r of results) {
			const key = r.type === 'course' ? 'Courses' : r.type === 'lesson' ? 'Lessons' : 'Documentation';
			if (!g[key]) g[key] = [];
			g[key].push(r);
		}
		return g;
	});

	const orderedKeys = $derived(['Courses', 'Lessons', 'Documentation'].filter((k) => grouped[k]));
</script>

<div class="mx-auto max-w-3xl px-6 py-12">
	<h1 class="text-3xl font-bold text-surface-900">Search</h1>

	<div class="relative mt-6">
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
		<input
			type="search"
			placeholder="Search courses, lessons, and documentation..."
			oninput={onInput}
			class="w-full rounded-xl border border-surface-300 bg-white py-3.5 pl-12 pr-4 text-surface-900 placeholder-surface-400 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
		/>
	</div>

	{#if !loaded}
		<p class="mt-8 text-center text-sm text-surface-400">Loading search index...</p>
	{:else if !query}
		<p class="mt-8 text-center text-sm text-surface-400">
			Type something to search across courses, lessons, and documentation.
		</p>
	{:else if results.length === 0}
		<p class="mt-8 text-center text-sm text-surface-500">
			No results found for <strong>"{query}"</strong>
		</p>
	{:else}
		<p class="mt-4 text-sm text-surface-400">{results.length} result{results.length !== 1 ? 's' : ''} for <strong>"{query}"</strong></p>

		<div class="mt-6 space-y-8">
			{#each orderedKeys as groupKey}
				<section>
					<h2 class="mb-3 text-lg font-semibold text-surface-900">{groupKey}</h2>
					<div class="space-y-3">
						{#each grouped[groupKey] as entry (entry.id)}
							<a
								href={entry.type === 'course'
									? '/courses/' + entry.slug
									: entry.type === 'lesson'
										? '/courses/' + entry.courseSlug + '/lessons/' + entry.slug
										: '/docs/' + entry.slug}
								class="block rounded-xl border border-surface-200 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/30"
							>
								<div class="flex items-start justify-between gap-3">
									<h3 class="font-medium text-surface-900">{@html highlight(entry.title)}</h3>
									<span class="shrink-0 rounded-full bg-surface-100 px-2.5 py-0.5 text-xs font-medium text-surface-500">
										{entry.type}
									</span>
								</div>
								{#if entry.description}
									<p class="mt-1 text-sm text-surface-500">{@html highlight(entry.description)}</p>
								{/if}
								<p class="mt-2 text-xs text-surface-400 line-clamp-2">{@html highlight(entry.snippet)}</p>
								{#if entry.type === 'lesson' && entry.courseTitle}
									<p class="mt-1.5 text-xs text-surface-400">{entry.courseTitle}</p>
								{/if}
							</a>
						{/each}
					</div>
				</section>
			{/each}
		</div>
	{/if}
</div>
