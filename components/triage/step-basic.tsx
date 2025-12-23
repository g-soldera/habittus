import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';
import type { Gender } from '@/types/biometric';

export function TriageStepBasic({
  characterName,
  setCharacterName,
  age,
  setAge,
  gender,
  setGender,
}: {
  characterName: string;
  setCharacterName: (v: string) => void;
  age: string;
  setAge: (v: string) => void;
  gender: Gender;
  setGender: (g: Gender) => void;
}) {
  return (
    <ThemedView accessible={true}>
      <ThemedText type="title" style={styles.title}>Bem-vindo ao Habittus! 🎮</ThemedText>
      <ThemedText style={styles.subtitle}>
        Vamos criar seu personagem. Comece com seus dados básicos.
      </ThemedText>

      <ThemedText style={styles.label}>Nome do Personagem</ThemedText>
      <TextInput
        testID="triage-character-name"
        style={styles.input}
        placeholder="Digite seu nome..."
        value={characterName}
        onChangeText={setCharacterName}
        accessibilityLabel="Nome do Personagem"
        placeholderTextColor={CyberpunkColors.textDisabled}
      />

      <ThemedText style={styles.label}>Idade</ThemedText>
      <TextInput
        testID="triage-age"
        style={styles.input}
        placeholder="Ex: 25"
        value={age}
        onChangeText={setAge}
        accessibilityLabel="Idade"
        keyboardType="numeric"
        placeholderTextColor={CyberpunkColors.textDisabled}
      />

      <ThemedText style={styles.label}>Sexo</ThemedText>
      <View style={styles.genderContainer}>
        <Pressable
          testID="triage-gender-male"
          accessibilityRole="button"
          onPress={() => setGender('male')}
          accessible={true}
          style={[
            styles.genderButton,
            gender === 'male' && styles.genderButtonActive,
          ]}
        >
          <ThemedText style={[
            styles.genderButtonText,
            gender === 'male' && styles.genderButtonTextActive,
          ]}>
            ♂️ Masculino
          </ThemedText>
        </Pressable>
        <Pressable
          testID="triage-gender-female"
          accessibilityRole="button"
          onPress={() => setGender('female')}
          accessible={true}
          style={[
            styles.genderButton,
            gender === 'female' && styles.genderButtonActive,
          ]}
        >
          <ThemedText style={[
            styles.genderButtonText,
            gender === 'female' && styles.genderButtonTextActive,
          ]}>
            ♀️ Feminino
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: CyberpunkColors.cyan,
  },
  subtitle: {
    marginTop: 8,
    color: CyberpunkColors.textSecondary,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: CyberpunkColors.cyan,
  },
  input: {
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    backgroundColor: CyberpunkColors.inputBg,
    color: CyberpunkColors.textPrimary,
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    padding: 16,
    borderWidth: 2,
    borderColor: CyberpunkColors.darkGray,
    backgroundColor: CyberpunkColors.inputBg,
    borderRadius: 6,
    alignItems: 'center',
  },
  genderButtonActive: {
    borderColor: CyberpunkColors.magenta,
    backgroundColor: CyberpunkColors.cardBg,
    shadowColor: CyberpunkColors.magenta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  genderButtonText: {
    fontSize: 16,
    color: CyberpunkColors.textSecondary,
    fontWeight: '600',
  },
  genderButtonTextActive: {
    color: CyberpunkColors.magenta,
    fontWeight: 'bold',
  },
});

export default TriageStepBasic;
