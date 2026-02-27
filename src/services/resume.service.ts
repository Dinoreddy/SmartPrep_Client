/**
 * resume.service.ts
 * -----------------
 * Business logic layer for resume operations.
 * Decides POST vs PUT based on the user's hasUploaded flag,
 * and updates the Zustand store with the returned user data.
 */

import { resumeApi } from "@/api/resume.api";
import { useAuthStore } from "@/store/authStore";
import type { ResumeData } from "@/models/resume";

export const resumeService = {
  /**
   * Upload or update resume based on whether one already exists.
   * POST  → first-time upload (hasUploaded === false)
   * PUT   → overwrite existing (hasUploaded === true)
   */
  async uploadOrUpdate(file: File): Promise<ResumeData> {
    const user = useAuthStore.getState().user;
    const hasUploaded = user?.resumeProfile?.hasUploaded ?? false;

    console.log(
      `[resume.service] ${hasUploaded ? "update" : "upload"} → file:`,
      file.name,
    );

    const response = hasUploaded
      ? await resumeApi.update(file)
      : await resumeApi.upload(file);

    console.log("[resume.service] response:", response.data);

    const resumeData = response.data.data;

    // Merge the updated resumeProfile + skillElo back into the stored user
    if (user) {
      useAuthStore.getState().setUser({
        ...user,
        resumeProfile: resumeData.resumeProfile,
        skillElo: resumeData.skillElo,
      });
    }

    return resumeData;
  },

  /** Fetch existing resume data (GET /resume/) */
  async get(): Promise<ResumeData> {
    console.log("[resume.service] get →");
    const response = await resumeApi.get();
    console.log("[resume.service] get ← response:", response.data);
    return response.data.data;
  },
};
