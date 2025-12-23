// Character Classes
export type CharacterClass = "netrunner" | "solo" | "fixer" | "techie";

export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  level?: number;
  stats?: Partial<{
    strength: number;
    agility: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    willpower: number;
  }>;
  createdAt: number;
  lastLoginAt: number;
  loginStreak: number;
}

// Bio-Monitor Stats
export interface BioMonitor {
  ram: number; // 0-100 (Memória/Foco)
  hardware: number; // 0-100 (Corpo)
  cool: number; // 0-100 (Controle Emocional)
  credits: number; // 0-10000+ (Finanças)
  totalXp: number;
  totalGold: number;
}

// Daily Gigs (Hábitos)
export interface Gig {
  id: string;
  name: string;
  description: string;
  category: "study" | "training" | "meditation" | "saving";
  xpReward: number;
  goldReward: number;
  bioMonitorBonus: Partial<BioMonitor>;
  recurring: boolean; // true = diária
  completedDates: number[]; // timestamps
  createdAt: number;
}

// Bounties (Dívidas)
export interface Bounty {
  id: string;
  name: string; // Nome do "inimigo" (ex: Cartão de Crédito)
  description: string;
  totalValue: number; // R$ (valor total da dívida)
  remainingValue: number; // R$ (valor restante)
  totalAmount?: number; // Alias para totalValue (compatibilidade)
  monthlyPayment?: number; // Meta mensal de pagamento
  createdAt: number;
  paidDates: { date: number; amount: number }[]; // Histórico de pagamentos
}

// Shop Rewards
export interface Reward {
  id: string;
  name: string;
  description: string;
  costGold: number;
  category: "leisure" | "food" | "travel" | "other";
  isCustom: boolean; // true = criado pelo usuário
  createdAt: number;
}

// User Inventory
export interface InventoryItem {
  id: string;
  rewardId: string;
  purchasedAt: number;
  quantity: number;
}

// Activity / Tracking Logs
export interface TrainingLog {
  id: string;
  durationMinutes: number;
  caloriesBurned?: number;
  intensity?: 'low' | 'moderate' | 'high';
  xpGained: number;
  createdAt: number;
}

export interface MealLog {
  id: string;
  name?: string;
  calories: number;
  xpGained: number;
  createdAt: number;
}

export interface StudyLog {
  id: string;
  hours: number;
  subject?: string;
  xpGained: number;
  createdAt: number;
}

export interface WaterLog {
  id: string;
  ml: number;
  ramBoost?: number; // temporary RAM boost
  createdAt: number;
}
// Game State
export interface GameState {
  character: Character;
  bioMonitor: BioMonitor;
  gigs: Gig[];
  bounties: Bounty[];
  rewards: Reward[];
  inventory: InventoryItem[];
  trainings?: TrainingLog[];
  meals?: MealLog[];
  studies?: StudyLog[];
  waterLogs?: WaterLog[];
  lastUpdatedAt: number;
}

// Class Bonuses
export const CLASS_BONUSES: Record<CharacterClass, Partial<BioMonitor>> = {
  netrunner: { ram: 1.2 }, // 20% mais XP em estudo
  solo: { hardware: 1.2 }, // 20% mais XP em treino
  fixer: { cool: 1.2 }, // 20% mais XP em networking
  techie: { cool: 1.1, ram: 1.1 }, // 10% em ambos
};

export const CLASS_DESCRIPTIONS: Record<CharacterClass, string> = {
  netrunner: "Foco Intelectual - Bônus de XP em tarefas de estudo e organização financeira",
  solo: "Foco Físico - Bônus de XP em treinos e saúde",
  fixer: "Foco Social/Negociação - Bônus em networking e renegociação de dívidas",
  techie: "Foco Criativo/Maker - Bônus em projetos pessoais e hobbies",
};
