import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/ToastProvider';

export const metadata: Metadata = {
  title: 'MedSafe AI — Intelligent Medication Safety & Drug Interaction Platform',
  description: 'Production-grade AI-powered drug interaction detection, prescription OCR extraction, contraindication checking, and dual patient/doctor clinical reporting platform for SVNIT WIE Hackathon.',
  keywords: 'medication safety, drug interaction, prescription OCR, RxNorm, contraindications, clinical decision support',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-[#FAFAFA] text-slate-900 flex flex-col relative antialiased selection:bg-blue-100 selection:text-blue-900 font-sans">
        {/* Architectural Blueprint Grid Background Overlay */}
        <div className="fixed inset-0 blueprint-grid pointer-events-none -z-10 opacity-70" />

        <ToastProvider>
          <div className="flex-1 flex flex-col">{children}</div>
        </ToastProvider>
      </body>
    </html>
  );
}
