<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Card, Badge } from '$lib/components/ui';

	const { courseList } = $derived($page.data as {
		courseList: Array<{ slug: string; title: string; description: string; difficulty: string; lessonCount: number }>;
	});

	let query = $state('');
	let difficulty = $state('');

	const filtered = $derived(
		courseList.filter((c) => {
			if (difficulty && c.difficulty !== difficulty) return false;
			if (query) {
				const q = query.toLowerCase();
				if (!c.title.toLowerCase().includes(q) && !c.description.toLowerCase().includes(q)) {
					return false;
				}
			}
			return true;
		})
	);

	const difficultyMeta: Record<string, { label: string; variant: 'success' | 'warning' | 'error' }> = {
		beginner: { label: 'Beginner', variant: 'success' },
		intermediate: { label: 'Intermediate', variant: 'warning' },
		advanced: { label: 'Advanced', variant: 'error' }
	};

	const difficulties = ['beginner', 'intermediate', 'advanced'] as const;

	function clearFilters() { query = ''; difficulty = ''; }
</script>

<div class="mx-auto max-w-5xl px-6 py-16">
	<header class="mb-12 text-center">
		<h1 class="text-4xl font-bold text-surface-900">Courses</h1>
		<p class="mt-3 text-lg text-surface-500">
			Explore our curated learning tracks for TechnoFest
		</p>
	</header>

	<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="relative flex-1 max-w-md">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
			<input
				type="search"
				placeholder="Search courses..."
				value={query}
				oninput={(e) => (query = (e.target as HTMLInputElement).value)}
				class="w-full rounded-lg border border-surface-300 bg-white py-2.5 pl-9 pr-3 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden"
			/>
		</div>
		<div class="flex gap-1">
			<button
				onclick={clearFilters}
				class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors {!difficulty ? 'bg-primary-100 text-primary-700' : 'text-surface-500 hover:bg-surface-100 hover:text-surface-700'}"
			>All</button>
			{#each difficulties as d}
				<button
					onclick={() => (difficulty = d)}
					class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors {difficulty === d ? 'bg-primary-100 text-primary-700' : 'text-surface-500 hover:bg-surface-100 hover:text-surface-700'}"
				>
					{difficultyMeta[d].label}
				</button>
			{/each}
		</div>
	</div>

	{#if filtered.length === 0}
		<div class="rounded-xl border-2 border-dashed border-surface-300 p-16 text-center">
			<p class="text-surface-500">
				{query || difficulty ? 'No courses match your filters.' : 'No courses published yet. Check back soon!'}
			</p>
			{#if (query || difficulty) && courseList.length > 0}
				<button onclick={clearFilters} class="mt-3 text-sm text-primary-600 hover:text-primary-700">
					Clear filters
				</button>
			{/if}
		</div>
	{:else}
		<p class="mb-4 text-sm text-surface-400">{filtered.length} course{filtered.length === 1 ? '' : 's'}</p>
	{/if}

	<div class="grid gap-8 md:grid-cols-2">
		{#each filtered as course (course.slug)}
			<Card class="flex flex-col">
				{#snippet footer()}
					<Button href="/courses/{course.slug}" size="sm">View Course</Button>
				{/snippet}
				<div class="flex items-start justify-between gap-4">
					<div>
						<h3 class="text-xl font-semibold text-surface-900">{course.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-surface-500">
							{course.description}
						</p>
					</div>
				</div>
				<div class="mt-4 flex items-center gap-2">
			<Badge variant={difficultyMeta[course.difficulty]?.variant ?? 'default'}>
					{difficultyMeta[course.difficulty]?.label ?? course.difficulty}
				</Badge>
				<span class="text-xs text-surface-400">
					{course.lessonCount} lesson{course.lessonCount === 1 ? '' : 's'}
				</span>
				</div>
			</Card>
		{/each}
	</div>
</div>
