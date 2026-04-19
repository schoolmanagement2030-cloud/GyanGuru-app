const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

if (base64Audio) {
  const binary = atob(base64Audio);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  
  // The SDK returns raw PCM 24khz audio data
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  const buffer = audioContext.createBuffer(1, bytes.length / 2, 24000);
  const data = buffer.getChannelData(0);
  
  // Process 16-bit PCM into Float32 for Web Audio API
  for (let i = 0; i < bytes.length; i += 2) {
    const pcm = (bytes[i + 1] << 8) | bytes[i];
    data[i / 2] = pcm >= 0x8000 ? (pcm - 0x10000) / 32768.0 : pcm / 32767.0;
  }

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
}
