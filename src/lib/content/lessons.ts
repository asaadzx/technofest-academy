import type { Component } from 'svelte';

export type LessonModule = {
	metadata: Record<string, unknown>;
	default: Component;
};

export const lessonComponents = import.meta.glob<LessonModule>(
	'/content/courses/*/lessons/*.md',
	{ eager: true }
);

export function getLessonComponent(
	courseSlug: string,
	lessonSlug: string
): { component: Component; metadata: Record<string, unknown> } | null {
	const exactPath = `/content/courses/${courseSlug}/lessons/${lessonSlug}.md`;

	if (exactPath in lessonComponents) {
		const mod = lessonComponents[exactPath];
		return { component: mod.default, metadata: mod.metadata };
	}

	for (const [path, mod] of Object.entries(lessonComponents)) {
		if (path.endsWith(`/${lessonSlug}.md`)) {
			return { component: mod.default, metadata: mod.metadata };
		}
	}

	return null;
}
