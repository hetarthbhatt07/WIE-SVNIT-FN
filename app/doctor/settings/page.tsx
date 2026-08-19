'use client';

import React, { useState } from 'react';
import { Settings, Stethoscope, ShieldCheck, Save, Mail, Phone, Lock, Hospital } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { useToast } from '@/components/ui/ToastProvider';

export default function DoctorSettingsPage() {
  const { success } = useToast();
  const [docName, setDocName] = useState('Dr. Sunita Rao, MD');
  const [email, setEmail] = useState('doctor@medsafe.in');
  const [license, setLicense] = useState('GMC-GUJ-892341');
  const [specialty, setSpecialty] = useState('Cardiology & Pharmacotherapy');
  const [hospital, setHospital] = useState('SVNIT Memorial Healthcare');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      success('Doctor Profile Updated', 'Physician licensing records confirmed.');
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Physician Profile & Credentials
            </h1>
            <TactileBadge variant="teal" size="sm">Verified Prescriber</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Manage your medical registration, institutional affiliations, and clinical overrides
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6 font-mono text-xs">
        <BentoCard
          title="Practitioner Credentials"
          subtitle="Official medical council licensure and specialty registration"
          icon={<Stethoscope className="w-5 h-5 text-teal-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <RecessedInput
              label="Full Name & Degrees"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              required
            />
            <RecessedInput
              label="Professional Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <RecessedInput
              label="Medical Registration / License Number"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              required
            />
            <RecessedInput
              label="Primary Specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              required
            />
          </div>

          <div className="pt-4">
            <RecessedInput
              label="Primary Hospital / Health System Affiliation"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              leftIcon={<Hospital className="w-4 h-4" />}
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <TactileButton
              variant="success"
              size="md"
              type="submit"
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Physician Credentials
            </TactileButton>
          </div>
        </BentoCard>
      </form>

    </div>
  );
}
