import React from 'react';
import Link from 'next/link';
import { AlertCircle, Lock } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200/90 py-12 text-slate-600 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="flex flex-col gap-3 md:col-span-2">
            <BrandLogo size="md" clickable={false} />
            <p className="text-xs text-slate-500 font-mono leading-relaxed max-w-md">
              AI-Powered Medication Safety, Drug-Drug Interaction Detection, OCR Prescription Analysis, Contraindication Checking & Clinical Decision Support. Built for SVNIT WIE Hackathon 2026.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-1">
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                All Engines Operational
              </span>
              <span>•</span>
              <span>RxNorm 2026</span>
              <span>•</span>
              <span>OpenFDA Clinical v3.1</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wider">
              Clinical Modules
            </h4>
            <ul className="text-xs space-y-1.5 font-mono text-slate-500">
              <li><Link href="/patient/analysis" className="hover:text-[#2563EB] transition-colors">Prescription OCR Ingestion</Link></li>
              <li><Link href="/patient/analysis" className="hover:text-[#2563EB] transition-colors">Drug-Drug Interaction Matrix</Link></li>
              <li><Link href="/patient/medical-history" className="hover:text-[#2563EB] transition-colors">ICD-10 Contraindications</Link></li>
              <li><Link href="/patient/reports" className="hover:text-[#2563EB] transition-colors">Dual Recipient Report Engine</Link></li>
              <li><Link href="/admin/system-health" className="hover:text-[#2563EB] transition-colors">System Health & Diagnostics</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wider">
              Verification & Roles
            </h4>
            <ul className="text-xs space-y-1.5 font-mono text-slate-500">
              <li><Link href="/patient/dashboard" className="hover:text-[#2563EB] transition-colors">Patient Health Portal</Link></li>
              <li><Link href="/doctor/dashboard" className="hover:text-[#2563EB] transition-colors">Doctor Clinical Workbench</Link></li>
              <li><Link href="/login" className="hover:text-[#2563EB] transition-colors">DigiLocker Integration</Link></li>
              <li><Link href="/signup" className="hover:text-[#2563EB] transition-colors">Physician Registration</Link></li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold">MANDATORY MEDICAL DISCLAIMER: </span>
            This platform provides clinical decision-support and medication safety analysis for informational purposes only. It is not a substitute for clinical judgment, medical diagnosis, or personalized advice from a qualified healthcare professional. Do not discontinue or alter medications without consulting your prescribing physician or pharmacist.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs font-mono text-slate-400">
          <p>© 2026 MedSafe AI • SVNIT WIE Hackathon Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-500">
              <Lock className="w-3.5 h-3.5" /> HIPAA / CDSCO Compliant Data Abstraction
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
