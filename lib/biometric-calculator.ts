import { BiometricData, UserStats, ClassType, ClassificationResult, TriageResponse } from '@/types/biometric';

/**
 * Calcula TMB (Taxa Metabólica Basal) usando fórmula de Mifflin-St Jeor
 */
export function calculateTMB(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female'
): number {
  if (gender === 'male') {
    return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  } else {
    return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }
}

/**
 * Calcula TDEE (Total Daily Energy Expenditure) baseado em atividade
 */
export function calculateTDEE(
  tmb: number,
  activityLevel: 'sedentary' | 'moderate' | 'active'
): number {
  const multipliers = {
    sedentary: 1.2,
    moderate: 1.55,
    active: 1.725,
  };
  return tmb * multipliers[activityLevel];
}

/**
 * Calcula IMC (Índice de Massa Corporal)
 */
export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Classifica o usuário em uma classe base automaticamente
 */
export function classifyUser(triage: TriageResponse, biometrics: BiometricData): ClassificationResult {
  const { objectives, currentTrainingFrequency, primaryTrainingType, activityLevel } = triage;

  // Pontuação para cada classe
  let scores = {
    netrunner: 0,
    solo: 0,
    fixer: 0,
    techie: 0,
  };

  // Análise de objetivos
  if (objectives.includes('Melhorar produtividade') || objectives.includes('Reduzir estresse')) {
    scores.netrunner += 30;
  }
  if (objectives.includes('Ganhar massa muscular')) {
    scores.solo += 30;
  }
  if (objectives.includes('Aumentar flexibilidade') || objectives.includes('Melhorar mobilidade')) {
    scores.techie += 30;
  }
  if (objectives.length > 2) {
    scores.fixer += 20;
  }

  // Análise de rotina
  if (activityLevel === 'sedentary') {
    scores.netrunner += 20;
  } else if (activityLevel === 'active') {
    scores.solo += 20;
    scores.techie += 15;
  }

  // Análise de treino
  if (currentTrainingFrequency >= 3) {
    if (primaryTrainingType === 'strength') {
      scores.solo += 25;
    } else if (primaryTrainingType === 'functional' || primaryTrainingType === 'yoga') {
      scores.techie += 25;
    } else if (primaryTrainingType === 'cardio') {
      scores.fixer += 15;
    }
  }

  // Encontra classe com maior pontuação
  let maxScore = 0;
  let selectedClass: ClassType = 'fixer';
  
  for (const [className, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      selectedClass = className as ClassType;
    }
  }

  // Se nenhuma classe tem pontuação clara, usa Fixer como padrão
  if (maxScore < 20) {
    selectedClass = 'fixer';
  }

  // Gera estatísticas iniciais baseado na classe
  const statBoosts = getInitialStatBoosts(selectedClass);

  return {
    baseClass: selectedClass,
    reasoning: `Classificado como ${selectedClass.toUpperCase()} baseado em: objetivos (${objectives.join(', ')}), atividade (${activityLevel}), treino (${primaryTrainingType || 'nenhum'})`,
    statBoosts,
  };
}

/**
 * Retorna os boosts de status iniciais para cada classe
 */
export function getInitialStatBoosts(classType: ClassType): Partial<UserStats> {
  const baseStats: UserStats = {
    strength: 50,
    agility: 50,
    constitution: 50,
    intelligence: 50,
    wisdom: 50,
    charisma: 50,
  };

  const classBoosts: Record<ClassType, Partial<UserStats>> = {
    netrunner: {
      intelligence: baseStats.intelligence + 20,
      wisdom: baseStats.wisdom + 15,
      strength: baseStats.strength - 10,
      agility: baseStats.agility - 5,
    },
    solo: {
      strength: baseStats.strength + 25,
      constitution: baseStats.constitution + 20,
      agility: baseStats.agility - 10,
    },
    fixer: {
      charisma: baseStats.charisma + 15,
      wisdom: baseStats.wisdom + 15,
      constitution: baseStats.constitution + 15,
    },
    techie: {
      agility: baseStats.agility + 25,
      intelligence: baseStats.intelligence + 10, // Destreza não existe, usa INT como proxy
      strength: baseStats.strength - 10,
    },
    cyborg: {
      strength: baseStats.strength + 30,
      agility: baseStats.agility + 30,
      constitution: baseStats.constitution + 10,
    },
    hacker: {
      intelligence: baseStats.intelligence + 30,
      wisdom: baseStats.wisdom + 25,
      charisma: baseStats.charisma + 20,
    },
    gladiador: {
      strength: baseStats.strength + 28,
      constitution: baseStats.constitution + 28,
      charisma: baseStats.charisma + 20,
    },
    ninja: {
      agility: baseStats.agility + 30,
      intelligence: baseStats.intelligence + 28,
      wisdom: baseStats.wisdom + 10,
    },
    tita: {
      strength: baseStats.strength + 35,
      agility: baseStats.agility + 30,
      constitution: baseStats.constitution + 35,
      charisma: baseStats.charisma + 15,
    },
    mestre: {
      intelligence: baseStats.intelligence + 35,
      wisdom: baseStats.wisdom + 35,
      charisma: baseStats.charisma + 25,
    },
    'ser-supremo': {
      strength: 100,
      agility: 100,
      constitution: 100,
      intelligence: 100,
      wisdom: 100,
      charisma: 100,
    },
  };

  return classBoosts[classType];
}

/**
 * Calcula ganho/perda de peso baseado em calorias
 */
