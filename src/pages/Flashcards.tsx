import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { words, categories } from '../data/words';
import type { Word } from '../types';
import './Flashcards.css';

const Flashcards = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [unknown, setUnknown] = useState<string[]>([]);

  const filteredWords = words.filter(w => {
    const catMatch = selectedCategory === 'All' || w.category === selectedCategory;
    const diffMatch = selectedDifficulty === 'All' || w.difficulty === selectedDifficulty;
    return catMatch && diffMatch;
  });

  const currentWord: Word | undefined = filteredWords[currentIndex];
  const progress = filteredWords.length > 0 ? ((currentIndex) / filteredWords.length) * 100 : 0;

  const handleNext = (isKnown: boolean) => {
    if (!currentWord) return;
    if (isKnown) {
      setKnown(prev => [...prev, currentWord.id]);
    } else {
      setUnknown(prev => [...prev, currentWord.id]);
    }
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnown([]);
    setUnknown([]);
  };

  const isDone = currentIndex >= filteredWords.length;

  return (
    <div className="page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flashcards-header"
        >
          <h1>📚 Flashcards</h1>
          <p>Click the card to reveal the translation</p>
        </motion.div>

        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <label>Category</label>
            <div className="filter-buttons">
              {['All', ...categories].map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => { setSelectedCategory(cat); setCurrentIndex(0); setIsFlipped(false); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label>Difficulty</label>
            <div className="filter-buttons">
              {['All', 'beginner', 'intermediate', 'advanced'].map(diff => (
                <button
                  key={diff}
                  className={`filter-btn ${selectedDifficulty === diff ? 'active' : ''}`}
                  onClick={() => { setSelectedDifficulty(diff); setCurrentIndex(0); setIsFlipped(false); }}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {!isDone && (
          <div className="progress-container">
            <div className="progress-info">
              <span>{currentIndex} / {filteredWords.length} words</span>
              <span>✅ {known.length} known · ❌ {unknown.length} unknown</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Card */}
        {!isDone && currentWord ? (
          <div className="flashcard-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="flashcard-wrapper"
              >
                <div
                  className={`flashcard ${isFlipped ? 'flipped' : ''}`}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div className="flashcard-front">
                    <span className={`badge badge-${currentWord.difficulty}`}>
                      {currentWord.difficulty}
                    </span>
                    <div className="card-category">📁 {currentWord.category}</div>
                    <div className="card-word">{currentWord.english}</div>
                    <div className="card-hint">🔊 {currentWord.pronunciation}</div>
                    <div className="card-flip-hint">Click to reveal →</div>
                  </div>
                  <div className="flashcard-back">
                    <span className={`badge badge-${currentWord.difficulty}`}>
                      {currentWord.difficulty}
                    </span>
                    <div className="card-category">📁 {currentWord.category}</div>
                    <div className="card-word spanish">{currentWord.spanish}</div>
                    <div className="card-original">{currentWord.english}</div>
                    <div className="card-flip-hint">← Click to flip back</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flashcard-actions">
              <motion.button
                className="btn btn-danger"
                onClick={() => handleNext(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ❌ Don't Know
              </motion.button>
              <motion.button
                className="btn btn-success"
                onClick={() => handleNext(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✅ Know It
              </motion.button>
            </div>
          </div>
        ) : isDone ? (
          <motion.div
            className="done-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="done-emoji">🎉</div>
            <h2>Session Complete!</h2>
            <p>You went through all {filteredWords.length} words</p>
            <div className="done-stats">
              <div className="done-stat">
                <span className="done-stat-value" style={{ color: 'var(--success)' }}>{known.length}</span>
                <span>Known</span>
              </div>
              <div className="done-stat">
                <span className="done-stat-value" style={{ color: 'var(--error)' }}>{unknown.length}</span>
                <span>To Review</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleRestart}>
              🔄 Restart Session
            </button>
          </motion.div>
        ) : (
          <div className="no-words">No words found for this filter.</div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;