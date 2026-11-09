export type CategoryId =
  | 'computing_ai'
  | 'math_data'
  | 'natural_sciences'
  | 'humanities_social'
  | 'engineering_tech'
  | 'environment_sustainability'
  | 'design_innovation'
  | 'business_economics'
  | 'media_communication';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortName: string;
  color: string;
  textColor: string;
  icon: string;
}

export type BasketId =
  | 'natural_sciences'
  | 'mathematical_sciences'
  | 'computing_data'
  | 'humanities_social'
  | 'engineering_tech'
  | 'earth_environment'
  | 'design_business'
  | 'wellness_health';

export interface Basket {
  id: BasketId;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  disciplines: string[];
  color: string; // Tailwind background / hex
  bgSoft: string;
  borderColor: string;
  icon: string;
}

export interface QuizOption {
  id: string;
  text: string;
  emoji: string;
  scores: Partial<Record<CategoryId, number>>;
  vibeSnippet?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: QuizOption[];
}

export interface PersonalityArchetype {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  badgeColor: string;
  cardColor: string;
  primaryCategories: CategoryId[];
  secondaryCategories: CategoryId[];
  suggestedBaskets: BasketId[];
  suggestedMajors: string[];
  funFact: string;
  superpower: string;
  kryptonite: string;
  quote: string;
}

export interface QuizScoreResult {
  scores: Record<CategoryId, number>;
  normalizedScores: Record<CategoryId, number>; // 0 to 100
  topCategories: CategoryId[];
  archetype: PersonalityArchetype;
  suggestedBaskets: Basket[];
  isBalancedMenace: boolean;
}
