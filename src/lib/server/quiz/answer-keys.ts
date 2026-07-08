export interface AnswerKeyEntry {
	id: string;
	type: 'mcq' | 'tf' | 'code' | 'fill';
	correct: string | string[];
	points: number;
}

const keyModules = import.meta.glob<{ default: AnswerKeyEntry[] }>(
	'/content/courses/**/*.quiz.json',
	{ eager: true }
);

const keyCache = new Map<string, AnswerKeyEntry[]>();

export function getAnswerKey(courseSlug: string, lessonSlug: string): AnswerKeyEntry[] {
	const cacheKey = `${courseSlug}/${lessonSlug}`;
	if (keyCache.has(cacheKey)) return keyCache.get(cacheKey)!;

	for (const [path, mod] of Object.entries(keyModules)) {
		if (path.includes(`/${courseSlug}/lessons/${lessonSlug}.quiz.json`)) {
			const keys = mod.default;
			keyCache.set(cacheKey, keys);
			return keys;
		}
	}

	return [];
}
