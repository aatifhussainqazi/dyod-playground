import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, HelpCircle, RotateCcw } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  onReset?: () => void;
  onOpenBlender: () => void;
  onOpenAbout: () => void;
  showReset?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onOpenBlender,
  onOpenAbout,
  showReset = false,
}) => {
  const [muted, setMuted] = useState(sound.isMuted());

  const handleToggleSound = () => {
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
  };

  return (
    <header className="relative z-20 w-full max-w-5xl mx-auto px-4 pt-4 sm:pt-6 pb-2">
      <div className="flex items-center justify-between gap-3 bg-white/80 backdrop-blur-md border-2.5 border-ink rounded-2xl px-3.5 py-2.5 shadow-pop sm:px-5 sm:py-3">
        {/* Brand */}
        <button
          onClick={() => {
            sound.playPop();
            if (onReset) onReset();
          }}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sunny border-2 border-ink flex items-center justify-center font-heading text-lg font-bold shadow-pop-sm group-hover:rotate-6 transition-transform">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-ink">
                DYOD Playground
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-mint border border-ink text-ink">
                EXPERIMENT
              </span>
            </div>
            <p className="text-[11px] text-ink-muted hidden sm:block -mt-0.5">
              Inspired by IUST's Design Your Own Degree
            </p>
          </div>
        </button>

        {/* Action controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Degree Blender Shortcut */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenBlender();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-lavender border-2 border-ink text-xs font-bold text-ink shadow-pop-sm hover:-translate-y-0.5 hover:shadow-pop transition-all active:translate-y-0"
            title="Open Basket Blender Toy"
          >
            <Sparkles className="w-3.5 h-3.5 text-ink" />
            <span className="hidden md:inline">Basket Blender</span>
            <span className="md:hidden">Blender</span>
          </button>

          {/* About DYOD */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenAbout();
            }}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-sky border-2 border-ink text-xs font-bold text-ink shadow-pop-sm hover:-translate-y-0.5 hover:shadow-pop transition-all active:translate-y-0"
            title="About DYOD and the 8 Baskets"
          >
            <HelpCircle className="w-3.5 h-3.5 text-ink" />
            <span className="hidden sm:inline">What is DYOD?</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
            className="p-1.5 sm:p-2 rounded-xl bg-cream-200 border-2 border-ink text-ink shadow-pop-sm hover:-translate-y-0.5 transition-all active:translate-y-0"
            title={muted ? 'Unmute audio effects' : 'Mute audio effects'}
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-ink-muted" />
            ) : (
              <Volume2 className="w-4 h-4 text-ink" />
            )}
          </button>

          {/* Restart if in quiz/result */}
          {showReset && onReset && (
            <button
              onClick={() => {
                sound.playPop();
                onReset();
              }}
              className="p-1.5 sm:p-2 rounded-xl bg-coral-light border-2 border-ink text-ink shadow-pop-sm hover:-translate-y-0.5 transition-all active:translate-y-0"
              title="Start over"
            >
              <RotateCcw className="w-4 h-4 text-ink" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
