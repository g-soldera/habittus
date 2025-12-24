import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { CyberpunkColors } from '@/constants/theme';
import { UserStats, ClassType } from '@/types/biometric';

interface ClassStatusProps {
  baseClass: ClassType;
  stats: UserStats;
  level: number;
}

const classEmojis: Record<ClassType, string> = {
  netrunner: 'NET',
  solo: 'SOLO',
  fixer: 'FIX',
  techie: 'TECH',
  cyborg: 'CYBORG',
  hacker: 'HACK',
  gladiador: 'GLAD',
  ninja: 'NINJA',
  tita: 'TITAN',
  mestre: 'MSTR',
  'ser-supremo': 'SUPR',
};

const classColors: Record<ClassType, string> = {
  netrunner: CyberpunkColors.cyan,
  solo: CyberpunkColors.red,
  fixer: CyberpunkColors.green,
  techie: CyberpunkColors.purple,
  cyborg: CyberpunkColors.magenta,
  hacker: CyberpunkColors.cyan,
  gladiador: CyberpunkColors.orange,
  ninja: CyberpunkColors.purple,
  tita: CyberpunkColors.red,
  mestre: CyberpunkColors.cyan,
  'ser-supremo': CyberpunkColors.magenta,
};

export function ClassStatus({ baseClass, stats, level }: ClassStatusProps) {
  const emoji = classEmojis[baseClass];
  const color = classColors[baseClass];

  const StatBar = ({ label, value }: { label: string; value: number }) => (
    <View style={styles.statItem}>
      <ThemedText style={[styles.statLabel, { color }]}>{label}</ThemedText>
      <View style={[styles.statBarBg, { borderColor: color }]}>
        <View
          style={[
            styles.statBarFill,
            {
              width: `${Math.min(value, 100) * 0.5}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
      <ThemedText style={[styles.statValue, { color }]}>{value}</ThemedText>
    </View>
  );

  return (
    <ThemedView style={[styles.container, { borderColor: color }]}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.emoji}>{emoji}</ThemedText>
        <View style={{ flex: 1 }}>
          <ThemedText style={[styles.className, { color }]}>
            {baseClass.toUpperCase()}
          </ThemedText>
          <ThemedText style={styles.levelText}>NÍVEL {level}</ThemedText>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statsColumn}>
          <StatBar label="STR" value={stats.strength} />
          <StatBar label="AGI" value={stats.agility} />
          <StatBar label="CON" value={stats.constitution} />
          <StatBar label="INT" value={stats.intelligence} />
        </View>
        <View style={styles.statsColumn}>
          <StatBar label="WIS" value={stats.wisdom} />
          <StatBar label="CHA" value={stats.charisma} />
          <StatBar label="WIL" value={stats.willpower} />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 16,
    backgroundColor: CyberpunkColors.cardBg,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  emoji: {
    fontSize: 40,
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Courier New',
  },
  levelText: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    marginTop: 2,
    fontFamily: 'Courier New',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statsColumn: {
    flex: 1,
    gap: 10,
  },
  statItem: {
    gap: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Courier New',
  },
  statBarBg: {
    height: 6,
    backgroundColor: CyberpunkColors.inputBg,
    borderRadius: 3,
    borderWidth: 1,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  statValue: {
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Courier New',
    alignSelf: 'flex-end',
  },
});
