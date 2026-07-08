import { browser } from '$app/environment';

export interface QuizResult {
	questionId: string;
	lessonSlug: string;
	correct: boolean;
}

function loadConsent(): boolean | null {
	if (!browser) return null;
	try {
		const val = localStorage.getItem('tf_quiz_consent');
		return val === 'true' ? true : val === 'false' ? false : null;
	} catch {
		return null;
	}
}

function loadResults(): QuizResult[] {
	if (!browser) return [];
	try {
		const stored = localStorage.getItem('tf_quiz_results');
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

function persistResults(results: QuizResult[]) {
	if (!browser) return;
	if (loadConsent() !== true) return;
	localStorage.setItem('tf_quiz_results', JSON.stringify(results));
}

class QuizStore {
	consent = $state<boolean | null>(loadConsent());
	results = $state<QuizResult[]>(loadResults());

	acceptConsent() {
		if (!browser) return;
		localStorage.setItem('tf_quiz_consent', 'true');
		this.consent = true;
	}

	declineConsent() {
		if (!browser) return;
		localStorage.setItem('tf_quiz_consent', 'false');
		this.consent = false;
	}

	recordResult(questionId: string, lessonSlug: string, correct: boolean) {
		const idx = this.results.findIndex((r) => r.questionId === questionId);
		if (idx >= 0) {
			this.results[idx] = { questionId, lessonSlug, correct };
		} else {
			this.results.push({ questionId, lessonSlug, correct });
		}
		persistResults(this.results);
	}

	getLessonScore(lessonSlug: string) {
		const lessonResults = this.results.filter((r) => r.lessonSlug === lessonSlug);
		return {
			correct: lessonResults.filter((r) => r.correct).length,
			total: lessonResults.length
		};
	}

	getCorrectCount(questionIds: string[]) {
		return this.results.filter((r) => questionIds.includes(r.questionId) && r.correct).length;
	}

	wasCorrect(questionId: string): boolean | null {
		return this.results.find((r) => r.questionId === questionId)?.correct ?? null;
	}
}

export const quizStore = new QuizStore();
