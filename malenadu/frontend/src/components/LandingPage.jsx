import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, Clock } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-malenadu-sage text-malenadu-olive rounded-full text-sm font-semibold tracking-wide">
            <span className="animate-pulse">⚡</span>
            AI-Powered Scholarship Assistant
          </div>
          
          <h1 className="text-6xl font-extrabold leading-[1.1] tracking-tight text-malenadu-obsidian">
            Change the way you <span className="text-malenadu-forest">apply for scholarships</span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
            Upload your documents once. We extract the details, find matching scholarships, and autofill the forms. Simple, fast, and secure.
          </p>

          <button 
            onClick={onStart}
            className="px-8 py-4 bg-malenadu-obsidian text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 hover:scale-105 transition-transform active:scale-95"
          >
            Get Started Now
          </button>
        </div>

        {/* Right Mockup */}
        <div className="relative">
          <div className="bg-white rounded-4xl p-8 shadow-2xl shadow-slate-200 border border-slate-100 relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Your Identity Locker</h3>
              <span className="px-3 py-1 bg-malenadu-sage text-malenadu-olive text-xs font-bold rounded-full">
                100% Private
              </span>
            </div>

            <div className="space-y-4">
              <DocumentRow 
                label="Aadhaar Card" 
                status="Verified" 
                statusColor="bg-malenadu-sage text-malenadu-olive"
                icon={<FileText size={20} className="text-malenadu-forest" />}
              />
              <DocumentRow 
                label="Income Certificate" 
                status="Verified" 
                statusColor="bg-malenadu-sage text-malenadu-olive"
                icon={<FileText size={20} className="text-malenadu-forest" />}
              />
              <DocumentRow 
                label="Marks Card (10th)" 
                status="Pending" 
                statusColor="bg-slate-100 text-slate-500"
                icon={<FileText size={20} className="text-slate-400" />}
              />
            </div>

            <div className="mt-8 p-4 bg-malenadu-cream rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="text-malenadu-forest" size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-malenadu-obsidian">Bank-grade Security</p>
                <p className="text-[10px] text-slate-500">Your data is encrypted and safe</p>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-malenadu-sage rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-malenadu-sage rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="relative overflow-hidden bg-malenadu-obsidian rounded-4xl p-16 text-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-malenadu-obsidian via-slate-900 to-malenadu-forest opacity-50"></div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold text-white">Start your journey today</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Join thousands of students applying for scholarships with ease.
          </p>
          <button 
            onClick={onStart}
            className="mt-4 px-10 py-4 bg-white text-malenadu-obsidian rounded-2xl font-bold text-lg hover:bg-malenadu-sage transition-colors"
          >
            Get Started for Free
          </button>
        </div>
      </div>
    </div>
  );
};

const DocumentRow = ({ label, status, statusColor, icon }) => (
  <div className="flex items-center justify-between p-4 border border-slate-50 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-slate-50 rounded-lg">
        {icon}
      </div>
      <span className="font-bold text-malenadu-obsidian">{label}</span>
    </div>
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusColor}`}>
      {status}
    </span>
  </div>
);

export default LandingPage;
