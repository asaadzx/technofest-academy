<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Button, Card } from '$lib/components/ui';

	const { users: userList } = $derived($page.data as {
		users: Array<{ id: number; name: string; email: string; role: string; createdAt: Date }>;
	});
</script>

<div class="space-y-6 p-6 md:p-8">
	<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold text-surface-900">Users</h1>
			<p class="mt-1 text-surface-500">Manage registered users and roles.</p>
		</div>
		<span class="rounded-full bg-surface-100 px-3 py-1 text-sm text-surface-600">
			{userList.length} total
		</span>
	</div>

	<Card class="overflow-x-auto !p-0">
		<table class="w-full text-left text-sm min-w-[500px]">
			<thead class="border-b border-surface-200 bg-surface-50">
				<tr>
					<th class="px-5 py-3 font-medium text-surface-600">Name</th>
					<th class="px-5 py-3 font-medium text-surface-600">Email</th>
					<th class="px-5 py-3 font-medium text-surface-600">Role</th>
					<th class="px-5 py-3 font-medium text-surface-600">Joined</th>
					<th class="px-5 py-3 font-medium text-surface-600">Actions</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-surface-200">
				{#each userList as user (user.id)}
					<tr>
						<td class="px-5 py-3 font-medium text-surface-900">{user.name}</td>
						<td class="px-5 py-3 text-surface-600">{user.email}</td>
						<td class="px-5 py-3">
							<form method="POST" action="?/updateRole" use:enhance class="flex items-center gap-2">
								<input type="hidden" name="userId" value={user.id} />
								<select name="role" class="rounded-md border border-surface-300 px-2 py-1 text-sm">
									<option value="student" selected={user.role === 'student'}>Student</option>
									<option value="admin" selected={user.role === 'admin'}>Admin</option>
								</select>
								<Button type="submit" size="sm" variant="ghost">Save</Button>
							</form>
						</td>
						<td class="px-5 py-3 text-surface-500">
							{new Date(user.createdAt).toLocaleDateString()}
						</td>
						<td class="px-5 py-3">
							<form method="POST" action="?/deleteUser" use:enhance
								onsubmit={e => { if (!confirm(`Delete ${user.name}? This cannot be undone.`)) e.preventDefault(); }}>
								<input type="hidden" name="userId" value={user.id} />
								<Button type="submit" size="sm" variant="ghost" class="text-red-600 hover:bg-red-50">Delete</Button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Card>
</div>
