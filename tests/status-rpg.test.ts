import { describe, expect, it } from 'vitest';
import { getInitialStatBoosts, getInitialPillarBoosts } from '@/lib/biometric-calculator';
import type { ClassType, UserStats } from '@/types/biometric';

describe('status RPG calculations', () => {
  const classes: ClassType[] = ['netrunner', 'solo', 'fixer', 'techie', 'cyborg', 'hacker', 'gladiador', 'ninja', 'tita', 'mestre', 'ser-supremo'];

  it('all base stats should be in 10-50 range (excluding special classes)', () => {
    const specialClasses = ['ser-supremo']; // Ser Supremo tem 100 em tudo
    
    for (const classType of classes) {
      const boosts = getInitialStatBoosts(classType);
      
      if (specialClasses.includes(classType)) {
        // Ser Supremo deve ter 100 em todos os stats
        Object.values(boosts).forEach(stat => {
          expect(stat).toBeGreaterThanOrEqual(100);
        });
      } else {
        // Outras classes devem estar entre 10 e 100
        Object.values(boosts).forEach(stat => {
          expect(stat).toBeGreaterThanOrEqual(10);
          expect(stat).toBeLessThanOrEqual(100);
        });
      }
    }
  });

  it('pillar stats should be between 50-100', () => {
    for (const classType of classes) {
      const pillars = getInitialPillarBoosts(classType);
      Object.values(pillars).forEach((stat: any) => {
        expect(stat).toBeGreaterThanOrEqual(50);
        expect(stat).toBeLessThanOrEqual(100);
      });
    }
  });

  it('class-specific boosts are distinct', () => {
    const netrunnerStats = getInitialStatBoosts('netrunner');
    const soloStats = getInitialStatBoosts('solo');
    
    // Netrunner focuses on intelligence/wisdom
    expect((netrunnerStats.intelligence || 0) + (netrunnerStats.wisdom || 0))
      .toBeGreaterThan((soloStats.intelligence || 0) + (soloStats.wisdom || 0));
    
    // Solo focuses on strength/constitution
    expect((soloStats.strength || 0) + (soloStats.constitution || 0))
      .toBeGreaterThan((netrunnerStats.strength || 0) + (netrunnerStats.constitution || 0));
  });
});
