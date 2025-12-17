# Habittus - Cyberpunk Life RPG | Histórias Técnicas

## Visão Geral do Produto

**Habittus** é um Life RPG imersivo que gamifica **7 pilares da vida** do usuário:
1. **Saúde Física** - Treinos, composição corporal
2. **Nutrição** - Calorias, macros, hidratação
3. **Estudo** - Horas estudadas, cursos, livros
4. **Produtividade** - Tarefas, projetos, foco
5. **Finanças** - Renda, dívidas, poupança, investimentos
6. **Hábitos** - Streak, disciplina, meditação, journaling
7. **Social** - Networking, comunidade, mentoria

O usuário cria um personagem que **reflete visualmente** seu progresso real. Conforme evolui nos 7 pilares, o personagem muda silhueta, musculatura, brilho e aura. Classes são desbloqueadas conforme o usuário excele em áreas específicas. O objetivo final é se tornar um **Ser Supremo** mantendo equilíbrio em TODAS as áreas por 1 ano com streak ininterrupto.

---

## Epic 1: Sistema de Triagem e Onboarding

### US-1.1: Triagem Inicial - Dados Básicos
**Como** um novo usuário  
**Quero** fornecer meus dados básicos (nome, idade, sexo)  
**Para** criar meu perfil no Habittus

**Critérios de Aceitação:**
- [ ] Tela com campos para Nome, Idade (18-100), Sexo (M/F/Outro)
- [ ] Validação de campos obrigatórios
- [ ] Botão "Próximo" leva à etapa 2
- [ ] Dados salvos em AsyncStorage

**Tarefas Técnicas:**
- Criar componente `TriageStep1.tsx` com inputs validados
- Adicionar tipos TypeScript para dados básicos
- Integrar com `use-game-state` hook
- Testar validação de idade (18-100)

---

### US-1.2: Triagem - Dados Biométricos
**Como** um novo usuário  
**Quero** fornecer meus dados biométricos (altura, peso, % gordura corporal)  
**Para** calcular meu TMB e TDEE

**Critérios de Aceitação:**
- [ ] Campos para Altura (cm), Peso (kg), % Gordura Corporal
- [ ] Cálculo automático de TMB usando fórmula Mifflin-St Jeor
- [ ] Cálculo automático de TDEE baseado em nível de atividade
- [ ] Exibição de TMB/TDEE calculados
- [ ] Botão "Próximo" leva à etapa 3

**Tarefas Técnicas:**
- Criar componente `TriageStep2.tsx`
- Implementar cálculo de TMB em `lib/biometric-calculator.ts`
- Implementar cálculo de TDEE
- Armazenar valores calculados

---

### US-1.3: Triagem - Objetivos e Pilares
**Como** um novo usuário  
**Quero** selecionar meus objetivos nos 7 pilares  
**Para** personalizar meu progresso no Habittus

**Critérios de Aceitação:**
- [ ] Checkboxes para cada pilar (múltipla seleção)
- [ ] Descrição de cada pilar
- [ ] Mínimo 1 pilar deve ser selecionado
- [ ] Máximo 7 pilares podem ser selecionados
- [ ] Botão "Próximo" leva à etapa 4

**Tarefas Técnicas:**
- Criar componente `TriageStep3.tsx`
- Definir tipos para objetivos dos 7 pilares
- Validação de seleção (min 1, max 7)
- Persistir seleção em AsyncStorage

---

### US-1.4: Triagem - Saúde Física
**Como** um novo usuário  
**Quero** informar minha rotina de treinos  
**Para** que o sistema classifique minha tendência física

**Critérios de Aceitação:**
- [ ] Seleção de frequência de treino (0x, 1-2x, 3-4x, 5+x por semana)
- [ ] Seleção de tipo de treino (Força, Cardio, Flexibilidade, Misto)
- [ ] Seleção de nível de experiência (Iniciante, Intermediário, Avançado)
- [ ] Botão "Próximo" leva à etapa 5

**Tarefas Técnicas:**
- Criar componente `TriageStep4.tsx`
- Definir enums para frequência, tipo e nível
- Armazenar preferências de treino
- Usar dados para calcular tendência física

---

### US-1.5: Triagem - Nutrição
**Como** um novo usuário  
**Quero** informar minha rotina de alimentação  
**Para** que o sistema calcule meu consumo calórico

**Critérios de Aceitação:**
- [ ] Seleção de tipo de dieta (Balanceada, Low Carb, Vegana, etc)
- [ ] Seleção de frequência de refeições (2-3, 4-5, 5+)
- [ ] Campo para consumo diário de água (copos)
- [ ] Botão "Próximo" leva à etapa 6

