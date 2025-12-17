# Habittus - Design Document (v3 - Life RPG Multi-Dimensional)

## Visão Geral

**Habittus** é um **Life RPG completo** que transforma todas as dimensões da vida do usuário em um jogo imersivo. O app gamifica:

- **Saúde Física**: Treinos, nutrição, peso, composição corporal
- **Estudo/Produtividade**: Tarefas, aprendizado, foco, conhecimento
- **Finanças**: Dívidas, renda, poupança, investimentos, objetivos financeiros
- **Hábitos**: Rotina, disciplina, consistência, streak
- **Bem-estar**: Sono, meditação, estresse, energia

O usuário encarna um personagem que **evolui visualmente** refletindo seu progresso em todas essas áreas. Conforme melhora, desbloqueará classes secretas até atingir o status de **Ser Supremo**.

## Dimensões da Vida (Pillars)

### 1. **Pilar Físico** (Health)
- **Métricas**: Peso, % gordura, musculatura, resistência, flexibilidade
- **Atividades**: Treinos de força, cardio, funcional, yoga
- **Status Afetados**: Força, Constituição, Agilidade, Destreza
- **Impacto Visual**: Silhueta, definição muscular, postura
- **Recompensas**: XP, Gold, Badges (1º treino, 10 treinos, 100 treinos)

### 2. **Pilar Nutricional** (Nutrition)
- **Métricas**: Calorias consumidas, água bebida, macros (proteína, carboidrato, gordura)
- **Atividades**: Log de refeições, hidratação, suplementos
- **Status Afetados**: Constituição, Força (se proteína alta), Energia
- **Impacto Visual**: Peso, % gordura, brilho da pele
- **Recompensas**: XP, Gold, Badges (1º log, 7 dias consistente, 30 dias)

### 3. **Pilar Intelectual** (Study)
- **Métricas**: Horas estudadas, livros lidos, cursos concluídos, tópicos aprendidos
- **Atividades**: Estudar, ler, fazer cursos, resolver problemas, aprender skills
- **Status Afetados**: Inteligência, Sabedoria, Carisma (networking)
- **Impacto Visual**: Brilho nos olhos, aura intelectual
- **Recompensas**: XP, Gold, Badges (1º estudo, 10h, 100h, 1º livro)

### 4. **Pilar Produtividade** (Productivity)
- **Métricas**: Tarefas completadas, projetos finalizados, foco (Pomodoro), tempo em deep work
- **Atividades**: Completar tarefas, projetos, sprints, metas diárias
- **Status Afetados**: Inteligência, Sabedoria, Carisma
- **Impacto Visual**: Postura confiante, aura de determinação
- **Recompensas**: XP, Gold, Badges (1º tarefa, 10 tarefas, 100 tarefas)

### 5. **Pilar Financeiro** (Finance)
- **Métricas**: Renda, dívidas, poupança, investimentos, score de crédito
- **Atividades**: Registrar renda, pagar dívidas, poupar, investir
- **Status Afetados**: Carisma (networking = mais renda), Sabedoria (planejamento)
- **Impacto Visual**: Equipamento, acessórios, aura de riqueza
- **Recompensas**: XP, Gold, Badges (1ª renda, 1ª dívida paga, 1º investimento)

### 6. **Pilar de Hábitos** (Habits)
- **Métricas**: Streak diário, consistência, disciplina, hábitos formados
- **Atividades**: Manter streak, completar hábitos diários, meditação, journaling
- **Status Afetados**: Sabedoria, Constituição, todos (streak multiplier)
- **Impacto Visual**: Aura geral, brilho, presença
- **Recompensas**: XP, Gold, Badges (7 dias, 30 dias, 100 dias, 365 dias)

### 7. **Pilar Social** (Social)
- **Métricas**: Interações sociais, networking, comunidade, mentoria
- **Atividades**: Socializar, networking, mentoriar, participar de grupos
- **Status Afetados**: Carisma, Sabedoria
- **Impacto Visual**: Presença magnética, aura social
- **Recompensas**: XP, Gold, Badges (1ª interação, 10 interações, 50 interações)

## Sistema de Triagem Expandido

### Fase 1: Dados Básicos
- Nome, idade, sexo
- Objetivos principais (múltipla seleção entre os 7 pilares)

