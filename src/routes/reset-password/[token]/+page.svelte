<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui';

	const form = $page.form;
	const error = $derived(form?.error as string | undefined);
	let password = $state('');
	let submitting = $state(false);
</script>

<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
	<div class="w-full max-w-sm">
		<div class="mb-8 text-center">
			<h1 class="text-2xl font-bold text-surface-900">Reset password</h1>
			<p class="mt-2 text-sm text-surface-500">Enter your new password</p>
		</div>

		<form method="POST" use:enhance={() => { submitting = true; return async ({ update }) => { await update(); submitting = false; }; }} class="space-y-4">
			<div class="flex flex-col gap-1.5">
				<label for="password" class="text-sm font-medium text-surface-700">New Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					minlength={6}
					bind:value={password}
					class="h-10 w-full rounded-lg border border-surface-300 bg-white px-3 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden"
					placeholder="At least 6 characters"
				/>
				{#if error}<p class="text-xs text-red-600">{error}</p>{/if}
			</div>
			<Button type="submit" class="w-full" disabled={submitting}>
				{submitting ? 'Resetting...' : 'Reset Password'}
			</Button>
		</form>
	</div>
</div>
