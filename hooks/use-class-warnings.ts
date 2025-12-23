import { useEffect, useState } from 'react';
import { useGameState } from './use-game-state';

export interface ClassWarning {
  type: 'decay-warning' | 'class-at-risk' | 'new-unlock';
  message: string;
  severity: 'info' | 'warning' | 'critical';
}

export function useClassWarnings() {
  const { gameState, userProfile } = useGameState();
  const [warnings, setWarnings] = useState<ClassWarning[]>([]);

  useEffect(() => {
    if (!gameState || !userProfile) return;

    const newWarnings: ClassWarning[] = [];

    // Check if any stats are dangerously low
    const stats = userProfile.stats || {};
    const lowStats = Object.entries(stats).filter(([_, value]) => value < 30);

    if (lowStats.length > 0) {
      newWarnings.push({
        type: 'decay-warning',
        severity: 'critical',
        message: `⚠️ ${lowStats.length} stat(s) em risco! Treinar agora.`,
      });
    }

    // Check if bio monitor is critically low
    if (gameState.bioMonitor.ram < 20 || gameState.bioMonitor.cool < 20) {
      newWarnings.push({
        type: 'class-at-risk',
        severity: 'warning',
        message: '🔴 Seus sistemas estão críticos. Repouso recomendado.',
      });
    }

    setWarnings(newWarnings);
  }, [gameState, userProfile]);

  return warnings;
}
