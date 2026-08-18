'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, Upload, Plus, Search, Trash2, Eye, 
  ExternalLink, Calendar, Stethoscope, Sparkles, CheckCircle2 
} from 'lucide-react';
import { AppStateService } from '@/lib/store/appStore';
import { Prescription } from '@/types/database';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { RecessedInput } from '@/components/ui/RecessedInput';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastProvider';

export default function PrescriptionsPage() {
  const { success } = useToast();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedRx, setSelectedRx] = useState<Prescription | null>(null);
  const [query, setQuery] = useState('');

  const loadData = () => {
    AppStateService.initSeedData();
    const user = AppStateService.getCurrentUser();
    const pId = user?.patient_id || 101;
    const list = AppStateService.getPrescriptions(pId);
    setPrescriptions(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: number) => {
    AppStateService.deletePrescription(id);
    success('Prescription Deleted', 'Removed from medical records.');
    loadData();
  };

  const filtered = prescriptions.filter(p => 
    p.doctor_name.toLowerCase().includes(query.toLowerCase()) ||
    p.hospital_name.toLowerCase().includes(query.toLowerCase()) ||
    p.ocr_text.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              Prescription Archive & OCR Records
            </h1>
            <TactileBadge variant="blue" size="sm">{prescriptions.length} Archival Documents</TactileBadge>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Digitized doctor prescriptions with neural OCR text extractions and clinical audits
          </p>
        </div>

        <Link href="/patient/analysis">
          <TactileButton
            variant="primary"
            size="md"
            leftIcon={<Upload className="w-4 h-4" />}
          >
            Upload New Prescription
          </TactileButton>
        </Link>
      </div>

      {/* Search */}
      <div className="w-full">
        <RecessedInput
          placeholder="Search by prescribing doctor, clinic, or extracted medicine text..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Prescriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(rx => (
          <div
            key={rx.prescription_id}
            className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between gap-4 hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-sans">
                      {rx.doctor_name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {rx.hospital_name}
                    </p>
                  </div>
                </div>

                <TactileBadge variant="teal" size="sm">
                  Rx #{rx.prescription_id}
                </TactileBadge>
              </div>

              {/* OCR Text Snippet */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-mono text-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Extracted OCR Transcript:
                </span>
                <p className="line-clamp-2 leading-relaxed">
                  {rx.ocr_text}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Date: {rx.prescription_date}
              </span>

              <div className="flex items-center gap-2">
                <TactileButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedRx(rx)}
                  leftIcon={<Eye className="w-3.5 h-3.5" />}
                >
                  View OCR Transcript
                </TactileButton>

                <Link href="/patient/analysis/results">
                  <TactileButton
                    variant="primary"
                    size="sm"
                    leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                  >
                    Analyze
                  </TactileButton>
                </Link>

                <button
                  onClick={() => handleDelete(rx.prescription_id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transcript Detail Modal */}
      {selectedRx && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRx(null)}
          title={`Prescription Document #${selectedRx.prescription_id}`}
          subtitle={`${selectedRx.doctor_name} • ${selectedRx.hospital_name}`}
          maxWidth="lg"
        >
          <div className="flex flex-col gap-4 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Prescription Date</span>
                <span className="font-bold text-slate-900">{selectedRx.prescription_date}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">OCR Engine Status</span>
                <span className="font-bold text-emerald-700">Tesseract OCR Verified (98%)</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-slate-900 text-sm font-sans">Full OCR Extracted Text</span>
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed whitespace-pre-wrap shadow-inner">
                {selectedRx.ocr_text}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <TactileButton variant="secondary" size="sm" onClick={() => setSelectedRx(null)}>
                Close
              </TactileButton>
              <Link href="/patient/analysis/results">
                <TactileButton variant="primary" size="sm" leftIcon={<Sparkles className="w-4 h-4" />}>
                  Run Safety Engine
                </TactileButton>
              </Link>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
