import React, { useEffect, useState } from 'react';
import {
  RotateCcw,
  Share2,
  Copy,
  Dices,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Flame,
  Zap,
  Info,
  Check,
} from 'lucide-react';
import type { QuizScoreResult, PersonalityArchetype, Basket } from '../types/quiz';
import { CATEGORIES } from '../data/categories';
import { ALL_BASKETS } from '../data/baskets';
import { PERSONALITY_ARCHETYPES } from '../data/personalities';
import { sound } from '../utils/sound';
import { fireCelebrationConfetti } from '../utils/confetti';
import { shareQuizResult } from '../utils/share';

interface ResultScreenProps {
  result: QuizScoreResult;
  onRestart: () => void;
  onSelectArchetype: (archetype: PersonalityArchetype) => void;
  onOpenBlender: () => void;
  onShowToast: (msg: string) => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onRestart,
  onSelectArchetype,
  onOpenBlender,
  onShowToast,
}) => {
  const { archetype, normalizedScores, topCategories, suggestedBaskets } = result;
  const [selectedBasketModal, setSelectedBasketModal] = useState<Basket | null>(null);
  const [showAllBasketsModal, setShowAllBasketsModal] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(false);

  useEffect(() => {
    sound.playFanfare();
    fireCelebrationConfetti();
  }, [archetype.id]);

  const handleShare = async () => {
    sound.playPop(550);
    const topCategoryNames = topCategories.map((c) => CATEGORIES[c].name);
    const res = await shareQuizResult(archetype, topCategoryNames);
    if (res.method === 'clipboard' && res.success) {
      setCopiedStatus(true);
      onShowToast('📋 Result copied to clipboard!');
      setTimeout(() => setCopiedStatus(false), 2500);
    } else if (res.method === 'native' && res.success) {
      onShowToast('✨ Shared successfully!');
    } else if (res.method === 'failed') {
      onShowToast('Failed to copy. Please try again.');
    }
  };

  const handleCopySummary = async () => {
    sound.playPop(520);
    const text =
      `🎓 DYOD PLAYGROUND RESULT: ${archetype.title.toUpperCase()}\n\n` +
      `"${archetype.tagline}"\n\n` +
      `${archetype.description}\n\n` +
      `⚡ Academic Energy:\n` +
      topCategories
        .map((cat) => `• ${CATEGORIES[cat].name}: ${normalizedScores[cat]}%`)
        .join('\n') +
      `\n\n🧭 Suggested DYOD Baskets:\n` +
      suggestedBaskets.map((b) => `• ${b.name}`).join('\n') +
      `\n\n💡 Exploratory Major Ideas:\n` +
      archetype.suggestedMajors.map((m) => `• ${m}`).join('\n') +
      `\n\n(For fun only. Not official academic guidance.)`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedStatus(true);
      onShowToast('📋 Full result summary copied to clipboard!');
      setTimeout(() => setCopiedStatus(false), 2500);
    } catch {
      onShowToast('Could not copy to clipboard.');
    }
  };

  const handleRandomize = () => {
    sound.playPop(620);
    const others = PERSONALITY_ARCHETYPES.filter((a) => a.id !== archetype.id);
    const randomPick = others[Math.floor(Math.random() * others.length)];
    onSelectArchetype(randomPick);
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-6 sm:py-10">
      {/* Top Banner / You Are Badge */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sunny border-2 border-ink shadow-pop-sm mb-3">
          <Sparkles className="w-4 h-4 text-ink" />
          <span className="font-heading font-black text-xs sm:text-sm tracking-wider uppercase text-ink">
            YOUR DYOD PERSONALITY REVEAL
          </span>
          <span className="text-sm">🎉</span>
        </div>

        <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-ink leading-tight tracking-tight max-w-3xl mb-2">
          YOU ARE: <span className="underline decoration-coral decoration-wavy decoration-2">{archetype.title.toUpperCase()}</span>
        </h1>

        <p className="font-heading font-bold text-base sm:text-xl text-ink-muted max-w-2xl">
          "{archetype.tagline}"
        </p>
      </div>

      {/* Main Archetype Showcase Card */}
      <div className="bg-white border-2.5 border-ink rounded-3xl p-6 sm:p-8 shadow-pop-lg mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
          {/* Avatar Icon Box */}
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-2.5 border-ink flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-pop"
            style={{ backgroundColor: archetype.badgeColor }}
          >
            {archetype.id.includes('wizard')
              ? '🧙‍♂️'
              : archetype.id.includes('chaos')
              ? '🛠️'
              : archetype.id.includes('detective')
              ? '🕵️'
              : archetype.id.includes('nature')
              ? '🌲'
              : archetype.id.includes('business')
              ? '💼'
              : archetype.id.includes('goblin')
              ? '📊'
              : archetype.id.includes('storyteller')
              ? '🎙️'
              : archetype.id.includes('inventor')
              ? '⚡'
              : archetype.id.includes('overthinker')
              ? '🌌'
              : archetype.id.includes('menace')
              ? '👾'
              : archetype.id.includes('biotech')
              ? '🧬'
              : archetype.id.includes('aesthetic')
              ? '🎨'
              : archetype.id.includes('systems')
              ? '🌐'
              : '🧠'}
          </div>

          {/* Description & Quote */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold border border-ink bg-sky-light text-ink">
                {archetype.subtitle}
              </span>
              {result.isBalancedMenace && (
                <span className="px-3 py-1 rounded-full text-xs font-bold border border-ink bg-coral-light text-ink flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  Hybrid Polymath Energy
                </span>
              )}
            </div>

            <p className="text-base sm:text-lg text-ink font-semibold leading-relaxed mb-4">
              {archetype.description}
            </p>

            <blockquote className="border-l-4 border-sunny pl-3 py-1 text-xs sm:text-sm italic font-bold text-ink-muted">
              {archetype.quote}
            </blockquote>
          </div>
        </div>

        {/* Fun Personality Quirks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t-2 border-ink/10">
          <div className="p-3.5 rounded-2xl bg-cream-50 border-2 border-ink shadow-pop-sm">
            <div className="flex items-center gap-1.5 text-xs font-heading font-black text-ink mb-1">
              <Zap className="w-4 h-4 text-sunny-dark" />
              <span>SUPERPOWER</span>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted font-bold leading-snug">
              {archetype.superpower}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-cream-50 border-2 border-ink shadow-pop-sm">
            <div className="flex items-center gap-1.5 text-xs font-heading font-black text-ink mb-1">
              <Flame className="w-4 h-4 text-coral-dark" />
              <span>FUN FACT</span>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted font-bold leading-snug">
              {archetype.funFact}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-cream-50 border-2 border-ink shadow-pop-sm">
            <div className="flex items-center gap-1.5 text-xs font-heading font-black text-ink mb-1">
              <ShieldAlert className="w-4 h-4 text-lavender-dark" />
              <span>KRYPTONITE</span>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted font-bold leading-snug">
              {archetype.kryptonite}
            </p>
          </div>
        </div>
      </div>

      {/* Academic Energy Compatibility Meter */}
      <div className="bg-white border-2.5 border-ink rounded-3xl p-6 sm:p-7 shadow-pop mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="font-heading font-black text-xl sm:text-2xl text-ink flex items-center gap-2">
              <span>Your Academic Energy</span>
              <span className="text-sm px-2 py-0.5 rounded-md bg-mint border border-ink font-body font-bold">
                Radar
              </span>
            </h2>
            <p className="text-xs text-ink-muted font-bold mt-0.5">
              Relative interest intensity based on your quiz responses (not academic eligibility)
            </p>
          </div>
          <span className="text-xs font-bold text-ink-subtle hidden sm:inline-block">
            Normalized 0–100%
          </span>
        </div>

        <div className="space-y-3.5">
          {topCategories.map((catId) => {
            const cat = CATEGORIES[catId];
            const score = normalizedScores[catId] || 40;

            return (
              <div key={catId} className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border border-ink"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-ink">{cat.name}</span>
                  </div>
                  <span className="font-heading font-black text-ink">{score}%</span>
                </div>

                <div className="w-full bg-cream-100 border-2 border-ink rounded-full h-3.5 p-0.5 shadow-pop-sm overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${score}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested DYOD Baskets (The 8 Official IUST Baskets) */}
      <div className="bg-white border-2.5 border-ink rounded-3xl p-6 sm:p-8 shadow-pop mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div>
            <h2 className="font-heading font-black text-xl sm:text-2xl text-ink flex items-center gap-2">
              <span>Suggested DYOD Academic Baskets</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sunny border border-ink font-bold">
                Curriculum Grounded
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted font-semibold mt-1">
              At IUST, DYOD students explore foundational baskets before choosing a specialization. Here are the baskets tailored to your energy:
            </p>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setShowAllBasketsModal(true);
            }}
            className="text-xs font-bold text-ink bg-lavender px-3 py-1.5 rounded-xl border border-ink shadow-pop-sm hover:shadow-pop transition-all shrink-0 self-start sm:self-auto"
          >
            View All 8 Baskets →
          </button>
        </div>

        {/* Basket Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {suggestedBaskets.map((basket) => (
            <div
              key={basket.id}
              onClick={() => {
                sound.playPop();
                setSelectedBasketModal(basket);
              }}
              className="pop-card bg-cream-50 rounded-2xl p-5 cursor-pointer text-left flex flex-col justify-between group"
              style={{ borderLeftWidth: '8px', borderLeftColor: basket.borderColor }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-heading font-bold px-2 py-0.5 rounded-md bg-white border border-ink text-ink shadow-pop-sm">
                    {basket.badge}
                  </span>
                  <span className="text-xs font-bold text-ink-muted group-hover:text-ink transition-colors">
                    Click to inspect ↗
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg text-ink leading-snug mb-1 group-hover:text-ink transition-colors">
                  {basket.name}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted font-semibold leading-relaxed mb-3">
                  {basket.tagline}
                </p>
              </div>

              {/* Sample Disciplines Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-ink/10">
                {basket.disciplines.slice(0, 3).map((disc, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-ink/30 text-ink-muted"
                  >
                    {disc}
                  </span>
                ))}
                {basket.disciplines.length > 3 && (
                  <span className="text-[10px] font-bold text-ink-subtle self-center">
                    +{basket.disciplines.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exploratory Major Directions */}
      <div className="bg-white border-2.5 border-ink rounded-3xl p-6 sm:p-7 shadow-pop mb-8">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-coral-light border border-ink text-xs font-bold text-ink">
              MULTIDISCIPLINARY COMBOS
            </span>
            <span className="text-xs text-ink-muted font-bold">• Exploratory Ideas</span>
          </div>
          <h2 className="font-heading font-black text-xl sm:text-2xl text-ink">
            Possible Major Ideas You Might Enjoy
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted font-semibold mt-1">
            In DYOD, degrees are built by synthesizing passions across baskets. Here are provocative major titles that fit your profile:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {archetype.suggestedMajors.map((major, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-cream-100 border-2 border-ink flex items-center justify-between gap-3 shadow-pop-sm hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-sunny border border-ink flex items-center justify-center text-xs font-heading font-bold text-ink shrink-0">
                  {idx + 1}
                </span>
                <span className="font-bold text-xs sm:text-sm text-ink">{major}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-ink-muted shrink-0" />
            </div>
          ))}
        </div>

        {/* Clear Disclaimer as required by PRD Section 8 */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-cream-200/60 border border-ink/20 text-xs text-ink-subtle">
          <Info className="w-4 h-4 text-ink-muted shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Important note:</strong> Your result is an exploration of interests, not an official list of IUST majors or admission eligibility. The DYOD framework allows custom major synthesis under university academic guidelines.
          </p>
        </div>
      </div>

      {/* Main Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mb-8">
        {/* Share My Chaos */}
        <button
          onClick={handleShare}
          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-coral border-2.5 border-ink text-ink font-heading font-bold text-base sm:text-lg shadow-pop hover:-translate-y-1 hover:shadow-pop-lg active:translate-y-0.5 active:shadow-pop-sm transition-all"
        >
          {copiedStatus ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5 stroke-[2.5]" />}
          <span>{copiedStatus ? 'COPIED TO CLIPBOARD!' : 'SHARE MY CHAOS'}</span>
        </button>

        {/* Copy Result */}
        <button
          onClick={handleCopySummary}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white border-2.5 border-ink text-ink font-heading font-bold text-sm sm:text-base shadow-pop hover:-translate-y-1 hover:shadow-pop-lg active:translate-y-0.5 active:shadow-pop-sm transition-all"
          title="Copy formatted text summary"
        >
          <Copy className="w-4 h-4" />
          <span>COPY RESULT</span>
        </button>

        {/* Try Again */}
        <button
          onClick={() => {
            sound.playPop();
            onRestart();
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-mint border-2.5 border-ink text-ink font-heading font-bold text-sm sm:text-base shadow-pop hover:-translate-y-1 hover:shadow-pop-lg active:translate-y-0.5 active:shadow-pop-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>TRY AGAIN</span>
        </button>
      </div>

      {/* Additional Exploration Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleRandomize}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sunny border-2 border-ink text-xs sm:text-sm font-bold text-ink shadow-pop-sm hover:-translate-y-0.5 hover:shadow-pop transition-all"
        >
          <Dices className="w-4 h-4" />
          <span>SHUFFLE OTHER PERSONALITIES</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            onOpenBlender();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lavender border-2 border-ink text-xs sm:text-sm font-bold text-ink shadow-pop-sm hover:-translate-y-0.5 hover:shadow-pop transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>MIX DEGREE IN BASKET BLENDER</span>
        </button>
      </div>

      {/* Single Basket Detail Modal */}
      {selectedBasketModal && (
        <div
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedBasketModal(null)}
        >
          <div
            className="w-full max-w-lg bg-white border-3 border-ink rounded-3xl p-6 sm:p-7 shadow-pop-xl animate-float-medium"
            style={{ animationIterationCount: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-heading font-bold border-2 border-ink shadow-pop-sm bg-sunny">
                {selectedBasketModal.badge}
              </span>
              <button
                onClick={() => setSelectedBasketModal(null)}
                className="w-8 h-8 rounded-full border-2 border-ink bg-cream flex items-center justify-center font-bold text-sm hover:bg-coral transition-colors"
              >
                ✕
              </button>
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-3xl text-ink mb-1">
              {selectedBasketModal.name}
            </h3>
            <p className="text-sm font-bold text-coral-dark mb-4">
              {selectedBasketModal.tagline}
            </p>

            <p className="text-sm text-ink-muted font-semibold leading-relaxed mb-6">
              {selectedBasketModal.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-heading font-bold text-ink uppercase tracking-wider mb-2">
                Sample Course Disciplines
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedBasketModal.disciplines.map((d, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-cream-100 border border-ink text-xs font-bold text-ink shadow-pop-sm"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedBasketModal(null)}
              className="w-full py-3 rounded-2xl bg-mint border-2.5 border-ink font-heading font-bold text-sm text-ink shadow-pop hover:shadow-pop-sm transition-all"
            >
              GOT IT!
            </button>
          </div>
        </div>
      )}

      {/* All 8 Baskets Inspection Modal */}
      {showAllBasketsModal && (
        <div
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowAllBasketsModal(false)}
        >
          <div
            className="w-full max-w-3xl bg-white border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-pop-xl my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-heading font-bold border-2 border-ink shadow-pop-sm bg-sunny">
                  THE 8 DYOD BASKETS
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-ink mt-1">
                  IUST Academic Baskets Explorer
                </h3>
              </div>
              <button
                onClick={() => setShowAllBasketsModal(false)}
                className="w-8 h-8 rounded-full border-2 border-ink bg-cream flex items-center justify-center font-bold text-sm hover:bg-coral transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-ink-muted font-semibold mb-6">
              The Design Your Own Degree program organizes all undergraduate studies into eight multidisciplinary baskets:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              {ALL_BASKETS.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl border-2 border-ink bg-cream-50 shadow-pop-sm"
                  style={{ borderLeftWidth: '6px', borderLeftColor: b.borderColor }}
                >
                  <span className="text-[10px] font-heading font-bold px-2 py-0.5 rounded bg-white border border-ink text-ink">
                    {b.badge}
                  </span>
                  <h4 className="font-heading font-bold text-base text-ink mt-1">
                    {b.name}
                  </h4>
                  <p className="text-xs text-ink-muted font-semibold mt-1">
                    {b.tagline}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAllBasketsModal(false)}
              className="w-full py-3 rounded-2xl bg-coral border-2.5 border-ink font-heading font-bold text-sm text-ink shadow-pop hover:shadow-pop-sm transition-all"
            >
              CLOSE BASKET EXPLORER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
