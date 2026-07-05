<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let submitting = $state(false);

	const form = $page.form;
	const errors = $derived((form?.errors ?? {}) as Record<string, string>);
</script>

<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
	<div class="w-full max-w-sm">
		<div class="mb-8 text-center">
			<h1 class="text-2xl font-bold text-surface-900">Create your account</h1>
			<p class="mt-2 text-sm text-surface-500">Start your learning journey</p>
		</div>

		<form method="POST" use:enhance={() => {
			submitting = true;
			return async ({ update }) => { await update(); submitting = false; };
		}} class="space-y-4">
			<div class="flex flex-col gap-1.5">
				<label for="name" class="text-sm font-medium text-surface-700">Full Name</label>
				<input
					id="name"
					name="name"
					type="text"
					required
					bind:value={name}
					class="h-10 w-full rounded-lg border bg-white px-3 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden {errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-surface-300'}"
					placeholder="John Doe"
				/>
				{#if errors.name}<p class="text-xs text-red-600">{errors.name}</p>{/if}
			</div>

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
				<label for="password" class="text-sm font-medium text-surface-700">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					minlength={6}
					bind:value={password}
					class="h-10 w-full rounded-lg border bg-white px-3 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden {errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-surface-300'}"
					placeholder="At least 6 characters"
				/>
				{#if errors.password}<p class="text-xs text-red-600">{errors.password}</p>{/if}
			</div>

			<Button type="submit" class="w-full" disabled={submitting}>
				{submitting ? 'Creating account...' : 'Create Account'}
			</Button>
		</form>

		<p class="mt-6 text-center text-sm text-surface-500">
			Already have an account?
			<a href="/login" class="font-medium text-primary-600 hover:text-primary-700">Sign in</a>
		</p>
	</div>
</div>
