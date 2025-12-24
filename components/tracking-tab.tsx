import React, { useState } from 'react';
import { View, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';
import { useGameState } from '@/hooks/use-game-state';
import { useHaptics } from '@/hooks/use-haptics';

export function TrackingTab() {
  const { gameState } = useGameState();
  const haptics = useHaptics();
  const [waterIntake, setWaterIntake] = useState(0); // em ml
  const [meals, setMeals] = useState<Array<{ name: string; calories: number }>>([]);
  const [mealInput, setMealInput] = useState('');
  const [caloriesInput, setCaloriesInput] = useState('');
  const [activities, setActivities] = useState<Array<{ name: string; caloriesBurned: number }>>([]);
  const [activityInput, setActivityInput] = useState('');
  const [burnedInput, setBurnedInput] = useState('');

  // Metas diárias - valores padrão caso não tenha dados
  const tmb = 2000; // TMB estimado padrão
  const tdee = 2600; // TDEE estimado padrão
  const waterGoal = 2500; // 2.5L padrão
  const calorieGoal = Math.round(tdee);

  // Cálculos
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalBurned = activities.reduce((sum, act) => sum + act.caloriesBurned, 0);
  const netCalories = totalCalories - totalBurned;
  const calorieProgress = (totalCalories / calorieGoal) * 100;
  const waterProgress = (waterIntake / waterGoal) * 100;

  const addWater = (ml: number) => {
    haptics.lightTap();
    setWaterIntake(waterIntake + ml);
  };

  const addMeal = () => {
    if (mealInput.trim() && caloriesInput.trim()) {
      haptics.lightTap();
      const calories = parseInt(caloriesInput) || 0;
      setMeals([...meals, { name: mealInput, calories }]);
      setMealInput('');
      setCaloriesInput('');
    }
  };

  const removeMeal = (index: number) => {
    haptics.lightTap();
    setMeals(meals.filter((_, i) => i !== index));
  };

  const addActivity = () => {
    if (activityInput.trim() && burnedInput.trim()) {
      haptics.lightTap();
      const burned = parseInt(burnedInput) || 0;
      setActivities([...activities, { name: activityInput, caloriesBurned: burned }]);
      setActivityInput('');
      setBurnedInput('');
    }
  };

  const removeActivity = (index: number) => {
    haptics.lightTap();
    setActivities(activities.filter((_, i) => i !== index));
  };

  const resetDay = () => {
    haptics.successFeedback();
    setWaterIntake(0);
    setMeals([]);
    setActivities([]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Água */}
      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Hidratação
        </ThemedText>
        <ThemedText style={styles.goal}>
          {Math.round(waterIntake)} / {waterGoal} ml
        </ThemedText>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(waterProgress, 100)}%`,
                backgroundColor:
                  waterProgress >= 100
                    ? CyberpunkColors.green
                    : waterProgress >= 70
                      ? CyberpunkColors.cyan
                      : CyberpunkColors.magenta,
              },
            ]}
          />
        </View>

        <View style={styles.waterButtons}>
          {[250, 500, 750].map((ml) => (
            <Pressable
              key={ml}
              style={styles.waterButton}
              onPress={() => addWater(ml)}
            >
              <ThemedText style={styles.waterButtonText}>{ml}ml</ThemedText>
            </Pressable>
          ))}
          <Pressable
            style={styles.waterButton}
            onPress={() => setWaterIntake(0)}
          >
            <ThemedText style={styles.waterButtonText}>Reset</ThemedText>
          </Pressable>
        </View>
      </View>

      {/* Dieta */}
      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Nutrição
        </ThemedText>
        <ThemedText style={styles.goal}>
          {totalCalories} / {calorieGoal} cal
        </ThemedText>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(calorieProgress, 100)}%`,
                backgroundColor:
                  calorieProgress >= 100
                    ? CyberpunkColors.orange
                    : CyberpunkColors.green,
              },
            ]}
          />
        </View>

        <View style={styles.mealInput}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder="Nome da refeição"
            placeholderTextColor={CyberpunkColors.textDisabled}
            value={mealInput}
            onChangeText={setMealInput}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Cal"
            placeholderTextColor={CyberpunkColors.textDisabled}
            keyboardType="numeric"
            value={caloriesInput}
            onChangeText={setCaloriesInput}
          />
          <Pressable style={styles.addButton} onPress={addMeal}>
            <ThemedText style={styles.addButtonText}>+</ThemedText>
          </Pressable>
        </View>

        <View style={styles.itemList}>
          {meals.map((meal, index) => (
            <View key={index} style={styles.item}>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.itemName}>{meal.name}</ThemedText>
                <ThemedText style={styles.itemValue}>{meal.calories} cal</ThemedText>
              </View>
              <Pressable
                style={styles.removeButton}
                onPress={() => removeMeal(index)}
              >
                <ThemedText style={styles.removeButtonText}>×</ThemedText>
              </Pressable>
            </View>
          ))}
        </View>
      </View>

      {/* Atividades */}
      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Atividades Físicas
        </ThemedText>
        <ThemedText style={styles.goal}>
          Queimadas: {totalBurned} cal
        </ThemedText>

        <View style={styles.netCalories}>
          <ThemedText style={styles.netLabel}>Saldo:</ThemedText>
          <ThemedText
            style={[
              styles.netValue,
              { color: netCalories < 0 ? CyberpunkColors.green : CyberpunkColors.orange },
            ]}
          >
            {netCalories > 0 ? '+' : ''}{netCalories} cal
          </ThemedText>
        </View>

        <View style={styles.activityInput}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder="Tipo de atividade"
            placeholderTextColor={CyberpunkColors.textDisabled}
            value={activityInput}
            onChangeText={setActivityInput}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Cal"
            placeholderTextColor={CyberpunkColors.textDisabled}
            keyboardType="numeric"
            value={burnedInput}
            onChangeText={setBurnedInput}
          />
          <Pressable style={styles.addButton} onPress={addActivity}>
            <ThemedText style={styles.addButtonText}>+</ThemedText>
          </Pressable>
        </View>

        <View style={styles.itemList}>
          {activities.map((activity, index) => (
            <View key={index} style={styles.item}>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.itemName}>{activity.name}</ThemedText>
                <ThemedText style={styles.itemValue}>{activity.caloriesBurned} cal</ThemedText>
              </View>
              <Pressable
                style={styles.removeButton}
                onPress={() => removeActivity(index)}
              >
                <ThemedText style={styles.removeButtonText}>×</ThemedText>
              </Pressable>
            </View>
          ))}
        </View>
      </View>

      {/* Reset Button */}
      <Pressable style={styles.resetButton} onPress={resetDay}>
        <ThemedText style={styles.resetButtonText}>Resetar Tracking do Dia</ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  section: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.purple,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: CyberpunkColors.cyan,
    marginBottom: 12,
    fontFamily: 'Courier New',
  },
  goal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CyberpunkColors.cyan,
    marginBottom: 8,
    fontFamily: 'Courier New',
  },
  progressBar: {
    height: 24,
    backgroundColor: CyberpunkColors.inputBg,
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  waterButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  waterButton: {
    flex: 1,
    minWidth: 80,
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: 'center',
  },
  waterButtonText: {
    fontSize: 12,
    color: CyberpunkColors.cyan,
    fontWeight: '600',
    fontFamily: 'Courier New',
  },
  mealInput: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  activityInput: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: CyberpunkColors.textPrimary,
    fontSize: 12,
    fontFamily: 'Courier New',
  },
  addButton: {
    backgroundColor: CyberpunkColors.green,
    borderWidth: 2,
    borderColor: CyberpunkColors.green,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: CyberpunkColors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemList: {
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
    borderRadius: 4,
    padding: 8,
  },
  itemName: {
    fontSize: 13,
    color: CyberpunkColors.textPrimary,
    fontWeight: '600',
    fontFamily: 'Courier New',
  },
  itemValue: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    marginTop: 2,
    fontFamily: 'Courier New',
  },
  removeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: CyberpunkColors.red,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: CyberpunkColors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  netCalories: {
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
    borderRadius: 4,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  netLabel: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    fontFamily: 'Courier New',
  },
  netValue: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Courier New',
  },
  resetButton: {
    backgroundColor: CyberpunkColors.error,
    borderWidth: 2,
    borderColor: CyberpunkColors.red,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  resetButtonText: {
    fontSize: 14,
    color: CyberpunkColors.textPrimary,
    fontWeight: 'bold',
    fontFamily: 'Courier New',
  },
});
