'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Plus, Trash2, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { PatientAllergy } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastProvider';

export default function AllergiesPage() {
  const { success } = useToast();
  const [allergies, setAllergies] = useState<PatientAllergy[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [allergenName, setAllergenName] = useState('');
  const [reaction, setReaction] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Moderate' | 'Severe' | 'Anaphylactic'>('Severe');
  const [notes, setNotes] = useState('');

  const loadData = () => {
    AppStateService.initSeedData();
    const user = AppStateService.getCurrentUser();
    const pId = user?.patient_id || 101;
    const list = AppStateService.getPatientAllergies(pId);
    setAllergies(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allergenName || !reaction) return;

    const user = AppStateService.getCurrentUser();
    const pId = user?.patient_id || 101;

    AppStateService.addPatientAllergy({
      patient_id: pId,
      allergen_name: allergenName,
      reaction,
      severity,
      notes
    });

    success('Allergy Registered', `${allergenName} added to active screening registry.`);
    setIsAddModalOpen(false);
    setAllergenName('');
    setReaction('');
    setNotes('');
    loadData();
  };

  const handleDeleteAllergy = (id: string) => {
    AppStateService.removePatientAllergy(id);
    success('Allergy Removed', 'Allergy entry deleted.');
    loadData();
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Allergies & Hypersensitivity Registry
            </h1>
            <TactileBadge variant="red" size="sm">{allergies.length} Flagged</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Substances cross-screened in real-time during prescription OCR and manual drug entry
          </p>
        </div>

        <TactileButton
          variant="danger"
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Drug Allergy
        </TactileButton>
      </div>

      {/* Allergies Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allergies.map(a => (
          <div
            key={a.id}
            className={`rounded-xl border p-5 shadow-xs flex flex-col justify-between gap-3 relative transition-all ${
              a.severity === 'Severe' || a.severity === 'Anaphylactic'
                ? 'bg-red-50/50 border-red-200/90'
                : 'bg-white border-slate-200/90'
            }`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className={`w-4 h-4 ${a.severity === 'Severe' || a.severity === 'Anaphylactic' ? 'text-red-600' : 'text-amber-500'}`} />
                  <span className="text-xs font-mono font-bold uppercase text-slate-400">Allergen</span>
                </div>
                <TactileBadge variant={a.severity === 'Severe' || a.severity === 'Anaphylactic' ? 'red' : 'amber'} size="sm" dot>
                  {a.severity}
                </TactileBadge>
              </div>

              <h3 className="font-bold text-slate-900 text-lg font-sans">
                {a.allergen_name}
              </h3>

              <div className="p-2.5 rounded-lg bg-white/80 border border-slate-200/60 text-xs font-mono text-slate-700">
                <span className="font-bold text-slate-900 block mb-0.5">Reported Reaction:</span>
                {a.reaction}
              </div>

              {a.notes && (
                <p className="text-xs text-slate-500 font-mono italic">
                  Note: {a.notes}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Added {a.created_at}</span>
              <button
                onClick={() => handleDeleteAllergy(a.id)}
                className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Drug Allergy"
        subtitle="Document pharmacological hypersensitivities"
        maxWidth="md"
      >
        <form onSubmit={handleAddAllergy} className="flex flex-col gap-4">
          <RecessedInput
            label="Allergen / Drug Class Name"
            value={allergenName}
            onChange={(e) => setAllergenName(e.target.value)}
            placeholder="e.g. Penicillin, Sulfa, Aspirin"
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 font-mono">Severity Level</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as any)}
              className="w-full py-2 px-3 text-sm rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.05)] focus:bg-white focus:outline-none"
            >
              <option value="Low">Low (Mild local rash)</option>
              <option value="Moderate">Moderate (Urticaria, hives)</option>
              <option value="Severe">Severe (Angioedema, wheezing)</option>
              <option value="Anaphylactic">Anaphylactic (Life-threatening airway compromise)</option>
            </select>
          </div>

          <RecessedInput
            label="Reaction Symptoms"
            value={reaction}
            onChange={(e) => setReaction(e.target.value)}
            placeholder="e.g. Facial swelling, hives, shortness of breath"
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 font-mono">Additional Clinical Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. First occurred in 2019 after oral Amoxicillin course."
              className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.05)] focus:bg-white focus:outline-none text-xs font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <TactileButton variant="secondary" type="button" onClick={() => setIsAddModalOpen(false)} size="sm">
              Cancel
            </TactileButton>
            <TactileButton variant="danger" type="submit" size="sm">
              Save Allergy Record
            </TactileButton>
          </div>
        </form>
      </Modal>

    </div>
  );
}
