'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, 
  Smartphone, UserCheck, Stethoscope, Sparkles 
} from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { DigiLockerModal } from '@/components/modals/DigiLockerModal';
import { useToast } from '@/components/ui/ToastProvider';

import { BrandLogo } from '@/components/ui/BrandLogo';

export default function LoginPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [email, setEmail] = useState('patient@medsafe.ai');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDigiLockerOpen, setIsDigiLockerOpen] = useState(false);

  const handleQuickFill = (targetRole: 'patient' | 'doctor') => {
    setRole(targetRole);
    if (targetRole === 'patient') {
      setEmail('patient@medsafe.ai');
      setPassword('demo123');
    } else {
      setEmail('doctor@medsafe.ai');
      setPassword('demo123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const result = AppStateService.authenticateUser(email, password);
      if (result.success && result.user) {
        success('Authentication Successful', `Welcome back, ${result.user.name}`);
        if (result.user.role === 'doctor') {
          router.push('/doctor/dashboard');
        } else {
          router.push('/patient/dashboard');
        }
      } else {
        error('Authentication Failed', result.error || 'Invalid credentials');
      }
    }, 600);
  };

  const handleDigiLockerSuccess = (dlId: string) => {
    success('DigiLocker Linked', `Verified National Health ID: ${dlId}`);
    handleQuickFill('patient');
    AppStateService.authenticateUser('patient@medsafe.ai', 'demo123');
    router.push('/patient/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <DigiLockerModal
        isOpen={isDigiLockerOpen}
        onClose={() => setIsDigiLockerOpen(false)}
        onSuccess={handleDigiLockerSuccess}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center flex flex-col items-center gap-3">
        <BrandLogo size="lg" />
        <h2 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
          Sign In to Healthcare Portal
        </h2>
        <p className="text-xs font-mono text-slate-500">
          Access your clinical safety workspace and prescriptions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-2xl border border-slate-200/90 shadow-xl flex flex-col gap-6">
          
          {/* Role Selector Tabs */}
          <div className="p-1 rounded-xl bg-slate-100 border border-slate-200/80 shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.06)] grid grid-cols-2 gap-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => handleQuickFill('patient')}
              className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                role === 'patient'
                  ? 'bg-white text-[#2563EB] shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Patient Login
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('doctor')}
              className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                role === 'doctor'
                  ? 'bg-white text-[#2563EB] shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Doctor Portal
            </button>
          </div>

          {/* Quick Demo Pre-fill Banner */}
          <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200/70 flex items-center justify-between text-xs font-mono">
            <span className="text-blue-900">
              ⚡ Demo {role === 'doctor' ? 'Physician' : 'Patient'} account pre-filled
            </span>
            <TactileBadge variant="blue" size="sm">Ready</TactileBadge>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <RecessedInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="flex flex-col gap-1">
              <RecessedInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
              />
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-mono">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-[#2563EB] font-mono hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <TactileButton
              variant="primary"
              size="md"
              type="submit"
              isLoading={isLoading}
              className="w-full mt-2"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to {role === 'doctor' ? 'Doctor Workbench' : 'Patient Portal'}
            </TactileButton>
          </form>

          {/* DigiLocker Alternative */}
          <div className="relative flex items-center justify-center my-1">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs font-mono text-slate-400 absolute">
              OR VERIFY WITH
            </span>
          </div>

          <TactileButton
            variant="secondary"
            size="md"
            type="button"
            onClick={() => setIsDigiLockerOpen(true)}
            className="w-full text-slate-800"
            leftIcon={<Smartphone className="w-4 h-4 text-[#2563EB]" />}
          >
            Continue with DigiLocker / ABHA ID
          </TactileButton>

          {/* Bottom Signup Link */}
          <p className="text-center text-xs text-slate-500 font-mono">
            Do not have an account?{' '}
            <Link href="/signup" className="font-bold text-[#2563EB] hover:underline">
              Create an Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