### Fase 2: Saúde Física
- Altura, peso, % gordura
- Frequência de treino, tipo de treino
- Objetivos físicos (perder peso, ganhar massa, melhorar resistência)

### Fase 3: Nutrição
- Dieta atual (carnívora, vegetariana, balanceada, etc)
- Refeições por dia
- Alergias/restrições
- Objetivos nutricionais

### Fase 4: Estudo & Produtividade
- Nível educacional
- Horas de estudo por semana
- Áreas de interesse
- Objetivos de aprendizado
- Produtividade atual (horas de foco por dia)

### Fase 5: Finanças
- Renda mensal aproximada
- Dívidas (cartão, empréstimo, etc)
- Poupança mensal
- Objetivos financeiros
- Score de crédito (se disponível)

### Fase 6: Hábitos & Bem-estar
- Horas de sono
- Meditação/yoga (sim/não)
- Journaling (sim/não)
- Nível de estresse
- Objetivos de bem-estar

### Fase 7: Social
- Atividades sociais por semana
- Networking (sim/não)
- Mentoria (sim/não)
- Comunidades (quantas)

## Sistema de Status Expandido

### Status Base (RPG Style)

```
┌─────────────────────────────────────┐
│ FORÇA (STR)         ████░░░░░░ 40/100│ → Treino físico
│ AGILIDADE (AGI)     ██░░░░░░░░ 20/100│ → Cardio, mobilidade
│ CONSTITUIÇÃO (CON)  ██████░░░░ 60/100│ → Nutrição, sono
│ INTELIGÊNCIA (INT)  ████████░░ 80/100│ → Estudo, produtividade
│ SABEDORIA (WIS)     █████░░░░░ 50/100│ → Hábitos, meditação
│ CARISMA (CHA)       ███░░░░░░░ 30/100│ → Social, networking
│ VONTADE (WIL)       ██████░░░░ 60/100│ → Streak, disciplina
└─────────────────────────────────────┘
```

### Status Secundários (Dimensões)

```
┌─────────────────────────────────────┐
│ SAÚDE FÍSICA        ████░░░░░░ 40/100│
│ NUTRIÇÃO            ██████░░░░ 60/100│
│ ESTUDO              ████████░░ 80/100│
│ PRODUTIVIDADE       ██████░░░░ 60/100│
│ FINANÇAS            ███░░░░░░░ 30/100│
│ HÁBITOS             █████░░░░░ 50/100│
│ SOCIAL              ██░░░░░░░░ 20/100│
└─────────────────────────────────────┘
```

## Classificação Automática de Classe

Com base na triagem, o sistema classifica automaticamente:

### **Classes Base (4)**

#### **Netrunner** (Foco Intelectual)
- **Requisitos**: Objetivo de estudo/produtividade, atividade sedentária
- **Status Primários**: Inteligência (+20%), Sabedoria (+15%)
- **Bonus**: +15% XP em tarefas de estudo/trabalho
- **Pilar Principal**: Estudo & Produtividade

#### **Solo** (Foco Físico)
- **Requisitos**: Objetivo de ganho muscular, treina 3+ vezes/semana
- **Status Primários**: Força (+25%), Constituição (+20%)
- **Bonus**: +20% XP em treinos
- **Pilar Principal**: Saúde Física

#### **Fixer** (Foco Financeiro & Equilíbrio)
- **Requisitos**: Múltiplos objetivos, rotina equilibrada
- **Status Primários**: Carisma (+15%), Sabedoria (+15%), Constituição (+15%)
- **Bonus**: +10% XP em todas as atividades
- **Pilar Principal**: Finanças & Networking

#### **Techie** (Foco Funcional & Hábitos)
- **Requisitos**: Objetivo de flexibilidade/mobilidade, treina funcional/yoga
- **Status Primários**: Agilidade (+25%), Destreza (+20%)
- **Bonus**: +20% XP em treinos funcionais
- **Pilar Principal**: Hábitos & Bem-estar

### **Classes Secretas (6)**

#### **Cyborg** (Solo + Techie)
- **Requisitos**: Força ≥ 70 E Agilidade ≥ 70, Saúde Física ≥ 70
- **Habilidade**: "Corpo Otimizado" - Recuperação 20% mais rápida

