'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  ShieldCheck, Search, Bell, User, LogOut, Stethoscope, 
  Activity, Check, ExternalLink, Menu, X, ChevronDown, Sparkles
} from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { User as UserType, NotificationItem } from '@/types/database';
import { TactileButton } from '@/components/ui/TactileButton';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { BrandLogo } from '@/components/ui/BrandLogo';

export const Navbar: React.FC<{
  onOpenCommandPalette?: () => void;
  onToggleSidebar?: () => void;
}> = ({ onOpenCommandPalette, onToggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    AppStateService.initSeedData();
    const user = AppStateService.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setNotifications(AppStateService.getNotifications(user.id));
    }
  }, [pathname]);

  const handleRoleSwitch = (role: 'patient' | 'doctor') => {
    if (role === 'patient') {
      const pUser = AppStateService.getPatients()[0];
      const newUser: UserType = {
        id: 'user-patient-1',
        email: pUser.email,
        password_hash: 'demo123',
        role: 'patient',
        name: pUser.full_name,
        patient_id: pUser.patient_id,
        created_at: '2026-01-02'
      };
      AppStateService.setCurrentUser(newUser);
      setCurrentUser(newUser);
      router.push('/patient/dashboard');
    } else {
      const newUser: UserType = {
        id: 'user-doctor-1',
        email: 'doctor@medsafe.ai',
        password_hash: 'demo123',
        role: 'doctor',
        name: 'Dr. Sarah Mitchell, MD',
        doctor_id: 'doc-101',
        created_at: '2026-01-01'
      };
      AppStateService.setCurrentUser(newUser);
      setCurrentUser(newUser);
      router.push('/doctor/dashboard');
    }
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    AppStateService.setCurrentUser(null);
    setCurrentUser(null);
    router.push('/');
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && !isPublicPage && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <BrandLogo size="md" />
        </div>

        {/* Center / Search Bar for Logged in or Public Nav */}
        {!isPublicPage ? (
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <button
              onClick={onOpenCommandPalette}
              className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-lg shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.04)] active:scale-[0.99] transition-all font-mono"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search drugs, conditions, patients...</span>
              </span>
              <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] bg-white border border-slate-200 text-slate-600 rounded shadow-xs">
                ⌘K
              </kbd>
            </button>
          </div>
        ) : (
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link href="/#how-it-works" className="hover:text-[#2563EB] transition-colors">How It Works</Link>
            <Link href="/#features" className="hover:text-[#2563EB] transition-colors">Features</Link>
            <Link href="/#architecture" className="hover:text-[#2563EB] transition-colors">Architecture</Link>
            <Link href="/#safety" className="hover:text-[#2563EB] transition-colors">Safety Standards</Link>
          </nav>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher Pill */}
          {currentUser && (
            <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200/80 shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.06)] font-mono text-xs">
              <button
                onClick={() => handleRoleSwitch('patient')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currentUser.role === 'patient'
                    ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Patient View
              </button>
              <button
                onClick={() => handleRoleSwitch('doctor')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currentUser.role === 'doctor'
                    ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Doctor View
              </button>
            </div>
          )}

          {currentUser ? (
            <>
              {/* Notifications Toggle */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifs(!showNotifs)}
                  className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg active:scale-95 transition-all"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
                  )}
                </button>

                {/* Notifications Dropdown Panel */}
                {showNotifs && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">Notifications & Alerts</h4>
                        {unreadCount > 0 && (
                          <TactileBadge variant="red" size="sm">{unreadCount} New</TactileBadge>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          AppStateService.markAllNotificationsRead(currentUser.id);
                          setNotifications(AppStateService.getNotifications(currentUser.id));
                        }}
                        className="text-[11px] font-mono text-[#2563EB] hover:underline"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-500 font-mono">
                          No notifications at this time.
                        </div>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n.id}
                            className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                              !n.is_read ? 'bg-blue-50/40' : ''
                            }`}
                            onClick={() => {
                              AppStateService.markNotificationRead(n.id);
                              setShowNotifs(false);
                              if (n.link_url) router.push(n.link_url);
                            }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs font-bold text-slate-900">{n.title}</span>
                              <TactileBadge variant={n.severity === 'critical' ? 'red' : 'blue'} size="sm">
                                {n.severity}
                              </TactileBadge>
                            </div>
                            <p className="text-xs text-slate-600 font-mono mt-1 leading-relaxed">
                              {n.message}
                            </p>
                            <span className="text-[10px] text-slate-400 font-mono block mt-1.5">
                              {n.created_at}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Avatar & Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-lg border border-slate-200/90 hover:bg-slate-50 active:scale-95 transition-all text-left"
                >
                  <div className="w-7 h-7 rounded-md bg-[#2563EB] text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-bold text-slate-900 leading-none truncate max-w-[100px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 leading-none mt-1 capitalize">
                      {currentUser.role}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200/90 shadow-xl overflow-hidden z-50 p-1 animate-in fade-in zoom-in-95 font-mono text-xs">
                    <div className="p-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-slate-500 text-[11px] truncate">{currentUser.email}</p>
                    </div>

                    <Link
                      href={currentUser.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'}
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-slate-700 font-sans"
                    >
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span>My Dashboard</span>
                    </Link>

                    <Link
                      href={currentUser.role === 'doctor' ? '/doctor/settings' : '/patient/profile'}
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-slate-700 font-sans"
                    >
                      <User className="w-4 h-4 text-slate-600" />
                      <span>Profile & Health Record</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 text-red-600 font-sans text-left mt-1 border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link href="/login">
                <TactileButton variant="secondary" size="sm">
                  Sign In
                </TactileButton>
              </Link>
              <Link href="/signup">
                <TactileButton variant="primary" size="sm" rightIcon={<Sparkles className="w-3.5 h-3.5" />}>
                  Get Started
                </TactileButton>
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
