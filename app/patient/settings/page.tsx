'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Lock, Bell, Eye, EyeOff, Save, Smartphone, Trash2 } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { useToast } from '@/components/ui/ToastProvider';

export default function SettingsPage() {
  const { success } = useToast();
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isSavingPass, setIsSavingPass] = useState(false);

  // Preferences
  const [criticalEmailAlerts, setCriticalEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [autoOcrSync, setAutoOcrSync] = useState(true);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPass(true);
    setTimeout(() => {
      setIsSavingPass(false);
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      success('Password Updated', 'Security credentials changed successfully.');
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Account & Security Settings
            </h1>
            <TactileBadge variant="blue" size="sm">Preferences</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Manage your session security, password, notifications, and clinical data export
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Security / Password */}
        <BentoCard
          title="Security & Authentication"
          subtitle="Change account password and review active sessions"
          icon={<Lock className="w-5 h-5" />}
        >
          <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-4 pt-2">
            <RecessedInput
              label="Current Password"
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              placeholder="••••••••"
              required
            />
            <RecessedInput
              label="New Password"
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="••••••••"
              required
            />
            <RecessedInput
              label="Confirm New Password"
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="••••••••"
              required
            />

            <div className="flex justify-end pt-2">
              <TactileButton
                variant="primary"
                size="sm"
                type="submit"
                isLoading={isSavingPass}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Update Password
              </TactileButton>
            </div>
          </form>
        </BentoCard>

        {/* Notifications & Clinical Sync */}
        <BentoCard
          title="Alerts & Notification Preferences"
          subtitle="Define how you receive critical interaction warnings"
          icon={<Bell className="w-5 h-5" />}
        >
          <div className="flex flex-col gap-4 pt-2 font-mono text-xs">
            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 font-sans block">Critical Interaction Email Alerts</span>
                <span className="text-slate-500 text-[11px]">Instant dispatch when major DDI is flagged</span>
              </div>
              <input
                type="checkbox"
                checked={criticalEmailAlerts}
                onChange={(e) => setCriticalEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-[#2563EB]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 font-sans block">SMS Emergency Notifications</span>
                <span className="text-slate-500 text-[11px]">Direct SMS for life-threatening contraindications</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-[#2563EB]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 font-sans block">Auto-Sync OCR with RxNorm</span>
                <span className="text-slate-500 text-[11px]">Normalize extracted prescription lines automatically</span>
              </div>
              <input
                type="checkbox"
                checked={autoOcrSync}
                onChange={(e) => setAutoOcrSync(e.target.checked)}
                className="w-4 h-4 rounded text-[#2563EB]"
              />
            </label>
          </div>
        </BentoCard>

      </div>

    </div>
  );
}
