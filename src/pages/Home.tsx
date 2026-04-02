import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const features = [
  {
    icon: '📚',
    title: 'Flashcards',
    description: 'Learn new words with interactive flashcards in English and Spanish.',
    path: '/flashcards',
    color: '#6C63FF',
  },
  {
    icon: '🎯',
    title: 'Quiz Mode',
    description: 'Test your knowledge with multiple choice quizzes.',
    path: '/quiz',
    color: '#FF6584',
  },
  {
    icon: '📊',
    title: 'Dashboard',
    description: 'Track your progress and see your statistics.',
    path: '/dashboard',
    color: '#43E97B',
  },
];

const stats = [
  { value: '25+', label: 'Words' },
  { value: '5', label: 'Categories' },
  { value: '3', label: 'Levels' },
  { value: '100%', label: 'Free' },
];

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              🚀 Learn English & Spanish
            </motion.div>
            <h1 className="hero-title">
              Master New Words
              <span className="gradient-text"> Faster Than Ever</span>
            </h1>
            <p className="hero-subtitle">
              Interactive flashcards, smart quizzes, and progress tracking —
              all in one place. Start your language journey today.
            </p>
            <div className="hero-buttons">
              <Link to="/flashcards" className="btn btn-primary">
                📚 Start Learning
              </Link>
              <Link to="/quiz" className="btn btn-secondary">
                🎯 Take a Quiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Everything You Need to Learn
          </motion.h2>
          <div className="features-grid">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div
                  className="feature-icon"
                  style={{ background: `${feature.color}22`, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to={feature.path} className="feature-link" style={{ color: feature.color }}>
                  Get Started →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Start?</h2>
            <p>Join thousands of learners improving their vocabulary every day.</p>
            <Link to="/flashcards" className="btn btn-primary">
              🚀 Start Now — It's Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;