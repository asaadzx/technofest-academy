<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$lib/components/ui';

	const { attempts, courses, lessons: filterLessons, filterCourse, filterLesson } = $derived($page.data as {
		attempts: Array<{
			id: number;
			userName: string;
			userEmail: string;
			courseSlug: string;
			lessonSlug: string;
			score: number;
			total: number;
			createdAt: Date;
		}>;
		courses: Array<{ slug: string; title: string }>;
		lessons: Array<{ slug: string; title: string }>;
		filterCourse: string;
		filterLesson: string;
	});
</script>

<div class="space-y-6 p-6 md:p-8">
	<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold text-surface-900">Quiz Results</h1>
			<p class="mt-1 text-surface-500">View all quiz attempts submitted by students.</p>
		</div>
		<span class="rounded-full bg-surface-100 px-3 py-1 text-sm text-surface-600">
			{attempts.length} attempts
		</span>
	</div>

	<form method="GET" class="flex flex-wrap gap-4">
		<select name="course" class="rounded-lg border border-surface-300 px-3 py-2 text-sm"
			onchange={(e) => { const params = new URLSearchParams(); const v = (e.currentTarget as HTMLSelectElement).value; if (v) params.set('course', v); window.location.search = params.toString(); }}>
			<option value="">All Courses</option>
			{#each courses as c}
				<option value={c.slug} selected={c.slug === filterCourse}>{c.title}</option>
			{/each}
		</select>
		{#if filterLessons.length > 0}
			<select name="lesson" class="rounded-lg border border-surface-300 px-3 py-2 text-sm"
				onchange={(e) => { const params = new URLSearchParams(window.location.search); const v = (e.currentTarget as HTMLSelectElement).value; if (v) params.set('lesson', v); else params.delete('lesson'); window.location.search = params.toString(); }}>
				<option value="">All Lessons</option>
				{#each filterLessons as l}
					<option value={l.slug} selected={l.slug === filterLesson}>{l.title}</option>
				{/each}
			</select>
		{/if}
		{#if filterCourse}
			<a href="/admin/quiz-results" class="rounded-lg border border-surface-300 px-3 py-2 text-sm text-surface-600 hover:bg-surface-50">Clear</a>
		{/if}
	</form>

	<Card class="overflow-x-auto !p-0">
		<table class="w-full text-left text-sm">
			<thead class="border-b border-surface-200 bg-surface-50">
				<tr>
					<th class="px-5 py-3 font-medium text-surface-600">User</th>
					<th class="px-5 py-3 font-medium text-surface-600">Email</th>
					<th class="px-5 py-3 font-medium text-surface-600">Course</th>
					<th class="px-5 py-3 font-medium text-surface-600">Lesson</th>
					<th class="px-5 py-3 font-medium text-surface-600">Score</th>
					<th class="px-5 py-3 font-medium text-surface-600">Date</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-surface-200">
				{#each attempts as a (a.id)}
					<tr class="hover:bg-surface-50">
						<td class="px-5 py-3 font-medium text-surface-900">{a.userName}</td>
						<td class="px-5 py-3 text-surface-600">{a.userEmail}</td>
						<td class="px-5 py-3 text-surface-700">{a.courseSlug}</td>
						<td class="px-5 py-3 text-surface-700">{a.lessonSlug}</td>
						<td class="px-5 py-3 font-medium">{a.score}/{a.total}</td>
						<td class="px-5 py-3 text-surface-500">{new Date(a.createdAt).toLocaleDateString()}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if attempts.length === 0}
			<p class="px-5 py-8 text-center text-sm text-surface-400">No quiz attempts found.</p>
		{/if}
	</Card>
</div>
