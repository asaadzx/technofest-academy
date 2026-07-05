<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Card, Input } from '$lib/components/ui';

	const course = $page.data.course as { slug: string; title: string };
	const lesson = $page.data.lesson as { slug: string; title: string; description: string; order: number };
	const existingContent = $page.data.content as string;
	const { title: initTitle, slug: initSlug, description: initDesc, order: initOrder } = lesson;

	let formData = $state({
		title: initTitle,
		slug: initSlug,
		description: initDesc,
		order: String(initOrder),
		content: existingContent
	});

	let slugManuallyEdited = $state(false);

	function onTitleInput(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		formData.title = target.value;
		if (!slugManuallyEdited) {
			formData.slug = target.value
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '');
		}
	}

	function onSlugInput(e: Event) {
		slugManuallyEdited = true;
		formData.slug = (e.currentTarget as HTMLInputElement).value;
	}

	const formErrors = $derived(($page.status === 400 && $page.data?.errors) as Record<string, string> | undefined);
</script>

<div class="p-6 md:p-8">
	<div class="mb-2">
		<a href="/admin/courses/{course.slug}" class="text-sm text-primary-600 hover:text-primary-700">
			&larr; Back to {course.title}
		</a>
	</div>

	<header class="mb-8">
		<h1 class="text-2xl font-bold text-surface-900">Edit Lesson</h1>
		<p class="mt-1 text-surface-500">Update lesson metadata for <strong>{course.title}</strong>.</p>
	</header>

	<form method="POST" class="max-w-2xl">
		<Card>
			<div class="space-y-5">
				<Input
					name="title"
					label="Title"
					placeholder="Variables & Data Types"
					value={formData.title}
					oninput={onTitleInput}
					error={formErrors?.title}
					required
				/>

				<Input
					name="slug"
					label="Slug"
					placeholder="variables-and-data-types"
					value={formData.slug}
					oninput={onSlugInput}
					error={formErrors?.slug}
					required
				/>

				<div class="flex flex-col gap-1.5">
					<label for="description" class="text-sm font-medium text-surface-700">Description</label>
					<textarea
						id="description"
						name="description"
						rows="3"
						class="w-full rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden {formErrors?.description ? 'border-error' : ''}"
						placeholder="Learn about variables and data types in Python..."
						oninput={(e) => (formData.description = (e.currentTarget as HTMLTextAreaElement).value)}
					>{formData.description}</textarea>
					{#if formErrors?.description}
						<p class="text-xs text-error">{formErrors.description}</p>
					{/if}
				</div>

				<div class="flex flex-col gap-1.5">
					<label for="content" class="text-sm font-medium text-surface-700">Markdown Content</label>
					<textarea
						id="content"
						name="content"
						rows="15"
						class="w-full rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden font-mono"
						placeholder="Write lesson content in markdown..."
						oninput={(e) => (formData.content = (e.currentTarget as HTMLTextAreaElement).value)}
					>{formData.content}</textarea>
				</div>

				<div class="flex max-w-[8rem] flex-col gap-1.5">
					<label for="order" class="text-sm font-medium text-surface-700">Order</label>
					<input
						id="order"
						name="order"
						type="number"
						min="0"
						class="h-10 rounded-lg border border-surface-300 bg-white px-3 text-sm text-surface-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden"
						value={formData.order}
						oninput={(e) => (formData.order = (e.currentTarget as HTMLInputElement).value)}
					/>
				</div>
			</div>

			{#snippet footer()}
				<Button type="submit">Save Changes</Button>
				<a href="/admin/courses/{course.slug}">
					<Button type="button" variant="ghost">Cancel</Button>
				</a>
			{/snippet}
		</Card>
	</form>
</div>
