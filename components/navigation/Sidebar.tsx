'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, User, HeartPulse, Pill, FileText, 
  ScanLine, AlertTriangle, ShieldAlert, History, Settings, 
  Users, Stethoscope, FileCheck, CheckCircle2, ShieldCheck, 
  HelpCircle, ChevronRight, Activity, PlusCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { TactileButton } from '@/components/ui/TactileButton';

interface SidebarProps {
  role?: 'patient' | 'doctor' | 'admin';
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role = 'patient', isOpen = false, onClose }) => {
  const pathname = usePathname();

  const patientNavItems = [
    { label: 'Dashboard', href: '/patient/dashboard', icon: LayoutDashboard },
    { label: 'My Health Profile', href: '/patient/profile', icon: User },
    { label: 'Medical History', href: '/patient/medical-history', icon: HeartPulse },
    { label: 'Allergies Registry', href: '/patient/allergies', icon: ShieldAlert },
    { label: 'My Medications', href: '/patient/medications', icon: Pill },
    { label: 'Prescriptions', href: '/patient/prescriptions', icon: FileText },
    { label: 'Analyze Medication', href: '/patient/analysis', icon: ScanLine, highlight: true },
    { label: 'Interaction History', href: '/patient/history', icon: History },
    { label: 'Safety Reports', href: '/patient/reports', icon: FileCheck },
    { label: 'Account Settings', href: '/patient/settings', icon: Settings },
  ];

  const doctorNavItems = [
    { label: 'Clinical Dashboard', href: '/doctor/dashboard', icon: LayoutDashboard },
    { label: 'Patient Directory', href: '/doctor/patients', icon: Users },
    { label: 'Medication Safety Hub', href: '/doctor/analysis', icon: Stethoscope, highlight: true },
    { label: 'Clinical Reports', href: '/doctor/reports', icon: FileCheck },
    { label: 'Critical Alerts', href: '/doctor/alerts', icon: AlertTriangle },
    { label: 'Audit & Safety Logs', href: '/doctor/audit-logs', icon: History },
    { label: 'Doctor Settings', href: '/doctor/settings', icon: Settings },
  ];

  const adminNavItems = [
    { label: 'System Diagnostics', href: '/admin/system-health', icon: Activity, highlight: true },
    { label: 'Patient Clinical Registry', href: '/admin/patients', icon: Users },
    { label: 'Regulatory Audit Logs', href: '/admin/audit-logs', icon: History },
    { label: 'Clinical Knowledge Base', href: '/admin/clinical-engine', icon: Stethoscope },
    { label: 'System Reports Archive', href: '/admin/reports', icon: FileCheck },
    { label: 'System Preferences', href: '/admin/settings', icon: Settings },
  ];

  const items = role === 'admin' ? adminNavItems : role === 'doctor' ? doctorNavItems : patientNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          'fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 shrink-0 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Top Section / Action */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto">
          {/* Quick Action Button */}
          <Link href={role === 'admin' ? '/admin/system-health' : role === 'doctor' ? '/doctor/analysis' : '/patient/analysis'} onClick={onClose}>
            <TactileButton
              variant="primary"
              size="sm"
              className="w-full justify-between"
              leftIcon={<ScanLine className="w-4 h-4" />}
              rightIcon={<ChevronRight className="w-3.5 h-3.5 opacity-70" />}
            >
              {role === 'admin' ? 'System Telemetry' : role === 'doctor' ? 'New Clinical Check' : 'Analyze Medicine'}
            </TactileButton>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <span className="text-[11px] font-mono font-semibold text-slate-400 px-3 uppercase tracking-wider mb-1">
              {role === 'admin' ? 'Admin Workspace' : role === 'doctor' ? 'Clinical Navigation' : 'Patient Workspace'}
            </span>

            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/patient/dashboard' && item.href !== '/doctor/dashboard' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={clsx(
                    'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold font-sans transition-all duration-150 active:scale-[0.98]',
                    isActive
                      ? 'bg-blue-50 text-[#2563EB] shadow-[inset_0_1px_0_0_rgba(255,255,255,1)] border border-blue-200/80 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={clsx('w-4 h-4 shrink-0', isActive ? 'text-[#2563EB]' : 'text-slate-400')} />
                    <span>{item.label}</span>
                  </div>

                  {item.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Safety Assurance Badge */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/80 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-900 truncate">Clinical Safety Gate</p>
              <p className="text-[10px] font-mono text-slate-500">RxNorm & FDA active</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
