<script lang="ts">
	import { Button as BitsButton } from 'bits-ui';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
	type Size = 'sm' | 'md' | 'lg';

	let {
		variant = 'primary',
		size = 'md',
		class: className = '',
		children,
		...restProps
	}: {
		variant?: Variant;
		size?: Size;
		class?: string;
		children?: import('svelte').Snippet;
	} & import('bits-ui').ButtonRootProps = $props();

	const base = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

	const variants: Record<Variant, string> = {
		primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
		secondary: 'bg-surface-100 text-surface-900 hover:bg-surface-200 active:bg-surface-300',
		ghost: 'text-surface-700 hover:bg-surface-100 hover:text-surface-900 active:bg-surface-200',
		destructive: 'bg-error text-white hover:bg-red-600 active:bg-red-700',
		outline: 'border border-surface-300 bg-white text-surface-700 hover:bg-surface-50 hover:text-surface-900 active:bg-surface-100'
	};

	const sizes: Record<Size, string> = {
		sm: 'h-8 px-3 text-sm rounded-md gap-1.5',
		md: 'h-10 px-4 text-sm rounded-lg gap-2',
		lg: 'h-12 px-6 text-base rounded-lg gap-2'
	};

	const classes = $derived(`${base} ${variants[variant]} ${sizes[size]} ${className}`);
</script>

<BitsButton.Root class={classes} {...restProps}>
	{@render children?.()}
</BitsButton.Root>
