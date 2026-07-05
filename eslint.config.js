import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

export default tseslint.config(
	{ ignores: ['.svelte-kit/', '.vercel/', 'build/', '.direnv/'] },
	{
		files: ['**/*.{js,ts}'],
		extends: [...tseslint.configs.recommended],
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
		}
	},
	{
		files: ['**/*.svelte'],
		extends: [
			...tseslint.configs.recommended,
			...svelte.configs['flat/recommended']
		],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tseslint.parser
			}
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'prefer-const': 'off',
			'svelte/no-at-html-tags': 'off',
			'svelte/no-target-blank': 'off',
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/require-each-key': 'warn'
		}
	},
	{
		files: ['scripts/**/*.ts', 'drizzle.config.ts'],
		languageOptions: {
			globals: { console: 'readable', process: 'readable' }
		}
	}
);
