import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { CyberButton } from '@/components/cyber-button';
import { CyberpunkColors } from '@/constants/theme';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: 'salary' | 'bounty' | 'shop' | 'upgrade' | 'other';
  amount: number;
  description: string;
  date: Date;
}

/**
 * Componente para rastreamento financeiro
 * Monitora renda, gastos e saldo disponível
 */
export function FinanceTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'income',
      category: 'salary',
      amount: 3000,
      description: 'Salário mensal',
      date: new Date(new Date().setDate(1)),
    },
    {
      id: '2',
      type: 'expense',
      category: 'shop',
      amount: 150,
      description: 'Compra na loja',
      date: new Date(),
    },
  ]);

  const [descriptionInput, setDescriptionInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [selectedType, setSelectedType] = useState<Transaction['type']>('income');
  const [selectedCategory, setSelectedCategory] = useState<Transaction['category']>('other');

  const categories = {
    income: ['salary', 'bounty'] as const,
    expense: ['shop', 'upgrade', 'other'] as const,
  };

  const categoryEmojis = {
    salary: '💼',
    bounty: '💰',
    shop: '🛍️',
    upgrade: '⚙️',
    other: '📝',
  };

  const handleAddTransaction = () => {
    if (!descriptionInput.trim() || !amountInput) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: selectedType,
      category: selectedCategory,
      amount: parseInt(amountInput),
      description: descriptionInput,
      date: new Date(),
    };

    setTransactions([newTransaction, ...transactions]);
    setDescriptionInput('');
    setAmountInput('');
  };

  const todayTransactions = transactions.filter(
    (t) => new Date(t.date).toDateString() === new Date().toDateString()
  );

  const monthTransactions = transactions.filter((t) => {
    const now = new Date();
    const tDate = new Date(t.date);
    return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
  });

  const totalIncome = monthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = monthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>💰 Finanças</ThemedText>

      {/* Summary Cards */}
      <View style={styles.summaryGrid}>
        <View style={[styles.summaryCard, styles.incomeCard]}>
          <ThemedText style={styles.summaryLabel}>Renda Mês</ThemedText>
          <ThemedText style={[styles.summaryValue, { color: CyberpunkColors.green }]}>
            +✨{totalIncome}
          </ThemedText>
        </View>

        <View style={[styles.summaryCard, styles.expenseCard]}>
          <ThemedText style={styles.summaryLabel}>Gastos Mês</ThemedText>
          <ThemedText style={[styles.summaryValue, { color: CyberpunkColors.red }]}>
            -✨{totalExpense}
          </ThemedText>
        </View>

        <View style={[styles.summaryCard, styles.balanceCard]}>
          <ThemedText style={styles.summaryLabel}>Saldo</ThemedText>
          <ThemedText
            style={[
              styles.summaryValue,
              {
                color: balance >= 0 ? CyberpunkColors.cyan : CyberpunkColors.red,
              },
            ]}
          >
            ✨{balance}
          </ThemedText>
        </View>
      </View>

      {/* Add Transaction Section */}
      <View style={styles.inputSection}>
        <ThemedText style={styles.sectionTitle}>Registrar Transação</ThemedText>

        {/* Type Selector */}
        <View style={styles.typeSelector}>
          <Pressable
            onPress={() => setSelectedType('income')}
            style={[
              styles.typeButton,
              selectedType === 'income' && styles.typeButtonActive,
            ]}
          >
            <ThemedText style={styles.typeEmoji}>📈</ThemedText>
            <ThemedText style={styles.typeLabel}>Renda</ThemedText>
          </Pressable>
          <Pressable
            onPress={() => setSelectedType('expense')}
            style={[
              styles.typeButton,
              selectedType === 'expense' && styles.typeButtonActive,
            ]}
          >
            <ThemedText style={styles.typeEmoji}>📉</ThemedText>
            <ThemedText style={styles.typeLabel}>Gasto</ThemedText>
          </Pressable>
        </View>

        {/* Category Selector */}
        <View style={styles.categorySelector}>
          {categories[selectedType].map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categoryButtonActive,
              ]}
            >
              <ThemedText style={styles.categoryEmoji}>
                {categoryEmojis[cat]}
              </ThemedText>
              <ThemedText style={styles.categoryLabel}>{cat}</ThemedText>
            </Pressable>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Descrição"
          placeholderTextColor={CyberpunkColors.textSecondary}
          value={descriptionInput}
          onChangeText={setDescriptionInput}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor (✨)"
          placeholderTextColor={CyberpunkColors.textSecondary}
          value={amountInput}
          onChangeText={setAmountInput}
          keyboardType="number-pad"
        />

        <CyberButton onPress={handleAddTransaction} variant="primary" fullWidth>
          ➕ Registrar Transação
        </CyberButton>
      </View>

      {/* Transaction List */}
      <ThemedText style={styles.listTitle}>Transações de Hoje</ThemedText>
      <FlatList
        data={todayTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <ThemedText style={styles.transactionEmoji}>
              {categoryEmojis[item.category]}
            </ThemedText>
            <View style={styles.transactionContent}>
              <ThemedText style={styles.transactionDesc}>
                {item.description}
              </ThemedText>
              <ThemedText style={styles.transactionCategory}>
                {item.category}
              </ThemedText>
            </View>
            <ThemedText
              style={[
                styles.transactionAmount,
                {
                  color:
                    item.type === 'income'
                      ? CyberpunkColors.green
                      : CyberpunkColors.red,
                },
              ]}
            >
              {item.type === 'income' ? '+' : '-'}✨{item.amount}
            </ThemedText>
          </View>
        )}
        scrollEnabled={false}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>
            Nenhuma transação hoje
          </ThemedText>
        }
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
  summaryGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  summaryCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    gap: 4,
  },
  incomeCard: {
    borderColor: CyberpunkColors.green,
    backgroundColor: `${CyberpunkColors.green}10`,
  },
  expenseCard: {
    borderColor: CyberpunkColors.red,
    backgroundColor: `${CyberpunkColors.red}10`,
  },
  balanceCard: {
    borderColor: CyberpunkColors.cyan,
    backgroundColor: `${CyberpunkColors.cyan}10`,
  },
  summaryLabel: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
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
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    padding: 8,
    backgroundColor: CyberpunkColors.cardBg,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
    alignItems: 'center',
    gap: 4,
  },
  typeButtonActive: {
    borderColor: CyberpunkColors.cyan,
    backgroundColor: `${CyberpunkColors.cyan}20`,
  },
  typeEmoji: {
    fontSize: 18,
  },
  typeLabel: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
  },
  categorySelector: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: CyberpunkColors.cardBg,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
    alignItems: 'center',
    gap: 2,
  },
  categoryButtonActive: {
    borderColor: CyberpunkColors.magenta,
    backgroundColor: `${CyberpunkColors.magenta}20`,
  },
  categoryEmoji: {
    fontSize: 16,
  },
  categoryLabel: {
    fontSize: 10,
    color: CyberpunkColors.textSecondary,
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
  listTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: CyberpunkColors.textPrimary,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CyberpunkColors.inputBg,
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
    gap: 12,
  },
  transactionEmoji: {
    fontSize: 20,
  },
  transactionContent: {
    flex: 1,
    gap: 2,
  },
  transactionDesc: {
    fontSize: 13,
    fontWeight: '600',
    color: CyberpunkColors.textPrimary,
  },
  transactionCategory: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
  },
  transactionAmount: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: CyberpunkColors.textSecondary,
    marginVertical: 12,
  },
});

export default FinanceTracker;
