import { useState } from 'react';
import { FloatingShapes } from './components/FloatingShapes';
import { Header } from './components/Header';
import { LandingScreen } from './components/LandingScreen';
import { QuizScreen } from './components/QuizScreen';
import { RevealScreen } from './components/RevealScreen';
import { ResultScreen } from './components/ResultScreen';
import { BasketBlenderModal } from './components/BasketBlenderModal';
import { AboutDYODModal } from './components/AboutDYODModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

import { QUIZ_QUESTIONS } from './data/questions';
import { PERSONALITY_ARCHETYPES } from './data/personalities';
import { DYOD_BASKETS } from './data/baskets';
import { calculateQuizScores } from './utils/scoring';
import type { QuizScoreResult, PersonalityArchetype, CategoryId } from './types/quiz';
import { sound } from './utils/sound';

type ViewMode = 'landing' | 'quiz' | 'reveal' | 'result';

export function App() {
  const [view, setView] = useState<ViewMode>('landing');
  const [quizResult, setQuizResult] = useState<QuizScoreResult | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isBlenderOpen, setIsBlenderOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleStartQuiz = () => {
    sound.playSelect();
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteQuiz = (answers: Record<number, string>) => {
    const calculated = calculateQuizScores(answers);
    setQuizResult(calculated);
    setView('reveal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRevealComplete = () => {
    setView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    sound.playPop();
    setView('landing');
    setQuizResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomPersonality = () => {
    sound.playPop(580);
    const randomArchetype =
      PERSONALITY_ARCHETYPES[Math.floor(Math.random() * PERSONALITY_ARCHETYPES.length)];
    handleSelectSpecificArchetype(randomArchetype);
  };

  const handleSelectSpecificArchetype = (archetype: PersonalityArchetype) => {
    const dummyScores: Record<CategoryId, number> = {
      computing_ai: 40,
      math_data: 35,
      natural_sciences: 30,
      humanities_social: 45,
      engineering_tech: 35,
      environment_sustainability: 30,
      design_innovation: 40,
      business_economics: 35,
      media_communication: 35,
    };

    archetype.primaryCategories.forEach((cat) => {
      dummyScores[cat] = 92;
    });
    archetype.secondaryCategories.forEach((cat) => {
      dummyScores[cat] = 78;
    });

    const calculated: QuizScoreResult = {
      scores: dummyScores,
      normalizedScores: dummyScores,
      topCategories: [
        ...archetype.primaryCategories,
        ...archetype.secondaryCategories,
      ].slice(0, 4),
      archetype,
      suggestedBaskets: archetype.suggestedBaskets.map((b) => DYOD_BASKETS[b]),
      isBalancedMenace: archetype.id === 'multidisciplinary_menace',
    };

    setQuizResult(calculated);
    setView('reveal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream bg-graph-paper text-ink flex flex-col relative selection:bg-sunny selection:text-ink">
      {/* Decorative ambient elements */}
      <FloatingShapes />

      {/* Persistent Navigation Header */}
      <Header
        onReset={handleReset}
        onOpenBlender={() => setIsBlenderOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        showReset={view !== 'landing'}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center">
        {view === 'landing' && (
          <LandingScreen
            onStartQuiz={handleStartQuiz}
            onRandomPersonality={handleRandomPersonality}
            onOpenBlender={() => setIsBlenderOpen(true)}
          />
        )}

        {view === 'quiz' && (
          <QuizScreen
            questions={QUIZ_QUESTIONS}
            onComplete={handleCompleteQuiz}
            onCancel={handleReset}
          />
        )}

        {view === 'reveal' && (
          <RevealScreen onRevealComplete={handleRevealComplete} />
        )}

        {view === 'result' && quizResult && (
          <ResultScreen
            result={quizResult}
            onRestart={handleReset}
            onSelectArchetype={handleSelectSpecificArchetype}
            onOpenBlender={() => setIsBlenderOpen(true)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Interactive Toys & Modals */}
      <BasketBlenderModal
        isOpen={isBlenderOpen}
        onClose={() => setIsBlenderOpen(false)}
      />

      <AboutDYODModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Toast Feedback */}
      <Toast message={toastMessage} />

      {/* Footer */}
      <Footer
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenBlender={() => setIsBlenderOpen(true)}
        onReset={handleReset}
      />
    </div>
  );
}

export default App;
