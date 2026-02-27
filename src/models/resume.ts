/**
 * resume.ts
 * ---------
 * TypeScript models for the resume domain.
 */

export interface ProjectContext {
  architecture: string;
  keyFeatures: string[];
  metrics: string;
}

export interface ResumeProject {
  name: string;
  techStack: string[];
  description: string;
  context: ProjectContext;
}

export interface ResumeProfile {
  hasUploaded: boolean;
  seniority: "Junior" | "Mid" | "Senior" | string;
  yoe: number;
  skills: string[];
  projects: ResumeProject[];
}

/** Shape returned by GET /resume/ */
export interface ResumeData {
  resumeProfile: ResumeProfile;
  /** Map of skill name → Elo rating */
  skillElo: Record<string, number>;
}