**Tarefas Técnicas:**
- Criar componente `TriageStep5.tsx`
- Definir tipos de dieta
- Armazenar preferências nutricionais
- Calcular meta de calorias baseado em TMB/TDEE

---

### US-1.6: Triagem - Estudo e Produtividade
**Como** um novo usuário  
**Quero** informar minha rotina de estudo  
**Para** que o sistema classifique minha tendência intelectual

**Critérios de Aceitação:**
- [ ] Campo para horas de estudo por semana (0-40+)
- [ ] Seleção de foco principal (Carreira, Hobby, Pessoal)
- [ ] Seleção de tipo de aprendizado (Cursos, Livros, Prática)
- [ ] Botão "Próximo" leva à etapa 7

**Tarefas Técnicas:**
- Criar componente `TriageStep6.tsx`
- Definir tipos de foco e aprendizado
- Armazenar metas de estudo
- Calcular XP base para estudo

---

### US-1.7: Triagem - Finanças e Hábitos
**Como** um novo usuário  
**Quero** informar minha situação financeira e hábitos  
**Para** que o sistema classifique minha tendência social/financeira

**Critérios de Aceitação:**
- [ ] Campo para renda mensal (estimada)
- [ ] Campo para dívidas totais
- [ ] Campo para poupança
- [ ] Seleção de horas de sono por noite (4-10)
- [ ] Seleção de hábitos (Meditação, Journaling, Leitura, etc)
- [ ] Botão "Finalizar" completa triagem

**Tarefas Técnicas:**
- Criar componente `TriageStep7.tsx`
- Definir tipos de hábitos
- Armazenar dados financeiros
- Calcular classe automática baseado em triagem

---

### US-1.8: Classificação Automática de Classe
**Como** um novo usuário  
**Quero** ser classificado automaticamente em uma classe baseado na triagem  
**Para** começar minha jornada com uma classe que reflete meu perfil

**Critérios de Aceitação:**
- [ ] Algoritmo analisa dados da triagem
- [ ] Classifica em uma das 4 classes base (Netrunner, Solo, Fixer, Techie)
- [ ] Exibe classe escolhida com descrição
- [ ] Cria perfil de usuário com todos os dados
- [ ] Salva em AsyncStorage
- [ ] Redireciona para Dashboard

**Tarefas Técnicas:**
- Implementar algoritmo de classificação em `lib/biometric-calculator.ts`
- Criar função `classifyUserClass(triageData)`
- Retornar classe e motivo da classificação
- Integrar com fluxo de triagem

---

## Epic 2: Sistema de Status RPG

### US-2.1: Cálculo de Status Iniciais
**Como** um usuário que completou triagem  
**Quero** ter meus 7 status RPG calculados baseado em meus dados  
**Para** começar a jornada com status realistas

**Status RPG:**
1. **Força** - Baseado em treino de força, peso
2. **Destreza** - Baseado em cardio, flexibilidade
3. **Agilidade** - Baseado em frequência de treino
4. **Inteligência** - Baseado em horas de estudo
5. **Sabedoria** - Baseado em hábitos (meditação, sono)
6. **Carisma** - Baseado em atividades sociais
7. **Resistência** - Baseado em TMB, composição corporal

**Critérios de Aceitação:**
- [ ] Cada status inicia entre 10-50 (baseado em triagem)
- [ ] Fórmula de cálculo documentada
- [ ] Status salvos no perfil do usuário
- [ ] Exibição visual de status (barras, números)

**Tarefas Técnicas:**
- Criar funções de cálculo para cada status em `lib/biometric-calculator.ts`
- Implementar fórmulas baseadas em dados biométricos
- Armazenar status inicial no perfil
- Criar tipos TypeScript para status

---

### US-2.2: Decay de Status com o Tempo
**Como** um usuário ativo  
**Quero** que meus status diminuam com o tempo se não fizer atividades  
**Para** manter a motivação de fazer atividades regularmente

**Critérios de Aceitação:**
- [ ] Status decaem 1-2 pontos por dia sem atividade
- [ ] Decay é calculado quando usuário abre o app
- [ ] Decay é específico por tipo (Força decai se não treina, etc)
- [ ] Notificação quando status cai muito
- [ ] Decay pode ser revertido com atividades

**Tarefas Técnicas:**
- Implementar função `calculateStatusDecay()` em `lib/biometric-calculator.ts`
- Calcular dias desde última atividade
- Aplicar decay proporcional
- Persistir último acesso em AsyncStorage

---

### US-2.3: Ganho de Status por Atividades
**Como** um usuário que completa atividades  
**Quero** que meus status aumentem baseado nas atividades que faço  
**Para** ver meu personagem evoluir

