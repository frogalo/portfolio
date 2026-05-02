import React from "react";
import prisma, { testDbConnection } from "@/lib/db";

interface DbStats {
  projectsCount: number;
  experienceCount: number;
  educationCount: number;
}

async function getStats(): Promise<{ stats: DbStats; dbOnline: boolean; dbError: string | null }> {
  const dbOnline = await testDbConnection();

  if (!dbOnline) {
    return {
      stats: { projectsCount: 0, experienceCount: 0, educationCount: 0 },
      dbOnline: false,
      dbError: "Cannot reach database. Check DATABASE_URL in .env and ensure the DB server is running.",
    };
  }

  try {
    const [projectsCount, experienceCount, educationCount] = await Promise.all([
      prisma.project.count(),
      prisma.experience.count(),
      prisma.education.count(),
    ]);
    return { stats: { projectsCount, experienceCount, educationCount }, dbOnline: true, dbError: null };
  } catch (err: any) {
    return {
      stats: { projectsCount: 0, experienceCount: 0, educationCount: 0 },
      dbOnline: false,
      dbError: err?.message ?? "Unknown database error.",
    };
  }
}

export default async function AdminDashboard() {
  const { stats, dbOnline, dbError } = await getStats();
  const { projectsCount, experienceCount, educationCount } = stats;

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* ── DB Status Banner ── */}
      <div
        className={`flex items-start gap-4 px-5 py-4 rounded-xl border font-mono text-sm transition-all ${
          dbOnline
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-300"
            : "bg-error/10 border-error/20 text-error"
        }`}
      >
        {/* Pulsing dot */}
        <div className="flex items-center gap-2 mt-0.5 flex-shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                dbOnline ? "bg-emerald-400" : "bg-error"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                dbOnline ? "bg-emerald-400" : "bg-error"
              }`}
            />
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`text-[10px] uppercase tracking-widest font-bold ${dbOnline ? "text-emerald-500" : "text-error"}`}>
              {dbOnline ? "DATABASE_ONLINE" : "DATABASE_OFFLINE"}
            </span>
            <span className="text-[10px] text-on-surface-variant opacity-60">
              {dbOnline ? "PostgreSQL · Prisma v7.7.0 · All systems nominal" : "Connection refused — read-only mode active"}
            </span>
          </div>
          {dbError && (
            <p className="text-[11px] text-error/80 mt-1 break-words">
              ↳ {dbError}
            </p>
          )}
        </div>

        <div className="flex-shrink-0 text-[10px] text-on-surface-variant font-mono self-center opacity-60">
          {new Date().toLocaleTimeString("en-GB", { hour12: false })}
        </div>
      </div>

      {/* ── Page Header ── */}
      <div className="mb-8">
        <h1 className="text-4xl font-headline font-black text-on-surface tracking-tighter mb-2">
          System Dashboard
        </h1>
        <p className="text-on-surface-variant font-mono text-sm">
          {dbOnline
            ? "Monitoring system availability and content metrics..."
            : "Running in offline mode — data unavailable until DB connection restored."}
        </p>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Projects Card */}
        <div className={`p-6 rounded-xl border transition-all group overflow-hidden relative ${
          dbOnline
            ? "bg-surface-container-low border-outline-variant/10 hover:border-primary/30"
            : "bg-surface-container-lowest border-outline-variant/5 opacity-60"
        }`}>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-6xl text-primary">workspaces</span>
          </div>
          <div className="relative z-10">
            <div className="text-xs font-mono text-on-surface-variant uppercase tracking-widest mb-4">Total_Projects</div>
            <div className={`text-5xl font-headline font-black mb-2 ${dbOnline ? "text-primary" : "text-on-surface-variant opacity-40"}`}>
              {dbOnline ? projectsCount.toString().padStart(2, "0") : "--"}
            </div>
            <a href="/admin/projects" className="text-[10px] font-mono text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 group/link">
              MANAGE_ENTRIES
              <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Experience Card */}
        <div className={`p-6 rounded-xl border transition-all group overflow-hidden relative ${
          dbOnline
            ? "bg-surface-container-low border-outline-variant/10 hover:border-secondary/30"
            : "bg-surface-container-lowest border-outline-variant/5 opacity-60"
        }`}>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-6xl text-secondary">work</span>
          </div>
          <div className="relative z-10">
            <div className="text-xs font-mono text-on-surface-variant uppercase tracking-widest mb-4">Work_Experience</div>
            <div className={`text-5xl font-headline font-black mb-2 ${dbOnline ? "text-secondary" : "text-on-surface-variant opacity-40"}`}>
              {dbOnline ? experienceCount.toString().padStart(2, "0") : "--"}
            </div>
            <a href="/admin/experience" className="text-[10px] font-mono text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-1 group/link">
              MANAGE_ENTRIES
              <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Education Card */}
        <div className={`p-6 rounded-xl border transition-all group overflow-hidden relative ${
          dbOnline
            ? "bg-surface-container-low border-outline-variant/10 hover:border-accent/30"
            : "bg-surface-container-lowest border-outline-variant/5 opacity-60"
        }`}>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-6xl text-accent">school</span>
          </div>
          <div className="relative z-10">
            <div className="text-xs font-mono text-on-surface-variant uppercase tracking-widest mb-4">Academic_Nodes</div>
            <div className={`text-5xl font-headline font-black mb-2 ${dbOnline ? "text-accent" : "text-on-surface-variant opacity-40"}`}>
              {dbOnline ? educationCount.toString().padStart(2, "0") : "--"}
            </div>
            <a href="/admin/education" className="text-[10px] font-mono text-on-surface-variant hover:text-accent transition-colors flex items-center gap-1 group/link">
              MANAGE_ENTRIES
              <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

        {/* System Status */}
        <div className="bg-surface-container p-8 rounded-xl border border-outline-variant/10">
          <h3 className="text-xs font-mono text-on-surface-variant uppercase tracking-widest mb-6">System_Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
              <span className="text-sm font-mono text-on-surface-variant">Database_Provider</span>
              <span className={`text-sm font-mono ${dbOnline ? "text-emerald-500" : "text-error"}`}>
                {dbOnline ? "PostgreSQL_Active" : "PostgreSQL_Down"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
              <span className="text-sm font-mono text-on-surface-variant">ORM_Engine</span>
              <span className="text-sm font-mono text-on-surface">Prisma_v7.7.0</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
              <span className="text-sm font-mono text-on-surface-variant">Build_Version</span>
              <span className="text-sm font-mono text-on-surface">v0.6.0-stable</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
              <span className="text-sm font-mono text-on-surface-variant">Data_Mode</span>
              <span className={`text-sm font-mono ${dbOnline ? "text-emerald-500" : "text-accent"}`}>
                {dbOnline ? "Live_DB" : "Fallback_JSON"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-mono text-on-surface-variant">Uptime_Metric</span>
              <span className="text-sm font-mono text-on-surface">99.98%</span>
            </div>
          </div>
        </div>

        {/* Connection Diagnostics */}
        <div className="bg-surface-container p-8 rounded-xl border border-outline-variant/10">
          <h3 className="text-xs font-mono text-on-surface-variant uppercase tracking-widest mb-6">Connection_Diagnostics</h3>
          <div className="space-y-4">
            {[
              {
                label: "DATABASE_URL",
                value: process.env.DATABASE_URL
                  ? `${process.env.DATABASE_URL.substring(0, 30)}...`
                  : "NOT_SET",
                ok: !!process.env.DATABASE_URL,
              },
              {
                label: "DB_Reachable",
                value: dbOnline ? "YES" : "NO",
                ok: dbOnline,
              },
              {
                label: "ORM_Client",
                value: "PrismaClient_v7",
                ok: true,
              },
              {
                label: "Next.js_Runtime",
                value: "Node.js_Server",
                ok: true,
              },
            ].map(({ label, value, ok }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-outline-variant/10 last:border-0">
                <span className="text-sm font-mono text-on-surface-variant">{label}</span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${ok ? "text-emerald-500 bg-emerald-500/10" : "text-error bg-error/10"}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {!dbOnline && (
            <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-[11px] font-mono text-accent leading-relaxed">
                <span className="font-bold">HINT:</span> Ensure DATABASE_URL is set in <code className="bg-accent/20 px-1 rounded">.env</code> and your PostgreSQL instance is running. The portfolio frontend will use JSON fallbacks while offline.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
