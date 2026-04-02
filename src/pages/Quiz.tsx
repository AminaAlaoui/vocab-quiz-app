import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { words, categories } from '../data/words';
import { QuizQuestion } from '../types';
import { useStats } from '../hooks/useStats';
import './Quiz.css';

const generateQuestions = (category: string, difficulty: string): QuizQuestion[] => {
  let filtered = words.filter(w => {
    const catMatch = category === 'All' || w.category === category;
    const diffMatch = difficulty === 'All' || w.difficulty === difficulty;
    return catMatch && diffMatch;
  });

  if (filtered.length < 4) return [];

  return filtered.map(word => {
    const otherWords = words.filter(w => w.id !== word.id);
    const wrongOptions = otherWords
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.spanish);

    const options = [...wrongOptions, word.spanish].sort(() => Math.random() - 0.5);

    return {
      word,
      options,
      correctAnswer: word.spanish,
      questionType: 'en-to-es',
    };
  }).sort(() => Math.random() - 0.5).slice(0, 10);
};

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const { updateStats } = useStats();

  const startQuiz = () => {
    const generated = generateQuestions(selectedCategory, selectedDifficulty);
    if (generated.length === 0) return;
    setQuestions(generated);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsFinished(false);
    setIsStarted(true);
  };

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    const correct = answer === questions[currentIndex].correctAnswer;
    if (correct) setScore(prev => prev + 1);
    updateStats(correct, questions[currentIndex].word.category);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const getOptionClass = (option: string) => {
    if (!isAnswered) return '';
    if (option === questions[currentIndex].correctAnswer) return 'correct';
    if (option === selectedAnswer) return 'wrong';
    return 'disabled';
  };

  const accuracy = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="quiz-header"
        >
          <h1>🎯 Quiz Mode</h1>
          <p>Test your vocabulary knowledge</p>
        </motion.div>

        {!isStarted ? (
          <motion.div
            className="quiz-setup"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="setup-card card">
              <h2>Configure Your Quiz</h2>

              <div className="setup-group">
                <label>Category</label>
                <div className="filter-buttons">
                  {['All', ...categories].map(cat => (
                    <button
                      key={cat}
                      className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="setup-group">
                <label>Difficulty</label>
                <div className="filter-buttons">
                  {['All', 'beginner', 'intermediate', 'advanced'].map(diff => (
                    <button
                      key={diff}
                      className={`filter-btn ${selectedDifficulty === diff ? 'active' : ''}`}
                      onClick={() => setSelectedDifficulty(diff)}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                className="btn btn-primary start-btn"
                onClick={startQuiz}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                🚀 Start Quiz
              </motion.button>
            </div>
          </motion.div>
        ) : isFinished ? (
          <motion.div
            className="quiz-results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="results-card card">
              <div className="results-emoji">
                {accuracy >= 80 ? '🏆' : accuracy >= 50 ? '👍' : '💪'}
              </div>
              <h2>Quiz Complete!</h2>
              <div className="results-score">
                <span className="score-value">{score}/{questions.length}</span>
                <span className="score-label">Correct Answers</span>
              </div>
              <div className="results-accuracy">
                <div
                  className="accuracy-circle"
                  style={{ '--accuracy': accuracy } as React.CSSProperties}
                >
                  <span>{accuracy}%</span>
                </div>
                <span>Accuracy</span>
              </div>
              <div className="results-message">
                {accuracy >= 80
                  ? '🌟 Excellent work! Keep it up!'
                  : accuracy >= 50
                  ? '👍 Good job! Practice makes perfect!'
                  : '💪 Keep practicing, you\'ll get there!'}
              </div>
              <div className="results-buttons">
                <button className="btn btn-primary" onClick={startQuiz}>
                  🔄 Try Again
                </button>
                <button className="btn btn-secondary" onClick={() => setIsStarted(false)}>
                  ⚙️ Change Settings
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="quiz-game">
            {/* Progress */}
            <div className="quiz-progress">
              <span>{currentIndex + 1} / {questions.length}</span>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
              <span className="quiz-score">⭐ {score}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                className="question-card card"
              >
                <div className="question-meta">
                  <span className={`badge badge-${questions[currentIndex].word.difficulty}`}>
                    {questions[currentIndex].word.difficulty}
                  </span>
                  <span className="question-category">
                    📁 {questions[currentIndex].word.category}
                  </span>
                </div>

                <div className="question-text">
                  What is the Spanish translation of:
                </div>
                <div className="question-word">
                  {questions[currentIndex].word.english}
                </div>

                <div className="options-grid">
                  {questions[currentIndex].options.map((option, i) => (
                    <motion.button
                      key={i}
                      className={`option-btn ${getOptionClass(option)}`}
                      onClick={() => handleAnswer(option)}
                      whileHover={!isAnswered ? { scale: 1.02 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    >
                      <span className="option-letter">
                        {['A', 'B', 'C', 'D'][i]}
                      </span>
                      {option}
                    </motion.button>
                  ))}
                </div>

                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="answer-feedback"
                  >
                    <div className={`feedback-message ${selectedAnswer === questions[currentIndex].correctAnswer ? 'correct' : 'wrong'}`}>
                      {selectedAnswer === questions[currentIndex].correctAnswer
                        ? '✅ Correct!'
                        : `❌ Wrong! The answer is: ${questions[currentIndex].correctAnswer}`}
                    </div>
                    <button className="btn btn-primary" onClick={handleNext}>
                      {currentIndex + 1 >= questions.length ? '🏁 Finish' : 'Next →'}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;