'use client';

import React, { useState, useEffect } from 'react';
import { User, HeartPulse, ShieldCheck, Save, Mail, Phone, Calendar, Weight, Activity } from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { Patient } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { useToast } from '@/components/ui/ToastProvider';

export default function PatientProfilePage() {
  const { success } = useToast();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Female');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    AppStateService.initSeedData();
    const user = AppStateService.getCurrentUser();
    const pId = user?.patient_id || 101;
    const p = AppStateService.getPatientById(pId) || AppStateService.getPatients()[0];
    if (p) {
      setPatient(p);
      setFullName(p.full_name);
      setEmail(p.email);
      setPhone(p.phone_number);
      setAge(p.age.toString());
      setDob(p.date_of_birth);
      setGender(p.gender);
      setBloodGroup(p.blood_group);
      setWeight(p.weight.toString());
      setHeight(p.height.toString());
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;
    setIsSaving(true);

    setTimeout(() => {
      const updated: Patient = {
        ...patient,
        full_name: fullName,
        email,
        phone_number: phone,
        age: parseInt(age) || patient.age,
        date_of_birth: dob,
        gender,
        blood_group: bloodGroup,
        weight: parseFloat(weight) || patient.weight,
        height: parseFloat(height) || patient.height
      };

      AppStateService.updatePatient(updated);
      setPatient(updated);
      setIsSaving(false);
      success('Profile Saved', 'Patient clinical parameters updated successfully.');
    }, 600);
  };

  const bmi = (parseFloat(weight) && parseFloat(height))
    ? (parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)).toFixed(1)
    : '26.1';

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Patient Clinical Profile
            </h1>
            <TactileBadge variant="teal" size="sm">Verified Patient</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Personal, demographic, and physiological parameters used in medication risk scoring
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        
        {/* Personal Details */}
        <BentoCard
          title="Personal & Contact Information"
          subtitle="Official patient registration details"
          icon={<User className="w-5 h-5" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <RecessedInput
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <RecessedInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <RecessedInput
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <RecessedInput
              label="Age (Years)"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <RecessedInput
              label="Date of Birth"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 font-mono">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full py-2 px-3 text-sm rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.05)] focus:bg-white focus:outline-none"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </BentoCard>

        {/* Physical & Physiological Parameters */}
        <BentoCard
          title="Physiological Parameters (Dosage Calculation)"
          subtitle="Essential for renal clearance estimation and narrow therapeutic index adjustments"
          icon={<HeartPulse className="w-5 h-5" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <RecessedInput
              label="Weight (kg)"
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <RecessedInput
              label="Height (cm)"
              type="number"
              step="0.5"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 font-mono">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full py-2 px-3 text-sm rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.05)] focus:bg-white focus:outline-none"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200/80 flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-blue-700">Calculated BMI</span>
              <span className="text-xl font-bold font-mono text-blue-900">{bmi} kg/m²</span>
              <span className="text-[10px] font-mono text-blue-600">Standard Body Surface Area</span>
            </div>
          </div>
        </BentoCard>

        {/* Save Button */}
        <div className="flex justify-end">
          <TactileButton
            variant="primary"
            size="lg"
            type="submit"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Clinical Profile
          </TactileButton>
        </div>

      </form>

    </div>
  );
}
