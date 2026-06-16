/**
 * Initialize a single persistent AudioContext for Web Audio API.
 * Needs to match Deepgram's sample rate (16000Hz).
 */
export const audioContext = new (
  window.AudioContext || (window as any).webkitAudioContext
)({
  sampleRate: 16000,
});

/**
 * Converts Deepgram's Int16 raw PCM audio into Float32 format and plays it
 * through the Web Audio Context.
 * Resolves the promise exactly when the audio chunk finishes playing.
 *
 * @param input - Can be a Base64 string (initial HTTP request) or ArrayBuffer (Socket.io)
 * @returns Promise<void>
 */
export async function playPCMAudio(input: string | ArrayBuffer): Promise<void> {
  let buffer: ArrayBufferLike;

  if (typeof input === "string") {
    // Decode Base64
    const binaryString = atob(input);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    buffer = bytes.buffer;
  } else {
    // Raw ArrayBuffer from socket
    buffer = input;
  }

  // Deepgram returns 16-bit integers (Int16)
  const int16Array = new Int16Array(buffer);

  // Create a buffer for playing the audio
  const audioBuffer = audioContext.createBuffer(1, int16Array.length, 16000);

  // Web Audio Context plays Float32 arrays (-1.0 to 1.0)
  const float32Array = audioBuffer.getChannelData(0);

  // Convert Int16 to Float32
  for (let i = 0; i < int16Array.length; i++) {
    // 32768 is the max value of a 16-bit signed int
    float32Array[i] = int16Array[i] / 32768.0;
  }

  // Connect and play
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);

  // Handle autoplay policy - resume context if suspended
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  source.start();

  // Return promise that resolves when it's done playing
  return new Promise((resolve) => {
    source.onended = () => resolve();
  });
}
