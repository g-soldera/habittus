import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { CyberpunkColors } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CyberButton } from '@/components/cyber-button';
import { LogNutrition } from '@/components/log-nutrition';
import { LogStudy } from '@/components/log-study';
import { TaskManager } from '@/components/task-manager';
import { FinanceTracker } from '@/components/finance-tracker';
import { CyberpunkGrid } from '@/components/cyberpunk-grid';
import { CyberpunkOverlay } from '@/components/cyberpunk-overlay';

type TrackingTab = 'nutrition' | 'study' | 'tasks' | 'finance';

/**
 * Página de rastreamento integrada
 * Combina nutrição, estudo, tarefas e finanças
 */
export default function TrackingScreen() {
  const [activeTab, setActiveTab] = useState<TrackingTab>('tasks');
  const insets = useSafeAreaInsets();

  const tabs: { id: TrackingTab; label: string; icon: string }[] = [
    { id: 'tasks', label: 'Tarefas', icon: '📋' },
    { id: 'nutrition', label: 'Nutrição', icon: '🍱' },
    { id: 'study', label: 'Estudo', icon: '📚' },
    { id: 'finance', label: 'Finanças', icon: '💰' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'nutrition':
        return <LogNutrition onSave={(payload) => console.log('Nutrição salva:', payload)} />;
      case 'study':
        return <LogStudy onSave={(payload) => console.log('Estudo salvo:', payload)} />;
      case 'tasks':
        return <TaskManager />;
      case 'finance':
        return <FinanceTracker />;
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
      <CyberpunkGrid />
      <CyberpunkOverlay />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>🎯 Rastreamento</ThemedText>
          <ThemedText style={styles.subtitle}>
            Monitore seu progresso em todas as áreas
          </ThemedText>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <CyberButton
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? 'primary' : 'secondary'}
              size="sm"
              style={styles.tabButton}
              fullWidth={false}
            >
              {tab.icon} {tab.label}
            </CyberButton>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.contentContainer}>{renderTabContent()}</View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    marginBottom: 16,
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CyberpunkColors.cyan,
    textShadowColor: CyberpunkColors.cyan,
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 13,
    color: CyberpunkColors.textSecondary,
  },
  tabBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  contentContainer: {
    flex: 1,
    minHeight: 600,
  },
});
