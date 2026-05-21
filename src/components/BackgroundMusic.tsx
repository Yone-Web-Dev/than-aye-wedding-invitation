import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MUSIC_URL, MUSIC_FALLBACK_URL } from '../config';

export default function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isPlaying) return;

    audio.volume = 0.35;
    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked — will retry on next interaction
        });
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to load the local file first; if it 404s, swap to CDN fallback
    const handleError = () => {
      if (audio.src !== MUSIC_FALLBACK_URL) {
        audio.src = MUSIC_FALLBACK_URL;
        audio.load();
        startPlayback();
      }
    };
    audio.addEventListener('error', handleError);

    // Attempt autoplay immediately
    startPlayback();

    // Retry on first user interaction (required by most browsers)
    const handleInteraction = () => {
      startPlayback();
      // Keep listeners until playback succeeds
      if (audioRef.current && !audioRef.current.paused) {
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      audio.removeEventListener('error', handleError);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [startPlayback]);

  // Sync mute/unmute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_URL}
        loop
        preload="auto"
      />

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] bg-emerald-box/80 backdrop-blur-md border border-gold/30 p-3 rounded-full text-gold shadow-lg hover:border-gold transition-colors group"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
            >
              <VolumeX size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              className="relative"
            >
              <Volume2 size={20} />
              {/* Music playing animation bars */}
              {isPlaying && (
                <div className="absolute -top-1 -right-1 flex gap-0.5 h-2 items-end">
                  <motion.div
                    animate={{ height: [2, 6, 2] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0 }}
                    className="w-0.5 bg-gold"
                  />
                  <motion.div
                    animate={{ height: [2, 8, 2] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                    className="w-0.5 bg-gold"
                  />
                  <motion.div
                    animate={{ height: [2, 5, 2] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                    className="w-0.5 bg-gold"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
