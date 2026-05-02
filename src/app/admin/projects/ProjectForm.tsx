"use client";

import { useRef, useState, useTransition, useEffect } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import FormJsonImporter, { normalizeJsonValue } from "@/components/admin/FormJsonImporter";
import { setFormFieldValue } from "@/components/admin/formFields";
import { saveProject } from "./actions";

interface ProjectFormProps {
  disabled?: boolean;
  initialData?: any;
  onClearAction?: () => void;
}

interface ProjectImportEntry {
  titleEn?: unknown;
  titlePl?: unknown;
  descriptionEn?: unknown;
  descriptionPl?: unknown;
  categoryEn?: unknown;
  categoryPl?: unknown;
  year?: unknown;
  detailsEn?: unknown;
  detailsPl?: unknown;
  tech?: unknown;
  websiteUrl?: unknown;
}

export default function ProjectForm({ disabled, initialData, onClearAction }: ProjectFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  // Key state to force re-render when initialData changes, or just reset form
  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveProject(fd);
      if (!initialData) {
        formRef.current?.reset();
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (onClearAction && initialData) {
        onClearAction();
      }
    });
  };

  const techValue = initialData?.tech 
    ? (typeof initialData.tech === 'string' 
        ? JSON.parse(initialData.tech).map((t: any) => t.name).join(', ') 
        : initialData.tech.map((t: any) => t.name).join(', '))
    : "";

  const applyImportedValues = (entry: ProjectImportEntry) => {
    if (!formRef.current) {
      return;
    }

    setFormFieldValue(formRef.current, "titleEn", normalizeJsonValue(entry.titleEn));
    setFormFieldValue(formRef.current, "titlePl", normalizeJsonValue(entry.titlePl));
    setFormFieldValue(formRef.current, "descriptionEn", normalizeJsonValue(entry.descriptionEn));
    setFormFieldValue(formRef.current, "descriptionPl", normalizeJsonValue(entry.descriptionPl));
    setFormFieldValue(formRef.current, "categoryEn", normalizeJsonValue(entry.categoryEn));
    setFormFieldValue(formRef.current, "categoryPl", normalizeJsonValue(entry.categoryPl));
    setFormFieldValue(formRef.current, "year", normalizeJsonValue(entry.year));
    setFormFieldValue(formRef.current, "detailsEn", normalizeJsonValue(entry.detailsEn));
    setFormFieldValue(formRef.current, "detailsPl", normalizeJsonValue(entry.detailsPl));
    setFormFieldValue(formRef.current, "tech", normalizeJsonValue(entry.tech));
    setFormFieldValue(formRef.current, "websiteUrl", normalizeJsonValue(entry.websiteUrl));
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
        <FormJsonImporter<ProjectImportEntry>
          accent="primary"
          sectionKey="projects"
          onApply={applyImportedValues}
        />
        
        {/* Common Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label className="block text-[10px] font-mono text-primary uppercase tracking-widest mb-1 ml-1 opacity-70">
              Year_Stamp
            </label>
            <input
              name="year"
              defaultValue={initialData?.year || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-3 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="2024"
              type="text"
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-primary uppercase tracking-widest mb-1 ml-1 opacity-70">
              Live_URL
            </label>
            <input
              name="websiteUrl"
              defaultValue={initialData?.websiteUrl || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-3 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="https://..."
              type="text"
            />
          </div>
        </div>

        <div className="group">
          <label className="block text-[10px] font-mono text-primary uppercase tracking-widest mb-1 ml-1 opacity-70">
            Tech_Stack (Comma Separated)
          </label>
          <input
            name="tech"
            defaultValue={techValue}
            className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-3 px-4 transition-all placeholder:text-on-surface-variant/30"
            placeholder="React, Tailwind, Prisma"
            type="text"
          />
        </div>

        {/* English Content */}
        <div className="space-y-4 p-4 border border-outline-variant/20 rounded-xl bg-surface-container-lowest/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">ENGLISH</span>
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-primary uppercase tracking-widest mb-1 ml-1 opacity-70">
              Title_EN
            </label>
            <input
              name="titleEn"
              defaultValue={initialData?.titleEn || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30 font-headline text-lg"
              placeholder="Nebula Dashboard"
              type="text"
              required
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-primary uppercase tracking-widest mb-1 ml-1 opacity-70">
              Category_EN
            </label>
            <input
              name="categoryEn"
              defaultValue={initialData?.categoryEn || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Web App"
              type="text"
              required
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-primary uppercase tracking-widest mb-1 ml-1 opacity-70">
              Description_EN
            </label>
            <textarea
              name="descriptionEn"
              defaultValue={initialData?.descriptionEn || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Short summary in English..."
              rows={2}
              required
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-primary uppercase tracking-widest mb-1 ml-1 opacity-70">
              Details_EN
            </label>
            <textarea
              name="detailsEn"
              defaultValue={initialData?.detailsEn || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Detailed explanation..."
              rows={4}
            />
          </div>
        </div>

        {/* Polish Content */}
        <div className="space-y-4 p-4 border border-outline-variant/20 rounded-xl bg-surface-container-lowest/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">POLISH</span>
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-primary uppercase tracking-widest mb-1 ml-1 opacity-70">
              Title_PL
            </label>
            <input
              name="titlePl"
              defaultValue={initialData?.titlePl || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30 font-headline text-lg"
              placeholder="Panel Nebula"
              type="text"
              required
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-primary uppercase tracking-widest mb-1 ml-1 opacity-70">
              Category_PL
            </label>
            <input
              name="categoryPl"
              defaultValue={initialData?.categoryPl || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Aplikacja Webowa"
              type="text"
              required
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-primary uppercase tracking-widest mb-1 ml-1 opacity-70">
              Description_PL
            </label>
            <textarea
              name="descriptionPl"
              defaultValue={initialData?.descriptionPl || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Krótki opis po polsku..."
              rows={2}
              required
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-mono text-primary uppercase tracking-widest mb-1 ml-1 opacity-70">
              Details_PL
            </label>
            <textarea
              name="detailsPl"
              defaultValue={initialData?.detailsPl || ""}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-2 px-4 transition-all placeholder:text-on-surface-variant/30"
              placeholder="Szczegółowy opis..."
              rows={4}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="group">
          <label className="block text-[10px] font-mono text-primary uppercase tracking-widest mb-2 ml-1 opacity-70">
            Image_Manifest
          </label>
          <ImageUploader 
            name="images" 
            multiple 
            accent="primary" 
            initialPaths={initialData?.images ? (typeof initialData.images === 'string' ? JSON.parse(initialData.images) : initialData.images) : []} 
          />
        </div>
      </div>

      {success && (
        <p className="text-xs font-mono text-primary bg-primary/10 px-3 py-2 rounded-lg text-center">
          ✓ Project {initialData ? "updated" : "committed"} successfully
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
          className={`${initialData ? 'flex-[2]' : 'w-full'} py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-40`}
          type="submit"
          disabled={disabled || isPending}
        >
          <span className="material-symbols-outlined">{isPending ? "hourglass_empty" : "save"}</span>
          <span>{isPending ? "SAVING..." : (initialData ? "UPDATE_PROJECT" : "EXECUTE_COMMIT")}</span>
        </button>
      </div>
    </form>
  );
}
