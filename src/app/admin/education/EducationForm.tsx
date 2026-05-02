"use client";

import { useRef, useState, useTransition, useEffect } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import { saveEducation } from "./actions";

interface EducationFormProps {
  disabled?: boolean;
  initialData?: any;
  onClearAction?: () => void;
}

export default function EducationForm({ disabled, initialData, onClearAction }: EducationFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (formRef.current) formRef.current.reset();
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveEducation(fd);
      if (!initialData) formRef.current?.reset();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (onClearAction && initialData) onClearAction();
    });
  };

  return (
    <form 
      key={initialData?.id || "new"}
      ref={formRef} 
      onSubmit={handleSubmit} 
      className="space-y-6 relative z-10"
    >
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

      <div className="space-y-6">
        {/* Common Fields */}
        <div className="space-y-4">
          <div className="group">
            <label className="block text-[10px] font-mono text-accent uppercase tracking-widest mb-1 ml-1">
              University_Node
            </label>
            <input
              name="university"
              defaultValue={initialData?.university || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-accent focus:ring-0 text-on-surface py-3 px-4 transition-all placeholder:text-on-surface-variant/30 font-headline text-lg"
              placeholder="Politechnika Warszawska"
              type="text"
              required
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-accent uppercase tracking-widest mb-1 ml-1">
              Duration_Period
            </label>
            <input
              name="period"
              defaultValue={initialData?.period || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-accent focus:ring-0 text-on-surface py-3 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="2018 — 2022"
              type="text"
              required
            />
          </div>
        </div>

        {/* English Content */}
        <div className="space-y-4 p-4 border border-outline-variant/20 rounded-xl bg-surface-container-lowest/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">ENGLISH</span>
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-accent uppercase tracking-widest mb-1 ml-1">
              Degree_EN
            </label>
            <input
              name="degreeEn"
              defaultValue={initialData?.degreeEn || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-accent focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Bachelor of Science in Computer Science"
              type="text"
              required
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-accent uppercase tracking-widest mb-1 ml-1">
              Key_Skills_EN
            </label>
            <input
              name="skillsEn"
              defaultValue={initialData?.skillsEn || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-accent focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Algorithms, Distributed Systems..."
              type="text"
            />
          </div>
        </div>

        {/* Polish Content */}
        <div className="space-y-4 p-4 border border-outline-variant/20 rounded-xl bg-surface-container-lowest/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">POLISH</span>
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-accent uppercase tracking-widest mb-1 ml-1">
              Degree_PL
            </label>
            <input
              name="degreePl"
              defaultValue={initialData?.degreePl || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-accent focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Inżynier Informatyki"
              type="text"
              required
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-accent uppercase tracking-widest mb-1 ml-1">
              Key_Skills_PL
            </label>
            <input
              name="skillsPl"
              defaultValue={initialData?.skillsPl || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-accent focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Algorytmy, Systemy Rozproszone..."
              type="text"
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div className="group">
          <label className="block text-[10px] font-mono text-accent uppercase tracking-widest mb-2 ml-1">
            University_Seal
          </label>
          <ImageUploader 
            name="logo" 
            multiple={false} 
            accent="tertiary" 
            initialPaths={initialData?.logo ? [initialData.logo] : []} 
          />
        </div>
      </div>

      {success && (
        <p className="text-xs font-mono text-accent bg-accent/10 px-3 py-2 rounded-lg text-center">
          ✓ Education {initialData ? "updated" : "committed"} successfully
        </p>
      )}

      <div className="flex gap-3">
        {initialData && (
          <button
            type="button"
            onClick={onClearAction}
            className="flex-1 py-4 bg-surface-container-high text-on-surface font-bold rounded-lg hover:bg-surface-container-highest transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">close</span>
            <span>CANCEL</span>
          </button>
        )}
        <button
          className={`${initialData ? 'flex-[2]' : 'w-full'} py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-lg shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-40`}
          type="submit"
          disabled={disabled || isPending}
        >
          <span className="material-symbols-outlined">{isPending ? "hourglass_empty" : "save"}</span>
          <span>{isPending ? "SAVING..." : (initialData ? "UPDATE_DEGREE" : "EXECUTE_COMMIT")}</span>
        </button>
      </div>
    </form>
  );
}
