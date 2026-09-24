"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// The job-application CV picker (`.cv-upload-wrap`): the native file input is
// visually hidden and a styled label shows a "Choose File" button plus the
// chosen file name, with a mint border once a file is picked. Resets to the
// "no file chosen" text when the form is reset (LeadForm calls form.reset()
// after a successful submit).
export default function CvUpload({
  chooseLabel,
  noFileLabel,
}: {
  chooseLabel: ReactNode;
  noFileLabel: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const hasFile = fileName !== null;

  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;
    const onReset = () => setFileName(null);
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, []);

  return (
    <div className="relative">
      <label
        htmlFor="cv-upload"
        className={cn(
          "group/cv mt-[14px] flex w-full cursor-pointer items-stretch overflow-hidden rounded-[4px] border-[1.5px] transition-[border-color] duration-300 hover:border-mint",
          hasFile ? "border-mint" : "border-[#E6E7E9]",
        )}
      >
        <span className="flex shrink-0 items-center gap-2 bg-mint px-[18px] py-[14px] font-semibold whitespace-nowrap text-ink transition-[background-color] duration-300 group-hover/cv:bg-brand">
          {chooseLabel}
        </span>
        <span
          id="cv-filename"
          className={cn(
            "flex min-w-0 flex-1 items-center overflow-hidden px-4 py-[14px] text-ellipsis whitespace-nowrap",
            hasFile ? "font-semibold text-ink" : "font-medium text-[#525863]",
          )}
        >
          {fileName ?? noFileLabel}
        </span>
      </label>
      <input
        ref={inputRef}
        type="file"
        id="cv-upload"
        name="cv"
        accept=".pdf,.doc,.docx"
        required
        onChange={(e) => setFileName(e.currentTarget.files?.[0]?.name ?? null)}
        className="pointer-events-none absolute inset-0 mt-5 h-0 w-full p-4 opacity-0"
      />
    </div>
  );
}
