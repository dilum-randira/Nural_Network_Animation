"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
        <Toaster position="top-center" />
      </div>
    </LanguageProvider>
  );
}
