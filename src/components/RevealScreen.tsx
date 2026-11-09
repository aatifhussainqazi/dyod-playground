import React, { useEffect, useState } from 'react';
import { sound } from '../utils/sound';

interface RevealScreenProps {
  onRevealComplete: () => void;
}

const FUNNY_MESSAGES = [
  'Consulting the academic universe...',
  'Calculating your intellectual chaos...',
  'Asking eight imaginary professors...',
  'Untangling your multidisciplinary synapses...',
  'Measuring caffeine-to-prototype ratio...',
  'Negotiating with the admissions committee...',
  'Synthesizing your DYOD energy...',
];

export const RevealScreen: React.FC<RevealScreenProps> = ({ onRevealComplete }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    sound.playBoing();

    // Rotate funny message twice
    const msgTimer1 = setTimeout(() => {
      setMessageIndex((prev) => (prev + 1) % FUNNY_MESSAGES.length);
    }, 600);

    const msgTimer2 = setTimeout(() => {
      setMessageIndex((prev) => (prev + 2) % FUNNY_MESSAGES.length);
    }, 1200);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((old) => {
        if (old >= 95) {
          clearInterval(progressInterval);
          return 100;
        }
        return old + 12;
      });
    }, 160);

    // Complete reveal around 1.8 seconds
    const revealTimer = setTimeout(() => {
      onRevealComplete();
    }, 1850);

    return () => {
      clearTimeout(msgTimer1);
      clearTimeout(msgTimer2);
      clearInterval(progressInterval);
      clearTimeout(revealTimer);
    };
  }, [onRevealComplete]);

  return (
    <div className="relative z-10 w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* Playful Spinning Element */}
      <div className="relative mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-sunny border-3 border-ink shadow-pop-lg flex items-center justify-center animate-spin-slow">
          <span className="text-4xl sm:text-5xl select-none">🌀</span>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-coral border-2 border-ink flex items-center justify-center font-bold text-sm shadow-pop-sm animate-wiggle">
          ⚡
        </div>
      </div>

      {/* Funny Loading Header */}
      <h2 className="font-heading font-black text-2xl sm:text-4xl text-ink mb-3 max-w-lg transition-all duration-200">
        {FUNNY_MESSAGES[messageIndex]}
      </h2>

      <p className="text-sm sm:text-base text-ink-muted font-bold mb-6 max-w-md">
        Running deterministic basket calculations • Zero fake AI
      </p>

      {/* Bouncing Progress Indicator */}
      <div className="w-full max-w-sm bg-white border-2.5 border-ink rounded-full h-5 p-0.5 shadow-pop-sm overflow-hidden mb-4">
        <div
          className="h-full bg-mint rounded-full transition-all duration-200 ease-out flex items-center justify-end pr-1"
          style={{ width: `${progress}%` }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-ink" />
        </div>
      </div>

      <span className="text-xs font-heading font-bold text-ink-muted">
        {progress}% CALIBRATED
      </span>
    </div>
  );
};
