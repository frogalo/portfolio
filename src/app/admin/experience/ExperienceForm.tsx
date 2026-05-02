"use client";

import { useRef, useState, useTransition, useEffect } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import FormJsonImporter, { normalizeJsonValue } from "@/components/admin/FormJsonImporter";
import { setFormFieldValue } from "@/components/admin/formFields";
import { saveExperience } from "./actions";

interface ExperienceFormProps {
  disabled?: boolean;
  initialData?: any;
  onClearAction?: () => void;
}

interface ExperienceImportEntry {
  companyEn?: unknown;
  companyPl?: unknown;
  roleTitleEn?: unknown;
  roleTitlePl?: unknown;
  rolePeriod?: unknown;
  skills?: unknown;
  responsibilitiesEn?: unknown;
  responsibilitiesPl?: unknown;
}

export default function ExperienceForm({ disabled, initialData, onClearAction }: ExperienceFormProps) {
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
      await saveExperience(fd);
      if (!initialData) formRef.current?.reset();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (onClearAction && initialData) onClearAction();
    });
  };

  const roleEn = initialData?.rolesEn ? (typeof initialData.rolesEn === 'string' ? JSON.parse(initialData.rolesEn)[0] : initialData.rolesEn[0]) : null;
  const rolePl = initialData?.rolesPl ? (typeof initialData.rolesPl === 'string' ? JSON.parse(initialData.rolesPl)[0] : initialData.rolesPl[0]) : null;

  const applyImportedValues = (entry: ExperienceImportEntry) => {
    if (!formRef.current) {
      return;
    }

    setFormFieldValue(formRef.current, "companyEn", normalizeJsonValue(entry.companyEn));
    setFormFieldValue(formRef.current, "companyPl", normalizeJsonValue(entry.companyPl));
    setFormFieldValue(formRef.current, "roleTitleEn", normalizeJsonValue(entry.roleTitleEn));
    setFormFieldValue(formRef.current, "roleTitlePl", normalizeJsonValue(entry.roleTitlePl));
    setFormFieldValue(formRef.current, "rolePeriod", normalizeJsonValue(entry.rolePeriod));
    setFormFieldValue(formRef.current, "skills", normalizeJsonValue(entry.skills));
    setFormFieldValue(formRef.current, "responsibilitiesEn", normalizeJsonValue(entry.responsibilitiesEn));
    setFormFieldValue(formRef.current, "responsibilitiesPl", normalizeJsonValue(entry.responsibilitiesPl));
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
        <FormJsonImporter<ExperienceImportEntry>
          accent="secondary"
          sectionKey="experience"
          onApply={applyImportedValues}
        />
        {/* Common Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-1 ml-1">
                Company_Name_EN
              </label>
              <input
                name="companyEn"
                defaultValue={initialData?.companyEn || ""}
                className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 text-on-surface py-3 px-4 transition-all placeholder:text-on-surface-variant/30 font-headline text-lg"
                placeholder="Nexus Systems"
                type="text"
                required
              />
            </div>
            <div className="group">
              <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-1 ml-1">
                Company_Name_PL
              </label>
              <input
                name="companyPl"
                defaultValue={initialData?.companyPl || ""}
                className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 text-on-surface py-3 px-4 transition-all placeholder:text-on-surface-variant/30 font-headline text-lg"
                placeholder="Systemy Nexus"
                type="text"
                required
              />
            </div>
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-1 ml-1">
              Time_Vector (Shared)
            </label>
            <input
              name="rolePeriod"
              defaultValue={roleEn?.period || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 text-on-surface py-3 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Jan 2022 — Present"
              type="text"
              required
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-1 ml-1">
              Skills_Aggregator (Shared)
            </label>
            <input
              name="skills"
              defaultValue={initialData?.skills || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 text-on-surface py-3 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Leadership, Cloud Ops, Go"
              type="text"
            />
          </div>
        </div>

        {/* English Role */}
        <div className="space-y-4 p-4 border border-outline-variant/20 rounded-xl bg-surface-container-lowest/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold font-mono text-secondary bg-secondary/10 px-2 py-0.5 rounded">ENGLISH</span>
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-1 ml-1">
              Role_Title_EN
            </label>
            <input
              name="roleTitleEn"
              defaultValue={roleEn?.title || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Senior Technical Lead"
              type="text"
              required
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-1 ml-1">
              Responsibilities_EN
            </label>
            <textarea
              name="responsibilitiesEn"
              defaultValue={roleEn?.responsibilities?.join('\n') || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="One per line..."
              rows={4}
            />
          </div>
        </div>

        {/* Polish Role */}
        <div className="space-y-4 p-4 border border-outline-variant/20 rounded-xl bg-surface-container-lowest/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold font-mono text-secondary bg-secondary/10 px-2 py-0.5 rounded">POLISH</span>
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-1 ml-1">
              Role_Title_PL
            </label>
            <input
              name="roleTitlePl"
              defaultValue={rolePl?.title || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Starszy Lider Techniczny"
              type="text"
              required
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-1 ml-1">
              Responsibilities_PL
            </label>
            <textarea
              name="responsibilitiesPl"
              defaultValue={rolePl?.responsibilities?.join('\n') || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Jeden wiersz - jeden punkt..."
              rows={4}
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div className="group">
          <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-2 ml-1">
            Company_Logo
          </label>
          <ImageUploader 
            name="logo" 
            multiple={false} 
            accent="secondary" 
            initialPaths={initialData?.logo ? [initialData.logo] : []} 
          />
        </div>
      </div>

      {success && (
        <p className="text-xs font-mono text-secondary bg-secondary/10 px-3 py-2 rounded-lg text-center">
          ✓ Experience {initialData ? "updated" : "committed"} successfully
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
          className={`${initialData ? 'flex-[2]' : 'w-full'} py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-40`}
          type="submit"
          disabled={disabled || isPending}
        >
          <span className="material-symbols-outlined">{isPending ? "hourglass_empty" : "save"}</span>
          <span>{isPending ? "SAVING..." : (initialData ? "UPDATE_ENTRY" : "EXECUTE_COMMIT")}</span>
        </button>
      </div>
    </form>
  );
}
