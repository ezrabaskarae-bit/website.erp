let failedAudio: HTMLAudioElement | null = null;

const getFailedAudio = () => {
  if (typeof window === "undefined") {
    return null;
  }

  if (!failedAudio) {
    failedAudio = new Audio("/sounds/gagal.mp3");
    failedAudio.preload = "auto";
  }

  return failedAudio;
};

const playFailedAudio = () => {
  const audio = getFailedAudio();
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  void audio.play().catch(() => undefined);
};

export const playSuccess = () => {
  // Barcode scanner hardware already provides the success beep.
};

export const playDuplicate = () => {
  playFailedAudio();
};

export const playFailed = () => {
  playFailedAudio();
};
