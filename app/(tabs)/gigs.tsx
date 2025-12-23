import { useState, useRef } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CyberpunkColors } from "@/constants/theme";
import { useGameState } from "@/hooks/use-game-state";
import { Gig, Bounty } from "@/types";
import { SuccessFlash } from "@/components/particle-effects";

type TabType = "gigs" | "bounties";

export default function GigsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { gameState, loading, completeGig, payBounty } = useGameState();
  const [activeTab, setActiveTab] = useState<TabType>("gigs");
  const [paymentAmount, setPaymentAmount] = useState<Record<string, string>>({});
  const [refreshing, setRefreshing] = useState(false);
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);

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
    setShowSuccessFlash(true);
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 300);
  };

  const handlePayBounty = async (bountyId: string) => {
    const amount = parseInt(paymentAmount[bountyId] || "0");
    if (amount > 0) {
      console.log(`[GigsScreen] Pagando bounty ${bountyId} com R$${amount}`);
      await payBounty(bountyId, amount);
      setShowSuccessFlash(true);
      setPaymentAmount({ ...paymentAmount, [bountyId]: "" });
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 300);
    } else {
      console.warn(`[GigsScreen] Valor inválido para pagamento: ${paymentAmount[bountyId]}`);
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
      <View style={[styles.card, completed && styles.cardCompleted]} testID={`gig-${item.id}`}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitle}>
            <ThemedText style={styles.gigIcon}>💼</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.gigName}>
              {item.name}
            </ThemedText>
            {completed && <ThemedText style={styles.completedBadge}>✓</ThemedText>}
          </View>
        </View>
        <ThemedText style={styles.gigDescription}>{item.description}</ThemedText>
        <View style={styles.rewardRow}>
          <View style={styles.rewardBadge}>
            <ThemedText style={styles.rewardLabel}>XP</ThemedText>
            <ThemedText style={styles.rewardValue}>+{item.xpReward}</ThemedText>
          </View>
          <View style={styles.rewardBadge}>
            <ThemedText style={styles.rewardLabel}>GOLD</ThemedText>
            <ThemedText style={styles.rewardValue}>+{item.goldReward}</ThemedText>
          </View>
        </View>
        {!completed && (
          <Pressable
            style={styles.completeButton}
            onPress={() => handleCompleteGig(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`Completar ${item.name}`}
            testID={`gig-${item.id}-complete`}
          >
            <ThemedText style={styles.completeButtonText}>✓ COMPLETAR</ThemedText>
          </Pressable>
        )}
      </View>
    );
  };

  const renderBountyCard = ({ item }: { item: Bounty }) => {
    const progress = ((item.totalValue - item.remainingValue) / item.totalValue) * 100;
    const isDefeated = item.remainingValue <= 0;
    const totalPaid = item.paidDates.reduce((sum, p) => sum + p.amount, 0);

    return (
      <View style={[styles.card, isDefeated && styles.cardDefeated]} testID={`bounty-${item.id}`}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitle}>
            <ThemedText style={styles.bountyIcon}>👹</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.bountyName}>
              {item.name}
            </ThemedText>
            {isDefeated && <ThemedText style={styles.defeatedBadge}>DERROTADO</ThemedText>}
          </View>
        </View>
        <ThemedText style={styles.bountyDescription}>{item.description}</ThemedText>

        {/* Payment Stats */}
        <View style={styles.paymentStats}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Total Pago:</ThemedText>
            <ThemedText style={[styles.statValue, { color: CyberpunkColors.green }]}>
              R$ {totalPaid}
            </ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Pagamentos:</ThemedText>
            <ThemedText style={styles.statValue}>
              {item.paidDates.length}x
            </ThemedText>
          </View>
        </View>

        {/* HP Bar */}
        <View style={styles.hpContainer}>
          <View style={styles.hpHeader}>
            <ThemedText style={styles.hpLabel}>HP Restante:</ThemedText>
            <ThemedText style={[styles.hpValue, { color: progress < 33 ? CyberpunkColors.green : CyberpunkColors.red }]}>
              R$ {item.remainingValue} / {item.totalValue}
            </ThemedText>
          </View>
          <View style={styles.hpBar}>
            <View
              style={[
                styles.hpFill,
                {
                  width: `${Math.max(100 - progress, 0)}%`,
                  backgroundColor: progress < 33 ? CyberpunkColors.red : progress < 66 ? CyberpunkColors.orange : CyberpunkColors.green,
                },
              ]}
            />
          </View>
          <ThemedText style={styles.progressText}>{Math.round(progress)}% quitado</ThemedText>
        </View>

        {!isDefeated && (
          <View style={styles.paymentContainer}>
            <TextInput
              style={styles.paymentInput}
              placeholder="R$ a pagar"
              placeholderTextColor={CyberpunkColors.textDisabled}
              keyboardType="numeric"
              value={paymentAmount[item.id] || ""}
              onChangeText={(text) =>
                setPaymentAmount({ ...paymentAmount, [item.id]: text })
              }
              testID={`bounty-${item.id}-input`}
            />
            <Pressable
              style={styles.payButton}
              onPress={() => handlePayBounty(item.id)}
              accessibilityRole="button"
              accessibilityLabel={`Pagar ${item.name}`}
              testID={`bounty-${item.id}-pay`}
            >
              <ThemedText style={styles.payButtonText}>$ PAGAR</ThemedText>
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
        <Pressable
          style={styles.addButton}
          onPress={() => {
            if (activeTab === "gigs") {
              router.push("/add-custom-gig");
            } else {
              router.push("/add-custom-bounty");
            }
          }}
          accessibilityRole="button"
          accessibilityLabel={activeTab === "gigs" ? "Adicionar gig customizada" : "Adicionar bounty"}
        >
          <ThemedText style={styles.addButtonText}>➕</ThemedText>
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
    alignItems: "center",
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
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 4,
    backgroundColor: CyberpunkColors.cardBg,
    marginBottom: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: CyberpunkColors.cyan,
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
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },
  gigIcon: {
    fontSize: 24,
  },
  gigName: {
    fontSize: 16,
    color: CyberpunkColors.cyan,
    flex: 1,
  },
  bountyIcon: {
    fontSize: 24,
  },
  bountyName: {
    fontSize: 16,
    color: CyberpunkColors.magenta,
    flex: 1,
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
    marginBottom: 12,
    fontFamily: "Courier New",
  },
  bountyDescription: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    marginBottom: 12,
    fontFamily: "Courier New",
  },
  rewardRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  rewardBadge: {
    flex: 1,
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.green,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  rewardLabel: {
    fontSize: 10,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
  },
  rewardValue: {
    fontSize: 14,
    color: CyberpunkColors.green,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  reward: {
    fontSize: 12,
    color: CyberpunkColors.green,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  completeButton: {
    backgroundColor: CyberpunkColors.green,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: "center",
    borderWidth: 2,
    borderColor: CyberpunkColors.green,
  },
  completeButtonText: {
    color: CyberpunkColors.black,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  hpContainer: {
    marginBottom: 12,
  },
  hpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  hpLabel: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
  },
  hpValue: {
    fontSize: 11,
    fontWeight: "bold",
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
  progressText: {
    fontSize: 10,
    color: CyberpunkColors.textDisabled,
    fontFamily: "Courier New",
    marginTop: 4,
    textAlign: "center",
  },
  paymentStats: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
    borderRadius: 4,
    padding: 8,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 9,
    color: CyberpunkColors.textDisabled,
    fontFamily: "Courier New",
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: 13,
    color: CyberpunkColors.cyan,
    fontWeight: "bold",
    fontFamily: "Courier New",
    marginTop: 2,
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
    paddingVertical: 8,
    color: CyberpunkColors.textPrimary,
    fontSize: 12,
    fontFamily: "Courier New",
  },
  payButton: {
    backgroundColor: CyberpunkColors.magenta,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: CyberpunkColors.magenta,
  },
  payButtonText: {
    color: CyberpunkColors.darkBg,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
});
