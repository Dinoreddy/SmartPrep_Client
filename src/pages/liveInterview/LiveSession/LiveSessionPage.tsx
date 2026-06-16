import React from "react";
import { useNavigate } from "react-router-dom";
import { LiveSessionHeader } from "./components/LiveSessionHeader";
import { MessageBubble } from "./components/MessageBubble";
import { WaveformVisualizer } from "./components/WaveformVisualizer";
import { ControlBar } from "./components/ControlBar";
import { useLiveSession } from "./hooks/useLiveSession";

export const LiveSessionPage: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [isMuted, setIsMuted] = React.useState(false);
  const [hasStarted, setHasStarted] = React.useState(false);

  const {
    interviewId,
    messages,
    isRecording,
    isAiSpeaking,
    isAiProcessing,
    error,
    startSession,
    startRecording,
    stopRecording,
    endSession,
  } = useLiveSession({ autoStart: false });

  // Handlers
  const handleClose = () => {
    endSession();
    navigate(-1);
  };

  const handleStart = () => {
    setHasStarted(true);
    startSession();
  };

  const handleEndSession = () => {
    endSession();
    navigate(`/mock-test/report/${interviewId || "mock-id"}`);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const getStatusText = () => {
    if (isAiSpeaking) return "SmartPrep is speaking...";
    if (isRecording) return "Listening...";
    if (isAiProcessing) return "SmartPrep is thinking...";
    return "Live Session";
  };

  return (
    <div className="bg-background-light text-slate-900 font-display overflow-hidden h-screen w-screen flex flex-col">
      <LiveSessionHeader
        onClose={handleClose}
        statusText={getStatusText()}
        isPulsing={isAiSpeaking || isRecording || isAiProcessing}
      />

      <main className="flex-1 min-h-0 flex flex-col items-center relative w-full max-w-5xl mx-auto px-4 pb-6 pt-4">
        {/* Start Overlay overlay to bypass audio autoplay policy */}
        {!hasStarted && !error && (
          <div className="absolute inset-0 z-40 bg-background-light/80 backdrop-blur-sm flex items-center justify-center animate-fade-in-up">
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/30 rounded-full hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              Start Interview
            </button>
          </div>
        )}
        {/* Error Banner */}
        {error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-50 text-red-600 px-4 py-2 rounded-lg shadow-sm ring-1 ring-red-500/20 text-sm font-medium animate-fade-in-up">
            {error}
          </div>
        )}

        {/* Transcript / Conversation Stack */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar mask-linear-fade flex flex-col pr-2">
          <div className="mt-auto flex flex-col items-center gap-6 w-full pb-10 pt-16">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} role={msg.role} text={msg.text} />
            ))}

            {/* Optional: Show generating message bubble if AI is thinking but hasn't spoken yet */}
            {isAiProcessing && (
              <MessageBubble
                role="ai"
                text="Processing your response..."
                isTyping={true}
              />
            )}

            <WaveformVisualizer
              isActive={isAiSpeaking}
              statusText="SmartPrep is speaking..."
            />
          </div>
        </div>

        <div className="w-full shrink-0 pt-4">
          <ControlBar
            isMuted={isMuted}
            onToggleMute={() => setIsMuted(!isMuted)}
            isRecording={isRecording}
            onToggleRecording={toggleRecording}
            onEndSession={handleEndSession}
            onOpenSettings={() => console.log("Open settings")}
            isDisabled={isAiProcessing || isAiSpeaking}
          />
        </div>
      </main>
    </div>
  );
};
