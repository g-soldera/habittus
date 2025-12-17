import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CyberpunkColors } from "@/constants/theme";
import { useGameState } from "@/hooks/use-game-state";
import { Reward } from "@/types";

export default function ShopScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { gameState, loading, purchaseReward } = useGameState();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  if (loading || !gameState) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color={CyberpunkColors.cyan} />
      </ThemedView>
    );
  }

  const streakDiscount = Math.min(0.5, gameState.character.loginStreak * 0.02);
  const categories = ["leisure", "food", "travel", "other"];

  const filteredRewards = selectedCategory
    ? gameState.rewards.filter((r) => r.category === selectedCategory)
    : gameState.rewards;

  const handlePurchase = async (rewardId: string) => {
    await purchaseReward(rewardId);
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 300);
  };

  const getDiscountedPrice = (basePrice: number) => {
    return Math.floor(basePrice * (1 - streakDiscount));
  };

  const renderRewardCard = ({ item }: { item: Reward }) => {
    const discountedPrice = getDiscountedPrice(item.costGold);
    const canAfford = gameState.bioMonitor.totalGold >= discountedPrice;

    return (
      <View style={[styles.card, !canAfford && styles.cardDisabled]}>
        <View style={styles.cardContent}>
          <ThemedText type="defaultSemiBold" style={styles.rewardName}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.rewardDescription}>{item.description}</ThemedText>

          <View style={styles.priceRow}>
            {streakDiscount > 0 && (
              <ThemedText style={styles.originalPrice}>
                {item.costGold}
              </ThemedText>
            )}
            <ThemedText
              style={[
                styles.price,
                !canAfford && styles.priceDisabled,
              ]}
            >
              {discountedPrice} GOLD
            </ThemedText>
            {streakDiscount > 0 && (
              <ThemedText style={styles.discount}>
                -{Math.round(streakDiscount * 100)}%
              </ThemedText>
            )}
          </View>
        </View>

        <Pressable
          style={[styles.buyButton, !canAfford && styles.buyButtonDisabled]}
          onPress={() => handlePurchase(item.id)}
          accessibilityRole="button"
          accessibilityLabel={canAfford ? `Comprar ${item.name}` : `Sem gold ${item.name}`}
          disabled={!canAfford}
        >
          <ThemedText style={styles.buyButtonText}>
            {canAfford ? "COMPRAR" : "SEM GOLD"}
          </ThemedText>
        </Pressable>
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
      {/* Header */}
      <View style={styles.header}>
        <View>
          <ThemedText type="subtitle" style={styles.title}>
            BLACK MARKET
          </ThemedText>
          <ThemedText style={styles.goldDisplay}>
            {gameState.bioMonitor.totalGold} GOLD
          </ThemedText>
        </View>

        {streakDiscount > 0 && (
          <View style={styles.streakBonusBox}>
            <ThemedText style={styles.streakBonusLabel}>STREET CRED</ThemedText>
            <ThemedText style={styles.streakBonusValue}>
              -{Math.round(streakDiscount * 100)}%
            </ThemedText>
          </View>
        )}
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <Pressable
          style={[styles.categoryButton, !selectedCategory && styles.categoryButtonActive]}
          onPress={() => setSelectedCategory(null)}
        >
          <ThemedText
            style={[
              styles.categoryButtonText,
              !selectedCategory && styles.categoryButtonTextActive,
            ]}
          >
            TODOS
          </ThemedText>
        </Pressable>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
            accessibilityRole="button"
            accessibilityLabel={`Filtrar por categoria ${cat}`}
          >
            <ThemedText
              style={[
                styles.categoryButtonText,
                selectedCategory === cat && styles.categoryButtonTextActive,
              ]}
            >
              {cat.toUpperCase()}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      {/* Add Custom Reward Button */}
      <Pressable
        style={styles.addRewardButton}
        onPress={() => router.navigate({pathname: "/add-reward"} as any)}
        accessibilityRole="button"
        accessibilityLabel="Adicionar recompensa"
      >
        <ThemedText style={styles.addRewardButtonText}>+ ADICIONAR RECOMPENSA</ThemedText>
      </Pressable>

      {/* Rewards List */}
      <FlatList
        data={filteredRewards}
        keyExtractor={(item) => item.id}
        renderItem={renderRewardCard}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        numColumns={1}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CyberpunkColors.darkBg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: CyberpunkColors.cyan,
  },
  title: {
    fontSize: 20,
    color: CyberpunkColors.cyan,
    fontFamily: "Courier New",
  },
  goldDisplay: {
    fontSize: 24,
    fontWeight: "bold",
    color: CyberpunkColors.magenta,
    marginTop: 4,
    fontFamily: "Courier New",
  },
  streakBonusBox: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.green,
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
  },
  streakBonusLabel: {
    fontSize: 10,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
  },
  streakBonusValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: CyberpunkColors.green,
    fontFamily: "Courier New",
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: CyberpunkColors.cardBg,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: CyberpunkColors.textDisabled,
    borderRadius: 4,
  },
  categoryButtonActive: {
    borderColor: CyberpunkColors.cyan,
    backgroundColor: CyberpunkColors.cardBg,
  },
  categoryButtonText: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
  },
  categoryButtonTextActive: {
    color: CyberpunkColors.cyan,
    fontWeight: "bold",
  },
  addRewardButton: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: CyberpunkColors.purple,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  addRewardButtonText: {
    color: CyberpunkColors.darkBg,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Courier New",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardDisabled: {
    borderColor: CyberpunkColors.textDisabled,
    opacity: 0.6,
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  rewardName: {
    fontSize: 14,
    color: CyberpunkColors.cyan,
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    marginBottom: 8,
    fontFamily: "Courier New",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  originalPrice: {
    fontSize: 11,
    color: CyberpunkColors.textDisabled,
    textDecorationLine: "line-through",
    fontFamily: "Courier New",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: CyberpunkColors.magenta,
    fontFamily: "Courier New",
  },
  priceDisabled: {
    color: CyberpunkColors.error,
  },
  discount: {
    fontSize: 11,
    color: CyberpunkColors.green,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  buyButton: {
    backgroundColor: CyberpunkColors.cyan,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
    minWidth: 80,
  },
  buyButtonDisabled: {
    backgroundColor: CyberpunkColors.textDisabled,
    opacity: 0.5,
  },
  buyButtonText: {
    color: CyberpunkColors.darkBg,
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
});
