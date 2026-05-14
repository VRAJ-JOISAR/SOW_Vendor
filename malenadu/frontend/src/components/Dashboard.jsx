import React, { useRef } from 'react';
import { Upload, LayoutGrid, CheckCircle2, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3">
            <LayoutGrid size={12} />
            Workspace
          </div>
          <h1 className="text-4xl font-black text-malenadu-obsidian mb-2">Identity Center</h1>
          <p className="text-slate-500 font-medium">Upload your documents to continue</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200 border border-slate-50 min-w-[320px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-malenadu-obsidian">Eligibility Score</h3>
            <span className="px-2 py-1 bg-malenadu-sage text-malenadu-forest text-xs font-black rounded-lg">0%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
            <div className="w-0 h-full bg-malenadu-forest transition-all duration-1000"></div>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>0 verified</span>
            <span>6 left</span>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-malenadu-obsidian">Required Documents</h2>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 size={14} />
            Auto-saves to locker
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UploadCard label="Aadhaar Card" />
          <UploadCard label="Income Certificate" />
          <UploadCard label="Marks Card (10th/12th)" />
          <UploadCard label="College ID" />
        </div>
      </div>
    </div>
  );
};

const UploadCard = ({ label }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Selected: ${file.name}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative flex flex-col items-center justify-center p-10 bg-white rounded-3xl border-2 border-dashed border-slate-200 hover:border-malenadu-forest hover:bg-malenadu-cream transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />
      
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors shadow-sm">
        <Upload className="text-slate-400 group-hover:text-malenadu-forest transition-colors" size={32} />
      </div>

      <h3 className="text-lg font-black text-malenadu-obsidian text-center mb-2">{label}</h3>
      <p className="text-sm font-bold text-slate-400 group-hover:text-malenadu-forest transition-colors">Tap to Upload</p>

      {/* Hover Status Tag */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <AlertCircle size={18} className="text-malenadu-forest" />
      </div>
    </div>
  );
};

export default Dashboard;
