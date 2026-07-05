<script lang="ts">
	import { DropdownMenu as BitsDropdown } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		children,
		...restProps
	}: {
		children?: Snippet;
	} & import('bits-ui').DropdownMenuRootProps = $props();
</script>

<BitsDropdown.Root {...restProps}>
	{@render children?.()}
</BitsDropdown.Root>
