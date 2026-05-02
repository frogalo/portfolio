"use client";

import { useState } from "react";
import EducationForm from "./EducationForm";
import { deleteEducation, toggleEducationVisibility } from "./actions";

interface EducationAdminClientProps {
  initialEntries: any[];
  dbOnline: boolean;
  dbError: string | null;
}

export default function EducationAdminClient({ initialEntries, dbOnline, dbError }: EducationAdminClientProps) {
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);

  const handleEdit = (entry: any) => {
    setSelectedEntry(entry);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {dbError && (
        <div className="flex items-center gap-4 px-5 py-3 rounded-xl border bg-error/10 border-error/20 font-mono text-sm text-error">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error" />
          </span>
          <span className="text-[10px] uppercase tracking-widest font-bold">DATABASE_OFFLINE</span>
          <span className="text-[11px] opacity-70 flex-1">{dbError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24">
            <div className="mb-8">
              <h1 className="text-4xl font-headline font-black text-on-surface tracking-tighter mb-2">
                Academy Archive
              </h1>
              <p className="text-on-surface-variant font-mono text-sm">
                {selectedEntry ? `Refining credentials: ${selectedEntry.universityEn}` : "Archiving new academic milestone..."}
              </p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 shadow-2xl relative overflow-hidden transition-colors duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-accent">school</span>
              </div>
              <EducationForm
                disabled={!dbOnline}
                initialData={selectedEntry}
                onClearAction={() => setSelectedEntry(null)}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xs font-mono text-on-surface-variant uppercase tracking-widest opacity-60">
              Education_Knowledge_Base
            </h2>
            <div className="text-xs font-mono text-on-surface-variant opacity-60">
              Count: {initialEntries.length.toString().padStart(2, "0")}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {initialEntries.map((entry: any) => {
              const isSelected = selectedEntry?.id === entry.id;

              return (
                <div
                  key={entry.id}
                  onClick={() => handleEdit(entry)}
                  className={`bg-surface-container p-6 rounded-xl border transition-all group flex gap-6 items-start duration-300 cursor-pointer ${
                    isSelected ? "border-accent ring-1 ring-accent shadow-lg shadow-accent/5" : "border-outline-variant/10 hover:border-accent/40"
                  }`}
                >
                  <div className="w-16 h-16 bg-surface-container-lowest rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant/20 flex items-center justify-center p-2">
                    {entry.logo ? (
                      <img src={entry.logo} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" alt={entry.universityEn} />
                    ) : (
                      <span className="material-symbols-outlined text-accent opacity-30">school</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-headline font-bold transition-colors ${isSelected ? "text-accent" : "text-on-surface"}`}>
                      {entry.universityEn}
                    </h3>
                    <div className="mt-2">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${
                        entry.visible
                          ? "border-accent/30 bg-accent/10 text-accent"
                          : "border-outline-variant/30 bg-surface-container-high text-on-surface-variant"
                      }`}>
                        {entry.visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-mono text-on-surface-variant">{entry.degreeEn}</p>
                      <p className="text-[10px] font-mono text-on-surface-variant opacity-40">{entry.period}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                    <form action={async () => {
                      await toggleEducationVisibility(entry.id, !entry.visible);
                      if (isSelected) {
                        setSelectedEntry({ ...entry, visible: !entry.visible });
                      }
                    }}>
                      <button className={`p-2 transition-colors ${entry.visible ? "text-accent hover:text-on-surface" : "text-on-surface-variant hover:text-accent"}`}>
                        <span className="material-symbols-outlined text-sm">
                          {entry.visible ? "visibility" : "visibility_off"}
                        </span>
                      </button>
                    </form>
                    <button
                      onClick={() => handleEdit(entry)}
                      className={`p-2 transition-colors ${isSelected ? "text-accent" : "text-on-surface-variant hover:text-accent"}`}
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <form action={async () => {
                      if (confirm("Permanently archive-delete this record?")) {
                        await deleteEducation(entry.id);
                        if (isSelected) setSelectedEntry(null);
                      }
                    }}>
                      <button className="p-2 text-on-surface-variant hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}

            {initialEntries.length === 0 && (
              <div className="text-center py-20 border border-dashed border-outline-variant/20 rounded-xl">
                <p className="text-on-surface-variant font-mono text-sm opacity-40">
                  {dbOnline ? "No records found in academic buffer." : "DB offline; connect database to view knowledge base."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
