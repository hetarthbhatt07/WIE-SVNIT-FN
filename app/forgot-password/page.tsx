'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { useToast } from '@/components/ui/ToastProvider';
import { BrandLogo } from '@/components/ui/BrandLogo';

export default function ForgotPasswordPage() {
  const { success } = useToast();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      success('Reset Link Dispatched', `Instructions sent to ${email}`);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center flex flex-col items-center gap-3">
        <BrandLogo size="lg" />
        <h2 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
          Reset Password
        </h2>
        <p className="text-xs font-mono text-slate-500">
          Receive a secure recovery token to restore portal access
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-2xl border border-slate-200/90 shadow-xl flex flex-col gap-6">
          
          {!isSent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <RecessedInput
                label="Registered Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@medsafe.ai"
                leftIcon={<Mail className="w-4 h-4" />}
                required
                helperText="We will send a one-time cryptographic reset token."
              />

              <TactileButton
                variant="primary"
                size="md"
                type="submit"
                isLoading={isLoading}
                className="w-full mt-2"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Send Password Reset Instructions
              </TactileButton>
            </form>
          ) : (
            <div className="py-4 text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Email Dispatched</h3>
              <p className="text-xs text-slate-600 font-mono">
                We sent password recovery instructions to <span className="font-bold">{email}</span>. Please check your inbox and spam folders.
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#2563EB] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
