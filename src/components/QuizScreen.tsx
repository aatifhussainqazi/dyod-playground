import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import type { QuizQuestion } from '../types/quiz';
import { sound } from '../utils/sound';

interface QuizScreenProps {
  questions: QuizQuestion[];
  onComplete: (answers: Record<number, string>) => void;
  onCancel: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  onComplete,
  onCancel,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedInCurrent, setSelectedInCurrent] = useState<string | null>(null);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Sync selected state when navigating
  useEffect(() => {
    setSelectedInCurrent(answers[currentQ.id] || null);
  }, [currentIndex, currentQ.id, answers]);

  // Handle option selection with snappy automatic advance or review
  const handleSelectOption = (optionId: string) => {
    sound.playSelect();
    setSelectedInCurrent(optionId);
    
    const nextAnswers = {
      ...answers,
      [currentQ.id]: optionId,
    };
    setAnswers(nextAnswers);

    // Auto-advance after brief satisfying visual indicator (380ms)
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        sound.playNext();
        setCurrentIndex((prev) => prev + 1);
      } else {
        onComplete(nextAnswers);
      }
    }, 360);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sound.playPop(380);
      setCurrentIndex((prev) => prev - 1);
    } else {
      onCancel();
    }
  };

  // Keyboard shortcut listener (1-8 keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= currentQ.options.length) {
        const targetOption = currentQ.options[num - 1];
        if (targetOption) {
          handleSelectOption(targetOption.id);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ, answers]);

  const funnyEncouragements = [
    'No wrong answers here!',
    'Your neurons are warming up.',
    'Eight baskets are watching intently.',
    'Calculating your chaotic energy...',
    'Pure multidisciplinary instinct!',
    'The finish line is near!',
    'Final boss question!',
  ];

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-6 sm:py-10">
      {/* Top Bar: Back Button & Progress */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-ink text-xs sm:text-sm font-bold text-ink shadow-pop-sm hover:-translate-x-0.5 hover:shadow-pop transition-all active:translate-x-0"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>{currentIndex === 0 ? 'Home' : 'Back'}</span>
        </button>

        {/* Question Counter Pill */}
        <div className="flex items-center gap-2 px-3 py-1 bg-sunny border-2 border-ink rounded-full text-xs sm:text-sm font-heading font-bold shadow-pop-sm">
          <span>QUESTION {currentIndex + 1} / {totalQuestions}</span>
        </div>

        {/* Lighthearted hint */}
        <span className="text-[11px] sm:text-xs text-ink-muted font-bold hidden sm:inline-block">
          {funnyEncouragements[currentIndex] || 'Keep going!'}
        </span>
      </div>

      {/* Smooth Progress Bar */}
      <div className="w-full bg-white border-2.5 border-ink rounded-full h-4 sm:h-5 p-0.5 shadow-pop-sm mb-8 overflow-hidden">
        <div
          className="h-full bg-coral rounded-full transition-all duration-300 ease-out flex items-center justify-end pr-1"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="w-2 h-2 rounded-full bg-white opacity-80" />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border-2.5 border-ink rounded-3xl p-6 sm:p-8 shadow-pop-lg mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-mint border-2 border-ink flex items-center justify-center text-xs font-bold font-heading">
            {currentIndex + 1}
          </span>
          <span className="text-xs font-bold text-ink-muted uppercase tracking-wider">
            DYOD Inquiry #{currentIndex + 1}
          </span>
        </div>

        <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-ink leading-snug mb-2">
          {currentQ.question}
        </h2>

        {currentQ.subtitle && (
          <p className="text-sm sm:text-base text-ink-muted font-semibold mb-6 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-coral shrink-0" />
            <span>{currentQ.subtitle}</span>
          </p>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedInCurrent === option.id;
            const keyNumber = idx + 1;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option.id)}
                className={`group relative text-left p-4 sm:p-4.5 rounded-2xl border-2.5 border-ink transition-all duration-150 flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-sunny shadow-pop translate-x-0.5 translate-y-0.5 border-ink'
                    : 'bg-cream-50 hover:bg-sky-light hover:-translate-y-1 hover:shadow-pop shadow-pop-sm'
                }`}
              >
                {/* Emoji Avatar */}
                <div
                  className={`w-10 h-10 rounded-xl border-2 border-ink flex items-center justify-center text-xl shrink-0 transition-transform ${
                    isSelected ? 'bg-white scale-110' : 'bg-white group-hover:scale-105'
                  }`}
                >
                  {option.emoji}
                </div>

                {/* Option text */}
                <div className="flex-1 pr-2">
                  <p className="text-sm sm:text-base font-bold text-ink leading-snug mb-1">
                    {option.text}
                  </p>
                  {option.vibeSnippet && (
                    <span
                      className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md border border-ink/40 ${
                        isSelected ? 'bg-white text-ink' : 'bg-cream-200/60 text-ink-muted'
                      }`}
                    >
                      {option.vibeSnippet}
                    </span>
                  )}
                </div>

                {/* Keyboard indicator / Selection checkmark */}
                <div className="shrink-0 flex items-center justify-center">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="hidden md:inline-block w-5 h-5 rounded-md border border-ink/30 text-[10px] font-bold text-ink-subtle text-center leading-5 bg-white/70">
                      {keyNumber}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="flex items-center justify-between text-xs text-ink-subtle px-2">
        <span className="hidden sm:inline">Tip: You can use number keys 1-{currentQ.options.length} or click directly</span>
        <button
          onClick={onCancel}
          className="hover:underline font-bold text-ink-muted hover:text-ink transition-colors ml-auto"
        >
          Abandon quiz
        </button>
      </div>
    </div>
  );
};
