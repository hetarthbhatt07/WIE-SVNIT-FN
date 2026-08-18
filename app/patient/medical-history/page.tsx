'use client';

import React, { useState, useEffect } from 'react';
import { HeartPulse, Plus, Search, Trash2, Edit3, CheckCircle2, ShieldAlert, Calendar, Filter } from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { PatientCondition, MedicalCondition } from '@/types/database';
import { CLINICAL_MEDICAL_CONDITIONS } from '@/lib/data/clinicalKnowledge';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastProvider';

export default function MedicalHistoryPage() {
  const { success, error } = useToast();
  const [conditions, setConditions] = useState<PatientCondition[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Modal Form State
  const [selectedConditionId, setSelectedConditionId] = useState<number>(1);
  const [severity, setSeverity] = useState<'Mild' | 'Moderate' | 'Severe' | 'Critical'>('Moderate');
  const [status, setStatus] = useState<'Active' | 'Managed' | 'Resolved' | 'Chronic'>('Active');
  const [diagnosedOn, setDiagnosedOn] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const loadData = () => {
    AppStateService.initSeedData();
    const user = AppStateService.getCurrentUser();
    const pId = user?.patient_id || 101;
    const conds = AppStateService.getPatientConditions(pId);
    setConditions(conds);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddCondition = (e: React.FormEvent) => {
    e.preventDefault();
    const user = AppStateService.getCurrentUser();
    const pId = user?.patient_id || 101;

    AppStateService.addPatientCondition({
      patient_id: pId,
      medical_condition_id: selectedConditionId,
      severity,
      status,
      diagnosed_on: diagnosedOn,
      notes
    });

    success('Condition Added', 'Medical condition mapped to patient record for contraindication checks.');
    setIsAddModalOpen(false);
    setNotes('');
    loadData();
  };

  const handleDeleteCondition = (id: number) => {
    AppStateService.removePatientCondition(id);
    success('Condition Removed', 'Removed medical condition record.');
    loadData();
  };

  const filtered = conditions.filter(c => {
    const name = c.medical_condition?.condition_name.toLowerCase() || '';
    const icd = c.medical_condition?.icd10_code.toLowerCase() || '';
    const q = searchQuery.toLowerCase();
    const matchesSearch = name.includes(q) || icd.includes(q);
    const matchesStatus = statusFilter === 'all' || c.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Medical History & Diagnoses
            </h1>
            <TactileBadge variant="teal" size="sm">{conditions.length} Documented</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            ICD-10 coded patient conditions evaluated for drug-disease contraindications
          </p>
        </div>

        <TactileButton
          variant="primary"
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Medical Condition
        </TactileButton>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <RecessedInput
            placeholder="Search by condition name or ICD-10 code (e.g. Hypertension, I10)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.06)] font-mono text-xs shrink-0">
          {['all', 'active', 'managed', 'resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                statusFilter === st
                  ? 'bg-white text-[#2563EB] font-bold shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Conditions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 p-12 text-center bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col items-center gap-3">
            <HeartPulse className="w-12 h-12 text-slate-300" />
            <h3 className="text-base font-bold text-slate-700 font-sans">No Medical Conditions Found</h3>
            <p className="text-xs text-slate-500 font-mono max-w-sm">
              Add your clinical diagnoses so MedSafe AI can cross-reference disease contraindications.
            </p>
            <TactileButton
              variant="secondary"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add First Condition
            </TactileButton>
          </div>
        ) : (
          filtered.map(c => (
            <div
              key={c.patient_condition_id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between gap-4 relative hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <TactileBadge variant="teal" size="md">
                      {c.medical_condition?.icd10_code || 'ICD-10'}
                    </TactileBadge>
                    <span className="text-xs font-mono font-semibold text-slate-500">
                      {c.medical_condition?.category || 'Clinical'}
                    </span>
                  </div>

                  <TactileBadge
                    variant={c.status === 'Active' ? 'red' : 'green'}
                    size="sm"
                    dot={c.status === 'Active'}
                  >
                    {c.status}
                  </TactileBadge>
                </div>

                <h3 className="font-bold text-slate-900 text-base font-sans mt-1">
                  {c.medical_condition?.condition_name || 'Medical Condition'}
                </h3>
                <p className="text-xs text-slate-600 font-mono leading-relaxed">
                  {c.notes || c.medical_condition?.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Diagnosed: {c.diagnosed_on}
                </span>

                <button
                  onClick={() => handleDeleteCondition(c.patient_condition_id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove condition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Condition Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Medical Condition"
        subtitle="Select from standardized ICD-10 clinical registry"
        maxWidth="lg"
      >
        <form onSubmit={handleAddCondition} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 font-mono">Standard Condition (ICD-10)</label>
            <select
              value={selectedConditionId}
              onChange={(e) => setSelectedConditionId(parseInt(e.target.value))}
              className="w-full py-2 px-3 text-sm rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.05)] focus:bg-white focus:outline-none"
            >
              {CLINICAL_MEDICAL_CONDITIONS.map(m => (
                <option key={m.medical_condition_id} value={m.medical_condition_id}>
                  [{m.icd10_code}] {m.condition_name} ({m.category})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 font-mono">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full py-2 px-3 text-sm rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.05)] focus:bg-white focus:outline-none"
              >
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 font-mono">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full py-2 px-3 text-sm rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.05)] focus:bg-white focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Managed">Managed</option>
                <option value="Chronic">Chronic</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <RecessedInput
              label="Diagnosis Date"
              type="date"
              value={diagnosedOn}
              onChange={(e) => setDiagnosedOn(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 font-mono">Clinical Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. History of gastrointestinal bleeding. Advised to avoid NSAIDs."
              className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.05)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <TactileButton variant="secondary" type="button" onClick={() => setIsAddModalOpen(false)} size="sm">
              Cancel
            </TactileButton>
            <TactileButton variant="primary" type="submit" size="sm">
              Save Medical Condition
            </TactileButton>
          </div>
        </form>
      </Modal>

    </div>
  );
}
