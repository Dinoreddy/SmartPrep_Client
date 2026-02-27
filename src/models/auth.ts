// ─── Sub-models ──────────────────────────────────────────────────────────────

export interface ProjectContext {
  architecture: string;
  keyFeatures: string[];
  metrics: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  techStack: string[];
  context: ProjectContext;
}

export interface ResumeProfile {
  hasUploaded: boolean;
  seniority: string;
  yoe: number;
  skills: string[];
  projects: Project[];
}

// ─── Core Entity ─────────────────────────────────────────────────────────────

export interface User {
  _id: string;
  fullName: string;
  email: string;
  username: string;
  role: "user" | "admin";
  resumeProfile: ResumeProfile;
  /** Map of skill name → Elo rating */
  skillElo: Record<string, number>;
  solvedQuestionIds: string[];
}

// ─── Request Payloads ────────────────────────────────────────────────────────

export interface RegisterPayload {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

/** Either email or username is required, plus password */
export interface LoginPayload {
  email?: string;
  username?: string;
  password: string;
}

// ─── API Response Shapes ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ValidationError {
  field: string;
  msg: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: ValidationError[];
}

// ─── Auth-specific response shapes ───────────────────────────────────────────

/** Register/Login/Refresh — data contains only { user }; tokens are in httpOnly cookies */
export interface AuthUserData {
  user: User;
}

// ─── Convenience aliases ─────────────────────────────────────────────────────

export type RegisterResponse = ApiResponse<AuthUserData>;
export type LoginResponse = ApiResponse<AuthUserData>;
export type LogoutResponse = ApiResponse<Record<string, never>>;
export type RefreshResponse = ApiResponse<AuthUserData>;
