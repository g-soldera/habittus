import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Pressable } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Tooltip } from '@/components/tooltip';
import { CyberpunkColors } from '@/constants/theme';

export interface BioMonitorEnhancedProps {
  ram: number;
  hardware: number;
  cool: number;
  credits: number;
}

/**
 * Componente melhorado de BioMonitor com tooltips interativos
 * Mostra os 4 stats principais com explicações sobre cada um
 */
export function BioMonitorEnhanced({
  ram,
  hardware,
  cool,
  credits,
}: BioMonitorEnhancedProps) {
  const [animatedValues] = useState({
    ram: new Animated.Value(0),
    hardware: new Animated.Value(0),
    cool: new Animated.Value(0),
    credits: new Animated.Value(0),
  });

  // Animar cada stat quando valores mudarem
  useEffect(() => {
    const animations = [
      Animated.timing(animatedValues.ram, {
        toValue: ram / 100,
        duration: 600,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValues.hardware, {
        toValue: hardware / 100,
        duration: 600,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValues.cool, {
        toValue: cool / 100,
        duration: 600,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValues.credits, {
        toValue: Math.min(credits / 1000, 1),
        duration: 600,
        useNativeDriver: false,
      }),
    ];

    Animated.parallel(animations).start();
  }, [ram, hardware, cool, credits]);

  const getBarColor = (value: number): string => {
    if (value < 20) return CyberpunkColors.red;
    if (value < 50) return CyberpunkColors.yellow;
    if (value < 80) return CyberpunkColors.green;
    return CyberpunkColors.cyan;
  };

  const getAlertLevel = (value: number): 'critical' | 'warning' | 'info' | 'ok' => {
    if (value < 20) return 'critical';
    if (value < 50) return 'warning';
    if (value < 80) return 'info';
    return 'ok';
  };

  const StatBar = ({
    label,
    value,
    unit,
    icon,
    tooltip,
  }: {
    label: string;
    value: number;
    unit: string;
    icon: string;
    tooltip: { title: string; description: string };
  }) => {
    const widthValue = animatedValues[label.toLowerCase() as keyof typeof animatedValues];
    const animatedWidth = widthValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <Tooltip title={tooltip.title} description={tooltip.description}>
        <View style={styles.statContainer}>
          <View style={styles.statHeader}>
            <ThemedText style={styles.statIcon}>{icon}</ThemedText>
            <ThemedText style={styles.statLabel}>{label}</ThemedText>
            <ThemedText style={styles.statValue}>
              {Math.round(value)}{unit}
            </ThemedText>
          </View>
          <View style={[styles.barBg, { backgroundColor: CyberpunkColors.darkGray }]}>
            <Animated.View
              style={[
                styles.barFill,
                {
                  width: animatedWidth,
                  backgroundColor: getBarColor(value),
                },
              ]}
            />
          </View>
          {getAlertLevel(value) !== 'ok' && (
            <ThemedText
              style={[
                styles.alert,
                {
                  color:
                    getAlertLevel(value) === 'critical'
                      ? CyberpunkColors.red
                      : CyberpunkColors.yellow,
                },
              ]}
            >
              {getAlertLevel(value) === 'critical'
                ? '⚠ Crítico'
                : '⚠ Atenção'}
            </ThemedText>
          )}
        </View>
      </Tooltip>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>⚡ BioMonitor do Sistema</ThemedText>
      <ThemedText style={styles.subtitle}>Toque em cada stat para mais informações</ThemedText>

      <View style={styles.grid}>
        <StatBar
          label="RAM"
          value={ram}
          unit="%"
          icon="🧠"
          tooltip={{
            title: 'RAM - Processamento Mental',
            description:
              'Sua capacidade de foco e concentração. Aumenta com horas de estudo e sessões de foco. Decresce com falta de sono e stress.',
          }}
        />
        <StatBar
          label="Hardware"
          value={hardware}
          unit="%"
          icon="💪"
          tooltip={{
            title: 'Hardware - Condicionamento Físico',
            description:
              'Sua saúde e resistência física. Aumenta com treino regular e baixa gordura corporal. Essencial para completar gigs fisicamente exaustivas.',
          }}
        />
        <StatBar
          label="Cool"
          value={cool}
          unit="%"
          icon="❄️"
          tooltip={{
            title: 'Cool - Controle Emocional',
            description:
              'Sua compostura e resistência ao stress. Aumenta com sono adequado e diminuição do stress. Necessário para missions críticas sem penalties.',
          }}
        />
        <StatBar
          label="Credits"
          value={credits}
          unit=" ✨"
          icon="💰"
          tooltip={{
            title: 'Credits - Recursos Financeiros',
            description:
              'Seu capital disponível. Aumenta com renda mensal e bounties. Necessário para upgrades de avatar e itens na loja.',
          }}
        />
      </View>

      <ClassWarningsPanel ram={ram} hardware={hardware} cool={cool} />
    </ThemedView>
  );
}

/**
 * Painel melhorado de alertas por classe
 */
function ClassWarningsPanel({
  ram,
  hardware,
  cool,
}: {
  ram: number;
  hardware: number;
  cool: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const getRecommendations = (): string[] => {
    const recs: string[] = [];

    if (ram < 30)
      recs.push('📚 Aumente sessões de estudo - seu RAM está baixo');
    if (hardware < 30)
      recs.push('🏋️ Treine mais - seu corpo precisa de força');
    if (cool < 30) recs.push('😴 Durma mais - você está muito estressado');
    if (ram < 50 && hardware < 50 && cool < 50)
      recs.push('🆘 Você está sobrecarregado! Considere tirar um dia de descanso');

    return recs;
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) {
    return (
      <View style={[styles.warningPanel, styles.warningPanelOk]}>
        <ThemedText style={styles.warningTitle}>✅ Tudo Funcionando Normalmente</ThemedText>
        <ThemedText style={styles.warningText}>
          Seus sistemas estão balanceados. Continue assim!
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={[styles.warningPanel, styles.warningPanelAlert]}>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        style={styles.warningHeader}
        accessibilityRole="button"
        accessibilityLabel="Alertas de Sistema"
      >
        <ThemedText style={styles.warningTitle}>⚠️ Alertas de Sistema</ThemedText>
        <ThemedText style={styles.expandIcon}>{expanded ? '▼' : '▶'}</ThemedText>
      </Pressable>

      {expanded && (
        <View style={styles.warningContent}>
          {recommendations.map((rec, idx) => (
            <ThemedText key={idx} style={styles.warningText}>
              {rec}
            </ThemedText>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    backgroundColor: CyberpunkColors.cardBg,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CyberpunkColors.cyan,
    marginBottom: 4,
    textShadowColor: CyberpunkColors.cyan,
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    marginBottom: 16,
  },
  grid: {
    gap: 12,
    marginBottom: 12,
  },
  statContainer: {
    backgroundColor: CyberpunkColors.inputBg,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 20,
  },
  statLabel: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: CyberpunkColors.textPrimary,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CyberpunkColors.cyan,
    minWidth: 60,
    textAlign: 'right',
  },
  barBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  alert: {
    fontSize: 12,
    fontWeight: '600',
  },
  warningPanel: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
  },
  warningPanelOk: {
    backgroundColor: `${CyberpunkColors.green}20`,
    borderColor: CyberpunkColors.green,
  },
  warningPanelAlert: {
    backgroundColor: `${CyberpunkColors.yellow}20`,
    borderColor: CyberpunkColors.yellow,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CyberpunkColors.yellow,
  },
  expandIcon: {
    color: CyberpunkColors.yellow,
    fontSize: 12,
  },
  warningContent: {
    marginTop: 8,
    gap: 6,
  },
  warningText: {
    fontSize: 13,
    color: CyberpunkColors.textPrimary,
    lineHeight: 18,
  },
});

export default BioMonitorEnhanced;
