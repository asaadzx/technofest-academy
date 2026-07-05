<script lang="ts">
	import { Select as BitsSelect } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		value = $bindable(''),
		onValueChange,
		open = $bindable(false),
		onOpenChange,
		disabled = false,
		required = false,
		name,
		children
	}: {
		value?: string;
		onValueChange?: (value: string) => void;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		disabled?: boolean;
		required?: boolean;
		name?: string;
		children?: Snippet;
	} = $props();
</script>

<BitsSelect.Root
	type="single"
	bind:value
	{onValueChange}
	bind:open
	{onOpenChange}
	{disabled}
	{required}
	{name}
>
	{@render children?.()}
</BitsSelect.Root>
