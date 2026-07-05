<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Button, Card, Badge } from '$lib/components/ui';

	let preview = $state<{
		title: string;
		slug: string;
		description: string;
		difficulty: string;
		published: boolean;
		order: number;
		lessons?: { slug: string; title: string }[];
	} | null>(null);

	let rawContent = $state('');
	let fileName = $state('');
	let dragOver = $state(false);
	let parseError = $state('');

	$effect(() => {
		if (fileName) {
			console.log('[Upload] File selected:', fileName, 'parsed:', !!preview, 'error:', parseError || 'none');
		}
	});

	function parseFrontmatter(content: string) {
		const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
		if (!match) return null;

		const lines = match[1].split('\n');
		const fields: Record<string, string | boolean | number> = {};
		const lists: Record<string, any[]> = {};

		let i = 0;
		while (i < lines.length) {
			const line = lines[i];

			if (!line.trim() || line[0] === ' ' || line[0] === '\t') { i++; continue; }
			if (line.trim().startsWith('- ')) { i++; continue; }

			const colonIdx = line.indexOf(':');
			if (colonIdx === -1) { i++; continue; }

			const key = line.slice(0, colonIdx).trim();
			const rawVal = line.slice(colonIdx + 1).trim();

			if (rawVal === '') {
				const listItems: any[] = [];
				i++;

				while (i < lines.length) {
					const itemLine = lines[i].trim();
					if (!itemLine.startsWith('- ')) break;

					const rest = itemLine.slice(2).trim();

					if (rest.includes(':') && !rest.startsWith('{')) {
						const item: Record<string, string> = {};
						const fc = rest.indexOf(':');
						item[rest.slice(0, fc).trim()] = rest.slice(fc + 1).trim().replace(/['"]/g, '');
						i++;

						while (i < lines.length) {
							const pl = lines[i];
							if (!pl.startsWith('  ')) break;
							if (pl.trim() === '' || pl.trim().startsWith('-')) break;
							const pc = pl.indexOf(':');
							if (pc === -1) { i++; continue; }
							item[pl.slice(0, pc).trim()] = pl.slice(pc + 1).trim().replace(/['"]/g, '');
							i++;
						}

						listItems.push(item);
					} else if (rest.startsWith('{') && rest.endsWith('}')) {
						const item: Record<string, string> = {};
						rest.slice(1, -1).split(',').forEach(pair => {
							const [k, ...v] = pair.split(':');
							if (k) item[k.trim()] = v.join(':').trim().replace(/['"]/g, '');
						});
						listItems.push(item);
						i++;
					} else {
						listItems.push(rest.replace(/['"]/g, ''));
						i++;
					}
				}

				lists[key] = listItems;
				continue;
			}

			i++;

			let val: string | boolean | number = rawVal;
			if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1).toString();
			if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1).toString();
			if (val === 'true') val = true;
			else if (val === 'false') val = false;
			else if (typeof val === 'string' && /^\d+$/.test(val)) val = parseInt(val, 10);

			fields[key] = val;
		}

		const title = String(fields.title || '');
		const slug = String(fields.slug || '') || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'untitled';

		return {
			title,
			slug,
			description: String(fields.description || ''),
			difficulty: String(fields.difficulty || 'beginner'),
			published: fields.published !== false,
			order: Number(fields.order) || 0,
			lessons: lists.lessons || []
		};
	}

	function handleFile(file: File | undefined) {
		parseError = '';
		preview = null;
		rawContent = '';

		if (!file) { console.log('[Upload] No file'); return; }
		if (!file.name.endsWith('.md')) {
			parseError = 'Only .md files are supported';
			console.log('[Upload] Rejected non-md file:', file.name);
			return;
		}

		fileName = file.name;
		console.log('[Upload] Reading file:', file.name, 'size:', file.size);

		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target?.result as string;
			if (!content) {
				parseError = 'Could not read file content';
				console.log('[Upload] Empty content');
				return;
			}
			rawContent = content;
			const result = parseFrontmatter(content);
			if (!result) {
				parseError = 'Could not parse frontmatter. Ensure the file starts with --- and contains valid YAML.';
				console.log('[Upload] Parse failed. Content preview:', content.slice(0, 200));
			} else {
				console.log('[Upload] Parse success:', result.title);
			}
			preview = result;
		};
		reader.onerror = () => {
			parseError = 'Error reading file';
			console.log('[Upload] FileReader error');
		};
		reader.readAsText(file);
	}

	function onFileChange(e: Event) {
		handleFile((e.target as HTMLInputElement).files?.[0]);
	}

	function onDrop(e: DragEvent) {
		dragOver = false;
		handleFile(e.dataTransfer?.files?.[0]);
	}

	function onDragOver(e: DragEvent) {
		e.preventDefault();
		dragOver = true;
	}

	function onDragLeave() {
		dragOver = false;
	}

	const fieldErrors = $derived(($page.status === 400 && $page.data?.errors) as Record<string, string> | undefined);

	const difficultyMeta: Record<string, { label: string; variant: 'success' | 'warning' | 'error' }> = {
		beginner: { label: 'Beginner', variant: 'success' },
		intermediate: { label: 'Intermediate', variant: 'warning' },
		advanced: { label: 'Advanced', variant: 'error' }
	};
</script>

<div class="p-6 md:p-8">
	<div class="mb-2">
		<a href="/admin/courses" class="text-sm text-primary-600 hover:text-primary-700">
			&larr; All Courses
		</a>
	</div>

	<header class="mb-8">
		<h1 class="text-2xl font-bold text-surface-900">Import from Markdown</h1>
		<p class="mt-1 text-surface-500">
			Upload a course <code class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs">index.md</code> file. The frontmatter will be parsed and you'll see a preview before saving.
		</p>
	</header>

	<div class="grid gap-8 lg:grid-cols-2">
		<div>
			<div
				class="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition-colors {dragOver ? 'border-primary-500 bg-primary-50' : 'border-surface-300 hover:border-surface-400 hover:bg-surface-50'}"
				ondragover={onDragOver}
				ondragleave={onDragLeave}
				ondrop={onDrop}
				onclick={() => document.getElementById('file-input')?.click()}
				onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('file-input')?.click(); }}
				role="button"
				tabindex="0"
				aria-label="Upload markdown file"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mb-3 text-surface-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="12"/><line x1="15" y1="15" x2="12" y2="12"/></svg>

				<input
					id="file-input"
					type="file"
					accept=".md,text/markdown"
					class="hidden"
					onchange={onFileChange}
				/>

				{#if fileName}
					<p class="font-medium text-surface-700">{fileName}</p>
					<p class="mt-1 text-sm text-surface-400">Click or drag to replace</p>
				{:else}
					<p class="font-medium text-surface-700">Drop your course file here</p>
					<p class="mt-1 text-sm text-surface-400">or click to browse</p>
				{/if}

				{#if parseError}
					<p class="mt-3 text-sm text-error">{parseError}</p>
				{/if}

				{#if fieldErrors?.file}
					<p class="mt-3 text-sm text-error">{fieldErrors.file}</p>
				{/if}
			</div>

			{#if preview}
				<form method="POST" class="mt-6" use:enhance>
					<input name="content" type="hidden" value={rawContent} />

					<p class="mb-3 text-xs text-surface-400">
						The raw markdown file will be written to <code class="font-mono">content/courses/{preview.slug}/index.md</code>
					</p>

					<Button type="submit" class="w-full">
						Create Course from Markdown
					</Button>
				</form>
			{/if}
		</div>

		<div>
			{#if preview}
				<Card title="Preview">
					<div class="space-y-4">
						<div>
							<p class="text-xs font-medium uppercase tracking-wider text-surface-400">Title</p>
							<p class="mt-0.5 text-lg font-semibold text-surface-900">{preview.title}</p>
						</div>

						<div>
							<p class="text-xs font-medium uppercase tracking-wider text-surface-400">Slug</p>
							<p class="mt-0.5 font-mono text-sm text-surface-600">{preview.slug}</p>
						</div>

						<div>
							<p class="text-xs font-medium uppercase tracking-wider text-surface-400">Description</p>
							<p class="mt-0.5 text-sm text-surface-600">{preview.description}</p>
						</div>

						<div class="flex gap-6">
							<div>
								<p class="text-xs font-medium uppercase tracking-wider text-surface-400">Difficulty</p>
								<div class="mt-1">
									<Badge variant={difficultyMeta[preview.difficulty]?.variant ?? 'default'}>
										{difficultyMeta[preview.difficulty]?.label ?? preview.difficulty}
									</Badge>
								</div>
							</div>
							<div>
								<p class="text-xs font-medium uppercase tracking-wider text-surface-400">Status</p>
								<p class="mt-0.5 text-sm">
									{#if preview.published}
										<span class="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">Published</span>
									{:else}
										<span class="inline-flex rounded-full bg-surface-100 px-2.5 py-0.5 text-xs font-medium text-surface-500">Draft</span>
									{/if}
								</p>
							</div>
							<div>
								<p class="text-xs font-medium uppercase tracking-wider text-surface-400">Order</p>
								<p class="mt-0.5 text-sm text-surface-900">{preview.order}</p>
							</div>
						</div>

						{#if preview.lessons && preview.lessons.length > 0}
							<div>
								<p class="text-xs font-medium uppercase tracking-wider text-surface-400">Lessons ({preview.lessons.length})</p>
								<ul class="mt-1 space-y-1">
									{#each preview.lessons as lesson}
										<li class="flex items-center gap-2 text-sm text-surface-600">
											<span class="text-primary-500">&bull;</span>
											{lesson.title || lesson.slug}
										</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>
				</Card>
			{:else}
				<Card class="py-12 text-center">
					<div class="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-surface-100">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-surface-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
					</div>
					<p class="text-sm text-surface-400">Upload a file to see a preview</p>
				</Card>
			{/if}
		</div>
	</div>
</div>
