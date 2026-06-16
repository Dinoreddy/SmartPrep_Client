import React from "react";

interface ControlBarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  onEndSession: () => void;
  onOpenSettings: () => void;
  isDisabled?: boolean;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  isMuted,
  onToggleMute,
  isRecording,
  onToggleRecording,
  onEndSession,
  onOpenSettings,
  isDisabled = false,
}) => {
  return (
    <div className="relative w-full flex justify-center pb-6">
      <div className="flex items-center gap-2 p-2 pr-2.5 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-slate-900/5 transition-transform hover:scale-[1.02]">
        {/* Mute Button */}
        <button
          onClick={onToggleMute}
          disabled={isDisabled}
          className={`size-12 rounded-full flex items-center justify-center transition-all tooltip-trigger ${
            isMuted
              ? "text-red-500 bg-red-50 hover:bg-red-100"
              : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
          } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          <span className="material-symbols-outlined">
            {isMuted ? "mic_off" : "mic"}
          </span>
        </button>

        {/* Main Action Button (Recording Toggle) */}
        <button
          onClick={onToggleRecording}
          disabled={isDisabled}
          className={`h-14 px-8 rounded-full text-white flex items-center gap-3 font-bold shadow-lg transition-all ${
            isRecording
              ? "bg-red-500 shadow-red-500/30 hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
              : "bg-primary shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
          } ${isDisabled ? "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none" : ""}`}
        >
          <div className="bg-white/20 p-1.5 rounded-full">
            <span className="material-symbols-outlined text-[20px]">
              {isRecording ? "graphic_eq" : "mic"}
            </span>
          </div>
          <span>{isRecording ? "Listening" : "Tap to Speak"}</span>
        </button>

        {/* End Session Button */}
        <button
          onClick={onEndSession}
          className="size-12 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all tooltip-trigger"
          title="End Session"
        >
          <span className="material-symbols-outlined">stop_circle</span>
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1"></div>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="size-12 rounded-full flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 transition-all tooltip-trigger"
          title="Settings"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </div>
  );
};
