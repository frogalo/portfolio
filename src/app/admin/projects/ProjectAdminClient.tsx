"use client";

import { useState } from "react";
import ProjectForm from "./ProjectForm";
import { deleteProject, toggleProjectVisibility } from "./actions";

interface ProjectAdminClientProps {
  initialProjects: any[];
  dbOnline: boolean;
  dbError: string | null;
}

export default function ProjectAdminClient({ initialProjects, dbOnline, dbError }: ProjectAdminClientProps) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const handleEdit = (project: any) => {
    setSelectedProject(project);
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
                Project Forge
              </h1>
              <p className="text-on-surface-variant font-mono text-sm">
                {selectedProject ? `Updating realization: ${selectedProject.titleEn}` : "Deploying new realization module..."}
              </p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 shadow-2xl relative overflow-hidden transition-colors duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-primary">workspaces</span>
              </div>
              <ProjectForm
                disabled={!dbOnline}
                initialData={selectedProject}
                onClearAction={() => setSelectedProject(null)}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xs font-mono text-on-surface-variant uppercase tracking-widest opacity-60">
              Project_List_Buffer
            </h2>
            <div className="text-xs font-mono text-on-surface-variant opacity-60">
              Count: {initialProjects.length.toString().padStart(2, "0")}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {initialProjects.map((project: any) => {
              let images: string[] = [];
              try {
                images = JSON.parse(project.images) ?? [];
              } catch {}

              const isSelected = selectedProject?.id === project.id;

              return (
                <div
                  key={project.id}
                  onClick={() => handleEdit(project)}
                  className={`bg-surface-container p-6 rounded-xl border transition-all group flex gap-6 items-start duration-300 cursor-pointer ${
                    isSelected ? "border-primary ring-1 ring-primary shadow-lg shadow-primary/5" : "border-outline-variant/10 hover:border-primary/40"
                  }`}
                >
                  <div className="w-24 h-16 bg-surface-container-lowest rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant/20 flex items-center justify-center">
                    {images[0] ? (
                      <img src={images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" alt={project.titleEn} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant opacity-30">
                        <span className="material-symbols-outlined">image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`text-xl font-headline font-bold tracking-tight transition-colors ${isSelected ? "text-primary" : "text-on-surface"}`}>
                          {project.titleEn}
                        </h3>
                        <p className="text-[10px] text-on-surface-variant font-mono opacity-40 mb-1">
                          PL: {project.titlePl}
                        </p>
                        <p className="text-xs text-on-surface-variant uppercase font-mono opacity-60">
                          {project.categoryEn} | {project.year}
                        </p>
                        <div className="mt-2">
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${
                            project.visible
                              ? "border-primary/30 bg-primary/10 text-primary"
                              : "border-outline-variant/30 bg-surface-container-high text-on-surface-variant"
                          }`}>
                            {project.visible ? "Visible" : "Hidden"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {(() => {
                        try {
                          return JSON.parse(project.tech);
                        } catch {
                          return [];
                        }
                      })().map((t: any, idx: number) => (
                        <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant rounded border border-outline-variant/10">
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                    <form action={async () => {
                      await toggleProjectVisibility(project.id, !project.visible);
                      if (isSelected) {
                        setSelectedProject({ ...project, visible: !project.visible });
                      }
                    }}>
                      <button className={`p-2 transition-colors ${project.visible ? "text-primary hover:text-on-surface" : "text-on-surface-variant hover:text-primary"}`}>
                        <span className="material-symbols-outlined text-sm">
                          {project.visible ? "visibility" : "visibility_off"}
                        </span>
                      </button>
                    </form>
                    <button
                      onClick={() => handleEdit(project)}
                      className={`p-2 transition-colors ${isSelected ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <form action={async () => {
                      if (confirm("Permanently delete this project?")) {
                        await deleteProject(project.id);
                        if (isSelected) setSelectedProject(null);
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

            {initialProjects.length === 0 && (
              <div className="text-center py-20 border border-dashed border-outline-variant/20 rounded-xl">
                <p className="text-on-surface-variant font-mono text-sm opacity-40">
                  {dbOnline ? "No entries found in buffer." : "DB offline; connect database to view entries."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
