import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Shield } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
      <div className="w-full max-w-md bg-white rounded-4xl p-10 shadow-2xl shadow-slate-200 border border-slate-100 transform transition-all">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-malenadu-sage rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="text-malenadu-forest" size={32} />
          </div>
          <h2 className="text-3xl font-black text-malenadu-obsidian mb-2">Admin Portal</h2>
          <p className="text-slate-500 font-medium">Access the compliance engine</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-malenadu-obsidian ml-1 uppercase tracking-wider">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-slate-400 group-focus-within:text-malenadu-forest transition-colors" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@malenadu.ai"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-malenadu-forest outline-none transition-all font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-malenadu-obsidian ml-1 uppercase tracking-wider">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-400 group-focus-within:text-malenadu-forest transition-colors" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-malenadu-forest outline-none transition-all font-medium"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-malenadu-obsidian text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            Sign In to Workspace
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <Shield size={12} />
            Secure Enterprise Gateway
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
