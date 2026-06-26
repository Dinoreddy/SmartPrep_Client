import React, { useState, useEffect, useRef } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { resumeService } from "@/services/resume.service";
import { useUploadResume } from "@/hooks/useResume";
import type { ResumeProject } from "@/models/resume";
import Snackbar from "@/components/ui/Snackbar";

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

export default function ProfilePage() {
  const queryClient = useQueryClient();

  // Fetch resume profile data
  const { data: resumeData, isLoading } = useQuery({
    queryKey: ["resumeData"],
    queryFn: () => resumeService.get(),
    staleTime: 10000,
  });

  // State values for form fields
  const [seniority, setSeniority] = useState<string>("Mid");
  const [yoe, setYoe] = useState<number>(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<ResumeProject[]>([]);

  // Local helper states
  const [newSkillInput, setNewSkillInput] = useState<string>("");
  const [expandedProjectIdx, setExpandedProjectIdx] = useState<number | null>(0);
  const [saving, setSaving] = useState<boolean>(false);

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error" | "info">("success");

  const showSnackbar = (message: string, type: "success" | "error" | "info" = "success") => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  // Resume Re-upload Modal & Dropzone states
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resume Upload Mutation Hook
  const {
    mutate: uploadResume,
    isPending: isUploading,
    isError: isUploadError,
    error: uploadError,
    reset: resetUploadMutation,
  } = useUploadResume({
    onSuccess: (data) => {
      // The Zustand store user has already been updated in resumeService.uploadOrUpdate
      const profile = data.resumeProfile;
      setSeniority(profile.seniority || "Mid");
      setYoe(profile.yoe ?? 0);
      setSkills(profile.skills || []);
      setProjects(profile.projects || []);
      setExpandedProjectIdx(profile.projects && profile.projects.length > 0 ? 0 : null);

      showSnackbar("Resume updated and profile successfully re-analyzed!", "success");
      setShowUploadModal(false);
      setUploadFile(null);
      resetUploadMutation();
    },
  });

  // Sync state values when data finishes loading
  useEffect(() => {
    if (resumeData?.resumeProfile) {
      const profile = resumeData.resumeProfile;
      setSeniority(profile.seniority || "Mid");
      setYoe(profile.yoe ?? 0);
      setSkills(profile.skills || []);
      setProjects(profile.projects || []);
    }
  }, [resumeData]);

  // Skill tag handlings
  const handleAddSkill = (e?: React.FormEvent) => {
    e?.preventDefault();
    const clean = newSkillInput.trim();
    if (clean && !skills.some((s) => s.toLowerCase() === clean.toLowerCase())) {
      setSkills([...skills, clean]);
      setNewSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Project handling
  const handleAddProject = () => {
    const newProj: ResumeProject = {
      name: "New Project Name",
      techStack: [],
      description: "",
      context: {
        architecture: "",
        keyFeatures: [],
        metrics: "",
      },
    };
    const updatedProjects = [...projects, newProj];
    setProjects(updatedProjects);
    setExpandedProjectIdx(updatedProjects.length - 1);
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    if (expandedProjectIdx === index) {
      setExpandedProjectIdx(null);
    } else if (expandedProjectIdx !== null && expandedProjectIdx > index) {
      setExpandedProjectIdx(expandedProjectIdx - 1);
    }
  };

  const updateProjectField = (index: number, field: keyof ResumeProject, value: any) => {
    setProjects(
      projects.map((proj, i) => (i === index ? { ...proj, [field]: value } : proj))
    );
  };

  const updateProjectContextField = (index: number, field: string, value: any) => {
    setProjects(
      projects.map((proj, i) =>
        i === index
          ? {
              ...proj,
              context: {
                ...proj.context,
                [field]: value,
              },
            }
          : proj
      )
    );
  };

  // Upload/Dropzone events
  const openUploadModal = () => {
    setUploadFile(null);
    setIsDragging(false);
    resetUploadMutation();
    setShowUploadModal(true);
  };

  const handleFileSelect = (selected: File) => setUploadFile(selected);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFileSelect(selected);
  };

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFileSelect(dropped);
  };

  const handleRemoveSelectedFile = () => {
    setUploadFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUploadSubmit = () => {
    if (uploadFile) {
      uploadResume(uploadFile);
    }
  };

  // Form Saving Action
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // API call saves state to database and updates Zustand authStore user
      await resumeService.updateProfile({
        seniority,
        yoe,
        skills,
        projects,
      });

      // Refetch / invalidate queries to update dashboard data
      await queryClient.invalidateQueries({ queryKey: ["resumeData"] });

      showSnackbar("Resume profile updated successfully!", "success");
    } catch (err: any) {
      console.error("[profile.page] Failed to update profile:", err);
      const message = err?.response?.data?.message || "Failed to update profile. Please try again.";
      showSnackbar(message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-pulse">
          <div className="space-y-3">
            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-4 w-72 bg-slate-100 dark:bg-slate-800 rounded-lg" />
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4 space-y-6">
              <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
            </div>
            <div className="col-span-12 md:col-span-8 space-y-6">
              <div className="h-[400px] bg-slate-200 dark:bg-slate-700 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 font-display">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Edit Resume Profile
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
              Manually refine your seniority, skills, and projects to align your interview questions.
            </p>
          </div>
          <button
            type="button"
            onClick={openUploadModal}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/95 hover:to-indigo-600/95 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
            <span>Update Resume</span>
          </button>
        </div>

        {/* Form elements grid layout */}

        <form onSubmit={handleSave} className="grid grid-cols-12 gap-8 items-start">
          {/* Left Column: General & Skills */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            {/* Experience Panel */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                General Profile
              </h3>

              {/* Seniority */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Seniority Level
                </label>
                <select
                  value={seniority}
                  onChange={(e) => setSeniority(e.target.value)}
                  disabled={saving}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-850 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                >
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>

              {/* Years of Experience */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Years of Experience (YoE)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={yoe}
                  onChange={(e) => setYoe(Math.max(0, parseInt(e.target.value) || 0))}
                  disabled={saving}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-850 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {/* Skills Panel */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
                Skills Inventory
              </h3>

              {/* Add Skill Form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new skill tag..."
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  disabled={saving}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-850 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  disabled={saving}
                  className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center shrink-0 disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>

              {/* Skill Tags List */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Current Skills ({skills.length})
                </label>
                {skills.length === 0 ? (
                  <p className="text-xs font-semibold text-slate-400 italic">No skills registered. Type above to add.</p>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg select-none"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          disabled={saving}
                          className="hover:text-red-500 transition-colors ml-1"
                        >
                          <span className="material-symbols-outlined text-sm leading-none">close</span>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Projects Accordion List */}
          <div className="col-span-12 md:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              {/* Header inside Projects Card */}
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">deployed_code</span>
                  Core Projects ({projects.length})
                </h3>
                <button
                  type="button"
                  onClick={handleAddProject}
                  disabled={saving}
                  className="flex items-center gap-1.5 bg-primary text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-primary/20 hover:bg-primary/95 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add Project</span>
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
                  <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-4xl block">folder_open</span>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
                    No projects found on this profile.
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs">
                    Add a project to enrich your resume profile layout.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project, idx) => {
                    const isExpanded = expandedProjectIdx === idx;
                    return (
                      <div
                        key={idx}
                        className={`border rounded-xl transition-all ${
                          isExpanded
                            ? "border-primary dark:border-primary/50 bg-slate-50/50 dark:bg-slate-950/20"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700"
                        }`}
                      >
                        {/* Accordion Trigger */}
                        <div
                          onClick={() => setExpandedProjectIdx(isExpanded ? null : idx)}
                          className="flex justify-between items-center px-5 py-4 cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-3 overflow-hidden pr-2">
                            <span
                              className={`material-symbols-outlined shrink-0 text-xl transition-colors ${
                                isExpanded ? "text-primary" : "text-slate-400"
                              }`}
                            >
                              deployed_code
                            </span>
                            <div className="truncate">
                              <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                {project.name || "Unnamed Project"}
                              </h4>
                              {project.techStack && project.techStack.length > 0 && (
                                <p className="text-slate-400 dark:text-slate-500 text-[11px] font-semibold truncate mt-0.5">
                                  {project.techStack.join(" • ")}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 shrink-0">
                            {/* Accordion delete */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveProject(idx);
                              }}
                              disabled={saving}
                              className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1 hover:bg-red-55/10 rounded-lg p-1.5 transition-all"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                            <span className="material-symbols-outlined text-slate-400">
                              {isExpanded ? "expand_less" : "expand_more"}
                            </span>
                          </div>
                        </div>

                        {/* Accordion Content */}
                        {isExpanded && (
                          <div className="border-t border-slate-200 dark:border-slate-800 px-5 py-5 space-y-4">
                            {/* Project Name & Tech Stack */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                  Project Name
                                </label>
                                <input
                                  type="text"
                                  value={project.name}
                                  onChange={(e) => updateProjectField(idx, "name", e.target.value)}
                                  placeholder="E.g. E-Commerce Platform"
                                  disabled={saving}
                                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-850 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                  Tech Stack (comma-separated)
                                </label>
                                <input
                                  type="text"
                                  value={project.techStack.join(", ")}
                                  onChange={(e) => {
                                    const stack = e.target.value
                                      .split(",")
                                      .map((s) => s.trim())
                                      .filter(Boolean);
                                    updateProjectField(idx, "techStack", stack);
                                  }}
                                  placeholder="E.g. React, Node.js, Postgres"
                                  disabled={saving}
                                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-850 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                                />
                              </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Description
                              </label>
                              <textarea
                                rows={3}
                                value={project.description}
                                onChange={(e) => updateProjectField(idx, "description", e.target.value)}
                                placeholder="Write a short summary of the project responsibilities and outcome..."
                                disabled={saving}
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-850 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60 resize-none"
                              />
                            </div>

                            {/* Context Architecture & Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                  Architecture context
                                </label>
                                <input
                                  type="text"
                                  value={project.context?.architecture || ""}
                                  onChange={(e) => updateProjectContextField(idx, "architecture", e.target.value)}
                                  placeholder="E.g. Monolithic REST, Event-Driven microservices"
                                  disabled={saving}
                                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-850 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                  Metrics & Performance gains
                                </label>
                                <input
                                  type="text"
                                  value={project.context?.metrics || ""}
                                  onChange={(e) => updateProjectContextField(idx, "metrics", e.target.value)}
                                  placeholder="E.g. Reduced bundle size by 30%, speed up load by 2s"
                                  disabled={saving}
                                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-850 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                                />
                              </div>
                            </div>

                            {/* Key Features */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Key Features / Deliverables (comma-separated)
                              </label>
                              <input
                                type="text"
                                value={project.context?.keyFeatures?.join(", ") || ""}
                                onChange={(e) => {
                                  const features = e.target.value
                                    .split(",")
                                    .map((f) => f.trim())
                                    .filter(Boolean);
                                  updateProjectContextField(idx, "keyFeatures", features);
                                }}
                                placeholder="E.g. OAuth integration, Payment portal, CSV Export"
                                disabled={saving}
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-850 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Actions: full-grid width container (col-span-12), no card background */}
          <div className="col-span-12 flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 pb-8">
            <button
              type="button"
              onClick={() => {
                if (resumeData?.resumeProfile) {
                  const profile = resumeData.resumeProfile;
                  setSeniority(profile.seniority || "Mid");
                  setYoe(profile.yoe ?? 0);
                  setSkills(profile.skills || []);
                  setProjects(profile.projects || []);
                  setExpandedProjectIdx(profile.projects && profile.projects.length > 0 ? 0 : null);
                }
                showSnackbar("Changes discarded", "info");
              }}
              disabled={saving}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-400 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white transition-all disabled:opacity-60 text-center"
            >
              Reset Changes
            </button>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/95 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none"
            >
              {saving ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Update Resume Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden p-6 md:p-8 flex flex-col gap-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-slate-450 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Title / Description */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">cloud_upload</span>
                Update Resume PDF
              </h3>
              <p className="text-slate-550 dark:text-slate-400 text-xs font-semibold mt-1">
                Upload your updated resume PDF to re-parse and overwrite your skills and projects.
              </p>
            </div>

            {/* Error Message inside Modal */}
            {isUploadError && (
              <div className="flex items-center gap-2.5 rounded-xl border border-red-250 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50 px-4 py-3 text-xs text-red-800 dark:text-red-300">
                <span className="material-symbols-outlined text-base shrink-0">error</span>
                <span>
                  {((uploadError as any)?.response?.data?.message) ||
                    "Upload failed. Please try a valid PDF file under 5MB."}
                </span>
              </div>
            )}

            {/* Hidden Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileInputChange}
            />

            {uploadFile ? (
              /* File preview */
              <div className="border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50/20 dark:bg-indigo-950/10 rounded-2xl p-6 flex flex-col items-center gap-4">
                <div className="size-14 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <span className="material-symbols-outlined text-3xl">
                    {getFileIcon(uploadFile.name)}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-0.5 text-center w-full">
                  <p className="text-slate-900 dark:text-white text-sm font-bold truncate max-w-[220px]">
                    {uploadFile.name}
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs">{formatBytes(uploadFile.size)}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 text-slate-700 dark:text-slate-350 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-sm"
                  >
                    Change File
                  </button>
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={handleRemoveSelectedFile}
                    className="px-4 py-2 rounded-xl border border-red-100 bg-red-50 dark:bg-red-950/30 text-red-500 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-950/65 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              /* Drop zone */
              <div
                className="group relative cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleFileDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
              >
                <div
                  className={`border-2 border-dashed rounded-2xl p-10 transition-all duration-200 flex flex-col items-center gap-4 ${
                    isDragging
                      ? "border-primary bg-indigo-50/40 dark:bg-indigo-950/10 scale-[1.01]"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/5 hover:border-primary hover:bg-indigo-50/20"
                  }`}
                >
                  <div className="size-14 rounded-full bg-slate-50 dark:bg-slate-955 flex items-center justify-center text-slate-400 dark:text-slate-600 group-hover:bg-indigo-50 group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                  </div>
                  <div className="flex flex-col gap-1 text-center">
                    <p className="text-slate-850 dark:text-slate-200 text-sm font-bold">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-slate-450 dark:text-slate-500 text-xs">PDF files only (Max 5MB)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isUploading}
                onClick={() => setShowUploadModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-400 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!uploadFile || isUploading}
                onClick={handleUploadSubmit}
                className="flex items-center gap-1.5 bg-primary text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-primary/20 hover:bg-primary/95 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none"
              >
                {isUploading ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                    <span>Re-analyzing Resume...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">psychology</span>
                    <span>Re-analyze Resume</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar notification */}
      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        isOpen={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
}
