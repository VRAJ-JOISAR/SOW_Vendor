import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, LayoutGrid, Loader2, Download, Printer, AlertCircle, Plus, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [projectName, setProjectName] = useState('');
  const [sowFile, setSowFile] = useState(null);
  const [vendors, setVendors] = useState([{ id: Date.now(), file: null, name: '' }]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const sowInputRef = useRef(null);

  const handleAddVendor = () => {
    if (vendors.length < 3) {
      setVendors([...vendors, { id: Date.now(), file: null, name: '' }]);
    }
  };

  const handleRemoveVendor = (id) => {
    if (vendors.length > 1) {
      setVendors(vendors.filter(v => v.id !== id));
    }
  };

  const handleVendorChange = (id, field, value) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const handleSubmit = async () => {
    if (!projectName || !sowFile || vendors.some(v => !v.file || !v.name)) {
      alert("Please fill all fields and upload all required files.");
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('sow', sowFile);
    
    vendors.forEach((vendor, index) => {
      formData.append('vendors', vendor.file);
      formData.append(`vendorName_${vendor.file.name}`, vendor.name);
    });

    try {
      const response = await fetch('http://127.0.0.1:5000/api/analysis/process', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Server error occurred');
      }
      
      setResults(data);
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Analysis failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      {/* Header Widget */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-malenadu-sage text-malenadu-olive rounded-lg text-[10px] font-black uppercase tracking-widest mb-3">
            <LayoutGrid size={12} />
            Workspace
          </div>
          <h1 className="text-4xl font-black text-malenadu-obsidian mb-2">Compliance Center</h1>
          <p className="text-slate-500 font-medium text-lg">Upload project parameters and vendor assets to initiate audit</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-50 min-w-[340px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-malenadu-obsidian">Global Evaluation Score</h3>
            <span className="px-2 py-1 bg-malenadu-sage text-malenadu-forest text-xs font-black rounded-lg">
              {results ? `${Math.round(results.vendorAnalyses.reduce((acc, v) => acc + v.completionScore, 0) / results.vendorAnalyses.length)}%` : '0%'}
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-malenadu-forest transition-all duration-1000" 
              style={{ width: results ? `${Math.round(results.vendorAnalyses.reduce((acc, v) => acc + v.completionScore, 0) / results.vendorAnalyses.length)}%` : '0%' }}
            ></div>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>{results ? results.vendorAnalyses.length : 0} analyzed</span>
            <span>{3 - (results ? results.vendorAnalyses.length : 0)} slots left</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Project & SOW Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-50">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <FileText className="text-malenadu-forest" />
              Project Context
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Project Identifier</label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Q3 Infrastructure Audit"
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-malenadu-forest outline-none transition-all font-bold text-malenadu-obsidian"
                />
              </div>

              <div 
                onClick={() => sowInputRef.current.click()}
                className={`relative p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${sowFile ? 'border-malenadu-forest bg-malenadu-cream/50' : 'border-slate-200 hover:border-malenadu-forest hover:bg-slate-50'}`}
              >
                <input type="file" ref={sowInputRef} className="hidden" accept=".pdf" onChange={(e) => setSowFile(e.target.files[0])} />
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${sowFile ? 'bg-malenadu-forest text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <Upload size={24} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-malenadu-obsidian">{sowFile ? sowFile.name : 'Master SOW (PDF)'}</p>
                  <p className="text-xs font-bold text-slate-400">{sowFile ? 'Ready for Analysis' : 'Tap to Upload'}</p>
                </div>
                {sowFile && <CheckCircle2 className="absolute top-4 right-4 text-malenadu-forest" size={20} />}
              </div>
            </div>
          </div>

          {!results && (
            <button 
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full py-5 bg-malenadu-forest text-white rounded-3xl font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-malenadu-forest/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? <Loader2 className="animate-spin" /> : <ShieldCheck size={24} />}
              {isProcessing ? 'Processing Analysis...' : 'Submit for AI Analysis'}
            </button>
          )}
        </div>

        {/* Vendors Panel */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-malenadu-obsidian">Vendor Deliverables</h3>
            <button 
              onClick={handleAddVendor}
              disabled={vendors.length >= 3}
              className="px-4 py-2 bg-white text-malenadu-forest border border-malenadu-forest rounded-full text-xs font-black flex items-center gap-2 hover:bg-malenadu-forest hover:text-white transition-all disabled:opacity-30"
            >
              <Plus size={14} /> Add Vendor Slot
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {vendors.map((vendor) => (
              <VendorUploadCard 
                key={vendor.id}
                vendor={vendor}
                onChange={handleVendorChange}
                onRemove={handleRemoveVendor}
                showRemove={vendors.length > 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Comparative Results Dashboard */}
      {results && (
        <div className="mt-16 pt-16 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-malenadu-obsidian">Comparative Audit Results</h2>
              <p className="text-slate-500 font-medium">Compliance matrix for Project: {results.projectName}</p>
            </div>
            <div className="flex gap-4">
              <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-malenadu-obsidian hover:shadow-lg transition-all">
                <Printer size={20} />
              </button>
              <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-malenadu-obsidian hover:shadow-lg transition-all">
                <Download size={20} />
              </button>
              <button 
                onClick={() => { setResults(null); setVendors([{ id: Date.now(), file: null, name: '' }]); setSowFile(null); }}
                className="px-6 py-3 bg-malenadu-obsidian text-white rounded-2xl font-bold hover:bg-slate-900 transition-all"
              >
                New Analysis
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {results.vendorAnalyses.map((analysis, idx) => (
              <div key={idx} className="bg-white rounded-4xl border border-slate-50 shadow-2xl shadow-slate-200/50 flex flex-col h-full">
                {/* Score Widget */}
                <div className="p-8 border-b border-slate-50 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-malenadu-sage rounded-full blur-3xl opacity-50 -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{analysis.vendorName}</p>
                    <div className="inline-flex items-center justify-center px-6 py-2 bg-malenadu-sage text-malenadu-forest rounded-2xl text-4xl font-black">
                      {analysis.completionScore}%
                    </div>
                  </div>
                </div>

                {/* Reasoning */}
                <div className="p-8 flex-1 space-y-8">
                  <div className="p-5 bg-malenadu-cream/50 rounded-2xl border border-malenadu-sage/30">
                    <h4 className="text-xs font-black text-malenadu-forest uppercase tracking-widest mb-2 flex items-center gap-2">
                      <AlertCircle size={14} /> Score Reasoning
                    </h4>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                      "{analysis.scoreReasoning}"
                    </p>
                  </div>

                  {/* Positives */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Key Positives</h4>
                    <div className="space-y-3">
                      {analysis.positives.map((p, i) => (
                        <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                          <p className="text-sm font-black text-malenadu-obsidian mb-1">{p.point}</p>
                          <p className="text-[11px] font-medium text-slate-500 leading-tight">{p.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Negatives */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Compliance Gaps</h4>
                    <div className="space-y-3">
                      {analysis.negatives.map((n, i) => (
                        <div key={i} className="p-4 bg-white border border-red-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                          <p className="text-sm font-black text-red-600 mb-1 group-hover:text-red-700 transition-colors">{n.point}</p>
                          <p className="text-[11px] font-medium text-slate-500 leading-tight">{n.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const VendorUploadCard = ({ vendor, onChange, onRemove, showRemove }) => {
  const inputRef = useRef(null);

  return (
    <div className="bg-white p-6 rounded-4xl shadow-lg shadow-slate-100 border border-slate-100 relative group">
      {showRemove && (
        <button 
          onClick={() => onRemove(vendor.id)}
          className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={16} />
        </button>
      )}

      <div className="space-y-5">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vendor Label</label>
          <input 
            type="text" 
            value={vendor.name}
            onChange={(e) => onChange(vendor.id, 'name', e.target.value)}
            placeholder="e.g. TechFlow Systems"
            className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-malenadu-forest outline-none transition-all font-bold text-sm"
          />
        </div>

        <div 
          onClick={() => inputRef.current.click()}
          className={`p-6 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${vendor.file ? 'border-malenadu-forest bg-malenadu-cream/30' : 'border-slate-100 hover:border-malenadu-forest hover:bg-slate-50'}`}
        >
          <input type="file" ref={inputRef} className="hidden" accept=".pdf" onChange={(e) => onChange(vendor.id, 'file', e.target.files[0])} />
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${vendor.file ? 'bg-malenadu-forest text-white' : 'bg-slate-100 text-slate-300'}`}>
            <Upload size={20} />
          </div>
          <p className="text-xs font-black text-malenadu-obsidian truncate max-w-full px-2">
            {vendor.file ? vendor.file.name : 'Tap to Upload PDF'}
          </p>
          {vendor.file && <span className="text-[9px] font-black text-malenadu-forest uppercase bg-malenadu-sage px-2 py-0.5 rounded-full">Active Upload</span>}
        </div>
      </div>
    </div>
  );
};

const ShieldCheck = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default Dashboard;
