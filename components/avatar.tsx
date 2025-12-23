import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { CyberpunkColors } from '@/constants/theme';

interface AvatarProps {
  userId: string;
  size?: number;
  style?: any;
}

/**
 * Avatar component using DiceBear API
 * Deterministically generates an avatar based on userId
 */
export function Avatar({ userId, size = 80, style }: AvatarProps) {
  const avatarUrl = useMemo(() => {
    // Using DiceBear API with cyberpunk-themed collection
    return `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${userId}&scale=80`;
  }, [userId]);

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Image
        source={{ uri: avatarUrl }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
        cachePolicy="memory-disk"
      />
      <View
        style={[
          styles.neonRing,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: CyberpunkColors.cyan,
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
