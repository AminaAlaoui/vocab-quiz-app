import { useState } from 'react';
import { motion } from 'framer-motion';
import './Settings.css';

const Settings = () => {
  const [quizLength, setQuizLength] = useState('10');
  const [defaultLanguage, setDefaultLanguage] = useState('en-to-es');
  const [showPronunciation, setShowPronunciation] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify({
      quizLength,
      defaultLanguage,
      showPronunciation,
    }));
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="settings-header"
        >
          <h1>⚙️ Settings</h1>
          <p>Customize your learning experience</p>
        </motion.div>

        <div className="settings-content">
          {/* Quiz Settings */}
          <motion.div
            className="settings-section card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2>🎯 Quiz Settings</h2>

            <div className="setting-item">
              <div className="setting-info">
                <label>Quiz Length</label>
                <p>Number of questions per quiz</p>
              </div>
              <div className="setting-control">
                {['5', '10', '15', '20'].map(len => (
                  <button
                    key={len}
                    className={`filter-btn ${quizLength === len ? 'active' : ''}`}
                    onClick={() => setQuizLength(len)}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Quiz Direction</label>
                <p>Choose translation direction</p>
              </div>
              <div className="setting-control">
                <button
                  className={`filter-btn ${defaultLanguage === 'en-to-es' ? 'active' : ''}`}
                  onClick={() => setDefaultLanguage('en-to-es')}
                >
                  🇬🇧 → 🇪🇸
                </button>
                <button
                  className={`filter-btn ${defaultLanguage === 'es-to-en' ? 'active' : ''}`}
                  onClick={() => setDefaultLanguage('es-to-en')}
                >
                  🇪🇸 → 🇬🇧
                </button>
              </div>
            </div>
          </motion.div>

          {/* Flashcard Settings */}
          <motion.div
            className="settings-section card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>📚 Flashcard Settings</h2>

            <div className="setting-item">
              <div className="setting-info">
                <label>Show Pronunciation</label>
                <p>Display pronunciation guide on cards</p>
              </div>
              <div className="setting-control">
                <button
                  className={`toggle-btn ${showPronunciation ? 'on' : 'off'}`}
                  onClick={() => setShowPronunciation(!showPronunciation)}
                >
                  <div className="toggle-circle" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* About */}
          <motion.div
            className="settings-section card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>ℹ️ About</h2>
            <div className="about-content">
              <div className="about-item">
                <span>App Version</span>
                <span>1.0.0</span>
              </div>
              <div className="about-item">
                <span>Total Words</span>
                <span>25+</span>
              </div>
              <div className="about-item">
                <span>Languages</span>
                <span>English & Spanish</span>
              </div>
              <div className="about-item">
                <span>Built with</span>
                <span>React + TypeScript ⚛️</span>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.button
            className="btn btn-primary save-btn"
            onClick={handleSave}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {savedMessage ? '✅ Saved!' : '💾 Save Settings'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Settings;