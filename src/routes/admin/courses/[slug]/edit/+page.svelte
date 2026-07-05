<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Card, Input } from '$lib/components/ui';

	const course = $page.data.course as { slug: string; title: string; description: string; difficulty: string; order: number; published: boolean };
	const { title: initTitle, slug: initSlug, description: initDesc, difficulty: initDiff, order: initOrder, published: initPub } = course;

	let formData = $state({
		title: initTitle,
		slug: initSlug,
		description: initDesc,
		difficulty: initDiff,
		order: String(initOrder),
		published: initPub
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
			&larr; Back to Course
		</a>
	</div>

	<header class="mb-8">
		<h1 class="text-2xl font-bold text-surface-900">Edit Course</h1>
		<p class="mt-1 text-surface-500">Update course metadata.</p>
	</header>

	<form method="POST" class="max-w-2xl">
		<Card>
			<div class="space-y-5">
				<Input
					name="title"
					label="Title"
					placeholder="Getting Started with Python"
					value={formData.title}
					oninput={onTitleInput}
					error={formErrors?.title}
					required
				/>

				<Input
					name="slug"
					label="Slug"
					placeholder="getting-started-with-python"
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
						rows="4"
						class="w-full rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm text-surface-900 placeholder:text-surface-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden {formErrors?.description ? 'border-error' : ''}"
						placeholder="Learn Python from scratch..."
						oninput={(e) => (formData.description = (e.currentTarget as HTMLTextAreaElement).value)}
					>{formData.description}</textarea>
					{#if formErrors?.description}
						<p class="text-xs text-error">{formErrors.description}</p>
					{/if}
				</div>

				<div class="grid grid-cols-3 gap-4">
					<div class="flex flex-col gap-1.5">
						<label for="difficulty" class="text-sm font-medium text-surface-700">Difficulty</label>
						<select
							id="difficulty"
							name="difficulty"
							class="h-10 rounded-lg border border-surface-300 bg-white px-3 text-sm text-surface-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden {formErrors?.difficulty ? 'border-error' : ''}"
							value={formData.difficulty}
							onchange={(e) => (formData.difficulty = (e.currentTarget as HTMLSelectElement).value)}
						>
							<option value="beginner">Beginner</option>
							<option value="intermediate">Intermediate</option>
							<option value="advanced">Advanced</option>
						</select>
						{#if formErrors?.difficulty}
							<p class="text-xs text-error">{formErrors.difficulty}</p>
						{/if}
					</div>

					<div class="flex flex-col gap-1.5">
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

					<div class="flex flex-col gap-1.5 pt-6">
						<label class="flex items-center gap-2 text-sm text-surface-700">
							<input
								type="checkbox"
								name="published"
								class="size-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500/20"
								checked={formData.published}
								onchange={(e) => (formData.published = (e.currentTarget as HTMLInputElement).checked)}
							/>
							Published
						</label>
					</div>
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
