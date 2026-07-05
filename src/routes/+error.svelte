<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Card } from '$lib/components/ui';

	const status = $derived($page.status);
	const message = $derived(
		status === 404 ? 'Page not found'
		: status === 403 ? 'Access denied'
		: status >= 500 ? 'Something went wrong'
		: 'An unexpected error occurred'
	);
	const hint = $derived(
		status === 404 ? "The page you're looking for doesn't exist or has been moved."
		: 'Please try again or contact support.'
	);
</script>

<div class="mx-auto flex min-h-[60vh] max-w-lg items-center px-6">
	<Card class="w-full border-2 border-dashed border-surface-300 py-12 text-center">
		<div class="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-surface-100">
			<span class="text-3xl font-bold text-primary-600">{status}</span>
		</div>
		<h1 class="text-2xl font-bold text-surface-900">{message}</h1>
		<p class="mt-2 text-surface-500">{hint}</p>
		<div class="mt-6 flex justify-center gap-3">
			<Button href="/">Go Home</Button>
			<Button href="/courses" variant="outline">Browse Courses</Button>
		</div>
	</Card>
</div>
