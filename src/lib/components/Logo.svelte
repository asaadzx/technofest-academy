<script lang="ts">
	let {
		showText = true,
		size = 'md',
		class: className = ''
	}: {
		showText?: boolean;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
	} = $props();

	const dim = $derived(
		size === 'sm' ? 'h-10' : size === 'md' ? 'h-14' : size === 'lg' ? 'h-20' : 'h-28'
	);

	const textSize = $derived(
		size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-4xl'
	);
</script>

<a href="/" class="inline-flex items-center gap-2 {className}">
	<img
		src="/technofest-logo.png"
		alt="TechnoFest Academy"
		class="{dim} w-auto"
		style="aspect-ratio: 1/1; object-fit: contain;"
	/>

	{#if showText}
		<span class="font-heading font-bold {textSize} text-surface-900">
			TechnoFest Academy
		</span>
	{/if}
</a>
