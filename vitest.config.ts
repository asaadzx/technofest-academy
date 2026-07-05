import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib'),
			$content: path.resolve('./content')
		}
	},
	test: {
		include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/lib/**/*.ts'],
			exclude: ['src/lib/components/**', 'src/lib/server/db/**']
		}
	}
});
