import type { AnswerKeyEntry } from './answer-keys';

interface AnswerSubmission {
	questionId: string;
	answer: string;
}

interface ScoredAnswer {
	questionId: string;
	answer: string;
	correct: boolean;
	correctAnswer: string | string[];
	points: number;
}

export interface QuizResult {
	answers: ScoredAnswer[];
	score: number;
	total: number;
}

export function scoreQuiz(keys: AnswerKeyEntry[], submissions: AnswerSubmission[]): QuizResult {
	let score = 0;
	const answers: ScoredAnswer[] = [];

	for (const key of keys) {
		const sub = submissions.find((s) => s.questionId === key.id);
		const userAnswer = sub?.answer ?? '';
		let correct = false;

		if (key.type === 'mcq' || key.type === 'tf') {
			correct = userAnswer.toLowerCase() === String(key.correct).toLowerCase();
		} else {
			const acceptable = Array.isArray(key.correct) ? key.correct : [key.correct];
			correct = acceptable.some((a) => a.toLowerCase() === userAnswer.toLowerCase());
		}

		if (correct) score += key.points;
		answers.push({
			questionId: key.id,
			answer: userAnswer,
			correct,
			correctAnswer: key.correct,
			points: correct ? key.points : 0
		});
	}

	return { answers, score, total: keys.reduce((s, k) => s + k.points, 0) };
}
