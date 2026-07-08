import type { Component } from 'svelte';
import { extractHeadings } from './docs-utils';

export type DocModule = {
	metadata: Record<string, unknown>;
	default: Component;
};

const docModules = import.meta.glob<DocModule>(
	'/docs/**/*.md',
	{ eager: true }
);

const rawDocs = import.meta.glob<string>(
	'/docs/**/*.md',
	{ eager: true, query: '?raw' }
);

export interface DocMeta {
	slug: string;
	title: string;
	description: string;
	component: Component;
	headings: { id: string; text: string; level: number }[];
}

export function getDocs(): DocMeta[] {
	const docs: DocMeta[] = [];

	for (const [path, mod] of Object.entries(docModules)) {
		const slug = path.split('/').pop()?.replace('.md', '');
		if (!slug) continue;

		const rawEntry = rawDocs[path];
		const raw = typeof rawEntry === 'string' ? rawEntry : (rawEntry as any)?.default ?? '';
		const headings = extractHeadings(raw);

		const meta = mod.metadata ?? {};
		docs.push({
			slug,
			title: (meta.title as string) || slug,
			description: (meta.description as string) || '',
			component: mod.default,
			headings
		});
	}

	return docs.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getDoc(slug: string): DocMeta | undefined {
	return getDocs().find((d) => d.slug === slug);
}