**Critérios de Aceitação:**
- [ ] Treino de força aumenta Força (1-5 pontos)
- [ ] Cardio aumenta Destreza e Agilidade
- [ ] Estudo aumenta Inteligência
- [ ] Meditação aumenta Sabedoria
- [ ] Eventos sociais aumentam Carisma
- [ ] Dormir bem aumenta Resistência
- [ ] Ganho é proporcional à intensidade/duração

**Tarefas Técnicas:**
- Criar função `calculateStatusGain(activity)` 
- Implementar multiplicadores por tipo de atividade
- Integrar com sistema de rastreamento de atividades
- Limitar ganho máximo por dia (cap system)

---

## Epic 3: Sistema de Rastreamento Multi-Dimensional

### US-3.1: Rastreamento de Treinos
**Como** um usuário que treina  
**Quero** logar meus treinos com tipo, duração e intensidade  
**Para** que meu status de Força/Destreza/Agilidade aumentem

**Critérios de Aceitação:**
- [ ] Tela com seleção de tipo (Força, Cardio, Flexibilidade, Misto)
- [ ] Campo para duração em minutos
- [ ] Seleção de intensidade (Leve, Moderada, Intensa)
- [ ] Cálculo automático de calorias queimadas
- [ ] Exibição de XP ganho
- [ ] Salva em histórico de atividades

**Tarefas Técnicas:**
- Criar componente `LogWorkout.tsx`
- Implementar cálculo de calorias queimadas (baseado em peso, tipo, duração)
- Integrar com sistema de status
- Armazenar em AsyncStorage com timestamp

---

### US-3.2: Rastreamento de Nutrição
**Como** um usuário que quer controlar calorias  
**Quero** logar refeições e calorias consumidas  
**Para** que meu peso e composição corporal sejam atualizados

**Critérios de Aceitação:**
- [ ] Busca de alimentos (integrado com API de calorias)
- [ ] Campo para quantidade/porção
- [ ] Cálculo automático de calorias
- [ ] Exibição de macros (proteína, carboidrato, gordura)
- [ ] Comparação com meta calórica diária
- [ ] Aviso se exceder TMB/TDEE

**Tarefas Técnicas:**
- Criar componente `LogNutrition.tsx`
- Integrar com API de calorias (USDA FoodData Central ou similar)
- Implementar busca de alimentos
- Calcular impacto em peso/composição corporal
- Armazenar logs com timestamp

---

### US-3.3: Rastreamento de Água
**Como** um usuário que quer hidratar  
**Quero** logar copos de água consumidos  
**Para** manter meu status de Resistência

**Critérios de Aceitação:**
- [ ] Botão rápido para adicionar 1 copo (200ml)
- [ ] Campo para quantidade customizada
- [ ] Meta diária de água (baseado em peso)
- [ ] Barra de progresso visual
- [ ] Notificação quando atingir meta

**Tarefas Técnicas:**
- Criar componente `LogWater.tsx`
- Calcular meta diária (peso × 0.035L)
- Armazenar logs diários
- Integrar com sistema de notificações

---

### US-3.4: Rastreamento de Estudo
**Como** um usuário que estuda  
**Quero** logar horas de estudo com tipo de atividade  
**Para** que meu status de Inteligência aumente

**Critérios de Aceitação:**
- [ ] Campo para horas estudadas
- [ ] Seleção de tipo (Curso, Livro, Prática, Projeto)
- [ ] Campo para tópico/assunto
- [ ] Cálculo de XP baseado em horas
- [ ] Histórico de estudos

**Tarefas Técnicas:**
- Criar componente `LogStudy.tsx`
- Implementar cálculo de XP (1 hora = 10 XP base)
- Integrar com sistema de status
- Armazenar com timestamp

---

### US-3.5: Rastreamento de Tarefas/Produtividade
**Como** um usuário produtivo  
**Quero** logar tarefas completadas  
**Para** que meu status de Inteligência/Carisma aumentem

**Critérios de Aceitação:**
- [ ] Criar tarefa com título, descrição, prioridade
- [ ] Marcar tarefa como completa
- [ ] Cálculo de XP baseado em prioridade
- [ ] Histórico de tarefas completadas
- [ ] Streak de tarefas diárias

**Tarefas Técnicas:**
- Criar componente `TaskManager.tsx`
- Implementar CRUD de tarefas
- Cálculo de XP (baixa=5, média=10, alta=20)
- Armazenar em AsyncStorage

---

### US-3.6: Rastreamento de Finanças
**Como** um usuário que quer controlar finanças  
**Quero** logar renda, despesas, dívidas pagas e poupança  
**Para** que meu status de Carisma/Sabedoria aumentem