export function calculateWeightChange(
  currentWeight: number,
  caloriesConsumed: number,
  tdee: number,
  daysElapsed: number = 1
): number {
  // 1 kg = 7700 calorias
  const calorieDeficit = (caloriesConsumed - tdee) * daysElapsed;
  const weightChangeKg = calorieDeficit / 7700;
  return currentWeight + weightChangeKg;
}

/**
 * Calcula mudança no percentual de gordura baseado em treino e nutrição
 */
export function calculateBodyFatChange(
  currentBodyFat: number,
  stats: UserStats,
  calorieDeficit: number,
  trainingType: 'strength' | 'cardio' | 'functional' | 'yoga' | null
): number {
  let change = 0;

  // Treino de força preserva/aumenta músculo enquanto perde gordura
  if (trainingType === 'strength') {
    change = -0.5; // Perde 0.5% de gordura
  } else if (trainingType === 'cardio') {
    change = -0.7; // Perde 0.7% de gordura
  } else if (trainingType === 'functional') {
    change = -0.6; // Perde 0.6% de gordura
  } else if (trainingType === 'yoga') {
    change = -0.3; // Perde 0.3% de gordura
  }

  // Influência de stats
  if (stats.strength > 70) change -= 0.1; // Mais força = mais preservação muscular
  if (stats.agility > 70) change -= 0.15; // Mais agilidade = mais queima de gordura

  return Math.max(5, Math.min(50, currentBodyFat + change)); // Min 5%, Max 50%
}

/**
 * Calcula XP ganho baseado em atividade
 */
export function calculateXPGain(
  activity: 'training' | 'task' | 'social' | 'sleep',
  classType: ClassType,
  intensity?: 'low' | 'medium' | 'high'
): number {
  const baseXP: Record<string, number> = {
    training: 50,
    task: 30,
    social: 20,
    sleep: 10,
  };

  let xp = baseXP[activity] || 0;

  // Intensidade do treino
  if (intensity === 'medium') xp *= 1.25;
  if (intensity === 'high') xp *= 1.5;

  // Bonus de classe
  const classBonus: Record<ClassType, number> = {
    netrunner: activity === 'task' ? 1.15 : 1,
    solo: activity === 'training' ? 1.2 : 1,
    fixer: 1.1, // Bonus em tudo
    techie: activity === 'training' ? 1.2 : 1,
    cyborg: activity === 'training' ? 1.25 : 1,
    hacker: activity === 'task' ? 1.2 : 1,
    gladiador: activity === 'training' ? 1.18 : (activity === 'social' ? 1.15 : 1),
    ninja: activity === 'training' ? 1.2 : (activity === 'task' ? 1.15 : 1),
    tita: activity === 'training' ? 1.25 : 1,
    mestre: 1.25, // Bonus em tudo
    'ser-supremo': 1.5, // Bonus em tudo
  };

  return Math.round(xp * (classBonus[classType] || 1));
}

/**
 * Calcula decay de status por dia sem atividade
 */
export function calculateStatusDecay(
  currentStat: number,
  daysSinceActivity: number,
  maxDecayDays: number = 30
): number {
  if (daysSinceActivity === 0) return currentStat;
  
  const decayPercentagePerDay = 0.05; // 5% por dia
  const totalDecay = Math.min(daysSinceActivity, maxDecayDays) * decayPercentagePerDay;
  
  return Math.max(0, currentStat * (1 - totalDecay));
}

/**
 * Verifica se usuário desbloqueou uma classe secreta
 */
export function checkClassUnlock(stats: UserStats, streak: number, trainings: Record<string, number>): ClassType | null {
  // Cyborg: Solo + Techie
  if (stats.strength >= 70 && stats.agility >= 70 && streak >= 30 && 
      (trainings['strength'] || 0) >= 50 && (trainings['functional'] || 0) >= 50) {
    return 'cyborg';
  }

  // Hacker: Netrunner + Fixer
  if (stats.intelligence >= 75 && stats.charisma >= 65 && streak >= 40 &&
      (trainings['task'] || 0) >= 100 && (trainings['social'] || 0) >= 50) {
    return 'hacker';
  }

  // Gladiador: Solo + Fixer
  if (stats.strength >= 75 && stats.charisma >= 70 && streak >= 35 &&
      (trainings['strength'] || 0) >= 60 && (trainings['social'] || 0) >= 40) {
    return 'gladiador';
  }

  // Ninja: Techie + Netrunner
  if (stats.agility >= 75 && stats.intelligence >= 70 && streak >= 38 &&
      (trainings['functional'] || 0) >= 50 && (trainings['task'] || 0) >= 80) {
    return 'ninja';
  }

  // Titã: Solo + Techie + Fixer
  if (stats.strength >= 80 && stats.agility >= 75 && stats.constitution >= 80 && streak >= 60 &&
      (trainings['strength'] || 0) >= 80 && (trainings['functional'] || 0) >= 80 && (trainings['social'] || 0) >= 60) {
    return 'tita';
  }

  // Mestre: Netrunner + Fixer + Techie
  if (stats.intelligence >= 80 && stats.wisdom >= 80 && stats.charisma >= 75 && streak >= 65 &&
      (trainings['task'] || 0) >= 100 && (trainings['social'] || 0) >= 60 && (trainings['functional'] || 0) >= 60) {
    return 'mestre';
  }

  // Ser Supremo: Todas as classes
  if (Object.values(stats).every(s => s >= 90) && streak >= 365 &&
      (trainings['strength'] || 0) >= 200 && (trainings['functional'] || 0) >= 200 &&
      (trainings['task'] || 0) >= 200 && (trainings['social'] || 0) >= 100) {
    return 'ser-supremo';
  }

  return null;
}
