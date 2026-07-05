<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$lib/components/ui';
	import { getCourses } from '$lib/content/index';

	const { userCount, enrollmentCount } = $derived($page.data as {
		userCount: number;
		enrollmentCount: number;
	});

	const courses = $derived(getCourses().filter((c) => c.published));
	const totalLessons = $derived(courses.reduce((sum, c) => sum + c.lessons.length, 0));
</script>

<div class="p-6 md:p-8">
	<header class="mb-8">
		<h1 class="text-2xl font-bold text-surface-900">Dashboard</h1>
		<p class="mt-1 text-surface-500">Overview of your educational platform.</p>
	</header>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		<Card>
			<p class="text-sm text-surface-500">Published Courses</p>
			<p class="mt-1 text-3xl font-bold text-surface-900">{courses.length}</p>
		</Card>
		<Card>
			<p class="text-sm text-surface-500">Total Lessons</p>
			<p class="mt-1 text-3xl font-bold text-surface-900">{totalLessons}</p>
		</Card>
		<Card>
			<p class="text-sm text-surface-500">Registered Users</p>
			<p class="mt-1 text-3xl font-bold text-surface-900">{userCount}</p>
		</Card>
		<Card>
			<p class="text-sm text-surface-500">Enrollments</p>
			<p class="mt-1 text-3xl font-bold text-surface-900">{enrollmentCount}</p>
		</Card>
	</div>

	<section class="mt-10">
		<h2 class="mb-4 text-lg font-semibold text-surface-900">Recent Courses</h2>
		<div class="overflow-hidden rounded-xl border border-surface-200">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-surface-200 bg-surface-50">
						<th class="px-4 py-3 font-medium text-surface-600">Title</th>
						<th class="px-4 py-3 font-medium text-surface-600">Difficulty</th>
						<th class="px-4 py-3 font-medium text-surface-600">Lessons</th>
						<th class="px-4 py-3 font-medium text-surface-600">Status</th>
					</tr>
				</thead>
				<tbody>
					{#each courses as course (course.slug)}
						<tr class="border-b border-surface-100 last:border-0">
							<td class="px-4 py-3">
								<a href="/admin/courses/{course.slug}" class="font-medium text-primary-600 hover:text-primary-700">
									{course.title}
								</a>
							</td>
							<td class="px-4 py-3 capitalize text-surface-600">{course.difficulty}</td>
							<td class="px-4 py-3 text-surface-600">{course.lessons.length}</td>
							<td class="px-4 py-3">
								<span class="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
									Published
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>
