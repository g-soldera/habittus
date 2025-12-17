import { GameState, Gig, Bounty, Reward, Character, BioMonitor } from "@/types";

// Mock Default Gigs (Daily Habits)
export const DEFAULT_GIGS: Gig[] = [
  {
    id: "gig-1",
    name: "Beber água",
    description: "Mantenha-se hidratado. Beba 2L de água.",
    category: "saving",
    xpReward: 10,
    goldReward: 5,
    bioMonitorBonus: { ram: 2 },
    recurring: true,
    completedDates: [],
    createdAt: Date.now(),
  },
  {
    id: "gig-2",
    name: "Ler 10 páginas",
    description: "Expanda seu conhecimento. Leia 10 páginas de um livro.",
    category: "study",
    xpReward: 20,
    goldReward: 10,
    bioMonitorBonus: { ram: 5 },
    recurring: true,
    completedDates: [],
    createdAt: Date.now(),
  },
  {
    id: "gig-3",
    name: "Treinar 30 min",
    description: "Fortaleça seu corpo. Faça 30 minutos de exercício.",
    category: "training",
    xpReward: 30,
    goldReward: 15,
    bioMonitorBonus: { hardware: 8 },
    recurring: true,
    completedDates: [],
    createdAt: Date.now(),
  },
  {
    id: "gig-4",
    name: "Meditar 10 min",
    description: "Acalme sua mente. Medite por 10 minutos.",
    category: "meditation",
    xpReward: 15,
    goldReward: 8,
    bioMonitorBonus: { cool: 5 },
    recurring: true,
    completedDates: [],
    createdAt: Date.now(),
  },
  {
    id: "gig-5",
    name: "Poupar R$ 50",
    description: "Acumule riqueza. Coloque R$ 50 na poupança.",
    category: "saving",
    xpReward: 25,
    goldReward: 20,
    bioMonitorBonus: { credits: 50 },
    recurring: true,
    completedDates: [],
    createdAt: Date.now(),
  },
];

// Mock Default Bounties (Debts)
export const DEFAULT_BOUNTIES: Bounty[] = [
  {
    id: "bounty-1",
    name: "Cartão de Crédito",
    description: "Inimigo corporativo. Dívida de cartão de crédito.",
    totalValue: 5000,
    remainingValue: 5000,
    createdAt: Date.now(),
    paidDates: [],
  },
  {
    id: "bounty-2",
    name: "Empréstimo Pessoal",
    description: "Agente de cobrança. Dívida de empréstimo pessoal.",
    totalValue: 10000,
    remainingValue: 10000,
    createdAt: Date.now(),
    paidDates: [],
  },
  {
    id: "bounty-3",
    name: "Conta de Telefone",
    description: "Drone de cobrança. Conta de telefone atrasada.",
    totalValue: 500,
    remainingValue: 500,
    createdAt: Date.now(),
    paidDates: [],
  },
];

// Mock Default Rewards (Shop Items)
export const DEFAULT_REWARDS: Reward[] = [
  {
    id: "reward-1",
    name: "Ingresso de Cinema",
    description: "Aproveite uma sessão de filme no cinema.",
    costGold: 100,
    category: "leisure",
    isCustom: false,
    createdAt: Date.now(),
  },
  {
    id: "reward-2",
    name: "Pizza",
    description: "Saboreie uma deliciosa pizza.",
    costGold: 80,
    category: "food",
    isCustom: false,
    createdAt: Date.now(),
  },
  {
    id: "reward-3",
    name: "Passagem de Ônibus",
    description: "Viaje para um lugar novo.",
    costGold: 50,
    category: "travel",
    isCustom: false,
    createdAt: Date.now(),
  },
  {
    id: "reward-4",
    name: "Café Premium",
    description: "Desfrute de um café de qualidade.",
    costGold: 30,
    category: "food",
    isCustom: false,
    createdAt: Date.now(),
  },
  {
    id: "reward-5",
    name: "Livro Novo",
    description: "Expanda sua biblioteca pessoal.",
    costGold: 120,
    category: "leisure",
    isCustom: false,
    createdAt: Date.now(),
  },
];

// Create default character
export const createDefaultCharacter = (name: string, characterClass: string): Character => ({
  id: `char-${Date.now()}`,
  name,
  class: characterClass as any,
  createdAt: Date.now(),
  lastLoginAt: Date.now(),
  loginStreak: 1,
});

// Create default bio-monitor
export const createDefaultBioMonitor = (): BioMonitor => ({
  ram: 0,
  hardware: 0,
  cool: 0,
  credits: 0,
  totalXp: 0,
  totalGold: 0,
});

// Create default game state
export const createDefaultGameState = (
  character: Character,
  bioMonitor: BioMonitor
): GameState => ({
  character,
  bioMonitor,
  gigs: DEFAULT_GIGS,
  bounties: DEFAULT_BOUNTIES,
  rewards: DEFAULT_REWARDS,
  inventory: [],
  lastUpdatedAt: Date.now(),
});
