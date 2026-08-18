'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Save, Cpu, Database, Bell, Lock } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { useToast } from '@/components/ui/ToastProvider';

export default function AdminSettingsPage() {
  const { success } = useToast();
  const [ocrConfidence, setOcrConfidence] = useState('85');
  const [rxnormSync, setRxnormSync] = useState('Daily');
  const [safetyGateStrictness, setSafetyGateStrictness] = useState('Maximum (Strict Anti-Hallucination)');
  const [auditRetention, setAuditRetention] = useState('7 Years (HIPAA Standard)');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      success('System Preferences Updated', 'Engine parameters saved successfully.');
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              System Telemetry & Engine Settings
            </h1>
            <TactileBadge variant="blue" size="sm">Admin Preferences</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Configure OCR confidence thresholds, RxNorm sync frequency, AI gatekeeper strictness, and audit retention
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6 font-mono text-xs">
        <BentoCard
          title="Clinical Safety Engine Thresholds"
          subtitle="Define system sensitivity for OCR extraction and Safety Gatekeeper constraints"
          icon={<Cpu className="w-5 h-5 text-blue-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <RecessedInput
              label="Minimum OCR Entity Confidence Threshold (%)"
              type="number"
              value={ocrConfidence}
              onChange={(e) => setOcrConfidence(e.target.value)}
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 font-mono">RxNorm Sync Schedule</label>
              <select
                value={rxnormSync}
                onChange={(e) => setRxnormSync(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono"
              >
                <option value="Realtime">Realtime API Query</option>
                <option value="Daily">Daily Local Concept Cache</option>
                <option value="Weekly">Weekly Standardized Update</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 font-mono">AI Safety Gatekeeper Strictness</label>
              <select
                value={safetyGateStrictness}
                onChange={(e) => setSafetyGateStrictness(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono"
              >
                <option value="Maximum (Strict Anti-Hallucination)">Maximum (Strict Anti-Hallucination)</option>
                <option value="Balanced">Balanced Clinical Support</option>
                <option value="Permissive">Permissive (Exploratory)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 font-mono">Audit Log Retention Policy</label>
              <select
                value={auditRetention}
                onChange={(e) => setAuditRetention(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono"
              >
                <option value="7 Years (HIPAA Standard)">7 Years (HIPAA Standard)</option>
                <option value="10 Years">10 Years (CDSCO Regulatory)</option>
                <option value="Indefinite">Indefinite (Full Archival)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <TactileButton
              variant="primary"
              size="md"
              type="submit"
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Admin Preferences
            </TactileButton>
          </div>
        </BentoCard>
      </form>

    </div>
  );
}