**Critérios de Aceitação:**
- [ ] Log de renda (entrada de dinheiro)
- [ ] Log de despesas (saída de dinheiro)
- [ ] Log de dívida paga (reduz dívida total)
- [ ] Log de poupança (aumenta poupança)
- [ ] Dashboard financeiro com saldo, dívida, poupança
- [ ] Cálculo de XP baseado em ações financeiras

**Tarefas Técnicas:**
- Criar componente `FinanceTracker.tsx`
- Implementar CRUD de transações
- Calcular saldo atual, dívida, poupança
- Cálculo de XP (dívida paga = 10 XP, poupança = 5 XP)
- Armazenar transações com timestamp

---

### US-3.7: Rastreamento de Hábitos
**Como** um usuário que quer manter hábitos  
**Quero** logar hábitos diários (meditação, journaling, leitura)  
**Para** que meu status de Sabedoria/Carisma aumentem

**Critérios de Aceitação:**
- [ ] Criar hábito com nome, descrição, frequência
- [ ] Marcar hábito como completo hoje
- [ ] Streak counter (dias consecutivos)
- [ ] Cálculo de XP por hábito
- [ ] Histórico de hábitos

**Tarefas Técnicas:**
- Criar componente `HabitTracker.tsx`
- Implementar CRUD de hábitos
- Cálculo de streak (dias consecutivos)
- Cálculo de XP (1 hábito = 5 XP)
- Notificação para lembrar hábitos

---

### US-3.8: Rastreamento Social
**Como** um usuário social  
**Quero** logar atividades sociais (networking, mentoria, comunidade)  
**Para** que meu status de Carisma aumente

**Critérios de Aceitação:**
- [ ] Log de evento social com tipo, duração, pessoas
- [ ] Cálculo de XP baseado em tipo de evento
- [ ] Histórico de eventos sociais
- [ ] Contadores de networking/mentoria

**Tarefas Técnicas:**
- Criar componente `LogSocial.tsx`
- Definir tipos de eventos sociais
- Cálculo de XP (networking=10, mentoria=15, comunidade=5)
- Armazenar com timestamp

---

## Epic 4: Sistema Visual do Personagem

### US-4.1: Personagem Base 16-bit
**Como** um usuário  
**Quero** ter um personagem visual que representa meu progresso  
**Para** me motivar a evoluir

**Critérios de Aceitação:**
- [ ] Sprite 16-bit pixel art do personagem
- [ ] Personagem muda baseado em classe (4 classes base)
- [ ] Personagem muda baseado em nível/XP
- [ ] Animação idle do personagem
- [ ] Exibição em Dashboard

**Tarefas Técnicas:**
- Criar/obter sprites 16-bit para 4 classes
- Criar componente `CharacterDisplay.tsx`
- Implementar lógica de seleção de sprite baseado em classe
- Adicionar animação idle simples (Reanimated)

---

### US-4.2: Mudança de Silhueta Baseado em Peso
**Como** um usuário que rastreia peso  
**Quero** que meu personagem mude de silhueta conforme meu peso varia  
**Para** ver visualmente meu progresso físico

**Critérios de Aceitação:**
- [ ] Personagem fica mais magro se perder peso
- [ ] Personagem fica mais musculoso se ganhar massa
- [ ] Personagem fica mais gordo se ganhar peso/gordura
- [ ] Mudança é gradual e visual
- [ ] Baseado em % de gordura corporal

**Tarefas Técnicas:**
- Criar múltiplas variações de sprite para cada classe (magro, normal, musculoso, gordo)
- Implementar lógica de seleção baseado em % gordura
- Calcular mudança de silhueta a cada log de peso
- Animar transição entre silhuetas

---

### US-4.3: Aura e Brilho Baseado em Status
**Como** um usuário com status altos  
**Quero** que meu personagem tenha uma aura/brilho que reflete meus status  
**Para** ver visualmente meu poder

**Critérios de Aceitação:**
- [ ] Aura brilha mais conforme status aumentam
- [ ] Cor da aura muda baseado em classe
- [ ] Brilho intensifica em status 80+
- [ ] Efeito visual suave e imersivo

**Tarefas Técnicas:**
- Criar efeito de aura com Reanimated
- Implementar lógica de intensidade baseado em status médio
- Usar cores específicas por classe
- Animar brilho pulsante

---

### US-4.4: Equipamentos e Acessórios
**Como** um usuário que compra recompensas  
**Quero** que meu personagem use equipamentos que comprei  
**Para** customizar meu visual

**Critérios de Aceitação:**
- [ ] Recompensas podem ser equipamentos/acessórios
- [ ] Personagem exibe equipamentos no visual
- [ ] Equipamentos mudam aparência do personagem
- [ ] Múltiplos equipamentos podem ser usados

**Tarefas Técnicas:**
- Criar sistema de equipamentos
- Implementar renderização de equipamentos sobre sprite
- Armazenar equipamentos equipados no perfil
- Criar visual para cada equipamento

