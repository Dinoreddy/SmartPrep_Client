import { useState, useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { interviewApi } from "@/api/interview.api";
import { playPCMAudio } from "@/lib/audioUtils";

export type Message = {
  id: string;
  role: "ai" | "user";
  text: string;
};

interface UseLiveSessionProps {
  autoStart?: boolean;
}

export const useLiveSession = ({
  autoStart = true,
}: UseLiveSessionProps = {}) => {
  const [interviewId, setInterviewId] = useState<string | null>(null);

  // UI State
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs for logic that doesn't need to trigger re-renders
  const socketRef = useRef<Socket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Audio Queue to prevent overlapping Deepgram chunks
  const audioQueueRef = useRef<{ buffer: ArrayBuffer; text: string }[]>([]);
  const isPlayingRef = useRef(false);

  // Buffer for currently generating AI message
  const aiMessageBufferRef = useRef<string>("");

  /**
   * Initialize Interview (HTTP)
   */
  const startSession = useCallback(async () => {
    try {
      setError(null);
      setIsAiProcessing(true); // Treat initial load as AI processing

      const { data } = await interviewApi.start();
      const newInterviewId = data.data.interviewId;
      setInterviewId(newInterviewId);

      // Immediately set the text and play the greeting audio (Base64)
      setIsAiProcessing(false);
      setMessages([
        {
          id: Date.now().toString(),
          role: "ai",
          text: data.data.initialMessage || "Hello! Let's begin the interview.",
        },
      ]);
      setIsAiSpeaking(true);
      await playPCMAudio(data.data.initialAudio);
      setIsAiSpeaking(false);

      // Now we connect to Socket.io since the greeting finished
      connectSocket(newInterviewId);
    } catch (err: any) {
      console.error("Failed to start session:", err);
      setError("Failed to start the interview session.");
      setIsAiProcessing(false);
    }
  }, []);

  /**
   * Process Audio Queue Sequentially
   */
  const processAudioQueue = useCallback(async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) return;

    isPlayingRef.current = true;
    setIsAiProcessing(false);
    setIsAiSpeaking(true);

    while (audioQueueRef.current.length > 0) {
      const chunk = audioQueueRef.current.shift();
      if (!chunk) continue;

      aiMessageBufferRef.current += chunk.text;

      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];

        if (lastMsg && lastMsg.role === "ai") {
          lastMsg.text = aiMessageBufferRef.current;
        } else {
          newMessages.push({
            id: Date.now().toString(),
            role: "ai",
            text: aiMessageBufferRef.current,
          });
        }
        return newMessages;
      });

      await playPCMAudio(chunk.buffer);
    }

    isPlayingRef.current = false;
    setIsAiSpeaking(false);
  }, []);

  /**
   * Connect Socket.io
   */
  const connectSocket = useCallback((id: string) => {
    const socket = io(import.meta.env.VITE_API_BASE_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit("join_interview", id);
    });

    socket.on(
      "transcript_update",
      (data: { role: "user"; content: string }) => {
        // User finished speaking, backend transcribed it
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), role: "user", text: data.content },
        ]);
        // Now the AI is thinking
        setIsAiProcessing(true);
        aiMessageBufferRef.current = ""; // Reset buffer for the incoming AI response
      },
    );

    socket.on(
      "ai_audio_chunk",
      (data: { audio: ArrayBuffer; text: string }) => {
        // Queue the audio to play sequentially
        audioQueueRef.current.push({ buffer: data.audio, text: data.text });
        if (!isPlayingRef.current) {
          processAudioQueue();
        }
      },
    );

    socket.on("ai_turn_complete", () => {
      // The AI is completely done generating its response
      console.log("AI Turn Complete");
      // Note: `isAiSpeaking` will be set to false by `processAudioQueue`
      // when the physical audio queue is actually empty.
    });

    socket.on("pipeline_busy", (data: { message: string }) => {
      setError(data.message);
    });

    socket.on("error", (err: any) => {
      console.error("Socket error:", err);
      setError(err.message || "An unknown socket error occurred.");
    });
  }, []);

  /**
   * Microphone Recording
   */
  const startRecording = async () => {
    if (!interviewId || !socketRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Stop all microphone tracks to release the hardware light
        stream.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const arrayBuffer = await audioBlob.arrayBuffer();

        // Send to backend
        socketRef.current?.emit("candidate_audio_chunk", {
          interviewId,
          audioBuffer: arrayBuffer,
        });

        // Set state indicating we sent audio and are waiting for transcription
        setIsAiProcessing(true);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      console.error("Microphone error:", err);
      setError("Failed to access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  /**
   * End Interview
   */
  const endSession = useCallback(() => {
    if (interviewId && socketRef.current) {
      socketRef.current.emit("end_interview", interviewId);
    }
    // Cleanup
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    stopRecording();
    // Stop any physical playing audio if possible (AudioContext destination disconnect)
    // Note: the `playPCMAudio` handles isolated buffer sources, so we can't easily cancel them
    // without tracking the `source` nodes. For V1, disconnecting socket is usually enough.
  }, [interviewId]);

  // Initial mount: start session immediately if autoStart is true
  useEffect(() => {
    if (autoStart) {
      startSession();
    }
    return () => {
      // Cleanup on unmount
      if (socketRef.current) socketRef.current.disconnect();
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [startSession]);

  return {
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
  };
};
