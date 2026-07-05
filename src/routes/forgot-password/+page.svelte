<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Button, Card } from '$lib/components/ui';

	const form = $page.form;
	const sent = $derived(form?.sent);
	const resetUrl = $derived(form?.resetUrl as string | undefined);
	const email = $derived(form?.email as string | undefined);
	const error = $derived(form?.error as string | undefined);
	let submitting = $state(false);
</script>

<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
	<div class="w-full max-w-md">
		{#if sent}
			<Card class="py-10 text-center">
				<div class="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-100">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-600"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
				</div>
				<h1 class="text-xl font-bold text-surface-900">Reset link generated</h1>
				<p class="mt-2 text-sm text-surface-500">
					A password reset link has been created for <strong>{email}</strong>.
				</p>
				<p class="mt-1 text-sm text-surface-400">
					In production this would be emailed. For now, use the link below:
				</p>
				<div class="mt-4">
					<a href={resetUrl} class="text-primary-600 hover:text-primary-700 font-medium underline break-all">{resetUrl}</a>
				</div>
				<div class="mt-6">
					<a href="/login"><Button variant="outline">Back to Login</Button></a>
				</div>
			</Card>
		{:else}
			<div class="mb-8 text-center">
				<h1 class="text-2xl font-bold text-surface-900">Forgot password</h1>
				<p class="mt-2 text-sm text-surface-500">Enter your email to receive a reset link</p>
			</div>

			<form method="POST" use:enhance={() => { submitting = true; return async ({ update }) => { await update(); submitting = false; }; }} class="space-y-4">
				<div class="flex flex-col gap-1.5">
					<label for="email" class="text-sm font-medium text-surface-700">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						class="h-10 w-full rounded-lg border border-surface-300 bg-white px-3 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden"
						placeholder="you@example.com"
					/>
					{#if error}<p class="text-xs text-red-600">{error}</p>{/if}
				</div>
				<Button type="submit" class="w-full" disabled={submitting}>
					{submitting ? 'Sending...' : 'Send Reset Link'}
				</Button>
			</form>

			<p class="mt-6 text-center text-sm text-surface-500">
				Remember your password?
				<a href="/login" class="font-medium text-primary-600 hover:text-primary-700">Sign in</a>
			</p>
		{/if}
	</div>
</div>
