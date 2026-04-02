export interface Word {
  id: string;
  english: string;
  spanish: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pronunciation?: string;
}

export interface QuizQuestion {
  word: Word;
  options: string[];
  correctAnswer: string;
  questionType: 'en-to-es' | 'es-to-en';
}

export interface UserStats {
  totalQuizzes: number;
  totalCorrect: number;
  totalWrong: number;
  streak: number;
  lastPlayed: string;
  categoryScores: Record<string, { correct: number; total: number }>;
}

export interface FlashcardSession {
  wordId: string;
  known: boolean;
  timestamp: string;
}