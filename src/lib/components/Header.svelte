<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from './ui';
	import Logo from './Logo.svelte';
	import type { User } from '$lib/server/db/schema';

	let {
		user = null
	}: {
		user?: User | null;
	} = $props();

	let mobileOpen = $state(false);

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/courses', label: 'Courses' },
		{ href: '/docs', label: 'Docs' },
		{ href: '/dashboard', label: 'Dashboard' }
	];

	const isActive = $derived((href: string) => {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href);
	});

	const initial = $derived(user?.name?.charAt(0).toUpperCase() ?? '');
</script>

<header
	class="sticky top-0 z-30 border-b border-surface-200 bg-surface-50/80 backdrop-blur-md"
>
	<div class="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
		<Logo size="lg" />

		<nav class="hidden items-center gap-1 md:flex">
			{#each links as link}
				<a
					href={link.href}
					class="rounded-md px-4 py-2 text-sm font-medium transition-colors {isActive(link.href) ? 'bg-primary-100 text-primary-700' : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="hidden items-center gap-3 md:flex">
			{#if user}
				{#if user.role === 'admin'}
					<a href="/admin">
						<Button variant="ghost" size="sm">Admin</Button>
					</a>
				{/if}
				<a href="/account" class="flex items-center gap-2">
					<span class="text-sm font-medium text-surface-700">{user.name}</span>
					<div class="flex size-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
						{initial}
					</div>
				</a>
				<a href="/logout">
					<Button variant="ghost" size="sm">Log Out</Button>
				</a>
			{:else}
				<a href="/login">
					<Button variant="ghost" size="sm">Log In</Button>
				</a>
				<a href="/register">
					<Button size="sm">Sign Up</Button>
				</a>
			{/if}
		</div>

		<button
			class="flex size-10 items-center justify-center rounded-lg text-surface-600 hover:bg-surface-100 md:hidden"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label="Toggle menu"
		>
			{#if mobileOpen}
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
			{/if}
		</button>
	</div>

	{#if mobileOpen}
		<div class="border-t border-surface-200 bg-surface-50 md:hidden">
			<nav class="flex flex-col gap-1 px-6 py-4">
				{#each links as link}
					<a
						href={link.href}
						class="rounded-md px-3 py-2.5 text-sm font-medium transition-colors {isActive(link.href) ? 'bg-primary-100 text-primary-700' : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'}"
						onclick={() => (mobileOpen = false)}
					>
						{link.label}
					</a>
				{/each}
			</nav>
			<div class="flex items-center gap-3 border-t border-surface-200 px-6 py-4">
				{#if user}
					<a href="/account" class="flex items-center gap-2">
						<div class="flex size-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
							{initial}
						</div>
						<span class="text-sm font-medium text-surface-700">{user.name}</span>
					</a>
					<a href="/logout" class="flex-1">
						<Button variant="ghost" size="sm" class="w-full">Log Out</Button>
					</a>
				{:else}
					<a href="/login" class="flex-1">
						<Button variant="ghost" size="sm" class="w-full">Log In</Button>
					</a>
					<a href="/register" class="flex-1">
						<Button size="sm" class="w-full">Sign Up</Button>
					</a>
				{/if}
			</div>
		</div>
	{/if}
</header>
