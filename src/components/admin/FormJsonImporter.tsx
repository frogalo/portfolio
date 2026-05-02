"use client";

import { useState } from "react";

interface FormJsonImporterProps<TEntry extends object> {
  accent?: "primary" | "secondary" | "tertiary";
  sectionKey: "projects" | "experience" | "education";
  onApply: (entry: TEntry) => void;
}

const accentClasses = {
  primary: {
    border: "border-primary/20",
    button: "from-primary to-primary-container",
    text: "text-primary",
    panel: "bg-primary/5",
  },
  secondary: {
    border: "border-secondary/20",
    button: "from-primary to-secondary",
    text: "text-secondary",
    panel: "bg-secondary/5",
  },
  tertiary: {
    border: "border-tertiary/20",
    button: "from-primary to-accent",
    text: "text-accent",
    panel: "bg-accent/5",
  },
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function extractEntry<TEntry extends object>(
  parsed: unknown,
  sectionKey: FormJsonImporterProps<TEntry>["sectionKey"]
): TEntry {
  if (isRecord(parsed) && sectionKey in parsed) {
    const sectionValue = parsed[sectionKey];
    if (Array.isArray(sectionValue) && sectionValue.length > 0 && isRecord(sectionValue[0])) {
      return sectionValue[0] as TEntry;
    }
    throw new Error(`JSON field "${sectionKey}" must contain at least one object.`);
  }

  if (isRecord(parsed)) {
    return parsed as TEntry;
  }

  throw new Error("Paste either a single object or a wrapper object with the matching section.");
}

export function normalizeJsonValue(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (value == null) {
    return "";
  }

  return String(value);
}

export default function FormJsonImporter<TEntry extends object>({
  accent = "primary",
  sectionKey,
  onApply,
}: FormJsonImporterProps<TEntry>) {
  const [rawJson, setRawJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const classes = accentClasses[accent];

  const handleApply = () => {
    try {
      const parsed = JSON.parse(rawJson);
      const entry = extractEntry<TEntry>(parsed, sectionKey);
      onApply(entry);
      setError(null);
      setIsOpen(false);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Invalid JSON payload.");
    }
  };

  return (
    <div className={`rounded-xl border ${classes.border} ${classes.panel} p-4`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={`text-xs font-mono uppercase tracking-widest ${classes.text}`}>JSON Import</p>
          <p className="text-[11px] font-mono text-on-surface-variant mt-1">
            Paste one entry object. Images are ignored.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`rounded-lg bg-gradient-to-r ${classes.button} px-4 py-2 text-xs font-bold text-white transition-all active:scale-95`}
        >
          {isOpen ? "HIDE" : "PASTE_JSON"}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 space-y-3">
          <textarea
            value={rawJson}
            onChange={(event) => setRawJson(event.target.value)}
            className="min-h-40 w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-4 py-3 font-mono text-xs text-on-surface focus:border-outline-variant/50 focus:ring-0"
            placeholder={`Paste a ${sectionKey} entry object or { "${sectionKey}": [ ... ] }`}
          />
          {error && (
            <p className="rounded-lg bg-error/10 px-3 py-2 text-xs font-mono text-error">{error}</p>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleApply}
              className={`rounded-lg bg-gradient-to-r ${classes.button} px-4 py-2 text-xs font-bold text-white transition-all active:scale-95`}
            >
              APPLY_TO_FORM
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
