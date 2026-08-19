'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, Lock, Mail, User, Phone, Calendar, 
  Activity, Stethoscope, ArrowRight, CheckCircle2, HeartPulse 
} from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { useToast } from '@/components/ui/ToastProvider';

import { BrandLogo } from '@/components/ui/BrandLogo';

export default function SignupPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Common Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Patient Specific
  const [age, setAge] = useState('32');
  const [dob, setDob] = useState('1994-06-15');
  const [gender, setGender] = useState('Female');
  const [weight, setWeight] = useState('65');
  const [height, setHeight] = useState('168');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [initialCondition, setInitialCondition] = useState('Hypertension');
  const [initialAllergy, setInitialAllergy] = useState('Penicillin');

  // Doctor Specific
  const [regNumber, setRegNumber] = useState('MCI-2024-89312');
  const [specialization, setSpecialization] = useState('Cardiology & Pharmacotherapy');
  const [hospitalName, setHospitalName] = useState('SVNIT Healthcare Medical Center');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      error('Missing Fields', 'Please complete all required information.');
      return;
    }

    if (password !== confirmPassword) {
      error('Password Mismatch', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (role === 'patient') {
        const newPatientId = Date.now();
        const newPatient = {
          patient_id: newPatientId,
          full_name: fullName,
          age: parseInt(age) || 30,
          gender,
          date_of_birth: dob,
          weight: parseFloat(weight) || 70,
          height: parseFloat(height) || 170,
          blood_group: bloodGroup,
          created_at: new Date().toISOString(),
          email,
          phone_number: phone,
          password_hash: password
        };

        const existingPatients = AppStateService.getPatients();
        existingPatients.push(newPatient);
        localStorage.setItem('medsafe_patients', JSON.stringify(existingPatients));

        // Add initial condition if selected
        if (initialCondition) {
          AppStateService.addPatientCondition({
            patient_id: newPatientId,
            medical_condition_id: 1, // Hypertension
            severity: 'Mild',
            status: 'Active',
            diagnosed_on: new Date().toISOString().split('T')[0],
            notes: 'Diagnosed on onboarding.'
          });
        }

        // Add initial allergy
        if (initialAllergy) {
          AppStateService.addPatientAllergy({
            patient_id: newPatientId,
            allergen_name: initialAllergy,
            reaction: 'Skin rash / hives',
            severity: 'Moderate',
            notes: 'Noted during registration.'
          });
        }

        const newUser = {
          id: `user-p-${newPatientId}`,
          email,
          password_hash: password,
          role: 'patient' as const,
          name: fullName,
          patient_id: newPatientId,
          created_at: new Date().toISOString()
        };
        AppStateService.setCurrentUser(newUser);

        success('Account Created Successfully', `Welcome to MedSafe AI, ${fullName}`);
        router.push('/patient/dashboard');
      } else {
        const newUser = {
          id: `user-doc-${Date.now()}`,
          email,
          password_hash: password,
          role: 'doctor' as const,
          name: fullName,
          doctor_id: `doc-${Date.now()}`,
          created_at: new Date().toISOString()
        };
        AppStateService.setCurrentUser(newUser);

        success('Doctor Profile Registered', 'Account created with status: Verification Pending');
        router.push('/doctor/dashboard');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center flex flex-col items-center gap-3">
        <BrandLogo size="lg" />
        <h2 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
          Create Clinical Safety Account
        </h2>
        <p className="text-xs font-mono text-slate-500">
          Step-based registration with health profile calibration
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-2xl border border-slate-200/90 shadow-xl flex flex-col gap-6">
          
          {/* Role Choice */}
          <div className="p-1 rounded-xl bg-slate-100 border border-slate-200/80 shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.06)] grid grid-cols-2 gap-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setRole('patient')}
              className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                role === 'patient'
                  ? 'bg-white text-[#2563EB] shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              Patient Account
            </button>
            <button
              type="button"
              onClick={() => setRole('doctor')}
              className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                role === 'doctor'
                  ? 'bg-white text-[#2563EB] shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Doctor / Healthcare Pro
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Step 1: Base Credentials */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between pb-2 border-b border-slate-100 font-sans">
                <span>Account Credentials</span>
                <TactileBadge variant="blue" size="sm">Step 1 of 2</TactileBadge>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RecessedInput
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={role === 'doctor' ? 'Dr. Rajesh Sharma, MD' : 'Ananya Sharma'}
                  leftIcon={<User className="w-4 h-4" />}
                  required
                />
                <RecessedInput
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.in"
                  leftIcon={<Mail className="w-4 h-4" />}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <RecessedInput
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  leftIcon={<Phone className="w-4 h-4" />}
                  required
                />
                <RecessedInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-4 h-4" />}
                  required
                />
                <RecessedInput
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-4 h-4" />}
                  required
                />
              </div>
            </div>

            {/* Step 2: Role Specific Clinical Profile */}
            {role === 'patient' ? (
              <div className="flex flex-col gap-4 pt-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between pb-2 border-b border-slate-100 font-sans">
                  <span>Patient Physical & Medical Profile</span>
                  <TactileBadge variant="teal" size="sm">Health Calibration</TactileBadge>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <RecessedInput
                    label="Age"
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
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <RecessedInput
                    label="Weight (kg)"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                  <RecessedInput
                    label="Height (cm)"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                  />
                  <RecessedInput
                    label="Existing Condition"
                    value={initialCondition}
                    onChange={(e) => setInitialCondition(e.target.value)}
                    placeholder="e.g. Hypertension"
                  />
                  <RecessedInput
                    label="Known Drug Allergy"
                    value={initialAllergy}
                    onChange={(e) => setInitialAllergy(e.target.value)}
                    placeholder="e.g. Penicillin"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 pt-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between pb-2 border-b border-slate-100 font-sans">
                  <span>Physician Credentials & Affiliation</span>
                  <TactileBadge variant="amber" size="sm">Verification Required</TactileBadge>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <RecessedInput
                    label="Medical Reg / License No"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder="MCI-XXXX-XXXX"
                    required
                  />
                  <RecessedInput
                    label="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="e.g. Cardiology"
                    required
                  />
                  <RecessedInput
                    label="Hospital / Clinic Name"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="SVNIT Healthcare Center"
                    required
                  />
                </div>

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900">
                  ⚠️ Physician accounts require verified licensing details before clinical prescribing overrides are unlocked. Account will be created in <b>Verification Pending</b> state.
                </div>
              </div>
            )}

            <TactileButton
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isLoading}
              className="w-full mt-2"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Complete Registration & Open Dashboard
            </TactileButton>
          </form>

          {/* Bottom Link */}
          <p className="text-center text-xs text-slate-500 font-mono">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#2563EB] hover:underline">
              Sign In Here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
