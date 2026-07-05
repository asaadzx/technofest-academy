<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Button, Card, Input } from '$lib/components/ui';
	import type { User } from '$lib/server/db/schema';

	const { user } = $derived($page.data as { user: User });

	const form = $page.form;
	const nameUpdated = $derived(form?.nameUpdated);
	const emailUpdated = $derived(form?.emailUpdated);
	const passwordUpdated = $derived(form?.passwordUpdated);
	const nameError = $derived(form?.nameError);
	const emailError = $derived(form?.emailError);
	const passwordError = $derived(form?.passwordError);
</script>

<div class="mx-auto max-w-2xl px-6 py-12">
	<header class="mb-10">
		<h1 class="text-3xl font-bold text-surface-900">Account</h1>
		<p class="mt-2 text-surface-500">Manage your profile and security settings.</p>
	</header>

	<div class="space-y-8">
		<Card>
			<h2 class="mb-5 text-lg font-semibold text-surface-900">Profile</h2>

			<form method="POST" action="?/updateName" use:enhance class="mb-5">
				<label for="name" class="mb-1.5 block text-sm font-medium text-surface-700">Name</label>
				<div class="flex gap-3">
					<Input id="name" name="name" value={user.name} required class="flex-1" />
					<Button type="submit" size="sm">Save</Button>
				</div>
				{#if nameUpdated}<p class="mt-1 text-xs text-green-600">Name updated.</p>{/if}
				{#if nameError}<p class="mt-1 text-xs text-red-600">{nameError}</p>{/if}
			</form>

			<form method="POST" action="?/updateEmail" use:enhance>
				<label for="email" class="mb-1.5 block text-sm font-medium text-surface-700">Email</label>
				<div class="flex gap-3">
					<Input id="email" name="email" type="email" value={user.email} required class="flex-1" />
					<Button type="submit" size="sm">Save</Button>
				</div>
				{#if emailUpdated}<p class="mt-1 text-xs text-green-600">Email updated.</p>{/if}
				{#if emailError}<p class="mt-1 text-xs text-red-600">{emailError}</p>{/if}
			</form>
		</Card>

		<Card>
			<h2 class="mb-5 text-lg font-semibold text-surface-900">Change Password</h2>

			<form method="POST" action="?/updatePassword" use:enhance class="space-y-4">
				<div>
					<label for="currentPassword" class="mb-1.5 block text-sm font-medium text-surface-700">Current Password</label>
					<Input id="currentPassword" name="currentPassword" type="password" required class="w-full" />
				</div>
				<div>
					<label for="newPassword" class="mb-1.5 block text-sm font-medium text-surface-700">New Password</label>
					<Input id="newPassword" name="newPassword" type="password" required class="w-full" />
				</div>
				<Button type="submit">Update Password</Button>
				{#if passwordUpdated}<p class="mt-1 text-xs text-green-600">Password updated.</p>{/if}
				{#if passwordError}<p class="mt-1 text-xs text-red-600">{passwordError}</p>{/if}
			</form>
		</Card>
	</div>
</div>