---

## Epic 5: Sistema de Classes e Desbloqueio

### US-5.1: 4 Classes Base
**Como** um novo usuário  
**Quero** começar com uma das 4 classes base  
**Para** ter um caminho de progressão único

**Classes:**
- **Netrunner** - Foco Intelectual (Estudo, Produtividade, Finanças)
- **Solo** - Foco Físico (Saúde, Nutrição, Treino)
- **Fixer** - Foco Social (Networking, Mentoria, Comunidade)
- **Techie** - Foco Criativo (Projetos, Hobbies, Inovação)

**Critérios de Aceitação:**
- [ ] Cada classe tem descrição e bônus único
- [ ] Classe é atribuída automaticamente na triagem
- [ ] Classe afeta XP ganho em pilares específicos
- [ ] Visual diferente para cada classe

**Tarefas Técnicas:**
- Definir bônus de XP para cada classe
- Criar tipos TypeScript para classes
- Implementar lógica de bônus no cálculo de XP
- Criar sprites diferentes para cada classe

---

### US-5.2: 6 Classes Secretas (Híbridas)
**Como** um usuário que excele em múltiplas áreas  
**Quero** desbloquear classes secretas que combinam 2 classes base  
**Para** ter mais poder e customização

**Classes Secretas:**
- **Cyborg** (Solo + Techie) - Força + Criatividade
- **Hacker** (Netrunner + Fixer) - Inteligência + Carisma
- **Gladiador** (Solo + Fixer) - Força + Carisma
- **Ninja** (Techie + Netrunner) - Criatividade + Inteligência
- **Titã** (Solo + Techie + Fixer) - Força + Criatividade + Carisma
- **Mestre** (Netrunner + Fixer + Techie) - Inteligência + Carisma + Criatividade

**Critérios de Aceitação:**
- [ ] Desbloqueio automático quando usuário atinge critérios
- [ ] Critério: Status mínimo 60 em 2+ classes base
- [ ] Notificação quando classe é desbloqueada
- [ ] Opção de mudar para classe desbloqueada
- [ ] Bônus de XP aumentado para classes secretas

**Tarefas Técnicas:**
- Implementar lógica de desbloqueio de classes secretas
- Criar função `checkClassUnlock(userProfile)`
- Definir bônus de XP para cada classe secreta
- Criar sprites para classes secretas

---

### US-5.3: Ser Supremo (Classe Final)
**Como** um usuário que mantém equilíbrio perfeito  
**Quero** desbloquear a classe Ser Supremo  
**Para** atingir o pico da evolução

**Critérios de Aceitação:**
- [ ] Desbloqueio: Todos os 7 status 90+, Streak 365 dias, Todas 6 classes secretas desbloqueadas
- [ ] Notificação épica quando desbloqueado
- [ ] Visual especial (aura dourada, efeitos especiais)
- [ ] Habilidades especiais (Ascensão Divina, Imortalidade, Transmutação)
- [ ] Bônus de XP máximo

**Tarefas Técnicas:**
- Implementar lógica de desbloqueio de Ser Supremo
- Criar função `checkSupremeUnlock(userProfile)`
- Criar sprite e efeitos visuais especiais
- Implementar habilidades especiais (mecânica de jogo)

---

## Epic 6: Sistema de Recompensas e Shop

### US-6.1: Shop Simples
**Como** um usuário que quer se recompensar  
**Quero** comprar recompensas com Gold (moeda do jogo)  
**Para** motivar meu progresso

**Critérios de Aceitação:**
- [ ] Lista de recompensas pré-definidas
- [ ] Cada recompensa tem preço em Gold
- [ ] Descrição e ícone para cada recompensa
- [ ] Botão "Comprar" deduz Gold
- [ ] Recompensa é adicionada ao inventário
- [ ] Histórico de compras

**Tarefas Técnicas:**
- Criar componente `Shop.tsx`
- Definir lista de recompensas padrão
- Implementar compra (deduz Gold, adiciona ao inventário)
- Armazenar inventário em AsyncStorage
- Itens do inventário podem ser consumidos e expiram (configurável validade do item em dias ao criar)

---

### US-6.2: Recompensas Customizadas
**Como** um usuário criativo  
**Quero** criar minhas próprias recompensas  
**Para** me motivar com objetivos pessoais

**Critérios de Aceitação:**
- [ ] Tela para criar recompensa customizada
- [ ] Campo para nome, descrição, preço em Gold
- [ ] Salvar recompensa customizada
- [ ] Recompensa aparece no shop
- [ ] Poder editar/deletar recompensa customizada

