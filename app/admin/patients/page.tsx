'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Search, ArrowRight, HeartPulse, ShieldAlert, ShieldCheck } from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { Patient } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    AppStateService.initSeedData();
    setPatients(AppStateService.getPatients());
  }, []);

  const filtered = patients.filter(p => 
    p.full_name.toLowerCase().includes(query.toLowerCase()) ||
    p.email.toLowerCase().includes(query.toLowerCase()) ||
    p.patient_id.toString().includes(query)
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Admin Patient Clinical Registry
            </h1>
            <TactileBadge variant="blue" size="sm">{patients.length} Registered Accounts</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            System administrative access to patient clinical demographics, diagnosed conditions, and active prescriptions
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full">
        <RecessedInput
          placeholder="Search by patient name, email, or patient ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
        {filtered.map(p => {
          const conds = AppStateService.getPatientConditions(p.patient_id);
          const allergies = AppStateService.getPatientAllergies(p.patient_id);
          const rxs = AppStateService.getPrescriptions(p.patient_id);

          return (
            <div
              key={p.patient_id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between gap-4 hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold text-base flex items-center justify-center font-sans border border-blue-100 shadow-xs">
                      {p.full_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base font-sans">
                        {p.full_name}
                      </h3>
                      <p className="text-slate-500 text-[11px]">
                        ID #{p.patient_id} • Age: {p.age} ({p.gender})
                      </p>
                    </div>
                  </div>
                  <TactileBadge variant="blue" size="sm">O+</TactileBadge>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col gap-1.5 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <HeartPulse className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">
                      <b>Conditions:</b> {conds.map(c => c.medical_condition?.condition_name).join(', ') || 'None recorded'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-700">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate">
                      <b>Allergies:</b> {allergies.map(a => a.allergen_name).join(', ') || 'No known allergies'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">
                  {rxs.length} Ingested Rxs
                </span>

                <Link href={`/doctor/patients/${p.patient_id}`}>
                  <TactileButton variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Patient 360
                  </TactileButton>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