#### **Hacker** (Netrunner + Fixer)
- **Requisitos**: Inteligência ≥ 75 E Carisma ≥ 65, Estudo ≥ 75 E Finanças ≥ 65
- **Habilidade**: "Mente Suprema" - Otimiza automaticamente rotina

#### **Gladiador** (Solo + Fixer)
- **Requisitos**: Força ≥ 75 E Carisma ≥ 70, Saúde ≥ 75 E Finanças ≥ 70
- **Habilidade**: "Presença Dominante" - Inspira outros

#### **Ninja** (Techie + Netrunner)
- **Requisitos**: Agilidade ≥ 75 E Inteligência ≥ 70, Hábitos ≥ 75 E Estudo ≥ 75
- **Habilidade**: "Precisão Total" - Executa ações com 100% eficiência

#### **Titã** (Solo + Techie + Fixer)
- **Requisitos**: Força ≥ 80, Agilidade ≥ 75, Constituição ≥ 80, Carisma ≥ 70
- **Habilidade**: "Poder Bruto" - Realiza feitos extraordinários

#### **Mestre** (Netrunner + Fixer + Techie)
- **Requisitos**: Inteligência ≥ 80, Sabedoria ≥ 80, Carisma ≥ 75
- **Habilidade**: "Iluminação" - Desbloqueia insights que aceleram progresso

### **Classe Suprema**

#### **Ser Supremo** (Todas as Dimensões em Equilíbrio)
- **Requisitos Finais**:
  - Todos os status ≥ 90
  - Streak ≥ 365 dias
  - Todas as 7 dimensões ≥ 80
  - Todas as 6 classes secretas desbloqueadas
- **Habilidades Especiais**:
  - "Ascensão Divina" - Todos os atributos crescem 2x mais rápido
  - "Imortalidade" - Streak nunca reseta (máximo 1 reset por ano)
  - "Transmutação" - Pode converter Gold em qualquer status

## Sistema de Rastreamento Multi-Dimensional

### Saúde Física
- Treinos (tipo, duração, intensidade)
- Peso, % gordura (semanal)
- Flexibilidade, resistência (mensal)

### Nutrição
- Refeições (calorias, macros)
- Água bebida
- Suplementos

### Estudo
- Horas estudadas
- Livros lidos
- Cursos concluídos
- Tópicos aprendidos

### Produtividade
- Tarefas completadas
- Projetos finalizados
- Horas de foco (Pomodoro)
- Deep work

### Finanças
- Renda registrada
- Dívidas pagas
- Poupança
- Investimentos

### Hábitos
- Streak diário
- Meditação
- Journaling
- Exercícios de rotina

### Social
- Interações sociais
- Networking events
- Mentoria
- Comunidades

## Personagem Visual Dinâmico

O personagem muda visualmente refletindo:

1. **Saúde Física**: Silhueta (magro/normal/sobrepeso), musculatura, postura
2. **Nutrição**: Brilho da pele, energia
3. **Estudo**: Brilho nos olhos, aura intelectual
4. **Produtividade**: Postura confiante, determinação
5. **Finanças**: Equipamento, acessórios, aura de riqueza
6. **Hábitos**: Aura geral, presença
7. **Social**: Presença magnética, carisma visível

### Estados Visuais Integrados

```
EQUILIBRADO (Ser Supremo)
┌────────────────────────────┐
│  ▄▀▀▀▄                     │
│ █░░░░█  [Equipado]         │
│ █▄▄▄▄█  [Musculoso]        │
│  ▀▄▄▄▀  [Brilhante]        │
│ [Aura Holográfica]         │
└────────────────────────────┘
```

## Telas Principais

### 1. Triagem Inicial (7 Fases)
- Dados básicos + objetivos
- Saúde física
- Nutrição
- Estudo & Produtividade
- Finanças
- Hábitos & Bem-estar
- Social

### 2. Dashboard Principal
- **Bio-Monitor**: 7 status base + 7 dimensões
- **Personagem Visual**: Dinâmico, refletindo todas as dimensões
- **Classe Atual**: Com símbolo e cor
- **Streak Counter**: Dias
- **Resumo do Dia**: Todos os pilares
- **Quick Actions**: Log rápido de atividades

### 3. Rastreamento de Saúde
- Log de treinos
- Peso/% gordura (gráfico)
- Histórico de exercícios

