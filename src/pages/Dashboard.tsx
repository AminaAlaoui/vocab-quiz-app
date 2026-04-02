import { motion } from 'framer-motion';
import { useStats } from '../hooks/useStats';
import { words } from '../data/words';
import './Dashboard.css';

const Dashboard = () => {
  const { stats, resetStats, getAccuracy } = useStats();
  const accuracy = getAccuracy();

  const categoryData = Object.entries(stats.categoryScores).map(([cat, data]) => ({
    category: cat,
    correct: data.correct,
    total: data.total,
    percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
  }));

  const statCards = [
    { label: 'Total Quizzes', value: stats.totalQuizzes, icon: '🎯', color: 'var(--primary)' },
    { label: 'Correct Answers', value: stats.totalCorrect, icon: '✅', color: 'var(--success)' },
    { label: 'Wrong Answers', value: stats.totalWrong, icon: '❌', color: 'var(--error)' },
    { label: 'Current Streak', value: stats.streak, icon: '🔥', color: 'var(--warning)' },
  ];

  return (
    <div className="page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-header"
        >
          <h1>📊 Dashboard</h1>
          <p>Track your learning progress</p>
        </motion.div>

        {/* Stat Cards */}
        <div className="stat-cards-grid">
          {statCards.map((card, i) => (
            <motion.div
              key={i}
              className="stat-card-item card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="stat-card-icon" style={{ color: card.color }}>
                {card.icon}
              </div>
              <div className="stat-card-value" style={{ color: card.color }}>
                {card.value}
              </div>
              <div className="stat-card-label">{card.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Accuracy Section */}
        <div className="dashboard-grid">
          <motion.div
            className="accuracy-card card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>Overall Accuracy</h2>
            <div className="big-accuracy">
              <div
                className="big-circle"
                style={{ '--accuracy': accuracy } as React.CSSProperties}
              >
                <span>{accuracy}%</span>
              </div>
            </div>
            <div className="accuracy-breakdown">
              <div className="breakdown-item">
                <span style={{ color: 'var(--success)' }}>✅ {stats.totalCorrect}</span>
                <span>Correct</span>
              </div>
              <div className="breakdown-divider" />
              <div className="breakdown-item">
                <span style={{ color: 'var(--error)' }}>❌ {stats.totalWrong}</span>
                <span>Wrong</span>
              </div>
            </div>
          </motion.div>

          {/* Category Scores */}
          <motion.div
            className="categories-card card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2>Performance by Category</h2>
            {categoryData.length === 0 ? (
              <div className="no-data">
                <span>🎯</span>
                <p>Take a quiz to see your category performance!</p>
              </div>
            ) : (
              <div className="category-bars">
                {categoryData.map((cat, i) => (
                  <div key={i} className="category-bar-item">
                    <div className="category-bar-header">
                      <span>{cat.category}</span>
                      <span>{cat.correct}/{cat.total}</span>
                    </div>
                    <div className="category-bar-track">
                      <motion.div
                        className="category-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.percentage}%` }}
                        transition={{ delay: i * 0.1 + 0.5, duration: 0.6 }}
                        style={{
                          background: cat.percentage >= 80
                            ? 'var(--success)'
                            : cat.percentage >= 50
                            ? 'var(--warning)'
                            : 'var(--error)'
                        }}
                      />
                    </div>
                    <span className="category-bar-percent">{cat.percentage}%</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Words Overview */}
        <motion.div
          className="words-overview card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2>📚 Words Library Overview</h2>
          <div className="words-overview-grid">
            {['Food', 'Travel', 'Business', 'Health', 'Education'].map((cat, i) => {
              const catWords = words.filter(w => w.category === cat);
              return (
                <div key={i} className="words-overview-item">
                  <div className="words-overview-count">{catWords.length}</div>
                  <div className="words-overview-cat">{cat}</div>
                  <div className="words-difficulty-dots">
                    {catWords.map((w, j) => (
                      <div
                        key={j}
                        className="difficulty-dot"
                        style={{
                          background: w.difficulty === 'beginner'
                            ? 'var(--success)'
                            : w.difficulty === 'intermediate'
                            ? 'var(--warning)'
                            : 'var(--error)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Reset Button */}
        {stats.totalQuizzes > 0 && (
          <motion.div
            className="reset-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all stats?')) {
                  resetStats();
                }
              }}
            >
              🗑️ Reset All Stats
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;