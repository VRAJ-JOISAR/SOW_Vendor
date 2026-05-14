import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { ChevronDown } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('landing');

  const renderView = () => {
    switch (view) {
      case 'landing':
        return <LandingPage onStart={() => setView('login')} />;
      case 'login':
        return <LoginPage onLogin={() => setView('dashboard')} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <LandingPage onStart={() => setView('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-malenadu-cream font-sans text-malenadu-obsidian">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setView('landing')}
        >
          <div className="w-10 h-10 bg-malenadu-obsidian rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">Malenadu</span>
        </div>

        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-shadow text-sm font-medium">
            <span>English</span>
            <ChevronDown size={16} className="text-slate-500" />
          </button>
        </div>
      </nav>

      <main>
        {renderView()}
      </main>
    </div>
  );
};

export default App;
