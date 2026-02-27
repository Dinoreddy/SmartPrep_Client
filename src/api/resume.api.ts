/**
 * resume.api.ts
 * -------------
 * Raw HTTP calls for the resume domain.
 * All endpoints are protected — cookies are sent automatically.
 */

import api from "@/lib/axios";
import type { ApiResponse } from "@/models/auth";
import type { ResumeData } from "@/models/resume";

export const resumeApi = {
  /**
   * POST /resume/analyze
   * First-time upload. Returns 409 if resume already exists.
   */
  upload: (file: File) => {
    const form = new FormData();
    form.append("resume", file);
    return api.post<ApiResponse<ResumeData>>("/resume/analyze", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /**
   * PUT /resume/analyze
   * Re-upload / overwrite. Works whether a resume exists or not.
   */
  update: (file: File) => {
    const form = new FormData();
    form.append("resume", file);
    return api.put<ApiResponse<ResumeData>>("/resume/analyze", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /**
   * GET /resume/
   * Fetch existing resume data.
   */
  get: () => api.get<ApiResponse<ResumeData>>("/resume/"),
};
