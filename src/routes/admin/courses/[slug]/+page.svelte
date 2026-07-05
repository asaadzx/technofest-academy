<script lang="ts">
	import { page } from '$app/stores';
	import { Card, Badge, Button } from '$lib/components/ui';

	const { course, lessons } = $derived($page.data as {
		course: {
			id: number;
			slug: string;
			title: string;
			description: string;
			difficulty: string;
			published: boolean;
			order: number;
		};
		lessons: Array<{
			id: number;
			slug: string;
			title: string;
			description: string;
			order: number;
		}>;
	});

	const difficultyMeta: Record<string, { label: string; variant: 'success' | 'warning' | 'error' }> = {
		beginner: { label: 'Beginner', variant: 'success' },
		intermediate: { label: 'Intermediate', variant: 'warning' },
		advanced: { label: 'Advanced', variant: 'error' }
	};

	const isFirst = (i: number) => i === 0;
	const isLast = (i: number) => i === lessons.length - 1;
</script>

<div class="p-6 md:p-8">
	<div class="mb-2">
		<a href="/admin/courses" class="text-sm text-primary-600 hover:text-primary-700">
			&larr; All Courses
		</a>
	</div>

	<header class="mb-8">
		<div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
			<div>
				<h1 class="text-2xl font-bold text-surface-900">{course.title}</h1>
				<p class="mt-1 text-surface-500">{course.description}</p>
			</div>
			<div class="flex flex-wrap items-center gap-2 shrink-0">
				<form method="POST" action="?/togglePublish">
					<Button type="submit" variant="outline" size="sm">
						{course.published ? 'Unpublish' : 'Publish'}
					</Button>
				</form>
				<a href="/admin/courses/{course.slug}/edit">
					<Button variant="outline" size="sm">Edit</Button>
				</a>
				<form method="POST" action="?/delete" onsubmit={(e) => { if (!confirm('Delete this course and all its lessons?')) e.preventDefault(); }}>
					<Button type="submit" variant="destructive" size="sm">Delete</Button>
				</form>
			</div>
		</div>
	</header>

	<div class="grid gap-6 lg:grid-cols-2">
		<Card title="Course Info">
			<dl class="space-y-3 text-sm">
				<div class="flex justify-between">
					<dt class="text-surface-500">Slug</dt>
					<dd class="font-mono text-surface-900">{course.slug}</dd>
				</div>
				<div class="flex justify-between">
					<dt class="text-surface-500">Difficulty</dt>
					<dd>
						<Badge variant={difficultyMeta[course.difficulty]?.variant ?? 'default'}>
							{difficultyMeta[course.difficulty]?.label ?? course.difficulty}
						</Badge>
					</dd>
				</div>
				<div class="flex justify-between">
					<dt class="text-surface-500">Order</dt>
					<dd class="text-surface-900">{course.order}</dd>
				</div>
				<div class="flex justify-between">
					<dt class="text-surface-500">Status</dt>
					<dd>
						{#if course.published}
							<span class="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">Published</span>
						{:else}
							<span class="inline-flex rounded-full bg-surface-100 px-2.5 py-0.5 text-xs font-medium text-surface-500">Draft</span>
						{/if}
					</dd>
				</div>
				<div class="flex justify-between">
					<dt class="text-surface-500">Total Lessons</dt>
					<dd class="text-surface-900">{lessons.length}</dd>
				</div>
			</dl>
		</Card>

		<Card title="Actions">
			<div class="space-y-3">
				<a href="/courses/{course.slug}" class="block">
					<Button variant="outline" class="w-full justify-start">
						View on Site
					</Button>
				</a>
				{#if lessons.length > 0}
					<a href="/courses/{course.slug}/lessons/{lessons[0].slug}" class="block">
						<Button variant="ghost" class="w-full justify-start">
							Preview First Lesson
						</Button>
					</a>
				{/if}
			</div>
		</Card>
	</div>

	<section class="mt-8">
		<Card title="Lessons" description="{lessons.length} lesson{lessons.length === 1 ? '' : 's'} in this course">
			{#snippet footer()}
				<a href="/admin/courses/{course.slug}/lessons/new">
					<Button size="sm">Add Lesson</Button>
				</a>
			{/snippet}

			{#if lessons.length === 0}
				<p class="py-4 text-center text-sm text-surface-400">No lessons yet. Add your first lesson.</p>
			{:else}
				<ol class="divide-y divide-surface-100">
					{#each lessons as lesson, i (lesson.id)}
						<li class="flex items-center gap-4 py-3">
							<div class="flex flex-col items-center gap-0.5 shrink-0">
								<form method="POST" action="?/reorderLesson">
									<input type="hidden" name="lessonId" value={lesson.id} />
									<input type="hidden" name="direction" value="up" />
									<button
										type="submit"
										disabled={isFirst(i)}
										class="disabled:opacity-20 hover:text-primary-600 text-[10px] leading-none cursor-pointer"
										aria-label="Move lesson up"
									>&#9650;</button>
								</form>
								<span class="text-xs font-medium text-surface-400 w-4 text-center">{lesson.order}</span>
								<form method="POST" action="?/reorderLesson">
									<input type="hidden" name="lessonId" value={lesson.id} />
									<input type="hidden" name="direction" value="down" />
									<button
										type="submit"
										disabled={isLast(i)}
										class="disabled:opacity-20 hover:text-primary-600 text-[10px] leading-none cursor-pointer"
										aria-label="Move lesson down"
									>&#9660;</button>
								</form>
							</div>
							<div class="min-w-0 flex-1">
								<p class="truncate font-medium text-surface-900">{lesson.title}</p>
								<p class="truncate text-xs text-surface-400">{lesson.slug}</p>
							</div>
							<div class="flex items-center gap-1 shrink-0">
								<a
									href="/admin/courses/{course.slug}/lessons/{lesson.slug}/edit"
									class="rounded-md px-2 py-1 text-xs font-medium text-surface-500 hover:text-primary-600 hover:bg-surface-100 transition-colors"
								>
									Edit
								</a>
								<a
									href="/courses/{course.slug}/lessons/{lesson.slug}"
									class="rounded-md px-2 py-1 text-xs font-medium text-primary-600 hover:text-primary-700 hover:bg-surface-100 transition-colors"
								>
									View
								</a>
								<form method="POST" action="?/deleteLesson" onsubmit={(e) => { if (!confirm('Delete this lesson?')) e.preventDefault(); }}>
									<input type="hidden" name="lessonId" value={lesson.id} />
									<button type="submit" class="rounded-md px-2 py-1 text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
										Delete
									</button>
								</form>
							</div>
						</li>
					{/each}
				</ol>
			{/if}
		</Card>
	</section>
</div>
