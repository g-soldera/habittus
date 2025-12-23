import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkInput } from '@/components/cyberpunk-input';
import { CyberpunkButton } from '@/components/cyberpunk-button';
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
      <ThemedText type="title">Bem-vindo ao Habittus! 🎮</ThemedText>
      <ThemedText style={{ marginTop: 8 }}>Vamos criar seu personagem. Comece com seus dados básicos.</ThemedText>

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Nome do Personagem</ThemedText>
      <CyberpunkInput
        testID="triage-character-name"
        placeholder="Digite seu nome..."
        value={characterName}
        onChangeText={setCharacterName}
        accessibilityLabel="Nome do Personagem"
      />

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Idade</ThemedText>
      <CyberpunkInput
        testID="triage-age"
        placeholder="Ex: 25"
        value={age}
        onChangeText={setAge}
        accessibilityLabel="Idade"
        keyboardType="numeric"
      />

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Sexo</ThemedText>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ flex: 1 }}>
          <CyberpunkButton
            testID="triage-gender-male"
            label="Masculino"
            icon="♂️"
            selected={gender === 'male'}
            onPress={() => setGender('male')}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CyberpunkButton
            testID="triage-gender-female"
            label="Feminino"
            icon="♀️"
            selected={gender === 'female'}
            onPress={() => setGender('female')}
          />
        </View>
      </View>
    </ThemedView>
  );
}

export default TriageStepBasic;
