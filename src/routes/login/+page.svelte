<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Button, Card } from '$lib/components/ui';

	let email = $state('');
	let password = $state('');
	let submitting = $state(false);

	const form = $page.form;
	const errors = $derived((form?.errors ?? {}) as Record<string, string>);
	const justReset = $derived($page.url.searchParams.has('reset'));
</script>

<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
	<div class="w-full max-w-sm">
		{#if justReset}
			<Card class="mb-6 border-green-200 bg-green-50 py-4 text-center">
				<p class="text-sm font-medium text-green-800">Password reset successfully. Sign in with your new password.</p>
			</Card>
		{/if}
		<div class="mb-8 text-center">
			<h1 class="text-2xl font-bold text-surface-900">Welcome back</h1>
			<p class="mt-2 text-sm text-surface-500">Sign in to continue learning</p>
		</div>

		<form method="POST" use:enhance={() => {
			submitting = true;
			return async ({ update }) => { await update(); submitting = false; };
		}} class="space-y-4">
			<div class="flex flex-col gap-1.5">
				<label for="email" class="text-sm font-medium text-surface-700">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					bind:value={email}
					class="h-10 w-full rounded-lg border bg-white px-3 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden {errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-surface-300'}"
					placeholder="you@example.com"
				/>
				{#if errors.email}<p class="text-xs text-red-600">{errors.email}</p>{/if}
			</div>

			<div class="flex flex-col gap-1.5">
				<div class="flex items-center justify-between">
					<label for="password" class="text-sm font-medium text-surface-700">Password</label>
					<a href="/forgot-password" class="text-xs text-primary-600 hover:text-primary-700">Forgot?</a>
				</div>
				<input
					id="password"
					name="password"
					type="password"
					required
					bind:value={password}
					class="h-10 w-full rounded-lg border bg-white px-3 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden {errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-surface-300'}"
					placeholder="••••••••"
				/>
				{#if errors.password}<p class="text-xs text-red-600">{errors.password}</p>{/if}
			</div>

			<label class="flex cursor-pointer items-center gap-2">
				<input
					type="checkbox"
					name="rememberMe"
					checked
					class="size-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500/20"
				/>
				<span class="text-sm text-surface-600">Remember me for 30 days</span>
			</label>

			<Button type="submit" class="w-full" disabled={submitting}>
				{submitting ? 'Signing in...' : 'Sign In'}
			</Button>
		</form>

		<p class="mt-6 text-center text-sm text-surface-500">
			Don't have an account?
			<a href="/register" class="font-medium text-primary-600 hover:text-primary-700">Sign up</a>
		</p>
	</div>
</div>
