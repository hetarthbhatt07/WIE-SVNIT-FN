'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, Smartphone, RefreshCw } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';

export const DigiLockerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (digiLockerId: string) => void;
}> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'aadhaar' | 'otp' | 'verified'>('aadhaar');
  const [aadhaar, setAadhaar] = useState('5489 2314 9876');
  const [otp, setOtp] = useState('789123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('verified');
      setTimeout(() => {
        onSuccess('DL-IN-98234-MED');
        onClose();
        setStep('aadhaar');
      }, 1000);
    }, 900);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
            DL
          </div>
          <span>DigiLocker Health ID Verification</span>
        </div>
      }
      subtitle="National Digital Health Mission (ABHA / DigiLocker Gateway)"
      maxWidth="md"
    >
      <div className="flex flex-col gap-4">
        {step === 'aadhaar' && (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-blue-900 text-xs font-mono flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Enter your 12-digit Aadhaar number or ABHA ID to fetch verified prescription records from DigiLocker.
              </span>
            </div>

            <RecessedInput
              label="Aadhaar / ABHA Health ID"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              placeholder="XXXX XXXX XXXX"
              required
              helperText="Demo test ID pre-filled for hackathon evaluation."
            />

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <TactileButton variant="secondary" type="button" onClick={onClose} size="sm">
                Cancel
              </TactileButton>
              <TactileButton variant="primary" type="submit" isLoading={isLoading} size="sm">
                Get Verification OTP
              </TactileButton>
            </div>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 text-xs font-mono flex items-start gap-2.5">
              <Smartphone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                One Time Password (OTP) dispatched to mobile linked with Aadhaar (******5678).
              </span>
            </div>

            <RecessedInput
              label="6-Digit Verification OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              required
              helperText="Demo OTP pre-filled (789123)."
            />

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <TactileButton variant="secondary" type="button" onClick={() => setStep('aadhaar')} size="sm">
                Back
              </TactileButton>
              <TactileButton variant="success" type="submit" isLoading={isLoading} size="sm">
                Verify & Link Health Records
              </TactileButton>
            </div>
          </form>
        )}

        {step === 'verified' && (
          <div className="py-6 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900">DigiLocker Identity Verified</h4>
            <p className="text-xs text-slate-500 font-mono">
              ABHA ID linked: <span className="font-bold text-slate-800">eleanor.vance@abdm</span>
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
