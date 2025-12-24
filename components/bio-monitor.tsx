import { View, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { ThemedText } from "./themed-text";
import { CyberpunkColors } from "@/constants/theme";
import { BioMonitor } from "@/types";

interface BioMonitorProps {
  stats: BioMonitor;
}

const STAT_DESCRIPTIONS: Record<string, { title: string; description: string }> = {
  ram: {
    title: "RAM (Foco/Energia)",
    description: "Nível de concentração e energia. Afetado por sono, estresse e atividades físicas. Crítico abaixo de 30%.",
  },
  hardware: {
    title: "HARDWARE (Resistência)",
    description: "Sua condição física geral. Influenciado por treino e nutrição. Melhora com exercícios regulares.",
  },
  cool: {
    title: "COOL (Carisma/Estilo)",
    description: "Sua apresentação pessoal e confiança. Aumenta com conquistas, roupa, e estilo de vida saudável.",
  },
};

export function BioMonitorComponent({ stats }: BioMonitorProps) {
  const [expandedStat, setExpandedStat] = useState<string | null>(null);

  const StatBar = ({ 
    label, 
    value, 
    color,
    description 
  }: { 
    label: string; 
    value: number; 
    color: string;
    description?: string;
  }) => {
    const animatedWidth = useSharedValue(0);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
      animatedWidth.value = withSpring(value, { damping: 5, mass: 1 });
    }, [value]);

    const animatedStyle = useAnimatedStyle(() => ({
      width: `${Math.min(animatedWidth.value, 100)}%`,
    }));

    const id = `bio-stat-${label.toLowerCase()}`;
    const statusText = value >= 70 ? "OK" : value >= 40 ? "WARN" : "CRIT";
    
    return (
      <Pressable
        onPress={() => setIsExpanded(!isExpanded)}
        style={[
          styles.statContainer,
          isExpanded && styles.statContainerExpanded,
        ]}
        testID={`${id}-container`}
        accessible
        accessibilityLabel={`${label} ${value}%`}
        accessibilityValue={{ min: 0, now: value, max: 100 }}
      >
        <View style={styles.statHeader}>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.statLabel} testID={`${id}-label`}>
              {label} {statusText}
            </ThemedText>
            {isExpanded && description && (
              <ThemedText style={styles.statDescription}>{description}</ThemedText>
            )}
          </View>
          <ThemedText style={[styles.statValue, { color }]} testID={`${id}-value`}>
            {value}%
          </ThemedText>
        </View>
        <View style={styles.barBackground} testID={`${id}-bar-bg`}>
          <Animated.View
            style={[
              styles.barFill,
              {
                backgroundColor: color,
              },
              animatedStyle,
            ]}
            testID={`${id}-bar-fill`}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container} testID="bio-monitor" accessible accessibilityRole="summary" accessibilityLabel="Bio Monitor">
      <View style={styles.titleContainer}>
        <ThemedText type="subtitle" style={styles.title} testID="bio-monitor-title">
          BIO-MONITOR
        </ThemedText>
        <ThemedText style={styles.tooltip}>Toque para ver detalhes</ThemedText>
      </View>

      <StatBar 
        label="RAM" 
        value={stats.ram} 
        color={CyberpunkColors.cyan}
        description={STAT_DESCRIPTIONS.ram.description}
      />
      <StatBar 
        label="HARDWARE" 
        value={stats.hardware} 
        color={CyberpunkColors.green}
        description={STAT_DESCRIPTIONS.hardware.description}
      />
      <StatBar 
        label="COOL" 
        value={stats.cool} 
        color={CyberpunkColors.magenta}
        description={STAT_DESCRIPTIONS.cool.description}
      />

      {/* Credits display */}
      <View style={styles.creditsContainer} testID="bio-credits-container" accessible accessibilityLabel={`Credits ${stats.credits}`}>
        <View>
          <ThemedText style={styles.creditsLabel} testID="bio-credits-label">
            CREDITS (Moeda)
          </ThemedText>
          <ThemedText style={styles.creditsDescription}>
            Moeda usada para comprar itens na loja
          </ThemedText>
        </View>
        <ThemedText style={styles.creditsValue} testID="bio-credits-value">
          {stats.credits}
        </ThemedText>
      </View>

      {/* XP and Gold display */}
      <View style={styles.statsRow} testID="bio-stats-row">
        <View style={styles.statBox} testID="bio-xp-box" accessible accessibilityLabel={`XP ${stats.totalXp}`}>
          <ThemedText style={styles.statBoxLabel} testID="bio-xp-label">
            XP (Exp)
          </ThemedText>
          <ThemedText style={styles.statBoxDescription}>
            Experiência para subir de nível
          </ThemedText>
          <ThemedText style={styles.statBoxValue} testID="bio-xp-value">
            {stats.totalXp}
          </ThemedText>
        </View>
        <View style={styles.statBox} testID="bio-gold-box" accessible accessibilityLabel={`Gold ${stats.totalGold}`}>
          <ThemedText style={styles.statBoxLabel} testID="bio-gold-label">
            GOLD (€)
          </ThemedText>
          <ThemedText style={styles.statBoxDescription}>
            Moeda de recompensa pelas gigs
          </ThemedText>
          <ThemedText style={styles.statBoxValue} testID="bio-gold-value">
            {stats.totalGold}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    color: CyberpunkColors.cyan,
    fontFamily: "Courier New",
  },
  tooltip: {
    fontSize: 10,
    color: CyberpunkColors.textDisabled,
    fontFamily: "Courier New",
    marginTop: 4,
    fontStyle: "italic",
  },
  statContainer: {
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  statContainerExpanded: {
    paddingVertical: 12,
    marginBottom: 16,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
    fontWeight: "600",
  },
  statDescription: {
    fontSize: 11,
    color: CyberpunkColors.textDisabled,
    fontFamily: "Courier New",
    marginTop: 6,
    lineHeight: 16,
  },
  statValue: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  barBackground: {
    height: 8,
    backgroundColor: CyberpunkColors.inputBg,
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
  creditsContainer: {
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.magenta,
    borderRadius: 4,
    padding: 12,
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  creditsLabel: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
    fontWeight: "600",
  },
  creditsDescription: {
    fontSize: 10,
    color: CyberpunkColors.textDisabled,
    fontFamily: "Courier New",
    marginTop: 4,
  },
  creditsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: CyberpunkColors.magenta,
    fontFamily: "Courier New",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.purple,
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
  statBoxLabel: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    marginBottom: 4,
    fontFamily: "Courier New",
    fontWeight: "600",
  },
  statBoxDescription: {
    fontSize: 9,
    color: CyberpunkColors.textDisabled,
    fontFamily: "Courier New",
    marginBottom: 6,
    textAlign: "center",
    lineHeight: 12,
  },
  statBoxValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: CyberpunkColors.purple,
    fontFamily: "Courier New",
  },
});
