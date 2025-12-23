import { useRouter, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { BioMonitorComponent } from "@/components/bio-monitor";
import { ClassWarningsPanel } from "@/components/class-warnings";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CyberpunkColors } from "@/constants/theme";
import { useGameState } from "@/hooks/use-game-state";
import { useClassWarnings } from "@/hooks/use-class-warnings";
import { CyberpunkGrid } from "@/components/cyberpunk-grid";
import { FadeIn, SlideIn, NeonBorder } from "@/components/visual-effects";

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { gameState, loading } = useGameState();
  const warnings = useClassWarnings();
  const pulseOpacity = useSharedValue(0.8);

  // Pulse animation para o streak
  useEffect(() => {
    pulseOpacity.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  // Check if game state exists, if not go to character creation
  useFocusEffect(
    useCallback(() => {
      if (!loading && !gameState) {
        // Redirect first-time users to the triage onboarding flow instead of a simple character screen
        router.replace("/triage");
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
      {/* Background animado */}
      <CyberpunkGrid />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Class Warnings */}
        {warnings.length > 0 && (
          <FadeIn duration={600}>
            <ClassWarningsPanel warnings={warnings} />
          </FadeIn>
        )}

        {/* Header with Class Badge */}
        <SlideIn direction="top" duration={500}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
            <ThemedText type="title" style={styles.greeting}>
              {gameState.character.name}
            </ThemedText>
            <ThemedText style={styles.class}>
              LEVEL {gameState.character.level || 1}
            </ThemedText>
          </View>
          
          {/* Class Badge */}
          <View style={styles.classBadge}>
            <ThemedText style={styles.classBadgeEmoji}>⚔️</ThemedText>
            <ThemedText style={styles.classBadgeText}>
              {gameState.character.class.toUpperCase()}
            </ThemedText>
          </View>
        </View>
        </SlideIn>

        {/* XP Progress Bar */}
        <FadeIn duration={700} delay={200}>
          <View style={styles.xpProgressContainer}>
          <View style={styles.xpProgressHeader}>
            <ThemedText style={styles.xpProgressLabel}>XP PROGRESS</ThemedText>
            <ThemedText style={styles.xpProgressText}>
              {gameState.bioMonitor.totalXp % 1000} / 1000
            </ThemedText>
          </View>
          <View style={styles.xpProgressBar}>
            <View
              style={[
                styles.xpProgressFill,
                { width: `${((gameState.bioMonitor.totalXp % 1000) / 1000) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Streak Counter */}
        <Animated.View style={[styles.streakContainer, pulseStyle]}>
          <View style={styles.streakGlow}>
            <ThemedText style={styles.streakLabel}>🔥 LOGIN STREAK</ThemedText>
            <ThemedText style={styles.streakValue}>{gameState.character.loginStreak}</ThemedText>
            <ThemedText style={styles.streakBonus}>
              {Math.round(streakBonus * 100)}% desconto na loja
            </ThemedText>
          </View>
        </Animated.View>

        {/* Bio-Monitor */}
        <BioMonitorComponent stats={gameState.bioMonitor} />

        {/* Next Gig */}
        {nextGig && (
          <View style={styles.nextGigContainer}>
            <ThemedText style={styles.nextGigLabel}>⚡ PRÓXIMA MISSÃO</ThemedText>
            <Pressable 
              style={styles.nextGigCard}
              onPress={() => router.navigate({pathname: "/(tabs)/gigs"} as any)}
            >
              <ThemedText type="defaultSemiBold" style={styles.nextGigName}>
                {nextGig.name}
              </ThemedText>
              <ThemedText style={styles.nextGigReward}>
                +{nextGig.xpReward} XP / +{nextGig.goldReward} GOLD
              </ThemedText>
            </Pressable>
          </View>
        )}
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
  classBadge: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.magenta,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  classBadgeEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  classBadgeText: {
    fontSize: 10,
    color: CyberpunkColors.magenta,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  xpProgressContainer: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.purple,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  xpProgressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  xpProgressLabel: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
  },
  xpProgressText: {
    fontSize: 11,
    color: CyberpunkColors.purple,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  xpProgressBar: {
    height: 6,
    backgroundColor: CyberpunkColors.inputBg,
    borderRadius: 3,
    overflow: "hidden",
  },
  xpProgressFill: {
    height: "100%",
    backgroundColor: CyberpunkColors.purple,
  },
  streakContainer: {
    marginBottom: 16,
  },
  streakGlow: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.green,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: CyberpunkColors.green,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  streakLabel: {
    fontSize: 14,
    color: CyberpunkColors.green,
    marginBottom: 4,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  streakValue: {
    fontSize: 56,
    fontWeight: "bold",
    color: CyberpunkColors.green,
    fontFamily: "Courier New",
    textShadowColor: CyberpunkColors.green,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
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
    fontSize: 14,
    color: CyberpunkColors.cyan,
    marginBottom: 8,
    fontWeight: "bold",
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
