import { useState, useEffect } from 'react';
import { UserStats } from '../types';

const defaultStats: UserStats = {
  totalQuizzes: 0,
  totalCorrect: 0,
  totalWrong: 0,
  streak: 0,
  lastPlayed: '',
  categoryScores: {},
};

export const useStats = () => {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('vocabStats');
    return saved ? JSON.parse(saved) : defaultStats;
  });

  useEffect(() => {
    localStorage.setItem('vocabStats', JSON.stringify(stats));
  }, [stats]);

  const updateStats = (correct: boolean, category: string) => {
    setStats(prev => {
      const categoryScore = prev.categoryScores[category] || { correct: 0, total: 0 };
      return {
        ...prev,
        totalQuizzes: prev.totalQuizzes + 1,
        totalCorrect: correct ? prev.totalCorrect + 1 : prev.totalCorrect,
        totalWrong: !correct ? prev.totalWrong + 1 : prev.totalWrong,
        streak: correct ? prev.streak + 1 : 0,
        lastPlayed: new Date().toISOString(),
        categoryScores: {
          ...prev.categoryScores,
          [category]: {
            correct: correct ? categoryScore.correct + 1 : categoryScore.correct,
            total: categoryScore.total + 1,
          },
        },
      };
    });
  };

  const resetStats = () => {
    setStats(defaultStats);
    localStorage.removeItem('vocabStats');
  };

  const getAccuracy = () => {
    if (stats.totalQuizzes === 0) return 0;
    return Math.round((stats.totalCorrect / stats.totalQuizzes) * 100);
  };

  return { stats, updateStats, resetStats, getAccuracy };
};