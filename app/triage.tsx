import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useGameState } from '@/hooks/use-game-state';
import { classifyUser, calculateTMB, calculateTDEE } from '@/lib/biometric-calculator';
import { TriageResponse, Gender } from '@/types/biometric';

export default function TriageScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { saveUserProfile } = useGameState();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Step 1: Basic Info
  const [characterName, setCharacterName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('male');

  // Step 2: Body Metrics
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [bodyFatPercent, setBodyFatPercent] = useState('');

  // Step 3: Objectives
  const [objectives, setObjectives] = useState<string[]>([]);
  const objectiveOptions = [
    'Perder peso',
    'Ganhar massa muscular',
    'Melhorar resistência cardiovascular',
    'Aumentar flexibilidade',
    'Melhorar produtividade',
    'Reduzir estresse',
    'Dormir melhor',
    'Aumentar energia',
  ];

  // Step 4: Routine
  const [trainingFrequency, setTrainingFrequency] = useState('0');
  const [trainingType, setTrainingType] = useState<'strength' | 'cardio' | 'functional' | 'yoga' | null>(null);
  const [sleepHours, setSleepHours] = useState('7');
  const [waterIntake, setWaterIntake] = useState('8');
  const [mealsPerDay, setMealsPerDay] = useState('3');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'active'>('moderate');

  const toggleObjective = (obj: string) => {
    setObjectives(prev =>
      prev.includes(obj) ? prev.filter(o => o !== obj) : [...prev, obj]
    );
  };

  const handleNext = () => {
    // Validação básica
    if (step === 1) {
      if (!characterName.trim() || !age || parseInt(age) < 13 || parseInt(age) > 120) {
        Alert.alert('Erro', 'Por favor, insira um nome válido e uma idade entre 13 e 120 anos');
        return;
      }
    } else if (step === 2) {
      if (!heightCm || !weightKg || !bodyFatPercent) {
        Alert.alert('Erro', 'Por favor, preencha todos os dados biométricos');
        return;
      }
      if (parseInt(heightCm) < 100 || parseInt(heightCm) > 250) {
        Alert.alert('Erro', 'Altura deve estar entre 100 e 250 cm');
        return;
      }
      if (parseInt(weightKg) < 30 || parseInt(weightKg) > 300) {
        Alert.alert('Erro', 'Peso deve estar entre 30 e 300 kg');
        return;
      }
      if (parseInt(bodyFatPercent) < 5 || parseInt(bodyFatPercent) > 50) {
        Alert.alert('Erro', 'Percentual de gordura deve estar entre 5 e 50%');
        return;
      }
    } else if (step === 3) {
      if (objectives.length === 0) {
        Alert.alert('Erro', 'Por favor, selecione pelo menos um objetivo');
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Calcula TMB e TDEE
      const tmb = calculateTMB(
        parseInt(weightKg),
        parseInt(heightCm),
        parseInt(age),
        gender
      );

      const tdee = calculateTDEE(tmb, activityLevel);

      // Cria resposta de triagem
      const triageResponse: TriageResponse = {
        objectives,
        currentTrainingFrequency: parseInt(trainingFrequency),
        primaryTrainingType: trainingType,
        averageSleepHours: parseInt(sleepHours),
        dailyWaterIntake: parseInt(waterIntake),
        mealsPerDay: parseInt(mealsPerDay),
        activityLevel,
      };

      // Classifica usuário
      const biometrics = {
        age: parseInt(age),
        gender,
        heightCm: parseInt(heightCm),
        weightKg: parseInt(weightKg),
        bodyFatPercent: parseInt(bodyFatPercent),
        tdee,
        tmb,
      };

      const classification = classifyUser(triageResponse, biometrics);

      // Salva perfil do usuário
      await saveUserProfile({
        characterName,
        biometrics,
        baseClass: classification.baseClass,
        initialStats: classification.statBoosts,
      });

      // Navega para dashboard
      router.replace('/(tabs)');
    } catch (error) {
      console.error('[Triage] Error:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar sua triagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
          paddingLeft: Math.max(insets.left, 20),
          paddingRight: Math.max(insets.right, 20),
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.title}>
          TRIAGEM INICIAL
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Etapa {step} de 4
        </ThemedText>

        {step === 1 && (
          <View style={styles.stepContainer}>
            <ThemedText type="subtitle" style={styles.stepTitle}>
              Dados Básicos
            </ThemedText>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Nome do Personagem</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome..."
                placeholderTextColor="#666"
                value={characterName}
                onChangeText={setCharacterName}
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Idade</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ex: 25"
                placeholderTextColor="#666"
                value={age}
                onChangeText={setAge}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Sexo</ThemedText>
              <View style={styles.buttonGroup}>
                <Pressable
                  style={[
                    styles.optionButton,
                    gender === 'male' && styles.optionButtonActive,
                  ]}
                  onPress={() => setGender('male')}
                >
                  <ThemedText style={styles.optionButtonText}>Masculino</ThemedText>
                </Pressable>
                <Pressable
                  style={[
                    styles.optionButton,
                    gender === 'female' && styles.optionButtonActive,
                  ]}
                  onPress={() => setGender('female')}
                >
                  <ThemedText style={styles.optionButtonText}>Feminino</ThemedText>
                </Pressable>
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContainer}>
            <ThemedText type="subtitle" style={styles.stepTitle}>
              Dados Biométricos
            </ThemedText>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Altura (cm)</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ex: 180"
                placeholderTextColor="#666"
                value={heightCm}
                onChangeText={setHeightCm}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Peso (kg)</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ex: 75"
                placeholderTextColor="#666"
                value={weightKg}
                onChangeText={setWeightKg}
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Percentual de Gordura (%)</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ex: 20"
                placeholderTextColor="#666"
                value={bodyFatPercent}
                onChangeText={setBodyFatPercent}
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContainer}>
            <ThemedText type="subtitle" style={styles.stepTitle}>
              Seus Objetivos
            </ThemedText>
            <ThemedText style={styles.stepDescription}>
              Selecione todos que se aplicam:
            </ThemedText>

            <View style={styles.objectivesGrid}>
              {objectiveOptions.map(obj => (
                <Pressable
                  key={obj}
                  style={[
                    styles.objectiveButton,
                    objectives.includes(obj) && styles.objectiveButtonActive,
                  ]}
                  onPress={() => toggleObjective(obj)}
                >
                  <ThemedText
                    style={[
                      styles.objectiveButtonText,
                      objectives.includes(obj) && styles.objectiveButtonTextActive,
                    ]}
                  >
                    {obj}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {step === 4 && (
          <View style={styles.stepContainer}>
            <ThemedText type="subtitle" style={styles.stepTitle}>
              Sua Rotina Atual
            </ThemedText>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Treinos por Semana</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ex: 3"
                placeholderTextColor="#666"
                value={trainingFrequency}
                onChangeText={setTrainingFrequency}
                keyboardType="number-pad"
              />
            </View>

            {parseInt(trainingFrequency) > 0 && (
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Tipo de Treino Principal</ThemedText>
                <View style={styles.buttonGroup}>
                  {(['strength', 'cardio', 'functional', 'yoga'] as const).map(type => (
                    <Pressable
                      key={type}
                      style={[
                        styles.optionButton,
                        trainingType === type && styles.optionButtonActive,
                      ]}
                      onPress={() => setTrainingType(type)}
                    >
                      <ThemedText style={styles.optionButtonText}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </ThemedText>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Horas de Sono por Noite</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ex: 7"
                placeholderTextColor="#666"
                value={sleepHours}
                onChangeText={setSleepHours}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Copos de Água por Dia</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ex: 8"
                placeholderTextColor="#666"
                value={waterIntake}
                onChangeText={setWaterIntake}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Nível de Atividade</ThemedText>
              <View style={styles.buttonGroup}>
                {(['sedentary', 'moderate', 'active'] as const).map(level => (
                  <Pressable
                    key={level}
                    style={[
                      styles.optionButton,
                      activityLevel === level && styles.optionButtonActive,
                    ]}
                    onPress={() => setActivityLevel(level)}
                  >
                    <ThemedText style={styles.optionButtonText}>
                      {level === 'sedentary' ? 'Sedentário' : level === 'moderate' ? 'Moderado' : 'Ativo'}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          {step > 1 && (
            <Pressable
              style={[styles.button, styles.buttonSecondary]}
              onPress={() => setStep(step - 1)}
              disabled={loading}
            >
              <ThemedText style={styles.buttonText}>Voltar</ThemedText>
            </Pressable>
          )}
          <Pressable
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleNext}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <ThemedText style={styles.buttonText}>
                {step === 4 ? 'Começar Jornada' : 'Próximo'}
              </ThemedText>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00FFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#a0aec0',
    textAlign: 'center',
    marginBottom: 24,
  },
  stepContainer: {
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00FFFF',
    marginBottom: 16,
  },
  stepDescription: {
    fontSize: 14,
    color: '#a0aec0',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#00FFFF',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 2,
    borderColor: '#00FFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16,
    backgroundColor: '#0f1419',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  optionButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#4a5568',
    borderRadius: 8,
    backgroundColor: '#1a1f3a',
    alignItems: 'center',
  },
  optionButtonActive: {
    borderColor: '#00FFFF',
    backgroundColor: '#00FFFF',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  objectivesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  objectiveButton: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#4a5568',
    borderRadius: 8,
    backgroundColor: '#1a1f3a',
    alignItems: 'center',
  },
  objectiveButtonActive: {
    borderColor: '#FF006E',
    backgroundColor: '#FF006E',
  },
  objectiveButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  objectiveButtonTextActive: {
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonPrimary: {
    backgroundColor: '#00FFFF',
  },
  buttonSecondary: {
    backgroundColor: '#4a5568',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});
