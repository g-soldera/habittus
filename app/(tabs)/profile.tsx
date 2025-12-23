import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ClassStatus } from "@/components/class-status";
import { CyberpunkColors } from "@/constants/theme";
import { useGameState } from "@/hooks/use-game-state";
import { CLASS_DESCRIPTIONS } from "@/types";

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { gameState, loading, resetGame } = useGameState();

  if (loading || !gameState) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color={CyberpunkColors.cyan} />
      </ThemedView>
    );
  }

  const gigsCompleted = gameState.gigs.reduce(
    (acc, gig) => acc + gig.completedDates.length,
    0
  );



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
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Character Info */}
        <View style={styles.characterCard}>
          <ThemedText type="title" style={styles.characterName}>
            {gameState.character.name}
          </ThemedText>
          <ThemedText style={styles.characterClass}>
            {gameState.character.class.toUpperCase()}
          </ThemedText>
          <ThemedText style={styles.classDescription}>
            {CLASS_DESCRIPTIONS[gameState.character.class]}
          </ThemedText>
        </View>

        {/* Class Status Component */}
        {gameState.character && (
          <ClassStatus 
            baseClass={gameState.character.class as any}
            stats={{
              strength: gameState.character.stats?.strength || 50,
              agility: gameState.character.stats?.agility || 50,
              constitution: gameState.character.stats?.constitution || 50,
              intelligence: gameState.character.stats?.intelligence || 50,
              wisdom: gameState.character.stats?.wisdom || 50,
              charisma: gameState.character.stats?.charisma || 50,
              willpower: gameState.character.stats?.willpower || 50,
            }}
            level={gameState.character.level || 1}
          />
        )}

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <ThemedText type="subtitle" style={styles.statsTitle}>
            ESTATÍSTICAS
          </ThemedText>

          <View style={styles.statRow}>
            <View style={styles.statBox}>
              <ThemedText style={styles.statLabel}>XP TOTAL</ThemedText>
              <ThemedText style={styles.statValue}>
                {gameState.bioMonitor.totalXp}
              </ThemedText>
            </View>
            <View style={styles.statBox}>
              <ThemedText style={styles.statLabel}>GOLD TOTAL</ThemedText>
              <ThemedText style={styles.statValue}>
                {gameState.bioMonitor.totalGold}
              </ThemedText>
            </View>
          </View>

          <View style={styles.statRow}>
            <View style={styles.statBox}>
              <ThemedText style={styles.statLabel}>GIGS COMPLETADAS</ThemedText>
              <ThemedText style={styles.statValue}>{gigsCompleted}</ThemedText>
            </View>
            <View style={styles.statBox}>
              <ThemedText style={styles.statLabel}>STREAK</ThemedText>
              <ThemedText style={styles.statValue}>
                {gameState.character.loginStreak}
              </ThemedText>
            </View>
          </View>

          {/* Credits */}
          <View style={styles.creditsBox}>
            <ThemedText style={styles.creditsLabel}>CREDITS</ThemedText>
            <ThemedText style={styles.creditsValue}>
              R$ {gameState.bioMonitor.credits}
            </ThemedText>
          </View>
        </View>

        {/* Inventory */}
        <View style={styles.inventoryContainer}>
          <ThemedText type="subtitle" style={styles.inventoryTitle}>
            INVENTÁRIO
          </ThemedText>

          {gameState.inventory.length === 0 ? (
            <ThemedText style={styles.emptyInventory}>
              Nenhuma recompensa desbloqueada ainda
            </ThemedText>
          ) : (
            gameState.inventory.map((item) => {
              const reward = gameState.rewards.find((r) => r.id === item.rewardId);
              return (
                <View key={item.id} style={styles.inventoryItem}>
                  <View>
                    <ThemedText style={styles.inventoryItemName}>
                      {reward?.name}
                    </ThemedText>
                    <ThemedText style={styles.inventoryItemDate}>
                      {new Date(item.purchasedAt).toLocaleDateString("pt-BR")}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.inventoryItemQty}>x{item.quantity}</ThemedText>
                </View>
              );
            })
          )}
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
  characterCard: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  characterName: {
    fontSize: 28,
    color: CyberpunkColors.cyan,
    fontFamily: "Courier New",
    marginBottom: 4,
  },
  characterClass: {
    fontSize: 14,
    color: CyberpunkColors.magenta,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Courier New",
  },
  classDescription: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    textAlign: "center",
    fontFamily: "Courier New",
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 16,
    color: CyberpunkColors.cyan,
    marginBottom: 12,
    fontFamily: "Courier New",
  },
  statRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.purple,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    marginBottom: 4,
    fontFamily: "Courier New",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: CyberpunkColors.purple,
    fontFamily: "Courier New",
  },
  creditsBox: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.magenta,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  creditsLabel: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    marginBottom: 4,
    fontFamily: "Courier New",
  },
  creditsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: CyberpunkColors.magenta,
    fontFamily: "Courier New",
  },
  inventoryContainer: {
    marginBottom: 24,
  },
  inventoryTitle: {
    fontSize: 16,
    color: CyberpunkColors.cyan,
    marginBottom: 12,
    fontFamily: "Courier New",
  },
  emptyInventory: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    textAlign: "center",
    paddingVertical: 16,
    fontFamily: "Courier New",
  },
  inventoryItem: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.green,
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inventoryItemName: {
    fontSize: 13,
    color: CyberpunkColors.green,
    fontWeight: "bold",
    marginBottom: 2,
  },
  inventoryItemDate: {
    fontSize: 10,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
  },
  inventoryItemQty: {
    fontSize: 13,
    color: CyberpunkColors.cyan,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  actionsContainer: {
    gap: 12,
    marginTop: 16,
  },
  resetButton: {
    backgroundColor: CyberpunkColors.error,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
});
