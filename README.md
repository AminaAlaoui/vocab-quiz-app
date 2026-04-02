# VocabQuiz — English & Spanish Vocabulary Learning App

A modern, interactive vocabulary learning web app built with **React**, **TypeScript**, and **Framer Motion**.

![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-purple?style=flat-square&logo=vite)


##  Features

- 📚 **Flashcards** — Interactive cards with flip animation to learn English/Spanish vocabulary
- 🎯 **Quiz Mode** — Multiple choice quizzes with score tracking and instant feedback
- 📊 **Dashboard** — Track your progress, accuracy, streaks, and performance by category
- ⚙️ **Settings** — Customize quiz length, translation direction, and more
- 💾 **Persistent Stats** — Your progress is saved locally using localStorage
- 📱 **Responsive Design** — Works on desktop and mobile

##  Tech Stack

- **React 18** + **TypeScript**
- **Vite** — Fast build tool
- **React Router v6** — Client-side routing
- **Framer Motion** — Smooth animations
- **CSS Variables** — Custom dark theme



## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/AminaAlaoui/vocab-quiz-app.git

# Navigate to project
cd vocab-quiz-app

# Install dependencies
npm install

# Start development server
npm run dev


Open [http://localhost:5173](http://localhost:5173) in your browser.



## 📁 Project Structure
```
src/
├── components/     # Reusable components (Navbar)
├── pages/          # App pages (Home, Flashcards, Quiz, Dashboard, Settings)
├── hooks/          # Custom hooks (useStats)
├── data/           # Vocabulary data
├── types/          # TypeScript interfaces
└── index.css       # Global styles

## 📸 Pages

| Page | Description |
|------|-------------|
| 🏠 Home | Landing page with features overview |
| 📚 Flashcards | Learn words with flip cards |
| 🎯 Quiz | Test your knowledge |
| 📊 Dashboard | View your stats and progress |
| ⚙️ Settings | Customize your experience |

