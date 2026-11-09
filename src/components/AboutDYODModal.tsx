import React from 'react';
import { ALL_BASKETS } from '../data/baskets';
import { BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

interface AboutDYODModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutDYODModal: React.FC<AboutDYODModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-pop-xl my-6 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sunny border-2 border-ink">
              <BookOpen className="w-5 h-5 text-ink" />
            </span>
            <div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-ink">
                About DYOD at IUST
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-bold">
                Design Your Own Degree • Multidisciplinary Freedom
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-ink bg-cream flex items-center justify-center font-bold text-sm hover:bg-coral transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Overview Box */}
        <div className="p-5 rounded-2xl bg-cream-50 border-2 border-ink mb-6">
          <h4 className="font-heading font-black text-lg text-ink mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-coral" />
            What is the DYOD Program?
          </h4>
          <p className="text-xs sm:text-sm text-ink-muted font-semibold leading-relaxed mb-3">
            <strong>Design Your Own Degree (DYOD)</strong> is an innovative academic paradigm introduced by the <strong>Islamic University of Science and Technology (IUST)</strong>. Unlike traditional rigid degree programs where students are locked into a single syllabus from day one, DYOD empowers students to explore foundational disciplines across eight distinct academic baskets before choosing or crafting their tailored specialization.
          </p>
          <p className="text-xs sm:text-sm text-ink-muted font-semibold leading-relaxed">
            Students can synthesize technical prowess with creative arts, humanities, environmental sciences, or business strategies—preparing for unpredictable careers at the intersections of tomorrow's world.
          </p>
        </div>

        {/* The 8 Baskets Breakdown */}
        <div className="mb-6">
          <h4 className="font-heading font-black text-base text-ink mb-3 uppercase tracking-wider">
            The 8 Official Academic Baskets:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ALL_BASKETS.map((basket) => (
              <div
                key={basket.id}
                className="p-3 rounded-xl border border-ink bg-cream-100 flex items-start gap-2.5"
              >
                <div
                  className="w-3 h-3 rounded-full mt-1 shrink-0 border border-ink"
                  style={{ backgroundColor: basket.color }}
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-ink-subtle">{basket.badge}:</span>
                    <span className="font-heading font-bold text-xs text-ink">{basket.name}</span>
                  </div>
                  <p className="text-[11px] text-ink-muted font-medium mt-0.5">
                    {basket.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playground Disclaimer */}
        <div className="p-4 rounded-2xl bg-sky-light/60 border border-ink/30 text-xs text-ink-muted font-semibold flex items-start gap-2.5 mb-6">
          <ShieldCheck className="w-4 h-4 text-ink-muted shrink-0 mt-0.5" />
          <p>
            <strong>About This Website:</strong> DYOD Playground is a lighthearted student and community project designed to spark curiosity, celebrate multidisciplinary education, and make people smile. It is not an official admissions test or formal university advisory portal.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-sunny border-2.5 border-ink font-heading font-black text-sm text-ink shadow-pop hover:shadow-pop-sm transition-all"
        >
          BACK TO THE PLAYGROUND!
        </button>
      </div>
    </div>
  );
};
