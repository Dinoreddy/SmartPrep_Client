/**
 * useResume.ts
 * ------------
 * React Query hooks for resume operations.
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { resumeService } from "@/services/resume.service";
import type { ResumeData } from "@/models/resume";

export const resumeKeys = {
  data: ["resume", "data"] as const,
};

/** Upload or update resume — auto-selects POST vs PUT */
export function useUploadResume(options?: {
  onSuccess?: (data: ResumeData) => void;
}) {
  return useMutation({
    mutationFn: (file: File) => resumeService.uploadOrUpdate(file),
    onSuccess: options?.onSuccess,
  });
}

/** Fetch existing resume data */
export function useResumeData() {
  return useQuery({
    queryKey: resumeKeys.data,
    queryFn: () => resumeService.get(),
    retry: false, // Don't retry — 404 means no resume yet, which is fine
  });
}
