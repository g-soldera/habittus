import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import {
  createDefaultBioMonitor,
  createDefaultCharacter,
  createDefaultGameState,
  DEFAULT_GIGS,
  DEFAULT_REWARDS,
} from "@/lib/mock-data";
import { GameState, Gig, Bounty, Reward, InventoryItem, BioMonitor } from "@/types";
import { UserProfile, BiometricData, ClassType } from "@/types/biometric";

const GAME_STATE_KEY = "habittus_game_state";
const USER_PROFILE_KEY = "habittus_user_profile";

export function useGameState() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);

  // Load game state from AsyncStorage
  useEffect(() => {
    loadGameState();
  }, []);

  const loadGameState = async () => {
    try {
      const stored = await AsyncStorage.getItem(GAME_STATE_KEY);
      if (stored) {
        const state = JSON.parse(stored) as GameState;
        setGameState(state);
      } else {
        setGameState(null);
      }
    } catch (error) {
      console.error("[GameState] Error loading state:", error);
    } finally {
      setLoading(false);
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

  const createNewGame = async (characterName: string, characterClass: string) => {
    const character = createDefaultCharacter(characterName, characterClass);
    const bioMonitor = createDefaultBioMonitor();
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
        bounty.remainingValue = Math.max(0, bounty.remainingValue - amount);
        bounty.paidDates.push({ date: Date.now(), amount });
        updatedState.bioMonitor.totalGold -= goldCost;
        updatedState.bioMonitor.credits += amount; // Credits increase with payment

        updatedState.lastUpdatedAt = Date.now();
        await saveGameState(updatedState);
      }
    }
  };

  const purchaseReward = async (rewardId: string) => {
    if (!gameState) return;

    const reward = gameState.rewards.find((r) => r.id === rewardId);
    if (!reward) return;

    // Calculate discount based on streak
    const discount = Math.min(0.5, gameState.character.loginStreak * 0.02);
    const finalCost = Math.floor(reward.costGold * (1 - discount));

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
      setGameState(null);
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
  }) => {
    try {
      const userProfile: UserProfile = {
        id: `user-${Date.now()}`,
        name: data.characterName,
        characterName: data.characterName,
        biometrics: data.biometrics,
        stats: {
          strength: data.initialStats.strength || 50,
          agility: data.initialStats.agility || 50,
          constitution: data.initialStats.constitution || 50,
          intelligence: data.initialStats.intelligence || 50,
          wisdom: data.initialStats.wisdom || 50,
          charisma: data.initialStats.charisma || 50,
          willpower: data.initialStats.willpower || 50,
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
      
      // Also create a new game state for compatibility
      await createNewGame(data.characterName, data.baseClass);
    } catch (error) {
      console.error("[GameState] Error saving user profile:", error);
      throw error;
    }
  };

  return {
    gameState,
    loading,
    createNewGame,
    completeGig,
    payBounty,
    purchaseReward,
    addCustomReward,
    resetGame,
    saveGameState,
    saveUserProfile,
  };
}
