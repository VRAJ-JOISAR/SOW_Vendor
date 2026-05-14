import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center py-20 px-6">
      <div className="w-full max-w-md bg-white rounded-4xl p-10 shadow-2xl shadow-slate-200 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-malenadu-obsidian mb-2">Welcome Back</h2>
          <p className="text-slate-500 font-medium">Enter your details to access your locker</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-malenadu-obsidian ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-slate-400 group-focus-within:text-malenadu-forest transition-colors" />
              </div>
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-malenadu-forest outline-none transition-all font-medium text-malenadu-obsidian"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-malenadu-obsidian ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-400 group-focus-within:text-malenadu-forest transition-colors" />
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-malenadu-forest outline-none transition-all font-medium text-malenadu-obsidian"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-malenadu-obsidian text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors shadow-lg shadow-slate-200"
          >
            Sign In to Workspace
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-slate-500">
            Don't have an account? <span className="text-malenadu-forest font-bold cursor-pointer hover:underline">Create one</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
