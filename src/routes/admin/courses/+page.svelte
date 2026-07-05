<script lang="ts">
	import { page } from '$app/stores';
	import { Badge, Button } from '$lib/components/ui';

	const { courses } = $derived($page.data as {
		courses: Array<{
			id: number;
			slug: string;
			title: string;
			description: string;
			difficulty: string;
			published: boolean;
			order: number;
			lessonCount: number;
		}>;
	});

	const isFirst = (i: number) => i === 0;
	const isLast = (i: number) => i === courses.length - 1;
</script>

<div class="p-6 md:p-8">
	<header class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold text-surface-900">Courses</h1>
			<p class="mt-1 text-surface-500">
				{courses.length} course{courses.length === 1 ? '' : 's'} total
			</p>
		</div>
		<div class="flex flex-wrap items-center gap-2">
			<Button href="/admin/courses/upload" variant="outline">Import Markdown</Button>
			<Button href="/admin/courses/new">New Course</Button>
		</div>
	</header>

	{#if courses.length === 0}
		<div class="rounded-xl border-2 border-dashed border-surface-300 p-16 text-center">
			<p class="text-surface-500">No courses found.</p>
			<div class="mt-4 flex items-center justify-center gap-3">
				<Button href="/admin/courses/new">Create Course</Button>
				<Button href="/admin/courses/upload" variant="outline">Import Markdown</Button>
			</div>
		</div>
	{:else}
		<div class="overflow-x-auto rounded-xl border border-surface-200">
		<table class="w-full text-left text-sm min-w-[600px]">
				<thead>
					<tr class="border-b border-surface-200 bg-surface-50">
						<th class="w-16 px-4 py-3 font-medium text-surface-600">Order</th>
						<th class="px-4 py-3 font-medium text-surface-600">Title</th>
						<th class="px-4 py-3 font-medium text-surface-600">Slug</th>
						<th class="px-4 py-3 font-medium text-surface-600">Difficulty</th>
						<th class="px-4 py-3 font-medium text-surface-600">Lessons</th>
						<th class="px-4 py-3 font-medium text-surface-600">Status</th>
					</tr>
				</thead>
				<tbody>
					{#each courses as course, i (course.id)}
						<tr class="border-b border-surface-100 last:border-0 hover:bg-surface-50/50">
							<td class="px-4 py-3">
								<div class="flex items-center gap-1">
									<span class="w-4 text-center text-xs text-surface-400">{course.order}</span>
									<form method="POST" action="?/reorder" class="flex flex-col">
										<input type="hidden" name="id" value={course.id} />
										<input type="hidden" name="direction" value="up" />
										<button
											type="submit"
											disabled={isFirst(i)}
											class="disabled:opacity-20 hover:text-primary-600 leading-none"
											aria-label="Move up"
										>&#9650;</button>
									</form>
									<form method="POST" action="?/reorder" class="flex flex-col">
										<input type="hidden" name="id" value={course.id} />
										<input type="hidden" name="direction" value="down" />
										<button
											type="submit"
											disabled={isLast(i)}
											class="disabled:opacity-20 hover:text-primary-600 leading-none"
											aria-label="Move down"
										>&#9660;</button>
									</form>
								</div>
							</td>
							<td class="px-4 py-3">
								<a
									href="/admin/courses/{course.slug}"
									class="font-medium text-primary-600 hover:text-primary-700"
								>
									{course.title}
								</a>
							</td>
							<td class="px-4 py-3 font-mono text-xs text-surface-400">{course.slug}</td>
							<td class="px-4 py-3">
								<Badge
									variant={course.difficulty === 'beginner' ? 'success' : course.difficulty === 'intermediate' ? 'warning' : 'error'}
								>
									{course.difficulty}
								</Badge>
							</td>
							<td class="px-4 py-3 text-surface-600">{course.lessonCount}</td>
							<td class="px-4 py-3">
								<form method="POST" action="?/togglePublish">
									<input type="hidden" name="id" value={course.id} />
									<button
										type="submit"
										class="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors {course.published ? 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100' : 'border-surface-300 bg-surface-50 text-surface-500 hover:bg-surface-100'}"
									>
										{course.published ? 'Published' : 'Draft'}
									</button>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
