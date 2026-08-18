'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-md gap-1.5',
    md: 'px-4 py-2 text-sm font-semibold rounded-lg gap-2',
    lg: 'px-5 py-2.5 text-base font-semibold rounded-xl gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-[#2563EB] text-white border border-blue-700/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_1px_2px_0_rgba(0,0,0,0.06)] hover:bg-[#1D4ED8] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45),0_2px_4px_0_rgba(0,0,0,0.08)] active:bg-[#1E40AF]',
    secondary:
      'bg-white text-slate-800 border border-slate-200/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_1px_2px_0_rgba(0,0,0,0.03)] hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100',
    outline:
      'bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-100/70 active:bg-slate-200/60',
    danger:
      'bg-[#DC2626] text-white border border-red-700/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_1px_2px_0_rgba(0,0,0,0.06)] hover:bg-[#B91C1C] active:bg-[#991B1B]',
    success:
      'bg-[#0D9488] text-white border border-teal-700/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_1px_2px_0_rgba(0,0,0,0.06)] hover:bg-[#0F766E] active:bg-[#115E59]',
    ghost:
      'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-none border-transparent active:bg-slate-200/50',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        'relative inline-flex items-center justify-center transition-all duration-150 select-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
