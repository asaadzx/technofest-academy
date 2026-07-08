<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$lib/components/ui';

	const { certs, courses, filterCourse } = $derived($page.data as {
		certs: Array<{
			id: number;
			userName: string;
			userEmail: string;
			courseTitle: string;
			courseSlug: string;
			certCode: string;
			issuedAt: Date;
		}>;
		courses: Array<{ slug: string; title: string }>;
		filterCourse: string;
	});
</script>

<div class="space-y-6 p-6 md:p-8">
	<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold text-surface-900">Certificates</h1>
			<p class="mt-1 text-surface-500">View all certificates issued to students.</p>
		</div>
		<span class="rounded-full bg-surface-100 px-3 py-1 text-sm text-surface-600">
			{certs.length} certificates
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
		{#if filterCourse}
			<a href="/admin/certificates" class="rounded-lg border border-surface-300 px-3 py-2 text-sm text-surface-600 hover:bg-surface-50">Clear</a>
		{/if}
	</form>

	<Card class="overflow-x-auto !p-0">
		<table class="w-full text-left text-sm">
			<thead class="border-b border-surface-200 bg-surface-50">
				<tr>
					<th class="px-5 py-3 font-medium text-surface-600">User</th>
					<th class="px-5 py-3 font-medium text-surface-600">Email</th>
					<th class="px-5 py-3 font-medium text-surface-600">Course</th>
					<th class="px-5 py-3 font-medium text-surface-600">Code</th>
					<th class="px-5 py-3 font-medium text-surface-600">Issued</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-surface-200">
				{#each certs as c (c.id)}
					<tr class="hover:bg-surface-50">
						<td class="px-5 py-3 font-medium text-surface-900">{c.userName}</td>
						<td class="px-5 py-3 text-surface-600">{c.userEmail}</td>
						<td class="px-5 py-3 text-surface-700">{c.courseTitle}</td>
						<td class="px-5 py-3 font-mono text-xs text-surface-500">{c.certCode}</td>
						<td class="px-5 py-3 text-surface-500">{new Date(c.issuedAt).toLocaleDateString()}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if certs.length === 0}
			<p class="px-5 py-8 text-center text-sm text-surface-400">No certificates issued yet.</p>
		{/if}
	</Card>
</div>
