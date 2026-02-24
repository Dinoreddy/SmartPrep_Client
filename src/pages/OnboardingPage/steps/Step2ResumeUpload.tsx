import { useState, useRef } from "react";
import type { DragEvent, ChangeEvent } from "react";

const FILE_ICONS: Record<string, string> = {
  pdf: "picture_as_pdf",
  docx: "description",
  doc: "description",
  txt: "article",
};

function getFileIcon(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return FILE_ICONS[ext] ?? "insert_drive_file";
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface Step2ResumeUploadProps {
  onNext: () => void;
}

export default function Step2ResumeUpload({ onNext }: Step2ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selected: File) => {
    setFile(selected);
    console.log("Resume title:", selected.name);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  const handleRemove = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 flex flex-col items-center text-center">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          Upload your Resume
        </h1>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-sm mx-auto">
          We'll analyze your background to tailor interview questions
          specifically to your experience.
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        id="resume-upload"
        type="file"
        accept=".pdf,.docx,.doc,.txt"
        className="hidden"
        onChange={handleChange}
        aria-label="Upload Resume"
      />

      {file ? (
        /* File preview */
        <div className="w-full border-2 border-indigo-200 bg-indigo-50/40 rounded-2xl p-8 flex flex-col items-center gap-5">
          <div className="size-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <span className="material-symbols-outlined text-4xl">
              {getFileIcon(file.name)}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-gray-900 text-base font-bold break-all">
              {file.name}
            </p>
            <p className="text-gray-400 text-sm">{formatBytes(file.size)}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-5 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-bold hover:border-indigo-300 transition-all shadow-sm"
            >
              Change File
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-5 py-2 rounded-xl border border-red-100 bg-red-50 text-red-500 text-sm font-bold hover:bg-red-100 transition-all"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          className="group w-full relative cursor-pointer"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          role="button"
          tabIndex={0}
          aria-label="Upload resume drop zone"
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        >
          <div
            className={[
              "w-full border-2 border-dashed rounded-2xl p-12 transition-all duration-200 flex flex-col items-center gap-5",
              isDragging
                ? "border-indigo-400 bg-indigo-50/60 scale-[1.01]"
                : "border-gray-200 bg-gray-50/50 group-hover:border-indigo-400 group-hover:bg-indigo-50/30",
            ].join(" ")}
          >
            <div className="size-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
              <span className="material-symbols-outlined text-4xl">
                cloud_upload
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-gray-900 text-lg font-bold">
                Click to upload or drag and drop
              </p>
              <p className="text-gray-500 text-sm">
                Supported formats: PDF, DOCX, TXT (Max 5MB)
              </p>
            </div>
            <div className="mt-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-700 text-sm font-bold group-hover:border-indigo-200 transition-all">
              Browse Files
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-col items-center gap-6 w-full">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          <span className="material-symbols-outlined text-sm">lock</span>
          Your data is encrypted and secure.
        </div>
        {file ? (
          <button
            type="button"
            onClick={onNext}
            className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all shadow-lg shadow-indigo-200"
          >
            Continue
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="text-gray-400 hover:text-gray-600 text-sm font-medium underline underline-offset-4 transition-colors"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
}
