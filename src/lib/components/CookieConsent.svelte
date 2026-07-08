<script lang="ts">
	import { quizStore } from './quiz/quiz-store.svelte';
</script>

{#if quizStore.consent === null}
	<div class="fixed bottom-0 left-0 right-0 z-50 border-t border-surface-200 bg-white p-4 shadow-lg">
		<div class="mx-auto flex max-w-4xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="text-sm text-surface-600">
				<p class="font-medium text-surface-900">We value your privacy</p>
				<p class="mt-1">
					This site stores your quiz progress locally in your browser so you can track your scores across sessions.
					No data is sent to any server.
				</p>
			</div>
			<div class="flex shrink-0 gap-3">
				<button
					type="button"
					onclick={() => quizStore.declineConsent()}
					class="rounded-lg border border-surface-300 bg-white px-4 py-2 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-50"
				>
					Decline
				</button>
				<button
					type="button"
					onclick={() => quizStore.acceptConsent()}
					class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
				>
					Accept
				</button>
			</div>
		</div>
	</div>
{/if}
