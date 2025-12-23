import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
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
    <ThemedView accessible={true} accessibilityRole="form">
      <ThemedText type="title">Bem-vindo ao Habittus! 🎮</ThemedText>
      <ThemedText style={{ marginTop: 8 }}>Vamos criar seu personagem. Comece com seus dados básicos.</ThemedText>

      <ThemedText style={{ marginTop: 12 }}>Nome do Personagem</ThemedText>
      <TextInput
        testID="triage-character-name"
        style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }}
        placeholder="Digite seu nome..."
        value={characterName}
        onChangeText={setCharacterName}
        accessibilityLabel="Nome do Personagem"
        placeholderTextColor={CyberpunkColors.darkGray}
      />

      <ThemedText style={{ marginTop: 12 }}>Idade</ThemedText>
      <TextInput
        testID="triage-age"
        style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }}
        placeholder="Ex: 25"
        value={age}
        onChangeText={setAge}
        accessibilityLabel="Idade"
        keyboardType="numeric"
        placeholderTextColor={CyberpunkColors.darkGray}
      />

      <ThemedText style={{ marginTop: 12 }}>Sexo</ThemedText>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
        <Pressable testID="triage-gender-male" accessibilityRole="button" onPress={() => setGender('male')} accessible={true} style={{ padding: 8, borderWidth: 1, borderColor: CyberpunkColors.cyan, borderRadius: 6 }}>
          <ThemedText>Masculino</ThemedText>
        </Pressable>
        <Pressable testID="triage-gender-female" accessibilityRole="button" onPress={() => setGender('female')} accessible={true} style={{ padding: 8, borderWidth: 1, borderColor: CyberpunkColors.cyan, borderRadius: 6 }}>
          <ThemedText>Feminino</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

export default TriageStepBasic;
