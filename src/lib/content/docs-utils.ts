export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function extractHeadings(raw: string): { id: string; text: string; level: number }[] {
	const headings: { id: string; text: string; level: number }[] = [];
	const regex = /^(#{2,3})\s+(.+)$/gm;
	let match;
	while ((match = regex.exec(raw)) !== null) {
		const level = match[1].length;
		const text = match[2].trim();
		headings.push({ id: slugify(text), text, level });
	}
	return headings;
}
