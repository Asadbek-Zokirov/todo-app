// src/App.jsx
import React, { useState, useEffect } from 'react';
import TodoList from './components/ToDoList';
import './styles/style.css';

function App() {
  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="app">
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '🌙 Dark' : '☀️ Light'} theme
      </button>
      <TodoList />
    </div>
  );
}

export default App;
