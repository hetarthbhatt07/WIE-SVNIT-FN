'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface BentoCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerAction?: React.ReactNode;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  hoverEffect?: boolean;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  title,
  subtitle,
  headerAction,
  badge,
  icon,
  hoverEffect = false,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'relative bg-white rounded-xl border border-slate-200/90 p-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04),0_1px_2px_0_rgba(0,0,0,0.02)] transition-all duration-200',
        hoverEffect && 'hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300',
        className
      )}
      {...props}
    >
      {/* Top subtle highlight refraction */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-slate-100 to-transparent rounded-t-xl" />

      {(title || badge || icon || headerAction) && (
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            {icon && (
              <div className="p-2 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-100/80 shrink-0">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              {title && (
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900 text-base leading-tight tracking-tight truncate">
                    {title}
                  </h3>
                  {badge}
                </div>
              )}
              {subtitle && (
                <p className="text-xs text-slate-500 font-mono mt-0.5 leading-normal truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {headerAction && (
            <div className="shrink-0 flex items-center gap-2">
              {headerAction}
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
};