**Tarefas Técnicas:**
- Criar componente `CreateReward.tsx`
- Implementar CRUD de recompensas customizadas
- Validação de nome e preço
- Armazenar em AsyncStorage

---

### US-6.3: Desconto Dinâmico Baseado em Streak
**Como** um usuário com streak alto  
**Quero** ter desconto nas recompensas  
**Para** ser recompensado por consistência

**Critérios de Aceitação:**
- [ ] Desconto aumenta com streak (1% por dia, máximo 50%)
- [ ] Desconto é exibido no shop
- [ ] Preço final é calculado com desconto
- [ ] Desconto é resetado quando streak é quebrada

**Tarefas Técnicas:**
- Implementar cálculo de desconto baseado em streak
- Função `calculateDiscount(streak)`
- Exibir desconto no shop
- Aplicar desconto no preço final

---

## Epic 7: Sistema de Streak e Progressão

### US-7.1: Streak Counter
**Como** um usuário que quer manter consistência  
**Quero** ter um contador de dias consecutivos que completo atividades  
**Para** manter motivação de fazer atividades diárias

**Critérios de Aceitação:**
- [ ] Streak aumenta quando usuário completa atividade no dia
- [ ] Streak reseta se usuário não fizer atividade por 24h
- [ ] Exibição visual do streak no dashboard
- [ ] Notificação quando streak é quebrada
- [ ] Histórico de streaks anteriores

**Tarefas Técnicas:**
- Implementar lógica de streak em `lib/biometric-calculator.ts`
- Função `updateStreak(lastActivityDate)`
- Armazenar streak em AsyncStorage
- Calcular dias desde última atividade

---

### US-7.2: Decay de Status com Streak Quebrada
**Como** um usuário que quebra streak  
**Quero** que meus status sofram penalidade  
**Para** manter a importância de manter streak

**Critérios de Aceitação:**
- [ ] Quando streak é quebrada, status decaem 10%
- [ ] Penalidade é aplicada uma vez
- [ ] Notificação de penalidade
- [ ] Streak pode ser recuperado fazendo atividades novamente

**Tarefas Técnicas:**
- Implementar função `applyStreakPenalty(userProfile)`
- Calcular 10% de decay em todos os status
- Persistir penalidade
- Integrar com sistema de notificações

---

### US-7.3: Milestones de Streak
**Como** um usuário com streak alto  
**Quero** desbloquear recompensas em milestones de streak  
**Para** ter objetivos de longo prazo

**Milestones:**
- 7 dias: +100 Gold, Título "Iniciante Consistente"
- 30 dias: +500 Gold, Título "Guerreiro Disciplinado"
- 100 dias: +1500 Gold, Título "Lenda em Ascensão"
- 365 dias: +5000 Gold, Desbloqueio de Ser Supremo

**Critérios de Aceitação:**
- [ ] Verificar streak a cada login
- [ ] Desbloquear recompensa quando atingir milestone
- [ ] Exibir notificação de milestone
- [ ] Adicionar Gold automaticamente
- [ ] Adicionar título ao perfil

**Tarefas Técnicas:**
- Definir milestones em constantes
- Implementar função `checkStreakMilestones(streak)`
- Adicionar Gold ao perfil
- Armazenar títulos desbloqueados

---

## Epic 8: Dashboard e Visualização

### US-8.1: Dashboard Principal
**Como** um usuário  
**Quero** ver um dashboard com todos os meus dados em um só lugar  
**Para** acompanhar meu progresso

**Componentes:**
- Personagem visual (centro)
- 7 barras de status (lado)
- Streak counter (topo)
- Classe atual (topo)
- Nível/XP (topo)
- Atalhos para atividades (botões rápidos)

**Critérios de Aceitação:**
- [ ] Layout responsivo para mobile
- [ ] Atualização em tempo real
- [ ] Animações suaves
- [ ] Cores temáticas Cyberpunk

**Tarefas Técnicas:**
- Criar componente `Dashboard.tsx`
- Integrar todos os componentes
- Implementar refresh de dados
- Otimizar performance

---

### US-8.2: Tela de Perfil
**Como** um usuário  
**Quero** ver meu perfil completo com estatísticas  
**Para** acompanhar meu progresso detalhado

**Informações:**
- Dados biométricos (altura, peso, % gordura)
- TMB/TDEE
- Classe e nível
- Streak
- Total de XP
- Inventário
- Histórico de atividades

**Critérios de Aceitação:**
- [ ] Exibição clara de todas as informações
- [ ] Gráficos de progresso (peso, XP, etc)
- [ ] Histórico de últimas atividades
- [ ] Opção de editar dados biométricos

**Tarefas Técnicas:**
- Criar componente `Profile.tsx`
- Implementar gráficos com Recharts ou similar
- Exibir histórico de atividades
- Integrar com dados do usuário

