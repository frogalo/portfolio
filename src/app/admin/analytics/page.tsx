"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimePoint {
  date: string;
  views: number;
}

interface ContentItem {
  contentType: string;
  contentId: string;
  contentName: string;
  clicks: number;
}

interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  totalClicks: number;
  dailyViews: TimePoint[];
  monthlyViews: TimePoint[];
  topContent: ContentItem[];
}

// ─── Mini bar-chart renderer (no external lib needed) ─────────────────────────

function BarChart({
  data,
  color = "primary",
}: {
  data: TimePoint[];
  color?: string;
}) {
  if (!data.length) return <p className="text-on-surface-variant font-mono text-xs text-center py-8">No data yet</p>;

  const max = Math.max(...data.map((d) => d.views), 1);

  const colorClass =
    color === "secondary"
      ? "bg-secondary"
      : color === "tertiary"
      ? "bg-tertiary"
      : "bg-primary";

  const hoverClass =
    color === "secondary"
      ? "group-hover:bg-secondary/80"
      : color === "tertiary"
      ? "group-hover:bg-tertiary/80"
      : "group-hover:bg-primary/80";

  return (
    <div className="flex items-end gap-[2px] h-40 w-full overflow-x-auto pb-1 scrollbar-thin">
      {data.map((d, i) => {
        const value = d.views;
        const heightPct = (value / max) * 100;
        const label = d.date;
        // Show abbreviated label: day number or month "MM"
        const shortLabel = label.length === 10
          ? label.slice(8) // day "DD"
          : label.slice(5); // month "MM"

        return (
          <div
            key={i}
            className="group flex flex-col items-center gap-1 flex-1 min-w-[14px] relative"
            title={`${label}: ${value}`}
          >
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface font-mono text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 border border-outline-variant/20 shadow-lg transition-opacity">
              {label}: <span className="text-primary font-bold">{value}</span>
            </div>
            {/* Bar */}
            <div
              className={`w-full rounded-t-sm transition-all duration-300 ${colorClass} ${hoverClass} opacity-80 group-hover:opacity-100`}
              style={{ height: `${Math.max(heightPct, value > 0 ? 4 : 1)}%` }}
            />
            <span className="text-[8px] font-mono text-on-surface-variant opacity-60 select-none">
              {shortLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Content-type badge ───────────────────────────────────────────────────────

function TypeBadge({ type }: { type: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    project: { label: "Project", cls: "text-primary bg-primary/10 border-primary/20" },
    experience: { label: "Experience", cls: "text-secondary bg-secondary/10 border-secondary/20" },
    education: { label: "Education", cls: "text-tertiary bg-tertiary/10 border-tertiary/20" },
  };
  const config = map[type] ?? { label: type, cls: "text-on-surface-variant bg-surface-container border-outline-variant" };
  return (
    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${config.cls}`}>
      {config.label}
    </span>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon, sub }: { label: string; value: number | string; icon: string; sub?: string }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5 flex items-center gap-4 hover:border-primary/20 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-primary">{icon}</span>
      </div>
      <div>
        <p className="text-xs font-mono text-on-surface-variant uppercase tracking-widest opacity-70">{label}</p>
        <p className="text-3xl font-black font-headline text-on-surface tracking-tight leading-none mt-0.5">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        {sub && <p className="text-xs font-mono text-on-surface-variant mt-1">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const { status } = useSession();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeChart, setActiveChart] = useState<"daily" | "monthly">("daily");

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load analytics data.");
        setLoading(false);
      });
  }, [status]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-32 text-error font-mono text-sm">{error ?? "Unknown error"}</div>
    );
  }

  const chartData = activeChart === "daily" ? data.dailyViews : data.monthlyViews;
  const chartColor = activeChart === "daily" ? "primary" : "secondary";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-headline font-black text-on-surface tracking-tighter">
          Analytics
        </h1>
        <p className="text-on-surface-variant font-mono text-xs mt-1 uppercase tracking-widest opacity-60">
          Visitor &amp; engagement metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Page Views" value={data.totalViews} icon="bar_chart" />
        <StatCard label="Views Today" value={data.todayViews} icon="today" sub="Since midnight" />
        <StatCard label="Content Clicks" value={data.totalClicks} icon="ads_click" sub="Projects · Experience · Education" />
      </div>

      {/* Traffic Graph */}
      <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-headline font-bold text-on-surface text-lg tracking-tight">
              {activeChart === "daily" ? "Daily Traffic" : "Monthly Traffic"}
            </h2>
            <p className="text-xs font-mono text-on-surface-variant opacity-60 mt-0.5">
              {activeChart === "daily" ? "Last 30 days" : "Last 12 months"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveChart("daily")}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                activeChart === "daily"
                  ? "bg-primary text-white border-primary"
                  : "border-outline-variant/20 text-on-surface-variant hover:border-primary/30 hover:text-primary"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setActiveChart("monthly")}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                activeChart === "monthly"
                  ? "bg-secondary text-white border-secondary"
                  : "border-outline-variant/20 text-on-surface-variant hover:border-secondary/30 hover:text-secondary"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <BarChart data={chartData} color={chartColor} />
      </div>

      {/* Top Clicked Content */}
      <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6">
        <h2 className="font-headline font-bold text-on-surface text-lg tracking-tight mb-4">
          Top Clicked Content
        </h2>
        {data.topContent.length === 0 ? (
          <p className="text-on-surface-variant font-mono text-xs text-center py-8">
            No content clicks recorded yet.
          </p>
        ) : (
          <div className="space-y-3">
            {data.topContent.map((item, i) => {
              const pct = (item.clicks / (data.topContent[0]?.clicks || 1)) * 100;
              return (
                <div key={item.contentId} className="flex items-center gap-4 group">
                  <span className="text-xs font-mono text-on-surface-variant w-5 text-right opacity-50 shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-on-surface truncate">
                        {item.contentName}
                      </span>
                      <TypeBadge type={item.contentType} />
                    </div>
                    <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold font-mono text-primary shrink-0">
                    {item.clicks.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
