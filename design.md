# Habittus - Design Document (v2 - Biometric RPG com Classes Secretas)

## Visão Geral

**Habittus** é um RPG de vida real que transforma dados biométricos e hábitos do usuário em um personagem dinâmico. O app mapeia objetivos, rotina e foco do usuário, classificando-o automaticamente em uma classe inicial. Conforme o usuário evolui em múltiplas áreas, classes secretas são desbloqueadas, levando eventualmente ao status de **Ser Supremo**.

## Sistema de Classificação de Classes

### Classes Base (Desbloqueadas Automaticamente)

#### **Netrunner** (Foco Intelectual)
- **Requisitos de Triagem**: Objetivo de produtividade/estresse, atividade sedentária
- **Status Primários**: Inteligência (+20%), Sabedoria (+15%)
- **Status Secundários**: Força (-10%), Agilidade (-5%)
- **Bonus**: +15% XP em tarefas de estudo/trabalho, +10% velocidade de leitura
- **Evolução**: Completar tarefas, ler, meditar, dormir bem
- **Cor**: Ciano (#00FFFF)
- **Símbolo**: 🧠

#### **Solo** (Foco Físico - Força)
- **Requisitos de Triagem**: Objetivo de ganho muscular, treina musculação 3+ vezes/semana
- **Status Primários**: Força (+25%), Constituição (+20%)
- **Status Secundários**: Agilidade (-10%)
- **Bonus**: +20% XP em treinos de força, +15% ganho muscular
- **Evolução**: Treinos de musculação, ingestão de proteína, sono adequado
- **Cor**: Vermelho (#FF0055)
- **Símbolo**: 💪

#### **Fixer** (Foco Equilíbrio - Networking/Saúde)
- **Requisitos de Triagem**: Múltiplos objetivos, rotina equilibrada
- **Status Primários**: Carisma (+15%), Sabedoria (+15%), Constituição (+15%)
- **Status Secundários**: Nenhum
- **Bonus**: +10% XP em todas as atividades, +5% ganho em todos os status
- **Evolução**: Equilíbrio entre treino, sono, nutrição, socialização
- **Cor**: Magenta (#FF006E)
- **Símbolo**: ⚖️

#### **Techie** (Foco Funcional - Mobilidade/Flexibilidade)
- **Requisitos de Triagem**: Objetivo de flexibilidade/mobilidade, treina funcional/yoga
- **Status Primários**: Agilidade (+25%), Destreza (+20%)
- **Status Secundários**: Força (-10%)
- **Bonus**: +20% XP em treinos funcionais, +15% flexibilidade
- **Evolução**: Treinos de mobilidade, alongamento, yoga, meditação
- **Cor**: Verde (#39FF14)
- **Símbolo**: 🧘

### Classes Secretas (Híbridas - Desbloqueadas por Progressão)

#### **Cyborg** (Solo + Techie)
- **Requisitos**: 
  - Força ≥ 70 E Agilidade ≥ 70
  - Streak ≥ 30 dias
  - Completar 50 treinos de força + 50 treinos funcionais
- **Status Primários**: Força (+30%), Agilidade (+30%), Destreza (+15%)
- **Bonus**: +25% XP em treinos, +20% ganho muscular com mobilidade
- **Habilidade Especial**: "Corpo Otimizado" - Recuperação 20% mais rápida
- **Cor**: Ciano + Vermelho (#FF00FF)
- **Símbolo**: 🤖

#### **Hacker** (Netrunner + Fixer)
- **Requisitos**:
  - Inteligência ≥ 75 E Carisma ≥ 65
  - Streak ≥ 40 dias
  - Completar 100 tarefas intelectuais + 50 atividades sociais
- **Status Primários**: Inteligência (+30%), Sabedoria (+25%), Carisma (+20%)
- **Bonus**: +20% XP em tarefas, +15% em networking
- **Habilidade Especial**: "Mente Suprema" - Otimiza automaticamente rotina de sono/nutrição
- **Cor**: Ciano + Magenta (#00D9FF)
- **Símbolo**: 💻

#### **Gladiador** (Solo + Fixer)
- **Requisitos**:
  - Força ≥ 75 E Carisma ≥ 70
  - Streak ≥ 35 dias
  - Completar 60 treinos + 40 atividades sociais
- **Status Primários**: Força (+28%), Constituição (+28%), Carisma (+20%)
- **Bonus**: +18% XP em treinos, +15% em atividades sociais
- **Habilidade Especial**: "Presença Dominante" - Inspira outros, +10% XP compartilhado
- **Cor**: Vermelho + Magenta (#FF0055)
- **Símbolo**: ⚔️

#### **Ninja** (Techie + Netrunner)
- **Requisitos**:
  - Agilidade ≥ 75 E Inteligência ≥ 70
  - Streak ≥ 38 dias
  - Completar 50 treinos funcionais + 80 tarefas intelectuais
- **Status Primários**: Agilidade (+30%), Destreza (+28%), Inteligência (+20%)
- **Bonus**: +20% XP em treinos funcionais, +15% em tarefas
- **Habilidade Especial**: "Precisão Total" - Executa ações com 100% de eficiência
- **Cor**: Verde + Ciano (#39FF14)
- **Símbolo**: 🥷

#### **Titã** (Solo + Techie + Fixer)
- **Requisitos**:
  - Força ≥ 80 E Agilidade ≥ 75 E Constituição ≥ 80
  - Streak ≥ 60 dias
  - Completar 80 treinos de força + 80 treinos funcionais + 60 atividades sociais
- **Status Primários**: Força (+35%), Agilidade (+30%), Constituição (+35%), Carisma (+15%)
- **Bonus**: +25% XP em treinos, +20% ganho muscular, +15% em atividades sociais
- **Habilidade Especial**: "Poder Bruto" - Realiza feitos extraordinários
- **Cor**: Vermelho + Verde (#FF6600)
- **Símbolo**: 🗿

#### **Mestre** (Netrunner + Fixer + Techie)
- **Requisitos**:
  - Inteligência ≥ 80 E Sabedoria ≥ 80 E Carisma ≥ 75
  - Streak ≥ 65 dias
  - Completar 100 tarefas intelectuais + 60 atividades sociais + 60 treinos funcionais
- **Status Primários**: Inteligência (+35%), Sabedoria (+35%), Carisma (+25%), Destreza (+15%)
- **Bonus**: +25% XP em todas as atividades, +20% em otimização de rotina
- **Habilidade Especial**: "Iluminação" - Desbloqueia insights que aceleram progresso
- **Cor**: Ciano + Magenta + Verde (#00FF00)
- **Símbolo**: 🧙

### Classe Suprema (Objetivo Final)

#### **Ser Supremo** (Todas as Classes Combinadas)
- **Requisitos Finais**:
  - Força ≥ 90 E Agilidade ≥ 90 E Constituição ≥ 90 E Inteligência ≥ 90 E Sabedoria ≥ 90 E Carisma ≥ 90
  - Streak ≥ 365 dias (1 ano ininterrupto)
  - Completar 200+ treinos de força, 200+ treinos funcionais, 200+ tarefas intelectuais, 100+ atividades sociais
  - Ter desbloqueado todas as 7 classes secretas
- **Status**: Todos os status em 100/100
- **Bonus**: +50% XP em todas as atividades, +100% ganho em todos os atributos
- **Habilidades Especiais**:
  - "Ascensão Divina" - Todos os atributos crescem 2x mais rápido
  - "Imortalidade" - Streak nunca reseta (máximo 1 reset por ano)
  - "Transmutação" - Pode converter Gold em qualquer status
- **Cor**: Arco-íris/Holográfico (#FF00FF + #00FFFF + #FFFF00)
- **Símbolo**: 👑

## Sistema de Status

### Status Base (RPG Style)

```
┌─────────────────────────────────────┐
│ FORÇA (STR)         ████░░░░░░ 40/100│
│ AGILIDADE (AGI)     ██░░░░░░░░ 20/100│
│ CONSTITUIÇÃO (CON)  ██████░░░░ 60/100│
│ INTELIGÊNCIA (INT)  ████████░░ 80/100│
│ SABEDORIA (WIS)     █████░░░░░ 50/100│
│ CARISMA (CHA)       ███░░░░░░░ 30/100│
└─────────────────────────────────────┘
```

### Cálculo de TMB (Taxa Metabólica Basal)

**Fórmula de Mifflin-St Jeor:**
- Homem: (10 × peso) + (6.25 × altura) - (5 × idade) + 5
- Mulher: (10 × peso) + (6.25 × altura) - (5 × idade) - 161

**TDEE (Total Daily Energy Expenditure):**
- Sedentário: TMB × 1.2
- Moderadamente ativo: TMB × 1.55
- Muito ativo: TMB × 1.725

### Influência de Status no Corpo

| Status | Influência |
|--------|-----------|
| Força | Ganho muscular, capacidade de carga, visual mais musculoso |
| Constituição | Resistência, recuperação, imunidade, visual mais robusto |
| Agilidade | Queima de gordura, velocidade, visual mais magro |
| Destreza | Flexibilidade, precisão, visual mais definido |
| Inteligência | Otimização de treinos, nutrição, brilho nos olhos |
| Sabedoria | Recuperação, qualidade de sono, aura de paz |
| Carisma | Presença, confiança, brilho geral do personagem |

## Sistema de Rastreamento

### Água
- **Entrada**: Copos bebidos por dia
- **Bonus**: +5% Constituição por 2L
- **Penalidade**: -5% Constituição se < 1L
- **Impacto Visual**: Pele mais brilhante com boa hidratação

### Calorias
- **Entrada**: Manual ou via API de alimentos
- **Cálculo**: Comparação com TDEE
- **Ganho de Peso**: +500 cal/dia = +0.5kg/semana
- **Perda de Peso**: -500 cal/dia = -0.5kg/semana
- **Influência**: Afeta Força, Constituição, Agilidade
- **Impacto Visual**: Silhueta muda conforme peso/gordura

### Treinos
- **Entrada**: Tipo, duração, intensidade
- **Ganho de Status**: Baseado no tipo de treino
  - Força: +10 STR por treino
  - Cardio: +10 AGI por treino
  - Funcional: +10 DEX por treino
  - Yoga: +10 WIS por treino
- **Decay**: -5% status por dia sem treino (máximo 30 dias)
- **Impacto Visual**: Músculos mais definidos, postura melhor

### Sono
- **Entrada**: Horas dormidas
- **Bonus**: +10% Sabedoria se 7-8h
- **Penalidade**: -15% Sabedoria se < 5h
- **Impacto Visual**: Olhos mais brilhantes com sono adequado

### Atividades Sociais
- **Entrada**: Interações sociais, eventos, networking
- **Ganho de Status**: +5 Carisma por atividade
- **Impacto Visual**: Aura mais brilhante, presença mais forte

## Evolução Visual do Personagem

### Pixel Art Dinâmico 16-bit

O personagem muda visualmente baseado em:

1. **Peso/Gordura**: Silhueta mais larga ou mais magra
2. **Musculatura**: Definição muscular visível
3. **Energia**: Brilho/cor do personagem
4. **Classe**: Roupa/acessórios específicos
5. **Status Supremo**: Efeito holográfico/arco-íris

### Estados Visuais por Classe

```
NETRUNNER          SOLO              FIXER             TECHIE
┌────────┐        ┌────────┐        ┌────────┐        ┌────────┐
│ ▄▀▀▀▄  │        │ ▄▀▀▀▄  │        │ ▄▀▀▀▄  │        │ ▄▀▀▀▄  │
│█░░░░█  │        │█▄▄▄▄█  │        │█░░░░█  │        │█░░░░█  │
│█░░░░█  │        │█████░█  │        │█▄▄▄▄█  │        │█░░░░█  │
│ ▀▄▄▄▀  │        │ ▀▄▄▄▀  │        │ ▀▄▄▄▀  │        │ ▀▄▄▄▀  │
└────────┘        └────────┘        └────────┘        └────────┘
Óculos            Músculos          Equilibrado       Flexível
```

### Evolução Visual com Peso

```
MAGRO (< 15% gordura)     NORMAL (15-25% gordura)    SOBREPESO (25-35% gordura)
┌────────┐                ┌────────┐                 ┌────────┐
│ ▄▀▀▀▄  │                │ ▄▀▀▀▄  │                 │ ▄▀▀▀▄  │
│█░░░░█  │                │█░░░░█  │                 │█░░░░█  │
│█░░░░█  │                │█▄▄▄▄█  │                 │█▄▄▄▄█  │
│ ▀▄▄▄▀  │                │ ▀▄▄▄▀  │                 │ ▀▄▄▄▀  │
└────────┘                └────────┘                 └────────┘
```

## Telas Principais

### 1. Onboarding - Triagem Inicial
- Dados biométricos (idade, sexo, altura, peso, % gordura)
- Objetivos (múltipla seleção)
- Análise de rotina (treinos, sono, água, refeições)
- Classificação automática de classe
- Exibição da classe base com bonus

### 2. Dashboard
- **Bio-Monitor** com status RPG (6 barras)
- **Personagem Visual** dinâmico (pixel art)
- **Classe Atual** com símbolo e cor
- **Streak Counter** (dias)
- **Progresso para Próxima Classe** (se aplicável)
- **Resumo do Dia**: água, calorias, treino, sono
- **Quick Actions**: Log de água, Log de treino, Log de calorias

### 3. Rastreamento de Nutrição
- Log de água (copos)
- Log de calorias (manual + API)
- Comparação com TDEE
- Histórico semanal/mensal
- Impacto no peso e status

### 4. Rastreamento de Treinos
- Adicionar treino (tipo, duração, intensidade)
- Histórico de treinos
- Ganho de status por treino
- Decay de status (visual)
- Sugestões de treino baseado em classe

### 5. Rastreamento de Sono
- Horas dormidas
- Qualidade (escala 1-5)
- Impacto no status Sabedoria
- Histórico semanal

### 6. Perfil do Personagem
- Estatísticas completas
- Histórico de evolução
- Classe atual e classes desbloqueadas
- Progresso para próximas classes secretas
- Conquistas/Badges
- Tempo até Ser Supremo (estimado)

### 7. Loja
- Itens de consumo (suplementos, alimentos)
- Equipamentos (roupa, acessórios)
- Compra com Gold (ganho de atividades)
- Desconto baseado em Streak

## Mecânicas de Ganho/Perda

### Ganho de Status

| Ação | Status | Ganho | Streak |
|------|--------|-------|--------|
| Treino de Força | Força | +10 | +1 |
| Treino de Cardio | Agilidade | +10 | +1 |
| Treino Funcional | Destreza | +10 | +1 |
| Yoga/Meditação | Sabedoria | +10 | +1 |
| Beber 2L água | Constituição | +5 | - |
| 7-8h sono | Sabedoria | +10 | +1 |
| Completar tarefa intelectual | Inteligência | +5 | +1 |
| Atividade social | Carisma | +5 | +1 |

### Decay de Status

- **Sem treino**: -5% status por dia (máximo 30 dias)
- **Sem água**: -5% Constituição por dia
- **Sono < 5h**: -10% Sabedoria por noite
- **Calorias > TDEE**: +0.5kg peso por 500 cal acima

### Desbloqueio de Classes Secretas

Conforme o usuário atinge os requisitos, novas classes são desbloqueadas automaticamente:

1. **Cyborg** (Solo + Techie) - Primeiras a desbloquear
2. **Hacker** (Netrunner + Fixer)
3. **Gladiador** (Solo + Fixer)
4. **Ninja** (Techie + Netrunner)
5. **Titã** (Solo + Techie + Fixer)
6. **Mestre** (Netrunner + Fixer + Techie)
7. **Ser Supremo** (Todas as classes)

## Cores e Estética

### Paleta Cyberpunk
- **Primária**: Cyan (#00FFFF)
- **Secundária**: Magenta (#FF006E)
- **Terciária**: Amarelo (#FFFF00)
- **Fundo**: Preto (#000000)
- **Texto**: Branco (#FFFFFF)

### Cores por Classe
- **Netrunner**: Ciano (#00FFFF)
- **Solo**: Vermelho (#FF0055)
- **Fixer**: Magenta (#FF006E)
- **Techie**: Verde (#39FF14)
- **Cyborg**: Magenta (#FF00FF)
- **Hacker**: Ciano + Magenta (#00D9FF)
- **Gladiador**: Vermelho + Magenta (#FF0055)
- **Ninja**: Verde + Ciano (#39FF14)
- **Titã**: Laranja (#FF6600)
- **Mestre**: Verde (#00FF00)
- **Ser Supremo**: Arco-íris (#FF00FF + #00FFFF + #FFFF00)

## Fluxo de Usuário Completo

1. **Onboarding**: Triagem inicial (5-10 min) → Classificação automática
2. **Dashboard**: Visão geral diária com personagem visual
3. **Ações Diárias**: Log de água, calorias, treino, sono
4. **Evolução Visual**: Personagem muda conforme progresso
5. **Desbloqueio de Classes**: Conforme atinge requisitos
6. **Loja**: Gastar Gold em itens
7. **Perfil**: Ver estatísticas, histórico e progresso para próximas classes
8. **Ser Supremo**: Objetivo final após 1 ano de streak consistente

## Próximas Fases (Pós-MVP)

- [ ] Integração com Samsung Health, Apple Health
- [ ] API de calorias por alimento (USDA FoodData Central)
- [ ] Guildas e competições entre usuários
- [ ] Raids coletivas
- [ ] Sistema de quests dinâmicas
- [ ] Multiplayer com desafios compartilhados
- [ ] Integração com Spotify para treinos
- [ ] IA para recomendações de treino/nutrição
- [ ] Customização de avatar (roupas, acessórios)
- [ ] Sistema de badges e achievements
