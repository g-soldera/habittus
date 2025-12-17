import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CyberpunkColors } from "@/constants/theme";
import { useGameState } from "@/hooks/use-game-state";

const CATEGORIES = [
  { id: "leisure", label: "Lazer" },
  { id: "food", label: "Comida" },
  { id: "travel", label: "Viagem" },
  { id: "other", label: "Outro" },
];

export default function AddRewardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addCustomReward } = useGameState();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [costGold, setCostGold] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("leisure");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !description.trim() || !costGold.trim()) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    const cost = parseInt(costGold);
    if (isNaN(cost) || cost <= 0) {
      alert("O custo deve ser um número positivo");
      return;
    }

    setLoading(true);
    try {
      await addCustomReward(name, description, cost, selectedCategory);
      router.back();
    } catch (error) {
      console.error("[AddReward] Error:", error);
      alert("Erro ao adicionar recompensa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
          paddingLeft: Math.max(insets.left, 20),
          paddingRight: Math.max(insets.right, 20),
        },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <ThemedText style={styles.backButton}>← VOLTAR</ThemedText>
          </Pressable>
          <ThemedText type="title" style={styles.title}>
            NOVA RECOMPENSA
          </ThemedText>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Name */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>Nome</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ex: Sorvete"
              placeholderTextColor={CyberpunkColors.textDisabled}
              value={name}
              onChangeText={setName}
              maxLength={50}
            />
          </View>

          {/* Description */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>Descrição</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva a recompensa..."
              placeholderTextColor={CyberpunkColors.textDisabled}
              value={description}
              onChangeText={setDescription}
              maxLength={200}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Cost */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>Custo (Gold)</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ex: 50"
              placeholderTextColor={CyberpunkColors.textDisabled}
              value={costGold}
              onChangeText={setCostGold}
              keyboardType="numeric"
            />
          </View>

          {/* Category */}
          <View style={styles.field}>
            <ThemedText style={styles.label}>Categoria</ThemedText>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.id}
                  style={[
                    styles.categoryOption,
                    selectedCategory === cat.id && styles.categoryOptionSelected,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <ThemedText
                    style={[
                      styles.categoryOptionText,
                      selectedCategory === cat.id && styles.categoryOptionTextSelected,
                    ]}
                  >
                    {cat.label}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Save Button */}
          <Pressable
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <ThemedText style={styles.saveButtonText}>
              {loading ? "Salvando..." : "SALVAR RECOMPENSA"}
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
    backgroundColor: CyberpunkColors.darkBg,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    fontSize: 12,
    color: CyberpunkColors.cyan,
    marginBottom: 12,
    fontFamily: "Courier New",
  },
  title: {
    fontSize: 28,
    color: CyberpunkColors.cyan,
    fontFamily: "Courier New",
  },
  form: {
    gap: 20,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
  },
  input: {
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: CyberpunkColors.textPrimary,
    fontSize: 14,
    fontFamily: "Courier New",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  categoryGrid: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  categoryOption: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.textDisabled,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  categoryOptionSelected: {
    borderColor: CyberpunkColors.magenta,
  },
  categoryOptionText: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
  },
  categoryOptionTextSelected: {
    color: CyberpunkColors.magenta,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: CyberpunkColors.green,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    marginTop: 12,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: CyberpunkColors.darkBg,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
});
