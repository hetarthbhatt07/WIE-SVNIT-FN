'use client';

import React, { useState } from 'react';
import { Stethoscope, Pill, ShieldAlert, HeartPulse, Search, Database, ExternalLink } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { CLINICAL_DRUGS, CLINICAL_DRUG_INTERACTIONS, CLINICAL_CONTRAINDICATIONS, CLINICAL_MEDICAL_CONDITIONS } from '@/lib/data/clinicalKnowledge';

export default function AdminClinicalEnginePage() {
  const [activeTab, setActiveTab] = useState<'drugs' | 'interactions' | 'contraindications'>('drugs');
  const [query, setQuery] = useState('');

  const getDrugName = (drugId: number) => {
    const d = CLINICAL_DRUGS.find(item => item.drug_id === drugId);
    return d ? `${d.brand_name} (${d.generic_name})` : `Drug #${drugId}`;
  };

  const getConditionName = (condId: number) => {
    const c = CLINICAL_MEDICAL_CONDITIONS.find(item => item.medical_condition_id === condId);
    return c ? `${c.condition_name} (${c.icd10_code})` : `Condition #${condId}`;
  };

  const filteredDrugs = CLINICAL_DRUGS.filter(d => 
    d.brand_name.toLowerCase().includes(query.toLowerCase()) ||
    d.generic_name.toLowerCase().includes(query.toLowerCase()) ||
    d.rxcui.includes(query)
  );

  const filteredInteractions = CLINICAL_DRUG_INTERACTIONS.filter(i => {
    const d1 = getDrugName(i.drug1_id).toLowerCase();
    const d2 = getDrugName(i.drug2_id).toLowerCase();
    const q = query.toLowerCase();
    return d1.includes(q) || d2.includes(q) || i.description.toLowerCase().includes(q);
  });

  const filteredContraindications = CLINICAL_CONTRAINDICATIONS.filter(c => {
    const dName = getDrugName(c.drug_id).toLowerCase();
    const cName = getConditionName(c.medical_condition_id).toLowerCase();
    const q = query.toLowerCase();
    return dName.includes(q) || cName.includes(q) || c.description.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Clinical Knowledge Base Catalog
            </h1>
            <TactileBadge variant="teal" size="sm">RxNorm & OpenFDA Certified</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            System catalog of indexed pharmaceutical compounds, pairwise DDI matrices, and ICD-10 disease contraindications
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="p-1 rounded-xl bg-slate-100 border border-slate-200/80 shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.06)] flex items-center font-mono text-xs">
          <button
            onClick={() => setActiveTab('drugs')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'drugs' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-slate-600'
            }`}
          >
            Drugs ({CLINICAL_DRUGS.length})
          </button>
          <button
            onClick={() => setActiveTab('interactions')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'interactions' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-slate-600'
            }`}
          >
            DDIs ({CLINICAL_DRUG_INTERACTIONS.length})
          </button>
          <button
            onClick={() => setActiveTab('contraindications')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'contraindications' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-slate-600'
            }`}
          >
            Contraindications ({CLINICAL_CONTRAINDICATIONS.length})
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="w-full">
        <RecessedInput
          placeholder="Filter catalog entries by brand name, generic ingredient, RxCUI, or ICD-10 code..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* DRUGS TAB */}
      {activeTab === 'drugs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {filteredDrugs.map(d => (
            <div key={d.drug_id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm font-sans">{d.brand_name}</h3>
                  <TactileBadge variant="blue" size="sm">RxCUI: {d.rxcui}</TactileBadge>
                </div>
                <p className="text-slate-600 text-xs mt-1">Generic: <b>{d.generic_name}</b></p>
                <p className="text-slate-500 text-[11px] mt-0.5">Form: {d.dosage_form} • Route: {d.route}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[10px]">
                <span>ATC Code: {d.atc_code}</span>
                <span>Manufacturer: {d.manufacturer}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* INTERACTIONS TAB */}
      {activeTab === 'interactions' && (
        <div className="flex flex-col gap-3 font-mono text-xs">
          {filteredInteractions.map(i => (
            <div key={i.interaction_id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 font-sans text-sm">{getDrugName(i.drug1_id)} ↔ {getDrugName(i.drug2_id)}</h4>
                  <TactileBadge variant={i.severity === 'Major' ? 'red' : 'amber'} size="sm">
                    {i.severity} Severity
                  </TactileBadge>
                </div>
                <span className="text-slate-400 text-[11px]">{i.interaction_type}</span>
              </div>

              <p className="text-slate-700 font-sans leading-relaxed text-xs">{i.description}</p>
              <p className="text-slate-600 text-[11px] bg-slate-50 p-2 rounded">
                <b>Recommendation:</b> {i.recommendation}
              </p>

              <div className="flex items-center justify-between text-slate-500 text-[11px] pt-1">
                <span>Evidence Baseline: <b>{i.evidence_source}</b></span>
                <a href={i.reference_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                  View Reference <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CONTRAINDICATIONS TAB */}
      {activeTab === 'contraindications' && (
        <div className="flex flex-col gap-3 font-mono text-xs">
          {filteredContraindications.map(c => (
            <div key={c.contraindication_id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 font-sans text-sm">{getDrugName(c.drug_id)} ↔ {getConditionName(c.medical_condition_id)}</h4>
                </div>
                <TactileBadge variant="red" size="sm">{c.severity}</TactileBadge>
              </div>

              <p className="text-slate-700 font-sans leading-relaxed text-xs">{c.description}</p>

              <div className="flex items-center justify-between text-slate-500 text-[11px] pt-1">
                <span>Guideline Source: <b>{c.source}</b></span>
                <a href={c.reference_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                  View Source <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
