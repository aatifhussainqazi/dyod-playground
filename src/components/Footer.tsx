import React from 'react';
import { Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenBlender: () => void;
  onReset: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onOpenBlender, onReset }) => {
  return (
    <footer className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-10 pb-12 mt-auto text-center border-t border-ink/10">
      <div className="flex flex-col items-center gap-3">
        {/* Playful pill */}
        <div className="flex items-center gap-2 text-xs font-heading font-bold text-ink-muted">
          <span>DYOD PLAYGROUND</span>
          <span>•</span>
          <span>IUST DEGREE EXPLORER</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-coral-dark">
            <Sparkles className="w-3.5 h-3.5" />
            PURE ACADEMIC CHAOS
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-ink">
          <button
            onClick={() => {
              sound.playPop();
              onReset();
            }}
            className="hover:underline underline-offset-4"
          >
            Start Over
          </button>
          <span>/</span>
          <button
            onClick={() => {
              sound.playPop();
              onOpenBlender();
            }}
            className="hover:underline underline-offset-4"
          >
            Basket Blender
          </button>
          <span>/</span>
          <button
            onClick={() => {
              sound.playPop();
              onOpenAbout();
            }}
            className="hover:underline underline-offset-4"
          >
            What is DYOD?
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-ink-subtle max-w-md leading-relaxed mt-1">
          A lighthearted digital playground inspired by IUST's Design Your Own Degree program. Not an official university website or admission portal. No data collected.
        </p>
      </div>
    </footer>
  );
};
