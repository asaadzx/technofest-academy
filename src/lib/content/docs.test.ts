import { describe, it, expect } from 'vitest';
import { slugify, extractHeadings } from './docs-utils';

describe('slugify', () => {
	it('converts text to lowercase slug', () => {
		expect(slugify('Hello World')).toBe('hello-world');
	});

	it('removes special characters', () => {
		expect(slugify('What is Svelte?')).toBe('what-is-svelte');
	});

	it('collapses multiple dashes', () => {
		expect(slugify('foo   bar---baz')).toBe('foo-bar-baz');
	});

	it('trims leading/trailing dashes', () => {
		expect(slugify('--hello--')).toBe('hello');
	});

	it('handles empty string', () => {
		expect(slugify('')).toBe('');
	});
});

describe('extractHeadings', () => {
	it('extracts h2 headings', () => {
		const md = '## Getting Started\n\nSome content\n\n## Installation';
		const headings = extractHeadings(md);
		expect(headings).toHaveLength(2);
		expect(headings[0]).toEqual({ id: 'getting-started', text: 'Getting Started', level: 2 });
		expect(headings[1]).toEqual({ id: 'installation', text: 'Installation', level: 2 });
	});

	it('extracts h3 headings', () => {
		const md = '### Sub Section\n\nContent';
		const headings = extractHeadings(md);
		expect(headings).toHaveLength(1);
		expect(headings[0]).toEqual({ id: 'sub-section', text: 'Sub Section', level: 3 });
	});

	it('ignores h1 headings', () => {
		const md = '# Title\n\n## Section\n\nContent';
		const headings = extractHeadings(md);
		expect(headings).toHaveLength(1);
		expect(headings[0].level).toBe(2);
	});

	it('returns empty array for no headings', () => {
		expect(extractHeadings('Just plain text')).toEqual([]);
	});

	it('handles empty string', () => {
		expect(extractHeadings('')).toEqual([]);
	});
});
