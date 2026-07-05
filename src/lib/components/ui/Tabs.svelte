<script lang="ts">
	import { Tabs as BitsTabs } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		value = $bindable(''),
		onValueChange,
		children,
		...restProps
	}: {
		value?: string;
		onValueChange?: (value: string) => void;
		children?: Snippet;
	} & import('bits-ui').TabsRootProps = $props();
</script>

<BitsTabs.Root bind:value {onValueChange} {...restProps}>
	{@render children?.()}
</BitsTabs.Root>
