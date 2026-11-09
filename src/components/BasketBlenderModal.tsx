import React, { useState } from 'react';
import { Sparkles, RefreshCw, Check } from 'lucide-react';
import { DYOD_BASKETS } from '../data/baskets';
import type { BasketId } from '../types/quiz';
import { sound } from '../utils/sound';

interface BasketBlenderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BlendedDegreeResult {
  title: string;
  tagline: string;
  description: string;
  courses: string[];
  wildCareer: string;
}

const BASKET_LIST = Object.values(DYOD_BASKETS);

export const BasketBlenderModal: React.FC<BasketBlenderModalProps> = ({ isOpen, onClose }) => {
  const [selectedBaskets, setSelectedBaskets] = useState<BasketId[]>([
    'computing_data',
    'design_business',
  ]);
  const [blendedResult, setBlendedResult] = useState<BlendedDegreeResult | null>(null);
  const [isBlending, setIsBlending] = useState(false);

  if (!isOpen) return null;

  const toggleBasket = (id: BasketId) => {
    sound.playPop(480);
    if (selectedBaskets.includes(id)) {
      if (selectedBaskets.length > 1) {
        setSelectedBaskets(selectedBaskets.filter((b) => b !== id));
      }
    } else {
      if (selectedBaskets.length < 3) {
        setSelectedBaskets([...selectedBaskets, id]);
      } else {
        // Replace oldest
        setSelectedBaskets([selectedBaskets[1], selectedBaskets[2], id]);
      }
    }
  };

  const handleBlend = () => {
    sound.playBoing();
    setIsBlending(true);

    setTimeout(() => {
      const titles = [
        'Algorithmic Biomimicry & Speculative Prototyping',
        'Computational Eco-Design & Green Systems Architecture',
        'Neuro-Ethical Venture Strategy & Human Experience',
        'Stochastic Philosophy & Quantum Cultural Analytics',
        'Bio-Robotic Ecology & Regenerative Hardware',
        'Mindfulness Informatics & Cognitive Interface Engineering',
        'Venture Humanities & Applied Civilizational Design',
        'Mathematical Aesthetics & Generative Spatial Computing',
      ];

      const taglines = [
        'Where abstract theory refuses to stay in the lecture hall.',
        'Solving problems that will exist 10 years from Tuesday.',
        'Zero percent conventional. One hundred percent interesting.',
        'The degree your parents will ask you to explain four times.',
      ];

      const chosenTitle = titles[Math.floor(Math.random() * titles.length)];
      const chosenTag = taglines[Math.floor(Math.random() * taglines.length)];

      const sampleCourses = [
        'DYOD 301: Advanced Procrastination in Multi-Agent Systems',
        'DYOD 412: Designing Interfaces for Confused Time Travelers',
        'DYOD 220: Thermodynamics of Coffee and Sprint Deadlines',
        'DYOD 499: Senior Capstone: Building Something Ridiculously Cool',
      ];

      const careers = [
        'Chief Chaos Officer at a Sustainable Robotics Lab',
        'Freelance Digital Philosopher & Algorithmic Ethicist',
        'Speculative Experience Architect for Space Tourism',
        'Founder of a Chai-Powered Civic Intelligence Startup',
      ];

      setBlendedResult({
        title: chosenTitle,
        tagline: chosenTag,
        description: `By fusing ${selectedBaskets.map((b) => DYOD_BASKETS[b].name).join(' + ')}, you have synthesized an unorthodox academic frontier. You operate at the intersections where breakthrough innovations actually happen.`,
        courses: sampleCourses,
        wildCareer: careers[Math.floor(Math.random() * careers.length)],
      });
      setIsBlending(false);
      sound.playFanfare();
    }, 600);
  };

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
            <span className="text-2xl">🍹</span>
            <div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-ink">
                The DYOD Basket Blender
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-bold">
                Pick 2 or 3 baskets to brew a hypothetical custom degree!
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

        {/* Baskets Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-ink-muted mb-2">
            <span>CHOOSE 2 OR 3 BASKETS ({selectedBaskets.length}/3 selected)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BASKET_LIST.map((b) => {
              const isSelected = selectedBaskets.includes(b.id);
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => toggleBasket(b.id)}
                  className={`p-2.5 rounded-xl border-2 border-ink text-left text-xs font-bold transition-all flex flex-col justify-between min-h-[72px] ${
                    isSelected
                      ? 'bg-sunny shadow-pop translate-x-0.5 translate-y-0.5'
                      : 'bg-cream-50 hover:bg-sky-light shadow-pop-sm'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] text-ink-subtle">{b.badge}</span>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-ink text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <span className="text-ink leading-tight mt-1">{b.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Blend Button */}
        <button
          onClick={handleBlend}
          disabled={selectedBaskets.length < 2 || isBlending}
          className="w-full py-3.5 rounded-2xl bg-coral border-2.5 border-ink text-ink font-heading font-black text-base sm:text-lg shadow-pop hover:shadow-pop-lg active:shadow-pop-sm disabled:opacity-50 transition-all flex items-center justify-center gap-2 mb-6"
        >
          {isBlending ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          <span>{isBlending ? 'BREWING HYBRID DEGREE...' : 'BLEND MY CUSTOM DEGREE 🍹'}</span>
        </button>

        {/* Output Area */}
        {blendedResult && (
          <div className="p-5 rounded-2xl bg-cream-50 border-2.5 border-ink shadow-pop animate-float-medium" style={{ animationIterationCount: 1 }}>
            <span className="px-3 py-0.5 rounded-full text-[11px] font-heading font-bold bg-mint border border-ink shadow-pop-sm text-ink">
              HYPOTHETICAL SYNTHESIS
            </span>

            <h4 className="font-heading font-black text-xl sm:text-2xl text-ink mt-2 mb-1">
              {blendedResult.title}
            </h4>

            <p className="text-xs sm:text-sm font-bold text-coral-dark italic mb-3">
              "{blendedResult.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-ink-muted font-semibold leading-relaxed mb-4">
              {blendedResult.description}
            </p>

            <div className="space-y-2 mb-4">
              <span className="text-[11px] font-heading font-black uppercase text-ink tracking-wider">
                Sample Imaginary Syllabus:
              </span>
              <ul className="text-xs font-bold text-ink space-y-1">
                {blendedResult.courses.map((c, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-coral">✦</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-white rounded-xl border border-ink text-xs font-bold text-ink">
              <span className="text-ink-muted">Plausible Wild Career: </span>
              <span className="text-ink">{blendedResult.wildCareer}</span>
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-[11px] text-ink-subtle">
            All blended degrees are playful fictional experiments celebrating multidisciplinary exploration.
          </p>
        </div>
      </div>
    </div>
  );
};
