'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Sidebar } from '@/components/navigation/Sidebar';
import { CommandPaletteModal } from '@/components/modals/CommandPaletteModal';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar
        onOpenCommandPalette={() => setIsCommandOpen(true)}
      />
      <CommandPaletteModal isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar role="doctor" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
