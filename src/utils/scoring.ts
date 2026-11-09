import type { CategoryId, QuizScoreResult, Basket } from '../types/quiz';
import { QUIZ_QUESTIONS } from '../data/questions';
import { PERSONALITY_ARCHETYPES } from '../data/personalities';
import { DYOD_BASKETS } from '../data/baskets';

const ALL_CATEGORY_IDS: CategoryId[] = [
  'computing_ai',
  'math_data',
  'natural_sciences',
  'humanities_social',
  'engineering_tech',
  'environment_sustainability',
  'design_innovation',
  'business_economics',
  'media_communication',
];

/**
 * Calculates the total scores per category based on chosen answer IDs.
 */
export function calculateQuizScores(selectedOptionIds: Record<number, string>): QuizScoreResult {
  // Initialize zero scores
  const rawScores: Record<CategoryId, number> = ALL_CATEGORY_IDS.reduce(
    (acc, cat) => ({ ...acc, [cat]: 0 }),
    {} as Record<CategoryId, number>
  );

  let selectedAllOfEverything = false;

  // Aggregate points from answers
  QUIZ_QUESTIONS.forEach((q) => {
    const chosenOptionId = selectedOptionIds[q.id];
    if (!chosenOptionId) return;

    const option = q.options.find((o) => o.id === chosenOptionId);
    if (!option) return;

    if (option.id === 'q7_all') {
      selectedAllOfEverything = true;
    }

    Object.entries(option.scores).forEach(([cat, points]) => {
      if (cat in rawScores && points) {
        rawScores[cat as CategoryId] += points;
      }
    });
  });

  // Sort categories by score descending
  const sortedCategories = [...ALL_CATEGORY_IDS].sort(
    (a, b) => rawScores[b] - rawScores[a]
  );

  const highestScore = Math.max(...Object.values(rawScores), 1);

  // Normalize scores to percentages (scaled between 25% and 95% for realistic friendly display)
  const normalizedScores: Record<CategoryId, number> = {} as Record<CategoryId, number>;
  ALL_CATEGORY_IDS.forEach((cat) => {
    const raw = rawScores[cat];
    if (raw === 0) {
      normalizedScores[cat] = Math.floor(Math.random() * 8) + 18; // soft baseline
    } else {
      const ratio = raw / highestScore;
      normalizedScores[cat] = Math.min(96, Math.max(35, Math.round(ratio * 92)));
    }
  });

  // Check if user is "The Multidisciplinary Menace":
  // Either selected "A little bit of everything" in Q7, or top 4 categories are within 2 points of each other
  const top4Diff = rawScores[sortedCategories[0]] - rawScores[sortedCategories[3]];
  const isBalancedMenace = selectedAllOfEverything || (top4Diff <= 2 && rawScores[sortedCategories[0]] >= 5);

  let matchedArchetype = PERSONALITY_ARCHETYPES.find((a) => a.id === 'multidisciplinary_menace')!;

  if (!isBalancedMenace) {
    // Score each archetype against the user's category distribution
    let bestMatchScore = -999;

    PERSONALITY_ARCHETYPES.forEach((archetype) => {
      if (archetype.id === 'multidisciplinary_menace') return;

      let matchScore = 0;
      // Primary category matches give 4x weight
      archetype.primaryCategories.forEach((cat) => {
        matchScore += (rawScores[cat] || 0) * 4;
      });
      // Secondary category matches give 2x weight
      archetype.secondaryCategories.forEach((cat) => {
        matchScore += (rawScores[cat] || 0) * 2;
      });

      // Bonus if archetype matches top 1 category
      if (archetype.primaryCategories.includes(sortedCategories[0])) {
        matchScore += 5;
      }
      // Bonus if archetype matches top 2 category
      if (archetype.primaryCategories.includes(sortedCategories[1])) {
        matchScore += 3;
      }

      if (matchScore > bestMatchScore) {
        bestMatchScore = matchScore;
        matchedArchetype = archetype;
      }
    });
  }

  // Resolve suggested baskets
  const suggestedBaskets: Basket[] = matchedArchetype.suggestedBaskets
    .map((basketId) => DYOD_BASKETS[basketId])
    .filter(Boolean);

  // If fewer than 3 baskets suggested, fill with top categories mapped to baskets
  if (suggestedBaskets.length < 3) {
    sortedCategories.forEach((cat) => {
      const basketKey = mapCategoryToBasket(cat);
      if (basketKey && DYOD_BASKETS[basketKey] && !suggestedBaskets.some((b) => b.id === basketKey)) {
        suggestedBaskets.push(DYOD_BASKETS[basketKey]);
      }
    });
  }

  return {
    scores: rawScores,
    normalizedScores,
    topCategories: sortedCategories.slice(0, 4),
    archetype: matchedArchetype,
    suggestedBaskets: suggestedBaskets.slice(0, 4),
    isBalancedMenace,
  };
}

function mapCategoryToBasket(cat: CategoryId): keyof typeof DYOD_BASKETS {
  switch (cat) {
    case 'computing_ai':
      return 'computing_data';
    case 'math_data':
      return 'mathematical_sciences';
    case 'natural_sciences':
      return 'natural_sciences';
    case 'humanities_social':
      return 'humanities_social';
    case 'engineering_tech':
      return 'engineering_tech';
    case 'environment_sustainability':
      return 'earth_environment';
    case 'design_innovation':
    case 'business_economics':
      return 'design_business';
    case 'media_communication':
      return 'design_business';
    default:
      return 'computing_data';
  }
}
