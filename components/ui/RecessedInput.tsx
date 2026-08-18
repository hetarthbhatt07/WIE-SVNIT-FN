'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface RecessedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const RecessedInput = React.forwardRef<HTMLInputElement, RecessedInputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-slate-700 font-mono tracking-tight flex items-center justify-between">
          <span>{label}</span>
          {props.required && <span className="text-red-500 font-sans text-xs">*</span>}
        </label>
      )}
      
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full py-2 text-sm rounded-lg bg-slate-50 border transition-all duration-150 text-slate-900 placeholder:text-slate-400 shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.05)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]',
            leftIcon ? 'pl-9' : 'pl-3.5',
            rightIcon ? 'pr-9' : 'pr-3.5',
            error ? 'border-red-400 focus:ring-red-200 focus:border-red-500 bg-red-50/30' : 'border-slate-200/90',
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 text-slate-400 flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-0.5">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="text-xs text-slate-500 font-mono mt-0.5">{helperText}</p>
      )}
    </div>
  );
});

RecessedInput.displayName = 'RecessedInput';
