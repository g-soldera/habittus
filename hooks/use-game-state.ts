import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import {
  createDefaultBioMonitor,
  createDefaultCharacter,
  createDefaultGameState,
  DEFAULT_GIGS,
  DEFAULT_REWARDS,
} from "@/lib/mock-data";
import {
  createTrainingLog,
  createMealLog,
  createStudyLog,
  createWaterLog,
} from '@/lib/tracking';
import { GameState, Gig, Bounty, Reward, InventoryItem, BioMonitor } from "@/types";
import { UserProfile, BiometricData, ClassType, TriageResponse } from "@/types/biometric";

const GAME_STATE_KEY = "habittus_game_state";
const USER_PROFILE_KEY = "habittus_user_profile";

export function useGameState() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);

  // User profile state (persisted separately)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Load game state and user profile from AsyncStorage
  useEffect(() => {
    loadGameState();
    loadUserProfile();
  }, []);

  const loadGameState = async () => {
    try {
      const stored = await AsyncStorage.getItem(GAME_STATE_KEY);
      if (stored) {
        const state = JSON.parse(stored) as GameState;
        setGameState(state);

        // If saved state is stale, apply daily decay automatically
        try {
          const MS_PER_DAY = 1000 * 60 * 60 * 24;
          const days = Math.floor((Date.now() - (state.lastUpdatedAt || 0)) / MS_PER_DAY);
          if (days > 0) {
            const { applyDailyDecay: applyDecay } = await import('@/lib/status');
            const newBio = applyDecay(state.bioMonitor, days);
            state.bioMonitor = newBio;
            state.lastUpdatedAt = Date.now();
            await AsyncStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
            setGameState(state);
          }
        } catch (err) {
          console.error('[GameState] Error applying startup decay:', err);
        }
      } else {
        setGameState(null);
      }
    } catch (error) {
      console.error("[GameState] Error loading state:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem(USER_PROFILE_KEY);
      if (stored) {
        const profile = JSON.parse(stored) as UserProfile;
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error("[GameState] Error loading user profile:", error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const saveGameState = async (state: GameState) => {
    try {
      await AsyncStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
      setGameState(state);
    } catch (error) {
      console.error("[GameState] Error saving state:", error);
    }
  };

  const createNewGame = async (
    characterName: string,
    characterClass: string,
    bioMonitorOverride?: BioMonitor
  ) => {
    const character = createDefaultCharacter(characterName, characterClass);
    const bioMonitor = bioMonitorOverride || createDefaultBioMonitor();
    const newState = createDefaultGameState(character, bioMonitor);
    await saveGameState(newState);
    return newState;
  };

  const completeGig = async (gigId: string) => {
    if (!gameState) return;

    const updatedState = { ...gameState };
    const gig = updatedState.gigs.find((g) => g.id === gigId);

    if (gig) {
      // Add today's date to completed dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      gig.completedDates.push(today.getTime());

      // Update bio-monitor and gold
      updatedState.bioMonitor.totalXp += gig.xpReward;
      updatedState.bioMonitor.totalGold += gig.goldReward;

      // Apply bio-monitor bonuses
      if (gig.bioMonitorBonus.ram) {
        updatedState.bioMonitor.ram = Math.min(
          100,
          updatedState.bioMonitor.ram + gig.bioMonitorBonus.ram
        );
      }
      if (gig.bioMonitorBonus.hardware) {
        updatedState.bioMonitor.hardware = Math.min(
          100,
          updatedState.bioMonitor.hardware + gig.bioMonitorBonus.hardware
        );
      }
      if (gig.bioMonitorBonus.cool) {
        updatedState.bioMonitor.cool = Math.min(
          100,
          updatedState.bioMonitor.cool + gig.bioMonitorBonus.cool
        );
      }
      if (gig.bioMonitorBonus.credits) {
        updatedState.bioMonitor.credits += gig.bioMonitorBonus.credits;
      }

      // Check if all gigs are completed today
      const today_str = today.getTime();
      const allGigsCompletedToday = updatedState.gigs.every((g) =>
        g.completedDates.includes(today_str)
      );

      if (allGigsCompletedToday) {
        // Increment streak
        updatedState.character.loginStreak += 1;
      }

      updatedState.lastUpdatedAt = Date.now();
      await saveGameState(updatedState);
    }
  };

  const payBounty = async (bountyId: string, amount: number) => {
    if (!gameState) return;

    const updatedState = { ...gameState };
    const bounty = updatedState.bounties.find((b) => b.id === bountyId);

    if (bounty && amount > 0) {
      const goldCost = amount; // 1 Gold = R$ 1
      if (updatedState.bioMonitor.totalGold >= goldCost) {
        const previousRemaining = bounty.remainingValue;
        bounty.remainingValue = Math.max(0, bounty.remainingValue - amount);
        bounty.paidDates.push({ date: Date.now(), amount });
        updatedState.bioMonitor.totalGold -= goldCost;
        updatedState.bioMonitor.credits += amount; // Credits increase with payment

        console.log(`[PayBounty] ${bounty.name}: R$${previousRemaining} → R$${bounty.remainingValue} (pagou R$${amount})`);
        console.log(`[PayBounty] Total de pagamentos: ${bounty.paidDates.length}`);

        updatedState.lastUpdatedAt = Date.now();
        await saveGameState(updatedState);
        setGameState(updatedState); // Force UI update
      } else {
        console.warn(`[PayBounty] Gold insuficiente! Necessário: ${goldCost}, Disponível: ${updatedState.bioMonitor.totalGold}`);
      }
    }
  };

  const logWorkout = async (durationMinutes: number, intensity: 'low' | 'moderate' | 'high' = 'moderate', caloriesBurned?: number) => {
    if (!gameState) return;
    const updatedState = { ...gameState } as GameState;
    const entry = createTrainingLog(durationMinutes, intensity, caloriesBurned);
    updatedState.trainings = updatedState.trainings || [];
    updatedState.trainings.push(entry);
    // Apply XP and small hardware boost
    updatedState.bioMonitor.totalXp += entry.xpGained;
    updatedState.bioMonitor.hardware = Math.min(100, updatedState.bioMonitor.hardware + Math.round(entry.xpGained / 10));

    updatedState.lastUpdatedAt = Date.now();
    await saveGameState(updatedState);
  };

  const logStudy = async (hours: number, subject?: string) => {
    if (!gameState) return;
    const updatedState = { ...gameState } as GameState;
    const entry = createStudyLog(hours, subject);
    updatedState.studies = updatedState.studies || [];
    updatedState.studies.push(entry);
    updatedState.bioMonitor.totalXp += entry.xpGained;
    updatedState.bioMonitor.ram = Math.min(100, updatedState.bioMonitor.ram + Math.round(entry.xpGained / 25));
    updatedState.lastUpdatedAt = Date.now();
    await saveGameState(updatedState);
  };

  const logMeal = async (calories: number, name?: string) => {
    if (!gameState) return;
    const updatedState = { ...gameState } as GameState;
    const entry = createMealLog(calories, name);
    updatedState.meals = updatedState.meals || [];
    updatedState.meals.push(entry);
    updatedState.bioMonitor.totalXp += entry.xpGained;
    // Small credits reward for logging nutrition
    updatedState.bioMonitor.credits += Math.round(calories / 200);
    updatedState.lastUpdatedAt = Date.now();
    await saveGameState(updatedState);
  };

  const logWater = async (ml: number) => {
    if (!gameState) return;
    const updatedState = { ...gameState } as GameState;
    const entry = createWaterLog(ml);
    updatedState.waterLogs = updatedState.waterLogs || [];
    updatedState.waterLogs.push(entry);
    // Apply RAM boost immediately
    updatedState.bioMonitor.ram = Math.min(100, updatedState.bioMonitor.ram + (entry.ramBoost || 0));
    updatedState.lastUpdatedAt = Date.now();
    await saveGameState(updatedState);
  };

  // Apply daily decay to bioMonitor (can be called by scheduler or UI)
  const applyDailyDecay = async (days = 1) => {
    if (!gameState) return;
    const updatedState = { ...gameState } as GameState;
    const newBio = (await import('@/lib/status')).applyDailyDecay(updatedState.bioMonitor, days);
    updatedState.bioMonitor = newBio;
    updatedState.lastUpdatedAt = Date.now();
    await saveGameState(updatedState);
    return updatedState;
  };

  /**
   * Check for class unlocks based on userProfile stats and training history.
   * If a new class is unlocked, add to userProfile.unlockedClasses and optionally set currentClass.
   */
  const evaluateClassUnlocks = async () => {
    try {
      if (!userProfile || !gameState) return null;

      // derive trainings counts from gameState.trainings
      const trainingsCount: Record<string, number> = {};
      (gameState.trainings || []).forEach(t => {
        const key = (t as any).intensity ? (t as any).intensity : (t as any).type || 'unknown';
        // prefer using type if available
        const type = (t as any).type || key;
        trainingsCount[type] = (trainingsCount[type] || 0) + 1;
      });

      const { checkClassUnlock } = await import('@/lib/biometric-calculator');
      const newClass = checkClassUnlock(userProfile.stats as any, userProfile.streak || 0, trainingsCount);

      if (newClass && !userProfile.unlockedClasses.includes(newClass)) {
        const updatedProfile = { ...userProfile };
        updatedProfile.unlockedClasses = [...updatedProfile.unlockedClasses, newClass];
        updatedProfile.currentClass = newClass;
        await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(updatedProfile));
        setUserProfile(updatedProfile);
        return newClass;
      }

      return null;
    } catch (error) {
      console.error('[GameState] Error evaluating class unlocks', error);
      return null;
    }
  };

  const purchaseReward = async (rewardId: string) => {
    if (!gameState) return;

    const reward = gameState.rewards.find((r) => r.id === rewardId);
    if (!reward) return;

    // Calculate discount based on streak
    const discount = Math.min(0.5, gameState.character.loginStreak * 0.02);
    const finalCost = Math.floor(reward.costGold * (1 - discount));

    // Try server-side authoritative purchase if available; if not, fall back to client optimistic update
    try {
      if (typeof fetch !== 'undefined') {
        const res = await fetch('/api/shop/purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rewardId, cost: finalCost }),
        });
        const json = await res.json();
        if (!json.success) return; // server declined purchase
      }
    } catch (e) {
      // network or server error - proceed with optimistic client update
    }

    if (gameState.bioMonitor.totalGold >= finalCost) {
      const updatedState = { ...gameState };
      updatedState.bioMonitor.totalGold -= finalCost;

      // Add to inventory
      const existingItem = updatedState.inventory.find((i) => i.rewardId === rewardId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        updatedState.inventory.push({
          id: `inv-${Date.now()}`,
          rewardId,
          purchasedAt: Date.now(),
          quantity: 1,
        });
      }

      updatedState.lastUpdatedAt = Date.now();
      await saveGameState(updatedState);
    }
  };

  const addCustomReward = async (
    name: string,
    description: string,
    costGold: number,
    category: string
  ) => {
    if (!gameState) return;

    const newReward: Reward = {
      id: `reward-custom-${Date.now()}`,
      name,
      description,
      costGold,
      category: category as any,
      isCustom: true,
      createdAt: Date.now(),
    };

    const updatedState = { ...gameState };
    updatedState.rewards.push(newReward);
    updatedState.lastUpdatedAt = Date.now();
    await saveGameState(updatedState);
  };

  const resetGame = async () => {
    try {
      await AsyncStorage.removeItem(GAME_STATE_KEY);
      await AsyncStorage.removeItem(USER_PROFILE_KEY);
      setGameState(null);
      setUserProfile(null);
      console.log('[GameState] Game reset successfully');
    } catch (error) {
      console.error("[GameState] Error resetting game:", error);
    }
  };

  const saveUserProfile = async (data: {
    characterName: string;
    biometrics: BiometricData;
    baseClass: ClassType;
    initialStats: any;
    pillarStats?: any;
    triage?: TriageResponse;
  }) => {
    try {
      // Calcula BioMonitor inicial com base na triagem (se disponível)
      const triage = data.triage;
      const initialBioMonitor: BioMonitor = {
        ram: Math.max(
          0,
          Math.min(
            100,
            Math.round(((triage?.hoursOfFocusPerDay || 0) * 10) + ((triage?.hoursStudyPerWeek || 0) * 1.5))
          )
        ),
        hardware: Math.max(
          0,
          Math.min(
            100,
            Math.round(((triage?.currentTrainingFrequency || 0) * 12) + (data.biometrics.bodyFatPercent < 20 ? 10 : 0))
          )
        ),
        cool: Math.max(
          0,
          Math.min(
            100,
            Math.round(((triage?.averageSleepHours || 0) * 5) - ((triage?.stressLevel || 5) * 3))
          )
        ),
        credits: Math.max(
          0,
          Math.round((triage?.monthlyIncome || 0) - Math.min((triage?.totalDebt || 0), (triage?.monthlyIncome || 0)))
        ),
        totalXp: 0,
        totalGold: 100,
      };

      const userProfile: UserProfile = {
        id: `user-${Date.now()}`,
        name: data.characterName,
        characterName: data.characterName,
        biometrics: data.biometrics,
        stats: {
          strength: data.initialStats.strength || 30,
          agility: data.initialStats.agility || 30,
          constitution: data.initialStats.constitution || 30,
          intelligence: data.initialStats.intelligence || 30,
          wisdom: data.initialStats.wisdom || 30,
          charisma: data.initialStats.charisma || 30,
          willpower: data.initialStats.willpower || 30,
        },
        pillarStats: data.pillarStats || {
          health: 50,
          nutrition: 50,
          study: 50,
          productivity: 50,
          finance: 50,
          habits: 50,
          social: 50,
        },
        currentClass: data.baseClass,
        unlockedClasses: [data.baseClass],
        streak: 0,
        totalXP: 0,
        gold: 100,
        weight: data.biometrics.weightKg,
        bodyFatPercent: data.biometrics.bodyFatPercent,
        totalIncome: 0,
        totalDebt: 0,
        totalSavings: 0,
        totalInvested: 0,
        totalHoursStudied: 0,
        booksRead: 0,
        coursesCompleted: 0,
        tasksCompleted: 0,
        projectsCompleted: 0,
        socialInteractions: 0,
        habitsFormed: 0,
        createdAt: Date.now(),
        lastActivityDate: new Date().toISOString().split('T')[0],
        dailyTrackingHistory: [],
        debts: [],
        financialGoals: [],
        habits: [],
        tasks: [],
      };

      await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userProfile));
      setUserProfile(userProfile);
      
      // Cria um novo estado de jogo com BioMonitor inicial calculado
      await createNewGame(data.characterName, data.baseClass, initialBioMonitor);
    } catch (error) {
      console.error("[GameState] Error saving user profile:", error);
      throw error;
    }
  };

  return {
    gameState,
    loading,
    userProfile,
    loadingProfile,
    createNewGame,
    completeGig,
    payBounty,
    purchaseReward,
    addCustomReward,
    resetGame,
    saveGameState,
    saveUserProfile,
    logWorkout,
    logStudy,
    logMeal,
    logWater,
    evaluateClassUnlocks,
  };
}

