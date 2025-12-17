import { useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CyberpunkColors } from "@/constants/theme";
import { useGameState } from "@/hooks/use-game-state";
import { Gig, Bounty } from "@/types";

type TabType = "gigs" | "bounties";

export default function GigsScreen() {
  const insets = useSafeAreaInsets();
  const { gameState, loading, completeGig, payBounty } = useGameState();
  const [activeTab, setActiveTab] = useState<TabType>("gigs");
  const [paymentAmount, setPaymentAmount] = useState<Record<string, string>>({});
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Refresh when screen is focused
      setRefreshing(false);
    }, [])
  );

  if (loading || !gameState) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color={CyberpunkColors.cyan} />
      </ThemedView>
    );
  }

  const handleCompleteGig = async (gigId: string) => {
    await completeGig(gigId);
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 300);
  };

  const handlePayBounty = async (bountyId: string) => {
    const amount = parseInt(paymentAmount[bountyId] || "0");
    if (amount > 0) {
      await payBounty(bountyId, amount);
      setPaymentAmount({ ...paymentAmount, [bountyId]: "" });
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 300);
    }
  };

  const isGigCompletedToday = (gig: Gig) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return gig.completedDates.includes(today.getTime());
  };

  const renderGigCard = ({ item }: { item: Gig }) => {
    const completed = isGigCompletedToday(item);
    return (
      <View style={[styles.card, completed && styles.cardCompleted]}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitle}>
            <ThemedText type="defaultSemiBold" style={styles.gigName}>
              {item.name}
            </ThemedText>
            {completed && <ThemedText style={styles.completedBadge}>✓</ThemedText>}
          </View>
        </View>
        <ThemedText style={styles.gigDescription}>{item.description}</ThemedText>
        <View style={styles.rewardRow}>
          <ThemedText style={styles.reward}>+{item.xpReward} XP</ThemedText>
          <ThemedText style={styles.reward}>+{item.goldReward} GOLD</ThemedText>
        </View>
        {!completed && (
          <Pressable
            style={styles.completeButton}
            onPress={() => handleCompleteGig(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`Completar ${item.name}`}
          >
            <ThemedText style={styles.completeButtonText}>COMPLETAR</ThemedText>
          </Pressable>
        )}
      </View>
    );
  };

  const renderBountyCard = ({ item }: { item: Bounty }) => {
    const progress = ((item.totalValue - item.remainingValue) / item.totalValue) * 100;
    const isDefeated = item.remainingValue <= 0;

    return (
      <View style={[styles.card, isDefeated && styles.cardDefeated]}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitle}>
            <ThemedText type="defaultSemiBold" style={styles.bountyName}>
              {item.name}
            </ThemedText>
            {isDefeated && <ThemedText style={styles.defeatedBadge}>DERROTADO</ThemedText>}
          </View>
        </View>
        <ThemedText style={styles.bountyDescription}>{item.description}</ThemedText>

        {/* HP Bar */}
        <View style={styles.hpContainer}>
          <ThemedText style={styles.hpLabel}>HP: R$ {item.remainingValue}</ThemedText>
          <View style={styles.hpBar}>
            <View
              style={[
                styles.hpFill,
                {
                  width: `${progress}%`,
                  backgroundColor: progress < 33 ? CyberpunkColors.error : CyberpunkColors.green,
                },
              ]}
            />
          </View>
        </View>

        {!isDefeated && (
          <View style={styles.paymentContainer}>
            <TextInput
              style={styles.paymentInput}
              placeholder="Valor (R$)"
              placeholderTextColor={CyberpunkColors.textDisabled}
              keyboardType="numeric"
              value={paymentAmount[item.id] || ""}
              onChangeText={(text) =>
                setPaymentAmount({ ...paymentAmount, [item.id]: text })
              }
            />
            <Pressable
              style={styles.payButton}
              onPress={() => handlePayBounty(item.id)}
              accessibilityRole="button"
              accessibilityLabel={`Pagar ${item.name}`}
            >
              <ThemedText style={styles.payButtonText}>PAGAR</ThemedText>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

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
      {/* Tab Selector */}
      <View style={styles.tabSelector}>
        <Pressable
          style={[styles.tab, activeTab === "gigs" && styles.tabActive]}
          onPress={() => setActiveTab("gigs")}
          accessibilityRole="button"
          accessibilityLabel="Abrir aba Gigs"
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "gigs" && styles.tabTextActive,
            ]}
          >
            GIGS DIÁRIAS
          </ThemedText>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "bounties" && styles.tabActive]}
          onPress={() => setActiveTab("bounties")}
          accessibilityRole="button"
          accessibilityLabel="Abrir aba Bounties"
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "bounties" && styles.tabTextActive,
            ]}
          >
            BOUNTIES
          </ThemedText>
        </Pressable>
      </View>

      {/* Content */}
      {activeTab === "gigs" ? (
        <FlatList
          data={gameState.gigs}
          keyExtractor={(item) => item.id}
          renderItem={renderGigCard}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={gameState.bounties}
          keyExtractor={(item) => item.id}
          renderItem={renderBountyCard}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CyberpunkColors.darkBg,
  },
  tabSelector: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: CyberpunkColors.cyan,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: CyberpunkColors.magenta,
  },
  tabText: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
  },
  tabTextActive: {
    color: CyberpunkColors.magenta,
    fontWeight: "bold",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  cardCompleted: {
    borderColor: CyberpunkColors.green,
    opacity: 0.7,
  },
  cardDefeated: {
    borderColor: CyberpunkColors.green,
    opacity: 0.6,
  },
  cardHeader: {
    marginBottom: 8,
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gigName: {
    fontSize: 16,
    color: CyberpunkColors.cyan,
  },
  bountyName: {
    fontSize: 16,
    color: CyberpunkColors.magenta,
  },
  completedBadge: {
    fontSize: 20,
    color: CyberpunkColors.green,
    fontWeight: "bold",
  },
  defeatedBadge: {
    fontSize: 10,
    color: CyberpunkColors.green,
    fontWeight: "bold",
  },
  gigDescription: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    marginBottom: 8,
    fontFamily: "Courier New",
  },
  bountyDescription: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    marginBottom: 8,
    fontFamily: "Courier New",
  },
  rewardRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  reward: {
    fontSize: 12,
    color: CyberpunkColors.green,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  completeButton: {
    backgroundColor: CyberpunkColors.green,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  completeButtonText: {
    color: CyberpunkColors.darkBg,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  hpContainer: {
    marginBottom: 12,
  },
  hpLabel: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    marginBottom: 4,
    fontFamily: "Courier New",
  },
  hpBar: {
    height: 12,
    backgroundColor: CyberpunkColors.inputBg,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: CyberpunkColors.magenta,
  },
  hpFill: {
    height: "100%",
    borderRadius: 4,
  },
  paymentContainer: {
    flexDirection: "row",
    gap: 8,
  },
  paymentInput: {
    flex: 1,
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    color: CyberpunkColors.textPrimary,
    fontSize: 12,
    fontFamily: "Courier New",
  },
  payButton: {
    backgroundColor: CyberpunkColors.magenta,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  payButtonText: {
    color: CyberpunkColors.darkBg,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
});
