import React from "react";

interface WaveformVisualizerProps {
  isActive: boolean;
  statusText?: string;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isActive,
  statusText = "SmartPrep is speaking...",
}) => {
  if (!isActive) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center mt-4 min-h-[120px]">
      <div
        className="flex items-center justify-center gap-1.5 h-16"
        id="waveform"
      >
        {/* Generating a dynamic looking waveform using CSS heights */}
        <div className="w-1.5 bg-primary/20 rounded-full h-3"></div>
        <div className="w-1.5 bg-primary/30 rounded-full h-5"></div>
        <div className="w-1.5 bg-primary/40 rounded-full h-8"></div>
        <div className="w-1.5 bg-primary/60 rounded-full h-4"></div>
        <div className="w-1.5 bg-primary rounded-full h-10 animate-[pulse_1s_ease-in-out_infinite]"></div>
        <div className="w-1.5 bg-primary rounded-full h-14 animate-[pulse_1.2s_ease-in-out_infinite]"></div>
        <div className="w-1.5 bg-primary rounded-full h-8 animate-[pulse_0.8s_ease-in-out_infinite]"></div>
        <div className="w-1.5 bg-primary rounded-full h-16 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
        <div className="w-1.5 bg-primary rounded-full h-10 animate-[pulse_1.1s_ease-in-out_infinite]"></div>
        <div className="w-1.5 bg-primary rounded-full h-5 animate-[pulse_0.9s_ease-in-out_infinite]"></div>
        <div className="w-1.5 bg-primary rounded-full h-12 animate-[pulse_1.3s_ease-in-out_infinite]"></div>
        <div className="w-1.5 bg-primary rounded-full h-20 animate-[pulse_1.4s_ease-in-out_infinite]"></div>
        <div className="w-1.5 bg-primary rounded-full h-10 animate-[pulse_1s_ease-in-out_infinite]"></div>
        <div className="w-1.5 bg-primary rounded-full h-6"></div>
        <div className="w-1.5 bg-primary/60 rounded-full h-9"></div>
        <div className="w-1.5 bg-primary/40 rounded-full h-4"></div>
        <div className="w-1.5 bg-primary/30 rounded-full h-3"></div>
        <div className="w-1.5 bg-primary/20 rounded-full h-2"></div>
      </div>
      <p className="mt-4 text-slate-400 text-sm font-medium tracking-wide animate-pulse">
        {statusText}
      </p>
    </div>
  );
};
