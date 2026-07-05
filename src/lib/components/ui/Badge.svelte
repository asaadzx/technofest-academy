<script lang="ts">
	type Variant = 'default' | 'primary' | 'success' | 'warning' | 'error';

	let {
		variant = 'default',
		class: className = '',
		children
	}: {
		variant?: Variant;
		class?: string;
		children?: import('svelte').Snippet;
	} = $props();

	const variants: Record<Variant, string> = {
		default: 'bg-surface-100 text-surface-700',
		primary: 'bg-primary-100 text-primary-700',
		success: 'bg-green-100 text-green-700',
		warning: 'bg-amber-100 text-amber-700',
		error: 'bg-red-100 text-red-700'
	};

	const classes = $derived(`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`);
</script>

<span class={classes}>
	{@render children?.()}
</span>