### 4. Rastreamento de Nutrição
- Log de refeições (com API)
- Calorias vs TDEE
- Macros (gráfico)
- Hidratação

### 5. Rastreamento de Estudo
- Horas estudadas
- Livros lidos
- Cursos em progresso
- Tópicos aprendidos

### 6. Rastreamento de Produtividade
- Tarefas (lista com status)
- Projetos (progresso)
- Pomodoro timer
- Deep work tracker

### 7. Rastreamento de Finanças
- Renda (entrada)
- Dívidas (lista com progresso)
- Poupança (gráfico)
- Investimentos
- Score financeiro

### 8. Rastreamento de Hábitos
- Streak diário
- Hábitos customizados
- Meditação/Yoga
- Journaling

### 9. Rastreamento Social
- Atividades sociais
- Networking events
- Mentoria
- Comunidades

### 10. Perfil & Estatísticas
- Todos os status
- Histórico de evolução
- Classes desbloqueadas
- Progresso para próximas classes
- Badges & Achievements

### 11. Loja
- Itens de consumo
- Equipamentos
- Acessórios
- Compra com Gold

### 12. Objetivos & Recompensas
- Objetivos pessoais (customizáveis)
- Recompensas desbloqueáveis
- Progresso visual
- Celebrações ao atingir

## Mecânicas de Ganho/Perda

### Ganho de Status

| Ação | Status | Ganho | Pilar |
|------|--------|-------|-------|
| Treino de Força | Força | +10 | Saúde |
| Treino de Cardio | Agilidade | +10 | Saúde |
| Treino Funcional | Destreza | +10 | Hábitos |
| Estudo 1h | Inteligência | +5 | Estudo |
| Tarefa completada | Sabedoria | +5 | Produtividade |
| Dívida paga | Carisma | +5 | Finanças |
| Atividade social | Carisma | +5 | Social |
| Streak +1 | Vontade | +10 | Hábitos |
| Nutrição balanceada | Constituição | +5 | Nutrição |

### Decay de Status

- **Sem treino**: -5% Força/Agilidade por dia
- **Sem estudo**: -5% Inteligência por dia
- **Sem tarefas**: -5% Sabedoria por dia
- **Sem social**: -5% Carisma por dia
- **Sem hábitos**: -10% Vontade por dia (quebra streak)
- **Nutrição ruim**: -5% Constituição por dia

## Cores e Estética

### Paleta Cyberpunk
- **Primária**: Cyan (#00FFFF) - Saúde/Estudo
- **Secundária**: Magenta (#FF006E) - Finanças
- **Terciária**: Amarelo (#FFFF00) - Produtividade
- **Verde**: #39FF14 - Hábitos/Social
- **Laranja**: #FF6600 - Nutrição
- **Roxo**: #B537F2 - Bem-estar

### Cores por Pilar
- **Saúde**: Cyan (#00FFFF)
- **Nutrição**: Laranja (#FF6600)
- **Estudo**: Azul (#0066FF)
- **Produtividade**: Amarelo (#FFFF00)
- **Finanças**: Magenta (#FF006E)
- **Hábitos**: Verde (#39FF14)
- **Social**: Roxo (#B537F2)

## Fluxo de Usuário Completo

1. **Onboarding**: Triagem inicial (7 fases, ~15 min)
2. **Dashboard**: Visão geral de todas as dimensões
3. **Ações Diárias**: Log em qualquer pilar
4. **Evolução Visual**: Personagem muda conforme progresso
5. **Desbloqueio de Classes**: Conforme atinge requisitos
6. **Objetivos**: Criar e acompanhar objetivos pessoais
7. **Recompensas**: Gastar Gold em itens/experiências
8. **Ser Supremo**: Objetivo final após 1 ano de equilíbrio

## Próximas Fases (Pós-MVP)

- [ ] Integração com Samsung Health, Apple Health
- [ ] API de calorias (USDA FoodData Central, Edamam)
- [ ] Guildas e competições
- [ ] Raids coletivas
- [ ] Sistema de quests dinâmicas
- [ ] Multiplayer com desafios compartilhados
- [ ] IA para recomendações personalizadas
- [ ] Customização de avatar (roupas, acessórios)
- [ ] Sistema de badges e achievements
- [ ] Integração com calendário (Google Calendar, Outlook)
- [ ] Relatórios mensais/anuais
