'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Pill, HeartPulse, User, FileText, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { CLINICAL_DRUGS, CLINICAL_MEDICAL_CONDITIONS, INITIAL_DEMO_PATIENTS } from '@/lib/data/clinicalKnowledge';
import { Modal } from '@/components/ui/Modal';

export const CommandPaletteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredDrugs = CLINICAL_DRUGS.filter(
    d => d.brand_name.toLowerCase().includes(q) || d.generic_name.toLowerCase().includes(q) || d.rxcui.includes(q)
  ).slice(0, 4);

  const filteredConditions = CLINICAL_MEDICAL_CONDITIONS.filter(
    c => c.condition_name.toLowerCase().includes(q) || c.icd10_code.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredPatients = INITIAL_DEMO_PATIENTS.filter(
    p => p.full_name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q)
  ).slice(0, 2);

  const quickPages = [
    { label: 'Prescription OCR & Medication Analysis', href: '/patient/analysis', icon: FileText },
    { label: 'Patient Medical History', href: '/patient/medical-history', icon: HeartPulse },
    { label: 'Doctor Clinical Workbench', href: '/doctor/dashboard', icon: ShieldCheck },
    { label: 'System Health & Engine Diagnostics', href: '/admin/system-health', icon: Search },
  ].filter(p => p.label.toLowerCase().includes(q) || q.length === 0);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose} />

      {/* Palette Box */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95">
        
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-100 bg-slate-50/50 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search drugs, RxNorm codes, conditions, patients, or navigation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 text-xs font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto divide-y divide-slate-100 flex flex-col gap-3 font-mono text-xs">
          
          {/* Drugs Section */}
          {filteredDrugs.length > 0 && (
            <div className="flex flex-col gap-1 pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-2 tracking-wider">
                Drugs & RxNorm Knowledge Base
              </span>
              {filteredDrugs.map(drug => (
                <div
                  key={drug.drug_id}
                  onClick={() => handleSelect('/patient/analysis')}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50/70 hover:text-blue-700 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Pill className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="font-bold font-sans text-slate-900 group-hover:text-blue-700">
                        {drug.brand_name}
                      </span>
                      <span className="text-slate-500 text-[11px] ml-1.5">
                        ({drug.generic_name} • RxCUI: {drug.rxcui})
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {drug.strength}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Conditions Section */}
          {filteredConditions.length > 0 && (
            <div className="flex flex-col gap-1 pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-2 tracking-wider">
                ICD-10 Medical Conditions
              </span>
              {filteredConditions.map(cond => (
                <div
                  key={cond.medical_condition_id}
                  onClick={() => handleSelect('/patient/medical-history')}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-teal-50/70 hover:text-teal-700 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <HeartPulse className="w-4 h-4 text-teal-600" />
                    <span className="font-sans text-slate-900 group-hover:text-teal-700">
                      {cond.condition_name}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                    {cond.icd10_code}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Quick Pages */}
          <div className="flex flex-col gap-1 pt-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2 tracking-wider">
              Quick Actions & Navigation
            </span>
            {quickPages.map(page => {
              const Icon = page.icon;
              return (
                <div
                  key={page.href}
                  onClick={() => handleSelect(page.href)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span className="font-sans text-slate-700 group-hover:text-slate-900">
                      {page.label}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer info */}
        <div className="p-2.5 border-t border-slate-100 bg-slate-50 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>Navigate with mouse or arrow keys</span>
          <span>MedSafe AI Quick Switcher</span>
        </div>

      </div>
    </div>
  );
};
