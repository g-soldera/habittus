import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';
import { CyberButton } from '@/components/cyber-button';
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
      <ThemedText type="title" style={styles.title}>BEM-VINDO AO HABITTUS</ThemedText>
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
        <CyberButton
          testID="triage-gender-male"
          onPress={() => setGender('male')}
          active={gender === 'male'}
          variant="secondary"
          size="md"
          accessibilityLabel="Masculino"
          style={{ flex: 1 }}
        >
          Masculino
        </CyberButton>
        <CyberButton
          testID="triage-gender-female"
          onPress={() => setGender('female')}
          active={gender === 'female'}
          variant="secondary"
          size="md"
          accessibilityLabel="Feminino"
          style={{ flex: 1 }}
        >
          Feminino
        </CyberButton>
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
    marginBottom: 16,
  },
});

export default TriageStepBasic;
