"use client";

import { useState, useRef, useCallback } from "react";

interface ImageUploaderProps {
  /** Hidden input name that will carry the JSON array of paths */
  name: string;
  /** Allow multiple images (for projects) or just one (for logos) */
  multiple?: boolean;
  /** Accent color token — matches the page theme */
  accent?: "primary" | "secondary" | "tertiary";
  /** Initial paths already stored in the DB */
  initialPaths?: string[];
}

export default function ImageUploader({
  name,
  multiple = false,
  accent = "primary",
  initialPaths = [],
}: ImageUploaderProps) {
  const [paths, setPaths] = useState<string[]>(initialPaths);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const accentClass = {
    primary: { border: "border-primary", text: "text-primary", bg: "bg-primary/5" },
    secondary: { border: "border-secondary", text: "text-secondary", bg: "bg-secondary/5" },
    tertiary: { border: "border-tertiary", text: "text-tertiary", bg: "bg-tertiary/5" },
  }[accent];

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (!multiple && fileArray.length > 1) {
      setError("Only one image allowed.");
      return;
    }

    setUploading(true);
    setError(null);

    const fd = new FormData();
    fileArray.forEach((f) => fd.append("files", f));

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setPaths((prev) => (multiple ? [...prev, ...json.paths] : json.paths));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }, [multiple]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
    },
    [uploadFiles]
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) uploadFiles(e.target.files);
    },
    [uploadFiles]
  );

  const onPaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData.items;
      const imageFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) imageFiles.push(file);
        }
      }
      if (imageFiles.length > 0) {
        e.preventDefault();
        uploadFiles(imageFiles);
      }
    },
    [uploadFiles]
  );

  const removePath = (idx: number) => {
    setPaths((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      {/* Hidden field carries the value to the server action */}
      <input type="hidden" name={name} value={JSON.stringify(paths)} />

      {/* Drop Zone */}
      {(multiple || paths.length === 0) && (
        <div
          tabIndex={0}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 outline-none
            ${dragOver ? `${accentClass.border} ${accentClass.bg}` : "border-outline-variant/30 hover:border-outline-variant/60 focus:border-outline-variant/60"}
            ${uploading ? "opacity-60 pointer-events-none" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onPaste={onPaste}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            className="hidden"
            onChange={onFileChange}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className={`animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 ${accentClass.border}`} />
              <span className={`text-xs font-mono ${accentClass.text}`}>Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 pointer-events-none">
              <span className={`material-symbols-outlined text-3xl ${accentClass.text} opacity-60`}>
                cloud_upload
              </span>
              <p className={`text-xs font-mono ${accentClass.text} opacity-70`}>
                {dragOver ? "Drop to upload" : `Click, drag or paste ${multiple ? "images" : "an image"} here`}
              </p>
              <p className="text-[10px] font-mono text-on-surface-variant opacity-40">
                PNG, JPG, WEBP, SVG · Max 10MB
              </p>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs font-mono text-error bg-error/10 px-3 py-2 rounded-lg">{error}</p>
      )}

      {/* Image Previews */}
      {paths.length > 0 && (
        <div className={`flex flex-wrap gap-2 ${multiple ? "" : ""}`}>
          {paths.map((p, i) => (
            <div key={p} className="relative group rounded-lg overflow-hidden border border-outline-variant/20 w-20 h-20 flex-shrink-0">
              <img src={p} alt={`upload-${i}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePath(i)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <span className="material-symbols-outlined text-white text-base">delete</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
