'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Pill, Plus, Search, Trash2, Edit3, ScanLine, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { useToast } from '@/components/ui/ToastProvider';

interface MedicationItem {
  id: string;
  brandName: string;
  genericName: string;
  rxcui: string;
  strength: string;
  dosage: string;
  frequency: string;
  route: string;
  duration: string;
  instructions: string;
  status: 'Active' | 'Paused' | 'Discontinued';
}

const INITIAL_MEDICATIONS: MedicationItem[] = [
  {
    id: 'med-1',
    brandName: 'Coumadin',
    genericName: 'Warfarin',
    rxcui: '11289',
    strength: '5 mg',
    dosage: '1 Tablet',
    frequency: 'Once daily at 6 PM (OD)',
    route: 'Oral (PO)',
    duration: 'Ongoing (Chronic)',
    instructions: 'Maintain consistent dietary Vitamin K. Do not take NSAIDs.',
    status: 'Active'
  },
  {
    id: 'med-2',
    brandName: 'Advil',
    genericName: 'Ibuprofen',
    rxcui: '5640',
    strength: '400 mg',
    dosage: '1 Tablet',
    frequency: 'Every 8 hours PRN (Joint pain)',
    route: 'Oral (PO)',
    duration: 'As needed (PRN)',
    instructions: 'Take with food or milk. High bleeding risk with Warfarin.',
    status: 'Active'
  },
  {
    id: 'med-3',
    brandName: 'Prinivil',
    genericName: 'Lisinopril',
    rxcui: '29046',
    strength: '10 mg',
    dosage: '1 Tablet',
    frequency: 'Every morning (OD)',
    route: 'Oral (PO)',
    duration: 'Ongoing (Chronic)',
    instructions: 'Take in the morning for hypertension management.',
    status: 'Active'
  }
];

export default function MedicationsPage() {
  const { success } = useToast();
  const [meds, setMeds] = useState<MedicationItem[]>(INITIAL_MEDICATIONS);
  const [query, setQuery] = useState('');

  const handleDelete = (id: string) => {
    setMeds(meds.filter(m => m.id !== id));
    success('Medication Removed', 'Updated active medication schedule.');
  };

  const filtered = meds.filter(m => 
    m.brandName.toLowerCase().includes(query.toLowerCase()) ||
    m.genericName.toLowerCase().includes(query.toLowerCase()) ||
    m.rxcui.includes(query)
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Medication Schedule & Inventory
            </h1>
            <TactileBadge variant="blue" size="sm">{meds.length} Active Compounds</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Canonical RxNorm catalog of all prescribed and self-administered substances
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/patient/analysis">
            <TactileButton
              variant="primary"
              size="md"
              leftIcon={<ScanLine className="w-4 h-4" />}
            >
              Analyze Safety Regimen
            </TactileButton>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full">
        <RecessedInput
          placeholder="Search by brand name, generic ingredient, or RxNorm ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Medication Cards */}
      <div className="flex flex-col gap-4">
        {filtered.map(m => (
          <div
            key={m.id}
            className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-700 font-mono font-bold text-sm shrink-0 shadow-xs border border-blue-100">
                Rx
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-bold text-slate-900 text-lg font-sans">
                    {m.brandName} <span className="text-slate-600 font-normal">({m.genericName})</span>
                  </h3>
                  <TactileBadge variant="blue" size="sm">RxNorm: {m.rxcui}</TactileBadge>
                  <TactileBadge variant={m.status === 'Active' ? 'green' : 'slate'} size="sm">
                    {m.status}
                  </TactileBadge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1 text-xs font-mono text-slate-600 mt-1">
                  <span><b className="text-slate-900">Dosage:</b> {m.dosage} ({m.strength})</span>
                  <span><b className="text-slate-900">Frequency:</b> {m.frequency}</span>
                  <span><b className="text-slate-900">Route:</b> {m.route}</span>
                  <span><b className="text-slate-900">Duration:</b> {m.duration}</span>
                </div>

                <p className="text-xs font-mono text-slate-500 mt-1 bg-slate-50 p-2 rounded-md border border-slate-100">
                  <b>Special Instructions:</b> {m.instructions}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
              <Link href="/patient/analysis/results">
                <TactileButton variant="secondary" size="sm">
                  Interaction Check
                </TactileButton>
              </Link>
              <button
                onClick={() => handleDelete(m.id)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
