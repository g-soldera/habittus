import { useRouter, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BioMonitorComponent } from "@/components/bio-monitor";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CyberpunkColors } from "@/constants/theme";
import { useGameState } from "@/hooks/use-game-state";

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { gameState, loading } = useGameState();
  // Check if game state exists, if not go to character creation
  useFocusEffect(
    useCallback(() => {
      if (!loading && !gameState) {
        router.replace("/(tabs)/character-creation");
      }
    }, [gameState, loading, router])
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color={CyberpunkColors.cyan} />
      </ThemedView>
    );
  }

  if (!gameState) {
    return null;
  }

  const nextGig = gameState.gigs[0]; // Simple: show first gig
  const streakBonus = Math.min(0.5, gameState.character.loginStreak * 0.02);

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText type="title" style={styles.greeting}>
              {gameState.character.name}
            </ThemedText>
            <ThemedText style={styles.class}>
              {gameState.character.class.toUpperCase()}
            </ThemedText>
          </View>
        </View>

        {/* Streak Counter */}
        <View style={styles.streakContainer}>
          <ThemedText style={styles.streakLabel}>LOGIN STREAK</ThemedText>
          <ThemedText style={styles.streakValue}>{gameState.character.loginStreak}</ThemedText>
          <ThemedText style={styles.streakBonus}>
            {Math.round(streakBonus * 100)}% desconto na loja
          </ThemedText>
        </View>

        {/* Bio-Monitor */}
        <BioMonitorComponent stats={gameState.bioMonitor} />

        {/* Next Gig */}
        {nextGig && (
          <View style={styles.nextGigContainer}>
            <ThemedText style={styles.nextGigLabel}>PRÓXIMA GIG</ThemedText>
            <View style={styles.nextGigCard}>
              <ThemedText type="defaultSemiBold" style={styles.nextGigName}>
                {nextGig.name}
              </ThemedText>
              <ThemedText style={styles.nextGigReward}>
                +{nextGig.xpReward} XP / +{nextGig.goldReward} GOLD
              </ThemedText>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Pressable
            style={styles.actionButton}
            onPress={() => router.navigate({pathname: "/(tabs)/gigs"} as any)}
          >
            <ThemedText style={styles.actionButtonText}>GIGS</ThemedText>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() => router.navigate({pathname: "/(tabs)/shop"} as any)}
          >
            <ThemedText style={styles.actionButtonText}>LOJA</ThemedText>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() => router.navigate({pathname: "/(tabs)/profile"} as any)}
          >
            <ThemedText style={styles.actionButtonText}>PERFIL</ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CyberpunkColors.darkBg,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 32,
    color: CyberpunkColors.cyan,
    fontFamily: "Courier New",
  },
  class: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    marginTop: 4,
    fontFamily: "Courier New",
  },
  streakContainer: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.green,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  streakLabel: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    marginBottom: 4,
    fontFamily: "Courier New",
  },
  streakValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: CyberpunkColors.green,
    fontFamily: "Courier New",
  },
  streakBonus: {
    fontSize: 12,
    color: CyberpunkColors.cyan,
    marginTop: 8,
    fontFamily: "Courier New",
  },
  nextGigContainer: {
    marginBottom: 16,
  },
  nextGigLabel: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    marginBottom: 8,
    fontFamily: "Courier New",
  },
  nextGigCard: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.magenta,
    borderRadius: 8,
    padding: 12,
  },
  nextGigName: {
    fontSize: 16,
    color: CyberpunkColors.magenta,
    marginBottom: 4,
  },
  nextGigReward: {
    fontSize: 12,
    color: CyberpunkColors.cyan,
    fontFamily: "Courier New",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    backgroundColor: CyberpunkColors.cyan,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  actionButtonText: {
    color: CyberpunkColors.darkBg,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
});
