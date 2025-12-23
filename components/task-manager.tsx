import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, TextInput, Alert } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { CyberButton } from '@/components/cyber-button';
import { CyberpunkColors } from '@/constants/theme';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  xpReward: number;
  createdAt: Date;
}

/**
 * Componente para gerenciar tarefas diárias
 * Rastreamento de atividades e recompensas XP
 */
export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Fazer 3 gigs',
      description: 'Completar 3 trabalhos para ganhar créditos',
      completed: false,
      priority: 'high',
      xpReward: 150,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Estudar por 2 horas',
      description: 'Aumentar RAM e preparar para missões',
      completed: false,
      priority: 'medium',
      xpReward: 100,
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Treinar',
      description: 'Session de treino de 1 hora',
      completed: false,
      priority: 'medium',
      xpReward: 100,
      createdAt: new Date(),
    },
  ]);

  const [taskInput, setTaskInput] = useState('');
  const [xpInput, setXpInput] = useState('50');

  const handleAddTask = () => {
    if (!taskInput.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskInput,
      completed: false,
      priority: 'medium',
      xpReward: parseInt(xpInput) || 50,
      createdAt: new Date(),
    };

    setTasks([newTask, ...tasks]);
    setTaskInput('');
    setXpInput('50');
  };

  const handleCompleteTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalXpEarned = tasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + t.xpReward, 0);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return CyberpunkColors.red;
      case 'medium':
        return CyberpunkColors.yellow;
      case 'low':
        return CyberpunkColors.green;
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return '!!';
      case 'medium':
        return '!';
      case 'low':
        return '·';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>📋 Tarefas do Dia</ThemedText>

      {/* Progress Summary */}
      <View style={styles.progressSection}>
        <View style={styles.progressItem}>
          <ThemedText style={styles.progressLabel}>Tarefas Concluídas</ThemedText>
          <ThemedText style={styles.progressValue}>
            {completedCount} / {tasks.length}
          </ThemedText>
        </View>
        <View style={styles.progressItem}>
          <ThemedText style={styles.progressLabel}>XP Ganho Hoje</ThemedText>
          <ThemedText style={[styles.progressValue, { color: CyberpunkColors.green }]}>
            +{totalXpEarned}
          </ThemedText>
        </View>
      </View>

      {/* Add Task Section */}
      <View style={styles.inputSection}>
        <ThemedText style={styles.sectionTitle}>Adicionar Tarefa</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Descrição da tarefa"
          placeholderTextColor={CyberpunkColors.textSecondary}
          value={taskInput}
          onChangeText={setTaskInput}
        />

        <View style={styles.numberInputRow}>
          <TextInput
            style={[styles.input, styles.numberInput]}
            placeholder="XP Recompensa"
            placeholderTextColor={CyberpunkColors.textSecondary}
            value={xpInput}
            onChangeText={setXpInput}
            keyboardType="number-pad"
          />
        </View>

        <CyberButton onPress={handleAddTask} variant="primary" fullWidth>
          ➕ Adicionar Tarefa
        </CyberButton>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleCompleteTask(item.id)}
            style={[styles.taskItem, item.completed && styles.taskItemCompleted]}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: item.completed }}
          >
            <View style={styles.checkboxContainer}>
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxCompleted,
                ]}
              >
                {item.completed && (
                  <ThemedText style={styles.checkmark}>✓</ThemedText>
                )}
              </View>
            </View>

            <View style={styles.taskContent}>
              <ThemedText
                style={[
                  styles.taskTitle,
                  item.completed && styles.taskTitleCompleted,
                ]}
              >
                {item.title}
              </ThemedText>
              {item.description && (
                <ThemedText style={styles.taskDescription}>
                  {item.description}
                </ThemedText>
              )}
              <View style={styles.taskMeta}>
                <View
                  style={[
                    styles.priorityBadge,
                    {
                      borderColor: getPriorityColor(item.priority),
                    },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.priorityText,
                      {
                        color: getPriorityColor(item.priority),
                      },
                    ]}
                  >
                    {getPriorityIcon(item.priority)} {item.priority}
                  </ThemedText>
                </View>
                <ThemedText style={styles.xpBadge}>
                  +{item.xpReward} XP
                </ThemedText>
              </View>
            </View>

            <Pressable
              onPress={() => handleDeleteTask(item.id)}
              style={styles.deleteButton}
            >
              <ThemedText style={styles.deleteIcon}>✕</ThemedText>
            </Pressable>
          </Pressable>
        )}
        scrollEnabled={false}
        style={styles.taskList}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CyberpunkColors.cyan,
  },
  progressSection: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: CyberpunkColors.inputBg,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
  },
  progressItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CyberpunkColors.cyan,
  },
  inputSection: {
    gap: 12,
    backgroundColor: CyberpunkColors.inputBg,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: CyberpunkColors.textPrimary,
  },
  input: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: CyberpunkColors.textPrimary,
    fontSize: 14,
  },
  numberInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  numberInput: {
    flex: 1,
  },
  taskList: {
    marginTop: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: CyberpunkColors.inputBg,
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
    gap: 12,
  },
  taskItemCompleted: {
    opacity: 0.6,
    borderColor: CyberpunkColors.green,
  },
  checkboxContainer: {
    paddingTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: CyberpunkColors.darkGray,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    borderColor: CyberpunkColors.green,
    backgroundColor: CyberpunkColors.green,
  },
  checkmark: {
    color: CyberpunkColors.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskContent: {
    flex: 1,
    gap: 6,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: CyberpunkColors.textPrimary,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: CyberpunkColors.textSecondary,
  },
  taskDescription: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
  },
  taskMeta: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  xpBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: CyberpunkColors.green,
  },
  deleteButton: {
    padding: 6,
  },
  deleteIcon: {
    fontSize: 18,
    color: CyberpunkColors.red,
    fontWeight: 'bold',
  },
});

export default TaskManager;
