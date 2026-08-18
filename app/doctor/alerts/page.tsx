'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, ShieldAlert, CheckCircle2, Trash2, ArrowRight } from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { NotificationItem } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { useToast } from '@/components/ui/ToastProvider';

export default function DoctorAlertsPage() {
  const { success } = useToast();
  const [alerts, setAlerts] = useState<NotificationItem[]>([]);

  const loadData = () => {
    AppStateService.initSeedData();
    const list = AppStateService.getNotifications('user-doctor-1');
    setAlerts(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkAllRead = () => {
    AppStateService.markAllNotificationsRead('user-doctor-1');
    success('Alerts Updated', 'All clinical notifications marked as reviewed.');
    loadData();
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Critical Clinical Alerts
            </h1>
            <TactileBadge variant="red" size="sm">{alerts.length} Ingested</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Real-time feed of hazardous drug interactions and disease contraindications across your patient roster
          </p>
        </div>

        <TactileButton variant="secondary" size="sm" onClick={handleMarkAllRead}>
          Mark All As Reviewed
        </TactileButton>
      </div>

      {/* Alerts Feed */}
      <div className="flex flex-col gap-3 font-mono text-xs">
        {alerts.map(a => (
          <div
            key={a.id}
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
              !a.is_read ? 'bg-red-50/60 border-red-200' : 'bg-white border-slate-200/90'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-100 text-red-700 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm font-sans">{a.title}</h4>
                  <TactileBadge variant={a.severity === 'critical' ? 'red' : 'amber'} size="sm">
                    {a.severity}
                  </TactileBadge>
                  {!a.is_read && <TactileBadge variant="blue" size="sm">Unread</TactileBadge>}
                </div>
                <p className="text-slate-700 font-sans text-xs mt-1 leading-relaxed">
                  {a.message}
                </p>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Received: {a.created_at}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link href={a.link_url || '/doctor/patients/101'}>
                <TactileButton variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Inspect Patient 360
                </TactileButton>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
