/**
 * STATUS RPG SYSTEM - DOCUMENTATION
 * 
 * Habittus uses a 7-stat RPG system to represent user progress:
 * 
 * 1. Strength (STR) — Treino de força, musculatura
 * 2. Agility (AGI) — Cardio, flexibilidade, mobilidade
 * 3. Constitution (CON) — Nutrição, composição corporal, saúde geral
 * 4. Intelligence (INT) — Estudo, aprendizado, produtividade
 * 5. Wisdom (WIS) — Hábitos, meditação, reflexão, sleep quality
 * 6. Charisma (CHA) — Social, networking, mentoria, comunidade
 * 7. Willpower (WIL) — Streak, disciplina, consistência
 * 
 * ## Initial Stats Range (Base)
 * Stats start between 50-70 for base classes, with class-specific boosts.
 * Special classes (Cyborg, Hacker, etc.) have higher initial stats (up to 85).
 * Ser Supremo has 100 in all stats (unlock only at 1-year streak with all pillars 90+).
 * 
 * ## Stat Growth Mechanisms
 * 1. Activity Completion: Each tracked activity grants XP and stat gains
 *    - Training (strength + agility or constitution)
 *    - Study (intelligence)
 *    - Meditation (wisdom)
 *    - Social interaction (charisma)
 *    - Daily consistency (willpower)
 * 
 * 2. Decay (Inactivity): Stats decay -5% per day without activity
 *    - Decay is applied per stat type (strength decays if no training)
 *    - Decay is calculated on app open
 * 
 * ## Pillar System (Parallel)
 * 7 life pillars have separate stats (0-100):
 * - Health (Saúde Física)
 * - Nutrition (Nutrição)
 * - Study (Estudo)
 * - Productivity (Produtividade)
 * - Finance (Finanças)
 * - Habits (Hábitos)
 * - Social (Social)
 * 
 * Pillar stats affect class unlock requirements and progression.
 * 
 * ## XP Calculation
 * Activity XP = Base XP × Class Bonus × Intensity Multiplier
 * Example: Training (50 base) × Solo bonus (1.2) × High intensity (1.5) = 90 XP
 * 
 * ## Display & UI
 * - Dashboard shows 7 stats as bars (0-100 scale)
 * - Stats can exceed 100 for special achievements
 * - Color coding: Green (high), Yellow (medium), Red (low)
 * - Decay warning: Yellow bar if stat < 30 and no activity for 3+ days
 */

export const STATUS_SYSTEM_DOCS = {
  stats: {
    strength: 'Força — Treino de força, musculatura, resistência',
    agility: 'Agilidade — Cardio, flexibilidade, mobilidade, coordenação',
    constitution: 'Constituição — Nutrição, composição, saúde geral, resistência fisiológica',
    intelligence: 'Inteligência — Estudo, aprendizado, produtividade, foco',
    wisdom: 'Sabedoria — Hábitos, meditação, reflexão, qualidade de sono',
    charisma: 'Carisma — Social, networking, mentoria, liderança, comunidade',
    willpower: 'Vontade — Streak, disciplina, consistência, força de vontade',
  },
  initialRanges: {
    baseClasses: '50-70 (com boosts por classe)',
    hybridClasses: '60-85 (Cyborg, Hacker, Gladiador, Ninja)',
    tripleClasses: '65-85 (Titã, Mestre)',
    supremeClass: '100 (Ser Supremo — unlock especial)',
  },
  decayMechanic: 'Decay: -5% por dia sem atividade (calculado ao abrir app)',
  xpFormula: 'XP = BaseXP × Class_Bonus × Intensity_Multiplier',
};
