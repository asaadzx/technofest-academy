<script lang="ts">
	import { page } from '$app/stores';

	let { children } = $props();

	const navItems = [
		{
			href: '/admin',
			label: 'Dashboard',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>'
		},
		{
			href: '/admin/courses',
			label: 'Courses',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 19.5Z"/><path d="M9 9h6"/><path d="M9 13h6"/><path d="M9 17h3"/></svg>'
		},
		{
			href: '/admin/users',
			label: 'Users',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
		},
		{
			href: '/admin/quiz-results',
			label: 'Quiz Results',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>'
		},
		{
			href: '/admin/certificates',
			label: 'Certificates',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
		}
	];

	let sidebarOpen = $state(false);

	function isActive(href: string) {
		if (href === '/admin') return $page.url.pathname === '/admin';
		return $page.url.pathname.startsWith(href);
	}
</script>

<div class="flex min-h-[calc(100vh-4rem)]">
	<aside
		class="hidden w-64 shrink-0 border-r border-surface-200 bg-surface-50 p-4 md:block"
	>
		<div class="mb-6 px-3">
			<p class="text-xs font-medium uppercase tracking-wider text-surface-400">Admin</p>
		</div>
		<nav class="flex flex-col gap-1">
			{#each navItems as item}
				<a
					href={item.href}
					class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors {isActive(item.href) ? 'bg-primary-100 text-primary-700' : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'}"
				>
					{@html item.icon}
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="mt-8 border-t border-surface-200 pt-6">
			<a href="/" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-surface-500 hover:text-surface-700">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
				Back to Site
			</a>
		</div>
	</aside>

	<div class="flex flex-1 flex-col">
		<div class="flex items-center justify-between border-b border-surface-200 bg-white px-6 py-3 md:hidden">
			<p class="text-sm font-medium text-surface-500">Admin</p>
			<button
				class="rounded-md p-2 text-surface-500 hover:bg-surface-100"
				onclick={() => (sidebarOpen = !sidebarOpen)}
				aria-label="Toggle sidebar"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
			</button>
		</div>

		{#if sidebarOpen}
			<div class="border-b border-surface-200 bg-surface-50 md:hidden">
				<nav class="flex flex-col gap-1 px-4 py-3">
					{#each navItems as item}
						<a
							href={item.href}
							class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors {isActive(item.href) ? 'bg-primary-100 text-primary-700' : 'text-surface-600 hover:bg-surface-100'}"
							onclick={() => (sidebarOpen = false)}
						>
							{@html item.icon}
							{item.label}
						</a>
					{/each}
				</nav>
			</div>
		{/if}

		<div class="flex-1 bg-white">
			{@render children()}
		</div>
	</div>
</div>
