import { useEffect, useState } from 'react';
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
import { CyberpunkColors } from '@/constants/theme';
import { useGameState } from '@/hooks/use-game-state';
import { classifyUser, calculateTMB, calculateTDEE } from '@/lib/biometric-calculator';
import { TriageResponse, Gender, Pillar, BiometricData } from '@/types/biometric';

// Step components
import TriageStepBasic from '@/components/triage/step-basic';
import TriageStepBiometrics from '@/components/triage/step-biometrics';
import TriageStepObjectives from '@/components/triage/step-objectives';
import TriageStepHealth from '@/components/triage/step-health';
import TriageStepNutrition from '@/components/triage/step-nutrition';
import TriageStepStudy from '@/components/triage/step-study';
import TriageStepFinance from '@/components/triage/step-finance';

export default function TriageScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { saveUserProfile, userProfile, loadingProfile } = useGameState();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // If a profile already exists, this is not the first run: redirect to dashboard
  useEffect(() => {
    if (!loadingProfile && userProfile) {
      router.replace('/(tabs)');
    }
  }, [loadingProfile, userProfile, router]);

  // Step 1: Basic Info
  const [characterName, setCharacterName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('male');

  // Step 2: Body Metrics
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [bodyFatPercent, setBodyFatPercent] = useState('');

  // Step 3: Objectives (7 Pillars)
  const [objectives, setObjectives] = useState<Pillar[]>([]);
  const pillarOptions: { label: string; value: Pillar }[] = [
    { label: '💪 Saúde Física', value: 'health' },
    { label: '🍎 Nutrição', value: 'nutrition' },
    { label: '📚 Estudo', value: 'study' },
    { label: '✅ Produtividade', value: 'productivity' },
    { label: '💰 Finanças', value: 'finance' },
    { label: '🎯 Hábitos', value: 'habits' },
    { label: '👥 Social', value: 'social' },
  ];

  // Step 4: Health Details
  const [trainingFrequency, setTrainingFrequency] = useState('0');
  const [trainingType, setTrainingType] = useState<'strength' | 'cardio' | 'functional' | 'yoga' | null>(null);

  // Step 5: Nutrition Details
  const [dietType, setDietType] = useState('balanced');
  const [mealsPerDay, setMealsPerDay] = useState('3');

  // Step 6: Study & Productivity
  const [hoursStudyPerWeek, setHoursStudyPerWeek] = useState('0');
  const [hoursOfFocusPerDay, setHoursOfFocusPerDay] = useState('0');

  // Step 7: Finance & Habits
  const [monthlyIncome, setMonthlyIncome] = useState('0');
  const [totalDebt, setTotalDebt] = useState('0');
  const [averageSleepHours, setAverageSleepHours] = useState('7');

  const toggleObjective = (obj: Pillar) => {
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

    if (step < 7) {
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

      const activityLevel = parseInt(trainingFrequency) > 3 ? 'active' : parseInt(trainingFrequency) > 0 ? 'moderate' : 'sedentary';
      const tdee = calculateTDEE(tmb, activityLevel);

      // Cria resposta de triagem
      const triageResponse: TriageResponse = {
        objectives,
        currentTrainingFrequency: parseInt(trainingFrequency),
        primaryTrainingType: trainingType,
        healthObjectives: [],
        nutritionObjectives: [],
        studyObjectives: [],
        productivityObjectives: [],
        financialObjectives: [],
        socialObjectives: [],
        averageSleepHours: parseInt(averageSleepHours),
        mealsPerDay: parseInt(mealsPerDay),
        educationLevel: 'superior',
        hoursStudyPerWeek: parseInt(hoursStudyPerWeek),
        areasOfInterest: [],
        hoursOfFocusPerDay: parseInt(hoursOfFocusPerDay),
        monthlyIncome: parseInt(monthlyIncome),
        totalDebt: parseInt(totalDebt),
        monthlySavings: 0,
        meditationFrequency: 'never',
        journalingFrequency: 'never',
        stressLevel: 5,
        socialActivitiesPerWeek: 0,
        networkingInterest: false,
        mentoringInterest: false,
        dietType,
      };

      // Classifica usuário
      const biometrics: BiometricData = {
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
        pillarStats: classification.pillarBoosts,
      });

      // Navega para dashboard
      router.replace('/(tabs)');
    } catch (error) {
      console.error('[Triage] Error:', error);
      Alert.alert('Erro', 'Falha ao salvar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="title" style={styles.stepTitle}>
              Bem-vindo ao Habittus! 🎮
            </ThemedText>

            <TriageStepBasic
              characterName={characterName}
              setCharacterName={setCharacterName}
              age={age}
              setAge={setAge}
              gender={gender}
              setGender={setGender}
            />
          </ThemedView>
        );

      case 2:
        return (
          <ThemedView style={styles.stepContainer}>
            <TriageStepBiometrics
              heightCm={heightCm}
              setHeightCm={setHeightCm}
              weightKg={weightKg}
              setWeightKg={setWeightKg}
              bodyFatPercent={bodyFatPercent}
              setBodyFatPercent={setBodyFatPercent}
            />
          </ThemedView>
        );

      case 3:
        return (
          <ThemedView style={styles.stepContainer}>
            <TriageStepObjectives
              objectives={objectives}
              toggleObjective={toggleObjective}
              pillarOptions={pillarOptions}
            />
          </ThemedView>
        );

      case 4:
        return (
          <ThemedView style={styles.stepContainer}>
            <TriageStepHealth
              trainingFrequency={trainingFrequency}
              setTrainingFrequency={setTrainingFrequency}
              trainingType={trainingType}
              setTrainingType={setTrainingType}
            />
          </ThemedView>
        );

      case 5:
        return (
          <ThemedView style={styles.stepContainer}>
            <TriageStepNutrition
              dietType={dietType}
              setDietType={setDietType}
              mealsPerDay={mealsPerDay}
              setMealsPerDay={setMealsPerDay}
            />
          </ThemedView>
        );

      case 6:
        return (
          <ThemedView style={styles.stepContainer}>
            <TriageStepStudy
              hoursStudyPerWeek={hoursStudyPerWeek}
              setHoursStudyPerWeek={setHoursStudyPerWeek}
              hoursOfFocusPerDay={hoursOfFocusPerDay}
              setHoursOfFocusPerDay={setHoursOfFocusPerDay}
            />
          </ThemedView>
        );

      case 7:
        return (
          <ThemedView style={styles.stepContainer}>
            <TriageStepFinance
              monthlyIncome={monthlyIncome}
              setMonthlyIncome={setMonthlyIncome}
              totalDebt={totalDebt}
              setTotalDebt={setTotalDebt}
              averageSleepHours={averageSleepHours}
              setAverageSleepHours={setAverageSleepHours}
            />
          </ThemedView>
        );

      default:
        return null;
    }
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderStep()}

        <View style={styles.progressContainer}>
          <ThemedText style={styles.progressText}>
            Etapa {step} de 7
          </ThemedText>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(step / 7) * 100}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {step > 1 && (
            <Pressable
              style={styles.backButton}
              onPress={() => setStep(step - 1)}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
              testID="triage-back-button"
            >
              <ThemedText style={styles.backButtonText}>← Voltar</ThemedText>
            </Pressable>
          )}

          <Pressable
            style={[styles.nextButton, loading && styles.nextButtonDisabled]}
            onPress={handleNext}
            accessibilityRole="button"
            accessibilityLabel={step === 7 ? 'Criar Personagem' : 'Próximo'}
            testID="triage-next-button"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.nextButtonText}>
                {step === 7 ? 'Criar Personagem' : 'Próximo →'}
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
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  stepContainer: {
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: CyberpunkColors.cyan,
  },
  stepDescription: {
    fontSize: 14,
    marginBottom: 20,
    opacity: 0.7,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: CyberpunkColors.cyan,
  },
  input: {
    borderWidth: 1,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    color: CyberpunkColors.cyan,
    fontFamily: 'monospace',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 8,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: CyberpunkColors.cyan,
  },
  genderButtonText: {
    fontWeight: '600',
  },
  objectivesGrid: {
    gap: 12,
  },
  objectiveButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 8,
    marginBottom: 8,
  },
  objectiveButtonActive: {
    backgroundColor: CyberpunkColors.cyan,
  },
  objectiveButtonText: {
    fontWeight: '600',
  },
  trainingTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  trainingTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 6,
  },
  trainingTypeButtonActive: {
    backgroundColor: CyberpunkColors.cyan,
  },
  trainingTypeButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 12,
    marginBottom: 8,
    opacity: 0.7,
  },
  progressBar: {
    height: 4,
    backgroundColor: CyberpunkColors.darkGray,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: CyberpunkColors.cyan,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    fontWeight: '600',
    color: CyberpunkColors.cyan,
  },
  nextButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: CyberpunkColors.cyan,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
  nextButtonText: {
    fontWeight: '600',
    color: CyberpunkColors.black,
  },
});
