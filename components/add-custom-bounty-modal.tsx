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
import { Bounty } from "@/types";

interface AddCustomBountyProps {
  onClose?: () => void;
}

export function AddCustomBountyModal({ onClose }: AddCustomBountyProps) {
  const router = useRouter();
  const { gameState, updateGameState } = useGameState();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState(1000); // Default 1000
  const [monthlyPayment, setMonthlyPayment] = useState(500);

  const handleAddBounty = async () => {
    if (!name.trim()) {
      Alert.alert("Erro", "Nome da dívida é obrigatório");
      return;
    }

    if (monthlyPayment > totalAmount) {
      Alert.alert("Erro", "Pagamento mensal não pode ser maior que o total");
      return;
    }

    if (!gameState) return;

    const newBounty: Bounty = {
      id: `bounty-${Date.now()}`,
      name,
      description,
      totalAmount,
      paidAmount: 0,
      monthlyPaymentGoal: monthlyPayment,
      priority: Math.ceil(totalAmount / 5000), // Higher amount = higher priority
      createdAt: Date.now(),
    };

    try {
      const updatedBounties = [...gameState.bounties, newBounty];
      await updateGameState({
        ...gameState,
        bounties: updatedBounties,
      });

      Alert.alert(
        "Dívida registrada",
        `${newBounty.name}\nTotal: ${totalAmount}\nMeta mensal: ${monthlyPayment}`
      );

      onClose?.();
      router.back();
    } catch (error) {
      console.error("[AddCustomBounty] Error:", error);
      Alert.alert("Erro", "Falha ao registrar dívida");
    }
  };

  const monthsToPayOff = Math.ceil(totalAmount / Math.max(monthlyPayment, 1));

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            ⚠️ REGISTRAR DÍVIDA
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Acompanhe e pague suas obrigações financeiras
          </ThemedText>
        </View>

        {/* Nome da Dívida */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Nome da Dívida *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ex: Cartão de Crédito, Empréstimo..."
            placeholderTextColor={CyberpunkColors.textDisabled}
            value={name}
            onChangeText={setName}
            maxLength={60}
          />
          <ThemedText style={styles.charCount}>{name.length}/60</ThemedText>
        </View>

        {/* Descrição */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Descrição</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Detalhes adicionais..."
            placeholderTextColor={CyberpunkColors.textDisabled}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            maxLength={200}
          />
          <ThemedText style={styles.charCount}>
            {description.length}/200
          </ThemedText>
        </View>

        {/* Valor Total */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Valor Total da Dívida *</ThemedText>
          <View style={styles.amountInput}>
            <ThemedText style={styles.currencySymbol}>$</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={CyberpunkColors.textDisabled}
              value={totalAmount.toString()}
              onChangeText={(text) => {
                const amount = parseInt(text) || 0;
                setTotalAmount(amount);
                if (monthlyPayment > amount) {
                  setMonthlyPayment(amount);
                }
              }}
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* Meta de Pagamento Mensal */}
        <View style={styles.section}>
          <View style={styles.monthlyHeader}>
            <ThemedText style={styles.label}>Meta Mensal de Pagamento</ThemedText>
            <View style={styles.monthlyBadge}>
              <ThemedText style={styles.monthlyValue}>
                ${monthlyPayment}
              </ThemedText>
            </View>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={Math.max(100, totalAmount / 60)}
            maximumValue={totalAmount}
            step={50}
            value={monthlyPayment}
            onValueChange={setMonthlyPayment}
            minimumTrackTintColor={CyberpunkColors.orange}
            maximumTrackTintColor={CyberpunkColors.darkGray}
            thumbTintColor={CyberpunkColors.red}
          />

          <ThemedText style={styles.monthlyDescription}>
            Tempo até quitação: ~{monthsToPayOff} meses
          </ThemedText>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Total</ThemedText>
              <ThemedText style={styles.statValue}>${totalAmount}</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Mensal</ThemedText>
              <ThemedText style={styles.statValue}>${monthlyPayment}</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Prazo</ThemedText>
              <ThemedText style={styles.statValue}>
                {monthsToPayOff}m
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Warning */}
        <View style={styles.warningBox}>
          <ThemedText style={styles.warningText}>
            💡 Registre dívidas reais para acompanhar seu progresso financeiro e
            ganhar motivação ao quitá-las!
          </ThemedText>
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
            onPress={handleAddBounty}
          >
            <ThemedText style={[styles.buttonText, styles.buttonPrimaryText]}>
              REGISTRAR
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
    color: CyberpunkColors.red,
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
    borderColor: CyberpunkColors.red,
    borderRadius: 4,
    padding: 12,
    color: CyberpunkColors.text,
    fontFamily: "Courier New",
    fontSize: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 10,
    color: CyberpunkColors.textDisabled,
    marginTop: 4,
  },
  amountInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    color: CyberpunkColors.text,
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 8,
  },
  monthlyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  monthlyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: CyberpunkColors.orange,
  },
  monthlyValue: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
  slider: {
    height: 40,
    marginBottom: 8,
  },
  monthlyDescription: {
    fontSize: 11,
    color: CyberpunkColors.textDisabled,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.red,
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 10,
    color: CyberpunkColors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: CyberpunkColors.red,
  },
  warningBox: {
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.orange,
    borderRadius: 4,
    padding: 12,
    marginBottom: 20,
  },
  warningText: {
    fontSize: 11,
    color: CyberpunkColors.text,
    lineHeight: 16,
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
    borderColor: CyberpunkColors.red,
    backgroundColor: CyberpunkColors.cardBg,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
  },
  buttonPrimaryText: {
    color: CyberpunkColors.red,
  },
});