---

### US-8.3: Tela de Estatísticas
**Como** um usuário que quer análise detalhada  
**Quero** ver gráficos e estatísticas de meu progresso  
**Para** entender meus padrões

**Gráficos:**
- Progresso de peso (últimos 30 dias)
- Progresso de XP (últimos 30 dias)
- Distribuição de atividades (pizza chart)
- Horas de estudo (últimos 30 dias)
- Treinos por tipo (últimos 30 dias)
- Consumo calórico vs meta

**Critérios de Aceitação:**
- [ ] Gráficos responsivos
- [ ] Filtro por período (7 dias, 30 dias, 90 dias, 1 ano)
- [ ] Exportar dados (CSV)
- [ ] Insights automáticos

**Tarefas Técnicas:**
- Criar componente `Statistics.tsx`
- Integrar biblioteca de gráficos
- Implementar cálculos de estatísticas
- Adicionar filtros de período

---

## Epic 9: Sistema de Notificações

### US-9.1: Notificações Locais
**Como** um usuário  
**Quero** receber notificações para lembrar de atividades  
**Para** manter consistência

**Tipos de Notificação:**
- Lembrete de treino (baseado em frequência)
- Lembrete de estudo (baseado em meta)
- Lembrete de hábitos (diário)
- Alerta de streak em risco (24h sem atividade)
- Milestone de streak desbloqueado

**Critérios de Aceitação:**
- [ ] Notificações agendadas corretamente
- [ ] Usuário pode customizar horários
- [ ] Notificações podem ser desabilitadas
- [ ] Notificações têm ícone e som

**Tarefas Técnicas:**
- Usar `expo-notifications`
- Implementar agendamento de notificações
- Criar função `scheduleNotifications(userProfile)`
- Permitir customização de horários

---

### US-9.2: Notificações In-App
**Como** um usuário  
**Quero** ver notificações dentro do app  
**Para** acompanhar eventos importantes

**Tipos:**
- Classe desbloqueada
- Milestone atingido
- Status crítico (muito baixo)
- Streak quebrada

**Critérios de Aceitação:**
- [ ] Toast/banner no topo da tela
- [ ] Animação suave
- [ ] Auto-dismiss após 3 segundos
- [ ] Cor diferente por tipo

**Tarefas Técnicas:**
- Criar componente `NotificationToast.tsx`
- Implementar context para notificações globais
- Adicionar animações com Reanimated
- Integrar com eventos do app

---

## Epic 10: Persistência e Sincronização

### US-10.1: AsyncStorage
**Como** um desenvolvedor  
**Quero** que todos os dados sejam persistidos localmente  
**Para** funcionar offline

**Dados a Persistir:**
- Perfil do usuário
- Atividades (treinos, nutrição, estudo, etc)
- Recompensas
- Inventário
- Streak
- Status

**Critérios de Aceitação:**
- [ ] Todos os dados salvos em AsyncStorage
- [ ] Dados carregados ao abrir app
- [ ] Sincronização automática
- [ ] Backup local

**Tarefas Técnicas:**
- Usar `@react-native-async-storage/async-storage`
- Criar funções de save/load para cada tipo de dado
- Implementar versionamento de dados
- Adicionar migração de dados

---

### US-10.2: Backup e Restore
**Como** um usuário  
**Quero** fazer backup de meus dados  
**Para** não perder progresso se trocar de telefone

**Critérios de Aceitação:**
- [ ] Opção de exportar dados (JSON)
- [ ] Opção de importar dados
- [ ] Validação de arquivo
- [ ] Confirmação antes de restaurar

**Tarefas Técnicas:**
- Criar função `exportData()` que gera JSON
- Criar função `importData(jsonFile)` que restaura
- Validar estrutura de dados
- Usar file picker para seleção

---

## Epic 11: Integração com APIs Externas

### US-11.1: API de Calorias
**Como** um usuário que rastreia nutrição  
**Quero** buscar calorias de alimentos em uma API  
**Para** não precisar digitar manualmente

**Critérios de Aceitação:**
- [ ] Integração com API de calorias (USDA FoodData Central)
- [ ] Busca por nome de alimento
- [ ] Exibição de calorias e macros
- [ ] Cache local de alimentos buscados
- [ ] Fallback se API falhar

**Tarefas Técnicas:**
- Integrar USDA FoodData Central API (sem API Key necessária)
- Criar função `searchFood(query)`
- Implementar cache com AsyncStorage
- Tratamento de erros

---

### US-11.2: Samsung Health Integration (Futura)
**Como** um usuário com Samsung Health  
**Quero** sincronizar dados de saúde  
**Para** não precisar logar manualmente

