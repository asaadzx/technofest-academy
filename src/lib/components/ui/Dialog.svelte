<script lang="ts">
	import { Dialog as BitsDialog } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		open = $bindable(false),
		onOpenChange,
		children
	}: {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		children?: Snippet;
	} & import('bits-ui').DialogRootProps = $props();
</script>

<BitsDialog.Root bind:open {onOpenChange}>
	{@render children?.()}
</BitsDialog.Root>
