'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Activity, Pill, HeartPulse, ScanLine, FileText, 
  CheckCircle2, AlertTriangle, ArrowRight, Stethoscope, Sparkles, 
  Layers, Lock, Database, Search, Cpu, FileCheck, Eye, RefreshCw, Zap
} from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { BentoCard } from '@/components/ui/BentoCard';
import { TactileButton } from '@/components/ui/TactileButton';
import { TactileBadge } from '@/components/ui/TactileBadge';
import { CommandPaletteModal } from '@/components/modals/CommandPaletteModal';

export default function LandingPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const workflowSteps = [
    {
      num: '01',
      title: 'Prescription Ingestion',
      subtitle: 'Image / PDF / Camera / Manual',
      description: 'Upload handwritten or printed prescriptions (JPG, PNG, PDF), scan medicine packaging via camera, or search the drug database manually.',
      icon: ScanLine,
      badge: 'Input Pipeline'
    },
    {
      num: '02',
      title: 'Image Pre-processing & OCR',
      subtitle: 'Bilateral Denoising & Tesseract Engine',
      description: 'Automatic deskewing, Otsu contrast enhancement, and neural OCR character recognition convert raw imagery into clean structured text.',
      icon: Cpu,
      badge: 'Pre-Processing'
    },
    {
      num: '03',
      title: 'RxNorm Normalization',
      subtitle: 'Entity Extraction & RxCUI Mapping',
      description: 'Named entity recognition extracts brand names and maps them to canonical generic active ingredients with RxNorm IDs and standard dosage forms.',
      icon: Pill,
      badge: 'Knowledge Standard'
    },
    {
      num: '04',
      title: 'Clinical Interaction Matrix',
      subtitle: 'Pairwise Rules & Contraindication Check',
      description: 'Evaluates drug-drug combinations, patient ICD-10 medical history, allergy cross-reactivity, and FDA black-box warnings.',
      icon: Layers,
      badge: 'Safety Engine'
    },
    {
      num: '05',
      title: 'AI Reasoning & Safe Gatekeeper',
      subtitle: 'Context Synthesis & Anti-Hallucination',
      description: 'AI reasoning layer reviews clinical evidence, calculates overall risk scores, and strictly checks safety gatekeeper criteria before reporting.',
      icon: Sparkles,
      badge: 'Decision Core'
    },
    {
      num: '06',
      title: 'Dual Recipient Reports',
      subtitle: 'Patient Guidance + Doctor Clinical Report',
      description: 'Generates plain-language action plans for patients and detailed pharmacological evidence dossiers with monitoring suggestions for doctors.',
      icon: FileCheck,
      badge: 'Output Synthesis'
    }
  ];

  const features = [
    {
      title: 'Multi-Format Prescription OCR',
      desc: 'Neural OCR extracts handwritten and printed prescriptions with noise filtering and manual verification controls.',
      icon: FileText
    },
    {
      title: 'RxNorm Standard Normalization',
      desc: 'Translates brand trade names to standardized RxCUI codes, ATC classification, and canonical formulations.',
      icon: Pill
    },
    {
      title: 'Pairwise Drug-Drug Interactions',
      desc: 'Comprehensive interaction matrix detecting pharmacokinetic and pharmacodynamic synergistic risks.',
      icon: Layers
    },
    {
      title: 'ICD-10 Contraindication Checking',
      desc: 'Cross-checks patient medical conditions against absolute and relative clinical contraindications.',
      icon: HeartPulse
    },
    {
      title: 'Drug Avoidance & Alternatives',
      desc: 'Automatically identifies unsafe medications and proposes clinically approved safer alternatives.',
      icon: ShieldCheck
    },
    {
      title: 'Allergy Registry Cross-Screening',
      desc: 'Protects patients against anaphylactic and hypersensitivity triggers across active pharmacological classes.',
      icon: AlertTriangle
    },
    {
      title: 'AI Safety Gatekeeper',
      desc: 'Prevents clinical hallucinations by validating all decisions against structured evidence sources.',
      icon: Sparkles
    },
    {
      title: 'Doctor & Patient Dual Reports',
      desc: 'Provides simplified guidance for patients and in-depth pharmacological dossiers with citations for clinicians.',
      icon: FileCheck
    },
    {
      title: 'DigiLocker & ABHA Integration',
      desc: 'Seamlessly link government verified health IDs to import digital prescriptions securely.',
      icon: Lock
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCommandPalette={() => setIsSearchOpen(true)} />
      <CommandPaletteModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden border-b border-slate-200/80 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-6 relative z-10">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="text-xs font-mono font-semibold text-blue-700">
              SVNIT WIE Hackathon 2026 • Medication Safety Architecture
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl font-sans leading-[1.15]">
            Smarter Medication Safety <br className="hidden sm:inline" />
            with <span className="text-[#2563EB]">AI Clinical Intelligence</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 font-mono max-w-2xl leading-relaxed">
            Instantly ingest prescriptions via OCR, normalize medications via RxNorm, evaluate multi-drug interaction matrices, and generate verified safety reports for patients & doctors.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/signup">
              <TactileButton variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Get Started Free
              </TactileButton>
            </Link>
            <Link href="/login">
              <TactileButton variant="secondary" size="lg" leftIcon={<Lock className="w-4 h-4" />}>
                Sign In to Portal
              </TactileButton>
            </Link>
            <Link href="/patient/analysis">
              <TactileButton variant="outline" size="lg" leftIcon={<Zap className="w-4 h-4 text-amber-500" />}>
                Test Live Safety Engine
              </TactileButton>
            </Link>
          </div>

          {/* Quick Demo Preview Card */}
          <div className="w-full max-w-4xl mt-8 p-1.5 rounded-2xl bg-slate-200/80 shadow-2xl border border-slate-300">
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 text-left shadow-xs flex flex-col gap-4">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-700 ml-2">
                    LIVE CLINICAL EVALUATION: Warfarin 5mg + Ibuprofen 400mg
                  </span>
                </div>
                <TactileBadge variant="red" dot size="sm">Major Interaction Flagged</TactileBadge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Compound 1</span>
                  <span className="font-bold text-slate-900 text-sm">Warfarin 5mg</span>
                  <span className="text-slate-500 block mt-0.5">RxCUI: 11289 • Anticoagulant</span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Compound 2</span>
                  <span className="font-bold text-slate-900 text-sm">Ibuprofen 400mg</span>
                  <span className="text-slate-500 block mt-0.5">RxCUI: 5640 • NSAID</span>
                </div>

                <div className="p-3.5 rounded-lg bg-red-50/80 border border-red-200 text-xs font-mono text-red-900">
                  <span className="text-red-600 block text-[10px] uppercase font-bold">Risk Assessment</span>
                  <span className="font-bold text-red-700 text-sm">Synergistic Bleeding Risk</span>
                  <span className="text-red-600 block mt-0.5">Switch to Acetaminophen</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Validated via FDA Drug Safety Communication & CHEST Antithrombotic Guidelines
                </span>
                <Link href="/patient/analysis" className="text-[#2563EB] hover:underline font-bold">
                  Run Full Analysis →
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ARCHITECTURE WORKFLOW STEPPER */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <TactileBadge variant="blue">End-to-End SVNIT Workflow</TactileBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
            How the Safety Architecture Operates
          </h2>
          <p className="text-sm font-mono text-slate-500 max-w-xl">
            From optical prescription ingestion to structured clinical reasoning and multi-stakeholder report generation.
          </p>
        </div>

        {/* Stepper Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`relative bg-white rounded-xl border p-6 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-md'
                    : 'border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                    STEP {step.num}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-1">{step.title}</h3>
                <p className="text-xs text-[#2563EB] font-mono font-semibold mb-2">{step.subtitle}</p>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section id="features" className="py-20 bg-slate-100/60 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <TactileBadge variant="teal">Comprehensive Capabilities</TactileBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
              Clinical-Grade Medication Protection
            </h2>
            <p className="text-sm font-mono text-slate-500 max-w-xl">
              Engineered with zero tolerance for hallucinations, powered by verified clinical databases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <BentoCard
                  key={i}
                  title={f.title}
                  icon={<Icon className="w-5 h-5" />}
                  hoverEffect
                >
                  <p className="text-xs text-slate-600 font-mono leading-relaxed mt-2">
                    {f.desc}
                  </p>
                </BentoCard>
              );
            })}
          </div>

        </div>
      </section>

      {/* TWO WORKSPACES: PATIENT VS DOCTOR */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Patient Card */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-md flex flex-col justify-between gap-6 relative overflow-hidden">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <TactileBadge variant="blue">For Patients & Families</TactileBadge>
                <Pill className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Personal Health & Safety Hub</h3>
              <p className="text-xs font-mono text-slate-600 leading-relaxed">
                Scan your prescriptions, track active daily dosages, understand food precautions in simple everyday language, and receive instant alerts when combining unsafe pain relievers with your medications.
              </p>
              <ul className="space-y-2 text-xs font-mono text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Prescription OCR & Easy Confirmation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Medical History & Allergies Tracker
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Plain English Patient Safety Summaries
                </li>
              </ul>
            </div>

            <Link href="/patient/dashboard">
              <TactileButton variant="primary" size="md" className="w-full">
                Open Patient Portal →
              </TactileButton>
            </Link>
          </div>

          {/* Doctor Card */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-md flex flex-col justify-between gap-6 relative overflow-hidden">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <TactileBadge variant="teal">For Healthcare Professionals</TactileBadge>
                <Stethoscope className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Clinician Decision Workbench</h3>
              <p className="text-xs font-mono text-slate-600 leading-relaxed">
                Deep pharmacological analysis, ICD-10 contraindication matching, CPIC guideline references, patient longitudinal history review, and exportable clinical decision support dossiers.
              </p>
              <ul className="space-y-2 text-xs font-mono text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  Full Patient 360 & Longitudinal Records
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  Pharmacodynamic / Pharmacokinetic Cross-Matrix
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  Printable Clinician Dossiers & Audit Trails
                </li>
              </ul>
            </div>

            <Link href="/doctor/dashboard">
              <TactileButton variant="success" size="md" className="w-full">
                Open Doctor Workbench →
              </TactileButton>
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
