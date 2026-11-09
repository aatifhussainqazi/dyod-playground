import React from 'react';
import { ArrowRight, Dices, Sparkles, BookOpen, Atom, Cpu, Palette, Flame, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/sound';

interface LandingScreenProps {
  onStartQuiz: () => void;
  onRandomPersonality: () => void;
  onOpenBlender: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStartQuiz,
  onRandomPersonality,
  onOpenBlender,
}) => {
  const stickers = [
    { label: '4 AM Rabbit Holes 🐇', bg: 'bg-sunny', rotate: '-rotate-3' },
    { label: 'Accidental Overthinker 🧠', bg: 'bg-lavender', rotate: 'rotate-2' },
    { label: 'Certified Grass Toucher 🌱', bg: 'bg-mint', rotate: '-rotate-2' },
    { label: '8 Baskets, Zero Clue 🎒', bg: 'bg-coral-light', rotate: 'rotate-4' },
    { label: 'Spreadsheet Sorcery 📊', bg: 'bg-sky-light', rotate: '-rotate-4' },
  ];

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center text-center">
      {/* Top Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-ink shadow-pop-sm mb-6 animate-pulse-gentle">
        <span className="w-2.5 h-2.5 rounded-full bg-coral animate-ping" />
        <span className="text-xs sm:text-sm font-heading font-bold tracking-wider text-ink uppercase">
          A Little DYOD Experiment
        </span>
        <Sparkles className="w-4 h-4 text-sunny-dark" />
      </div>

      {/* Main Headline */}
      <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl text-ink leading-[1.08] tracking-tight mb-4 max-w-3xl">
        Your future major is somewhere in this{' '}
        <span className="relative inline-block px-3 py-1 bg-sunny border-2 border-ink rounded-2xl transform -rotate-2 shadow-pop-sm text-ink">
          chaos.
        </span>
      </h1>

      {/* Alternate Hook Pill */}
      <p className="font-heading font-semibold text-lg sm:text-xl text-ink-muted mb-4 max-w-2xl">
        Eight baskets. Endless possibilities. Zero clue where to start?
      </p>

      {/* Supporting Text */}
      <p className="text-base sm:text-lg text-ink-muted max-w-xl mb-8 leading-relaxed">
        Answer a few questionable questions about yourself and discover your DYOD personality, your dominant academic energy, and wildly creative major directions.
      </p>

      {/* Interactive Floating Stickers Wall */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-2xl mb-10">
        {stickers.map((stk, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => sound.playPop(480 + idx * 40)}
            className={`px-3 py-1.5 rounded-xl border-2 border-ink text-xs sm:text-sm font-bold text-ink shadow-pop-sm ${stk.bg} ${stk.rotate} hover:scale-105 active:scale-95 transition-transform cursor-pointer`}
            title="Click for a satisfying pop!"
          >
            {stk.label}
          </button>
        ))}
      </div>

      {/* Hero Interactive Illustrated Badge Card */}
      <div className="w-full max-w-md bg-white border-2.5 border-ink rounded-3xl p-6 sm:p-7 shadow-pop-lg mb-8 relative group hover:-translate-y-1 transition-transform">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-mint border-2 border-ink px-4 py-0.5 rounded-full text-xs font-bold text-ink shadow-pop-sm flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-coral-dark" />
          MULTIDISCIPLINARY RADAR
        </div>

        <div className="grid grid-cols-4 gap-2.5 my-3">
          <div className="p-3 bg-sky rounded-2xl border-2 border-ink flex flex-col items-center gap-1">
            <Cpu className="w-6 h-6 text-ink" />
            <span className="text-[10px] font-bold">Bits</span>
          </div>
          <div className="p-3 bg-sunny rounded-2xl border-2 border-ink flex flex-col items-center gap-1">
            <Atom className="w-6 h-6 text-ink" />
            <span className="text-[10px] font-bold">Atoms</span>
          </div>
          <div className="p-3 bg-coral-light rounded-2xl border-2 border-ink flex flex-col items-center gap-1">
            <Palette className="w-6 h-6 text-ink" />
            <span className="text-[10px] font-bold">Design</span>
          </div>
          <div className="p-3 bg-lavender rounded-2xl border-2 border-ink flex flex-col items-center gap-1">
            <BookOpen className="w-6 h-6 text-ink" />
            <span className="text-[10px] font-bold">Minds</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-bold text-ink-muted mt-2">
          Takes ~1–2 minutes • 7 snappy questions • No login • Zero serious career pressure
        </p>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mb-6">
        <button
          onClick={() => {
            sound.playSelect();
            onStartQuiz();
          }}
          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-coral border-2.5 border-ink text-ink font-heading font-bold text-lg sm:text-xl shadow-pop hover:-translate-y-1 hover:shadow-pop-lg active:translate-y-0.5 active:shadow-pop-sm transition-all"
        >
          <span>LET'S FIND OUT</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={() => {
            sound.playPop(600);
            onRandomPersonality();
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-sunny border-2.5 border-ink text-ink font-heading font-bold text-sm sm:text-base shadow-pop hover:-translate-y-1 hover:shadow-pop-lg active:translate-y-0.5 active:shadow-pop-sm transition-all"
          title="Skip quiz and generate a random DYOD personality"
        >
          <Dices className="w-5 h-5" />
          <span>RANDOM ARCHETYPE</span>
        </button>
      </div>

      {/* Bonus Link: Basket Blender */}
      <button
        onClick={() => {
          sound.playPop();
          onOpenBlender();
        }}
        className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:underline decoration-2 underline-offset-4 mb-6 transition-colors"
      >
        <span>Or try the interactive Basket Blender tool 🍹</span>
      </button>

      {/* Subtle Disclaimer Pill */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-ink-subtle bg-cream-200/80 px-4 py-2 rounded-xl border border-ink/20 max-w-md">
        <ShieldAlert className="w-3.5 h-3.5 text-ink-muted shrink-0" />
        <span>Just for fun. Not official academic guidance or IUST admissions eligibility.</span>
      </div>
    </div>
  );
};
