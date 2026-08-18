'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface TactileBadgeProps {
  variant?: 'blue' | 'teal' | 'amber' | 'red' | 'slate' | 'green';
  size?: 'sm' | 'md';
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const TactileBadge: React.FC<TactileBadgeProps> = ({
  variant = 'blue',
  size = 'md',
  dot = false,
  children,
  className,
}) => {
  const variantStyles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)]',
    teal: 'bg-teal-50 text-teal-700 border-teal-200/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)]',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)]',
    red: 'bg-red-50 text-red-700 border-red-200/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)]',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)]',
    slate: 'bg-slate-100 text-slate-700 border-slate-200/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)]',
  };

  const dotColors = {
    blue: 'bg-blue-600',
    teal: 'bg-teal-600',
    amber: 'bg-amber-500 animate-pulse',
    red: 'bg-red-600 animate-ping',
    green: 'bg-emerald-600',
    slate: 'bg-slate-500',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] font-mono font-medium rounded-md gap-1.5 border',
    md: 'px-2.5 py-1 text-xs font-mono font-semibold rounded-md gap-1.5 border',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center select-none font-mono tracking-tight shrink-0',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />
      )}
      <span>{children}</span>
    </span>
  );
};
