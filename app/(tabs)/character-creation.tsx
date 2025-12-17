import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CyberpunkColors } from "@/constants/theme";
import { CLASS_DESCRIPTIONS, CharacterClass } from "@/types";
import { useGameState } from "@/hooks/use-game-state";

const CLASSES: { id: CharacterClass; name: string }[] = [
  { id: "netrunner", name: "Netrunner" },
  { id: "solo", name: "Solo" },
  { id: "fixer", name: "Fixer" },
  { id: "techie", name: "Techie" },
];

export default function CharacterCreationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { createNewGame } = useGameState();

  const [characterName, setCharacterName] = useState("");
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStartGame = async () => {
    if (!characterName.trim() || !selectedClass) {
      alert("Por favor, insira um nome e escolha uma classe");
      return;
    }

    setLoading(true);
    try {
      await createNewGame(characterName, selectedClass);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("[CharacterCreation] Error creating game:", error);
      alert("Erro ao criar personagem");
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
          <ThemedText type="title" style={styles.title}>
            HABITTUS
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Bem-vindo, Edgerunner. Crie seu personagem.
          </ThemedText>
        </View>

        {/* Name Input */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Nome do Edgerunner
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome..."
            placeholderTextColor={CyberpunkColors.textDisabled}
            value={characterName}
            onChangeText={setCharacterName}
            maxLength={30}
          />
        </View>

        {/* Class Selection */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Escolha sua Classe
          </ThemedText>
          <View style={styles.classGrid}>
            {CLASSES.map((classOption) => (
              <Pressable
                key={classOption.id}
                onPress={() => setSelectedClass(classOption.id)}
                style={[
                  styles.classCard,
                  selectedClass === classOption.id && styles.classCardSelected,
                ]}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={[
                    styles.className,
                    selectedClass === classOption.id && styles.classNameSelected,
                  ]}
                >
                  {classOption.name}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.classDescription,
                    selectedClass === classOption.id && styles.classDescriptionSelected,
                  ]}
                >
                  {CLASS_DESCRIPTIONS[classOption.id]}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Start Button */}
        <Pressable
          onPress={handleStartGame}
          disabled={loading || !characterName.trim() || !selectedClass}
          style={[styles.startButton, (loading || !characterName.trim() || !selectedClass) && styles.startButtonDisabled]}
        >
          <ThemedText style={styles.startButtonText}>
            {loading ? "Iniciando..." : "COMEÇAR JORNADA"}
          </ThemedText>
        </Pressable>
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
    justifyContent: "center",
    paddingVertical: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: CyberpunkColors.cyan,
    marginBottom: 8,
    fontFamily: "Courier New",
  },
  subtitle: {
    fontSize: 16,
    color: CyberpunkColors.textSecondary,
    textAlign: "center",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    color: CyberpunkColors.cyan,
    marginBottom: 12,
    fontFamily: "Courier New",
  },
  input: {
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: CyberpunkColors.textPrimary,
    fontSize: 16,
    fontFamily: "Courier New",
  },
  classGrid: {
    gap: 12,
  },
  classCard: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.textDisabled,
    borderRadius: 8,
    padding: 16,
    minHeight: 100,
    justifyContent: "center",
  },
  classCardSelected: {
    borderColor: CyberpunkColors.magenta,
    backgroundColor: CyberpunkColors.cardBg,
  },
  className: {
    fontSize: 16,
    color: CyberpunkColors.textPrimary,
    marginBottom: 8,
  },
  classNameSelected: {
    color: CyberpunkColors.magenta,
  },
  classDescription: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    lineHeight: 16,
  },
  classDescriptionSelected: {
    color: CyberpunkColors.cyan,
  },
  startButton: {
    backgroundColor: CyberpunkColors.cyan,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    marginTop: 24,
  },
  startButtonDisabled: {
    opacity: 0.5,
  },
  startButtonText: {
    color: CyberpunkColors.darkBg,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
});
