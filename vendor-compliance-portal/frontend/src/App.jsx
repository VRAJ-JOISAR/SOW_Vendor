import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ChevronDown } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-malenadu-cream font-sans text-malenadu-obsidian">
      {/* Brand Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-malenadu-obsidian rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-black tracking-tight">Malenadu Admin Portal</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-sm font-bold hover:shadow-md transition-all">
                <span>English</span>
                <ChevronDown size={16} className="text-slate-500" />
              </button>
            </div>
            {isAuthenticated && (
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="text-sm font-bold text-slate-400 hover:text-malenadu-obsidian transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="relative">
        {!isAuthenticated ? (
          <Login onLogin={() => setIsAuthenticated(true)} />
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
}

export default App;
