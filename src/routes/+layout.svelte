<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import CookieConsent from '$lib/components/CookieConsent.svelte';

	let { children, data } = $props();

</script>

<svelte:head>
	<link rel="icon" href="/technofest-logo.png" type="image/png" />
	<link rel="apple-touch-icon" href="/technofest-logo.png" />
	<meta property="og:image" content="/technofest-logo.png" />
</svelte:head>

<Header user={data.user} />
<main>
	{@render children()}
</main>
<CookieConsent />
