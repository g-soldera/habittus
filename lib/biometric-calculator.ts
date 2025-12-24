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
  const { objectives, currentTrainingFrequency, primaryTrainingType } = triage;
  const activityLevel = triage.hoursOfFocusPerDay > 6 ? 'active' : triage.currentTrainingFrequency > 0 ? 'moderate' : 'sedentary';

  // Pontuação para cada classe
  let scores = {
    netrunner: 0,
    solo: 0,
    fixer: 0,
    techie: 0,
  };

  // Análise de objetivos
  if (objectives.includes('productivity') || objectives.includes('habits')) {
    scores.netrunner += 30;
  }
  if (objectives.includes('health')) {
    scores.solo += 30;
  }
  if (objectives.includes('habits')) {
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

  // Gera estatísticas iniciais baseado na classe E nos dados da triagem
  const statBoosts = getInitialStatBoosts(selectedClass);
  const realisticStats = calculateRealisticInitialStats(triage, biometrics, statBoosts);
  const pillarBoosts = getInitialPillarBoosts(selectedClass);

  return {
    baseClass: selectedClass,
    reasoning: `Classificado como ${selectedClass.toUpperCase()} baseado em: objetivos (${objectives.join(', ')}), atividade (${activityLevel}), treino (${primaryTrainingType || 'nenhum'})`,
    statBoosts: realisticStats,
    pillarBoosts,
  };
}

/**
 * Calcula stats iniciais realísticos baseado nas respostas da triagem
 * Em vez de todos começarem em 50, ajustamos baseado no estilo de vida atual
 */
function calculateRealisticInitialStats(
  triage: TriageResponse,
  biometrics: BiometricData,
  classBoosts: Partial<UserStats>
): UserStats {
  const stats: UserStats = {
    strength: 30, // Baseline baixo
    agility: 30,
    constitution: 30,
    intelligence: 30,
    wisdom: 30,
    charisma: 30,
    willpower: 30,
  };

  // Ajustes baseados em frequência de treino
  if (triage.currentTrainingFrequency >= 5) {
    stats.strength += 25;
    stats.constitution += 20;
    stats.agility += 20;
  } else if (triage.currentTrainingFrequency >= 3) {
    stats.strength += 15;
    stats.constitution += 15;
    stats.agility += 10;
  } else if (triage.currentTrainingFrequency >= 1) {
    stats.strength += 5;
    stats.constitution += 5;
  }

  // Ajustes por tipo de treino
  if (triage.primaryTrainingType === 'strength') {
    stats.strength += 15;
    stats.constitution += 10;
  } else if (triage.primaryTrainingType === 'cardio') {
    stats.constitution += 15;
    stats.agility += 10;
  } else if (triage.primaryTrainingType === 'functional') {
    stats.agility += 15;
    stats.strength += 5;
  } else if (triage.primaryTrainingType === 'yoga') {
    stats.agility += 10;
    stats.wisdom += 10;
  }

  // Ajustes baseados em horas de estudo
  if (triage.hoursStudyPerWeek >= 20) {
    stats.intelligence += 25;
    stats.wisdom += 15;
  } else if (triage.hoursStudyPerWeek >= 10) {
    stats.intelligence += 15;
    stats.wisdom += 10;
  } else if (triage.hoursStudyPerWeek >= 5) {
    stats.intelligence += 10;
    stats.wisdom += 5;
  }

  // Ajustes baseados em horas de foco
  if (triage.hoursOfFocusPerDay >= 6) {
    stats.willpower += 20;
    stats.intelligence += 10;
  } else if (triage.hoursOfFocusPerDay >= 4) {
    stats.willpower += 15;
    stats.intelligence += 5;
  } else if (triage.hoursOfFocusPerDay >= 2) {
    stats.willpower += 10;
  }

  // Ajustes baseados em situação financeira
  if (triage.monthlyIncome > 5000 && triage.totalDebt === 0) {
    stats.charisma += 15;
    stats.wisdom += 10;
  } else if (triage.monthlyIncome > 3000) {
    stats.charisma += 10;
    stats.wisdom += 5;
  } else if (triage.totalDebt > triage.monthlyIncome * 2) {
    // Endividado = stress = -wisdom
    stats.wisdom = Math.max(20, stats.wisdom - 5);
  }

  // Ajustes baseados em sono
  if (triage.averageSleepHours >= 7 && triage.averageSleepHours <= 9) {
    stats.constitution += 10;
    stats.willpower += 5;
  } else if (triage.averageSleepHours < 6) {
    // Sono ruim = penalidade
    stats.constitution = Math.max(20, stats.constitution - 10);
    stats.willpower = Math.max(20, stats.willpower - 5);
  }

  // Ajustes baseados em IMC (biometria)
  const bmi = calculateBMI(biometrics.weightKg, biometrics.heightCm);
  if (bmi >= 18.5 && bmi <= 24.9) {
    // IMC saudável
    stats.constitution += 10;
    stats.agility += 5;
  } else if (bmi >= 30) {
    // Obesidade = penalidade em agilidade
    stats.agility = Math.max(20, stats.agility - 10);
    stats.constitution = Math.max(20, stats.constitution - 5);
  } else if (bmi < 18.5) {
    // Abaixo do peso = penalidade em força
    stats.strength = Math.max(20, stats.strength - 10);
    stats.constitution = Math.max(20, stats.constitution - 5);
  }

  // Aplica boosts de classe por cima dos stats realísticos
  return {
    strength: Math.min(100, stats.strength + (classBoosts.strength || 0)),
    agility: Math.min(100, stats.agility + (classBoosts.agility || 0)),
    constitution: Math.min(100, stats.constitution + (classBoosts.constitution || 0)),
    intelligence: Math.min(100, stats.intelligence + (classBoosts.intelligence || 0)),
    wisdom: Math.min(100, stats.wisdom + (classBoosts.wisdom || 0)),
    charisma: Math.min(100, stats.charisma + (classBoosts.charisma || 0)),
    willpower: Math.min(100, stats.willpower + (classBoosts.willpower || 0)),
  };
}

