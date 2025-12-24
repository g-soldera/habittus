import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CyberpunkColors } from "@/constants/theme";
import { useGameState } from "@/hooks/use-game-state";
import { Gig } from "@/types";

interface AddCustomGigProps {
  onClose?: () => void;
}

export function AddCustomGigModal({ onClose }: AddCustomGigProps) {
  const router = useRouter();
  const { gameState, saveGameState } = useGameState();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [complexity, setComplexity] = useState(5); // 1-10 scale
  const [category, setCategory] = useState<"study" | "training" | "meditation" | "saving">("training");

  // Calculate rewards based on complexity
  const xpReward = Math.round(complexity * 10);
  const goldReward = Math.round(complexity * 5);

  const categories: Array<"study" | "training" | "meditation" | "saving"> = [
    "study",
    "training",
    "meditation",
    "saving",
  ];

  const categoryEmojis: Record<string, string> = {
    study: "",
    training: "",
    meditation: "",
    saving: "",
  };

  const handleAddGig = async () => {
    if (!name.trim()) {
      Alert.alert("Erro", "Nome da gig é obrigatório");
      return;
    }

    if (!gameState) return;

    const newGig: Gig = {
      id: `custom-${Date.now()}`,
      name,
      description,
      category,
      xpReward,
      goldReward,
      bioMonitorBonus: {
        ram: complexity > 7 ? 5 : 0,
        hardware: category === "training" ? Math.round(complexity / 2) : 0,
        cool: category === "meditation" ? 3 : 0,
      },
      recurring: false, // Custom gigs são uma única vez por padrão
      completedDates: [],
      createdAt: Date.now(),
    };

    try {
      const updatedGigs = [...gameState.gigs, newGig];
      await saveGameState({
        ...gameState,
        gigs: updatedGigs,
      });

      Alert.alert(
        "Sucesso",
        `Gig "${newGig.name}" criada!\n+${xpReward} XP\n+${goldReward} GOLD`
      );

      onClose?.();
      router.back();
    } catch (error) {
      console.error("[AddCustomGig] Error:", error);
      Alert.alert("Erro", "Falha ao criar gig");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            CRIAR GIG CUSTOMIZADA
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Defina sua própria missão e recompensas
          </ThemedText>
        </View>

        {/* Nome */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Nome da Gig *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ex: Estudar programação por 2h"
            placeholderTextColor={CyberpunkColors.textDisabled}
            value={name}
            onChangeText={setName}
            maxLength={60}
          />
          <ThemedText style={styles.charCount}>
            {name.length}/60
          </ThemedText>
        </View>

        {/* Descrição */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Descrição</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Detalhe o que você vai fazer..."
            placeholderTextColor={CyberpunkColors.textDisabled}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            maxLength={200}
          />
          <ThemedText style={styles.charCount}>
            {description.length}/200
          </ThemedText>
        </View>

        {/* Categoria */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Categoria</ThemedText>
          <View style={styles.categoryButtons}>
            {categories.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.categoryButtonActive,
                ]}
                onPress={() => setCategory(cat)}
              >
                <ThemedText
                  style={[
                    styles.categoryButtonText,
                    category === cat && styles.categoryButtonTextActive,
                  ]}
                >
                  {categoryEmojis[cat]} {cat.toUpperCase()}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Complexidade */}
        <View style={styles.section}>
          <View style={styles.complexityHeader}>
            <ThemedText style={styles.label}>Complexidade (1-10)</ThemedText>
            <View
              style={[
                styles.complexityBadge,
                {
                  backgroundColor:
                    complexity <= 3
                      ? CyberpunkColors.green
                      : complexity <= 6
                      ? CyberpunkColors.cyan
                      : CyberpunkColors.orange,
                },
              ]}
            >
              <ThemedText style={styles.complexityValue}>
                {Math.round(complexity)}
              </ThemedText>
            </View>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={complexity}
            onValueChange={setComplexity}
            minimumTrackTintColor={CyberpunkColors.cyan}
            maximumTrackTintColor={CyberpunkColors.darkGray}
            thumbTintColor={CyberpunkColors.magenta}
          />

          <ThemedText style={styles.complexityDescription}>
            {complexity <= 3
              ? "Fácil - Tarefa rápida"
              : complexity <= 6
              ? "Moderado - Tarefa padrão"
              : complexity <= 8
              ? "Difícil - Exige esforço"
              : "Muito Difícil - Desafio extremo"}
          </ThemedText>
        </View>

        {/* Recompensas Preview */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Recompensas</ThemedText>
          <View style={styles.rewardsContainer}>
            <View style={styles.rewardBox}>
              <ThemedText style={styles.rewardLabel}>XP</ThemedText>
              <ThemedText style={styles.rewardValue}>{xpReward}</ThemedText>
            </View>
            <View style={styles.rewardBox}>
              <ThemedText style={styles.rewardLabel}>GOLD</ThemedText>
              <ThemedText style={styles.rewardValue}>{goldReward}</ThemedText>
            </View>
            {Object.entries({
              ram: 5,
              hardware: Math.round(complexity / 2),
              cool: 3,
            }).map(([stat, value]) => {
              if (value <= 0) return null;
              return (
                <View key={stat} style={styles.rewardBox}>
                  <ThemedText style={styles.rewardLabel}>
                    {stat.toUpperCase()}
                  </ThemedText>
                  <ThemedText style={styles.rewardValue}>+{value}</ThemedText>
                </View>
              );
            })}
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => {
              onClose?.();
              router.back();
            }}
          >
            <ThemedText style={styles.buttonText}>CANCELAR</ThemedText>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleAddGig}
          >
            <ThemedText style={[styles.buttonText, styles.buttonPrimaryText]}>
              CRIAR GIG
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: CyberpunkColors.cyan,
    marginBottom: 8,
  },
  subtitle: {
    color: CyberpunkColors.textSecondary,
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    color: CyberpunkColors.textSecondary,
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 4,
    padding: 12,
    color: CyberpunkColors.textPrimary,
    fontFamily: "Courier New",
    fontSize: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 10,
    color: CyberpunkColors.textDisabled,
    marginTop: 4,
  },
  categoryButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: CyberpunkColors.darkGray,
    borderRadius: 4,
    backgroundColor: CyberpunkColors.inputBg,
  },
  categoryButtonActive: {
    borderColor: CyberpunkColors.cyan,
    backgroundColor: CyberpunkColors.cardBg,
  },
  categoryButtonText: {
    color: CyberpunkColors.textSecondary,
    fontSize: 11,
  },
  categoryButtonTextActive: {
    color: CyberpunkColors.cyan,
    fontWeight: "600",
  },
  complexityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  complexityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  complexityValue: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
  slider: {
    height: 40,
    marginBottom: 8,
  },
  complexityDescription: {
    fontSize: 11,
    color: CyberpunkColors.textDisabled,
    marginTop: 8,
  },
  rewardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  rewardBox: {
    flex: 1,
    minWidth: "48%",
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.purple,
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
  rewardLabel: {
    fontSize: 10,
    color: CyberpunkColors.textSecondary,
    marginBottom: 4,
  },
  rewardValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: CyberpunkColors.cyan,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    borderWidth: 2,
  },
  buttonSecondary: {
    borderColor: CyberpunkColors.darkGray,
    backgroundColor: CyberpunkColors.inputBg,
  },
  buttonPrimary: {
    borderColor: CyberpunkColors.cyan,
    backgroundColor: CyberpunkColors.cardBg,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
  },
  buttonPrimaryText: {
    color: CyberpunkColors.cyan,
  },
});
