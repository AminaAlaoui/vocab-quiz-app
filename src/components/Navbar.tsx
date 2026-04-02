import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/flashcards', label: 'Flashcards', icon: '📚' },
    { path: '/quiz', label: 'Quiz', icon: '🎯' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🌍</span>
          <span className="logo-text">VocabQuiz</span>
        </Link>

        <ul className="navbar-links">
          {links.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
                {location.pathname === link.path && (
                  <motion.div
                    className="nav-indicator"
                    layoutId="indicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;