/**
 * Retorna os boosts de status iniciais para cada classe
 */
export function getInitialStatBoosts(classType: ClassType): Partial<UserStats> {
  // Boosts ADICIONAIS da classe (não começa em 50, começa em 0)
  // Os stats base já vêm de calculateRealisticInitialStats
  const classBoosts: Record<ClassType, Partial<UserStats>> = {
    netrunner: {
      intelligence: 20,
      wisdom: 15,
      strength: -10,
      agility: -5,
    },
    solo: {
      strength: 25,
      constitution: 20,
      agility: -10,
    },
    fixer: {
      charisma: 15,
      wisdom: 15,
      constitution: 15,
    },
    techie: {
      agility: 25,
      intelligence: 10,
      strength: -10,
    },
    cyborg: {
      strength: 30,
      agility: 30,
      constitution: 10,
    },
    hacker: {
      intelligence: 30,
      wisdom: 25,
      charisma: 20,
    },
    gladiador: {
      strength: 28,
      constitution: 28,
      charisma: 20,
    },
    ninja: {
      agility: 30,
      intelligence: 28,
      wisdom: 10,
    },
    tita: {
      strength: 35,
      agility: 30,
      constitution: 35,
      charisma: 15,
    },
    mestre: {
      intelligence: 35,
      wisdom: 35,
      charisma: 25,
    },
    'ser-supremo': {
      // Ser supremo já tem stats máximos
      strength: 70,
      agility: 70,
      constitution: 70,
      intelligence: 70,
      wisdom: 70,
      charisma: 70,
      willpower: 70,
    },
  };

  return classBoosts[classType];
}

/**
 * Retorna os boosts de pilares iniciais para cada classe
 */
export function getInitialPillarBoosts(classType: ClassType): Partial<any> {
  const basePillars = {
    health: 50,
    nutrition: 50,
    study: 50,
    productivity: 50,
    finance: 50,
    habits: 50,
    social: 50,
  };

  const pillarBoosts: Record<ClassType, Partial<any>> = {
    netrunner: { study: 70, productivity: 65 },
    solo: { health: 70, nutrition: 65 },
    fixer: { finance: 70, social: 65, habits: 60 },
    techie: { habits: 70, health: 65 },
    cyborg: { health: 75, habits: 70 },
    hacker: { study: 75, productivity: 70, finance: 65 },
    gladiador: { health: 75, finance: 70, social: 65 },
    ninja: { habits: 75, study: 70 },
    tita: { health: 80, habits: 75, finance: 70 },
    mestre: { study: 80, productivity: 75, social: 70 },
    'ser-supremo': { health: 100, nutrition: 100, study: 100, productivity: 100, finance: 100, habits: 100, social: 100 },
  };

  return pillarBoosts[classType];
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