**Nota:** Futura implementação, não é prioridade MVP

---

## Epic 12: Gamificação Avançada

### US-12.1: Achievements/Badges
**Como** um usuário  
**Quero** desbloquear achievements por feitos específicos  
**Para** ter metas secundárias

**Exemplos:**
- "Primeira Gig" - Completar primeira atividade
- "Consistente" - Manter 7 dias de streak
- "Maratonista" - Treinar 5x na semana
- "Intelectual" - Estudar 20 horas em um mês
- "Financeiro" - Pagar R$1000 em dívida

**Critérios de Aceitação:**
- [ ] Sistema de achievements implementado
- [ ] Verificação automática de critérios
- [ ] Notificação ao desbloquear
- [ ] Exibição de achievements no perfil
- [ ] Bônus de XP por achievement

**Tarefas Técnicas:**
- Definir lista de achievements
- Implementar função `checkAchievements(userProfile)`
- Armazenar achievements desbloqueados
- Criar componente de exibição

---

### US-12.2: Títulos e Prestige
**Como** um usuário que quer customização  
**Quero** desbloquear títulos que aparecem no perfil  
**Para** mostrar meu status

**Exemplos:**
- "Iniciante Consistente" (7 dias streak)
- "Guerreiro Disciplinado" (30 dias streak)
- "Lenda em Ascensão" (100 dias streak)
- "Deus Vivo" (Ser Supremo)

**Critérios de Aceitação:**
- [ ] Títulos desbloqueados por milestones
- [ ] Exibição no perfil
- [ ] Opção de selecionar título ativo
- [ ] Efeito visual especial para títulos raros

**Tarefas Técnicas:**
- Definir lista de títulos
- Implementar desbloqueio automático
- Armazenar títulos no perfil
- Criar componente de exibição

---

## Priorização e Roadmap

### MVP v1 (Semana 1-2)
- [x] Triagem inicial (7 etapas)
- [x] Classificação automática de classe
- [x] Sistema de status RPG básico
- [x] Dashboard simples
- [x] Rastreamento de treinos
- [x] Rastreamento de água
- [x] Shop simples
- [x] Recompensas customizadas
- [x] Streak counter
- [x] Persistência em AsyncStorage

### MVP v2 (Semana 3-4)
- [ ] Personagem visual 16-bit
- [ ] Mudança de silhueta baseado em peso
- [ ] Rastreamento de nutrição (com API)
- [ ] Rastreamento de estudo
- [ ] Rastreamento de tarefas
- [ ] Rastreamento de finanças
- [ ] Rastreamento de hábitos
- [ ] Dashboard completo com gráficos
- [ ] Tela de perfil
- [ ] Notificações locais

### MVP v3 (Semana 5-6)
- [ ] Classes secretas (desbloqueio automático)
- [ ] Ser Supremo (classe final)
- [ ] Aura e brilho baseado em status
- [ ] Equipamentos e acessórios
- [ ] Achievements e badges
- [ ] Títulos e prestige
- [ ] Tela de estatísticas
- [ ] Backup e restore
- [ ] Milestones de streak
- [ ] Decay de status com streak quebrada

### Futuro (Pós-MVP)
- [ ] Samsung Health integration
- [ ] Multiplayer (Guildas, Raids)
- [ ] Leaderboards
- [ ] Social features (compartilhar progresso)
- [ ] Temas customizáveis
- [ ] Dark mode
- [ ] Idiomas adicionais
- [ ] Web version
- [ ] Desktop app

---

## Notas Técnicas

### Stack Recomendado
- **Framework**: React Native com Expo
- **State Management**: Context API + AsyncStorage
- **Persistência**: AsyncStorage (local)
- **Animações**: Reanimated 4.x
- **Gráficos**: Recharts ou Victory
- **Notificações**: expo-notifications
- **UI Components**: React Native Paper ou custom

### Padrões de Código
- TypeScript para type safety
- Componentes funcionais com hooks
- Custom hooks para lógica reutilizável
- Separação de concerns (components, hooks, lib)
- Testes unitários para funções críticas

### Performance
- Memoization de componentes pesados
- FlatList para listas longas
- Lazy loading de dados
- Cache de API calls
- Otimização de re-renders

---

## Conclusão

Este documento define todas as histórias técnicas necessárias para desenvolver o **Habittus - Cyberpunk Life RPG** conforme os requisitos do usuário. O app é um Life RPG completo que gamifica 7 pilares da vida com um sistema robusto de status, progressão de classes, rastreamento multi-dimensional e personalização visual.

O desenvolvimento deve ser iterativo, começando com o MVP v1 (triagem + dashboard + rastreamento básico) e evoluindo para versões mais completas com visual dinâmico, classes secretas e features avançadas de gamificação.
