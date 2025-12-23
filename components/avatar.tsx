import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { CyberpunkColors } from '@/constants/theme';

interface AvatarProps {
  userId: string;
  size?: number;
  style?: any;
  characterClass?: string;
  weight?: number;
  targetWeight?: number;
  level?: number;
}

/**
 * Avatar component using DiceBear API
 * Deterministically generates an avatar based on userId
 * Variant changes based on character class
 * Ring color changes based on weight progress
 */
export function Avatar({ 
  userId, 
  size = 80, 
  style, 
  characterClass = 'netrunner',
  weight,
  targetWeight,
  level = 1
}: AvatarProps) {
  // Escolhe variant baseado na classe
  const variant = useMemo(() => {
    switch (characterClass) {
      case 'solo':
        return 'bottts'; // Robótico para guerreiro
      case 'netrunner':
        return 'adventurer-neutral'; // Humano tech
      case 'fixer':
        return 'lorelei'; // Elegante para negociador
      case 'techie':
        return 'pixel-art'; // Retro para maker
      default:
        return 'adventurer-neutral';
    }
  }, [characterClass]);

  // Cor do ring baseado em progresso de peso
  const ringColor = useMemo(() => {
    if (!weight || !targetWeight) {
      return CyberpunkColors.cyan; // Padrão
    }

    const progress = Math.abs(weight - targetWeight);
    
    if (progress < 3) {
      return CyberpunkColors.green; // Meta atingida
    } else if (progress < 10) {
      return CyberpunkColors.yellow; // Próximo
    } else {
      return CyberpunkColors.red; // Distante
    }
  }, [weight, targetWeight]);

  const avatarUrl = useMemo(() => {
    // DiceBear v7 API com background baseado na classe
    const bgColors: Record<string, string> = {
      solo: 'ff006e,b537f2', // Magenta/Roxo
      netrunner: '00d9ff,1a1f3a', // Cyan/Dark
      fixer: '39ff14,ffff00', // Verde/Amarelo
      techie: 'ff8c00,b537f2', // Laranja/Roxo
    };

    const bg = bgColors[characterClass] || bgColors.netrunner;
    
    return `https://api.dicebear.com/7.x/${variant}/svg?seed=${userId}&backgroundColor=${bg}&scale=80`;
  }, [userId, variant, characterClass]);

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Image
        source={{ uri: avatarUrl }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
        cachePolicy="memory-disk"
        transition={300}
      />
      <View
        style={[
          styles.neonRing,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 3,
            borderColor: ringColor,
            shadowColor: ringColor,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor: CyberpunkColors.inputBg,
  },
  neonRing: {
    position: 'absolute',
    shadowColor: CyberpunkColors.cyan,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
});
