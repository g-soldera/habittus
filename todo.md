# Habittus - Sprint Atual (Melhorias Críticas de UX/Visual)

> **Data:** 22 de dezembro de 2025  
> **Objetivo:** Transformar o app em um verdadeiro RPG Cyberpunk com melhorias visuais, áudio, configurações e gameplay aprimorado.

## ✅ Implementado Nesta Sessão

### 1. Sistema de Configurações & Áudio ⚙️🎵 [COMPLETO]
- ✅ Tela de configurações (`app/(tabs)/settings.tsx`)
- ✅ Hook `useAudio` para gerenciar música de fundo e SFX
- ✅ Integração com expo-av para áudio
- ✅ Sliders de volume para música e efeitos sonoros
- ✅ Toggle on/off para música e SFX
- ✅ Seletor de idioma (PT-BR/EN-US) preparado
- ✅ Botão "RESETAR JOGO" movido para configurações
- ✅ Persistência de preferências com AsyncStorage

### 2. Melhorias Visuais Cyberpunk 🎨✨ [FASE 1 COMPLETA]
- ✅ Glow effects no streak counter (shadow + text shadow)
- ✅ Contraste melhorado em todos os inputs (border 2px, bg escuro)
- ✅ Botões de gênero com seleção visual clara (border color, glow, bg)
- ✅ Campo "Tipo de Dieta" transformado em grid de botões com emojis
- ✅ Botões redundantes da home removidos (já existem no menu)
- ✅ Ícone Settings adicionado ao menu do rodapé

### 3. Stats Iniciais Realísticos 📊 [COMPLETO]
- ✅ Função `calculateRealisticInitialStats()` implementada
- ✅ Stats base começam em 30 (não 50)
- ✅ Ajustes por frequência/tipo de treino (+25 força se treina muito)
- ✅ Ajustes por horas de estudo (+25 intelligence se > 20h/semana)
- ✅ Ajustes por sono (+10 constitution se 7-9h)
- ✅ Penalidades por IMC inadequado (-10 agility se obeso)
- ✅ Penalidades por dívidas (-5 wisdom se endividado)
- ✅ Boosts de classe aplicados sobre stats realísticos

## 🎯 Próximos Passos

### Fase 2: Visuais Avançados & Animações 🚀
- [ ] Instalar react-native-reanimated para animações
- [ ] Adicionar SVGs cyberpunk (circuitos, glitch, neon borders)
- [ ] Animações de transição entre telas
- [ ] Texturas nos cards (scanlines, noise pattern, grid)
- [ ] Background animado no dashboard (parallax grid)
- [ ] Partículas ao completar gigs
- [ ] Efeitos de scan ao abrir telas

### Fase 3: i18n Completo 🌍
- [ ] Instalar react-i18next
- [ ] Criar arquivos locales/pt-br.json e locales/en-us.json
- [ ] Traduzir todas as strings da UI
- [ ] Hook useTranslation em todos os componentes
- [ ] Persistir idioma selecionado

### Fase 4: Gigs & Bounties Personalizáveis 🎯
- [ ] Tela "Add Custom Gig" com campos (nome, descrição, complexidade 1-10)
- [ ] Algoritmo: recompensa = complexidade * 10 XP + complexidade * 5 Gold
- [ ] Tela "Add Custom Bounty" (dívida real do usuário)
- [ ] CRUD completo (editar, deletar gigs/bounties)
- [ ] Persistir no AsyncStorage junto com gameState

### Fase 5: Avatar/Personagem Customizável 🎭
- [ ] Pesquisar APIs: DiceBear, Avataaars, RoboHash
- [ ] Integrar API escolhida
- [ ] Tela de customização de avatar na criação
- [ ] Avatar no Dashboard e Profile
- [ ] Avatar muda baseado em peso/stats/classe

### Fase 6: Melhorias do Bio-Monitor & Alertas 💡
- [ ] Adicionar tooltips explicativos (RAM = Foco/Energia)
- [ ] Melhorar clareza dos alertas (ícones, cores, texto)
- [ ] Posicionar alertas de forma menos intrusiva
- [ ] Animação ao mostrar alertas críticos

### Fase 7: Áudio Real 🎵
- [ ] Encontrar música cyberpunk/synthwave livre (Pixabay, Freesound)
- [ ] Adicionar sons de clique (cyber beep)
- [ ] Sons ao completar gig (success fanfare)
- [ ] Sons ao comprar item (cash register)
- [ ] Música de fundo dinâmica (muda por tela)

## 📋 Backlog Organizado (Épicos)

---

## Epic: Triagem e Onboarding (Prioridade: Alta) ✅

- [X] Tela `triage.tsx` com 7 etapas implementada (validações básicas)
- [X] Cálculo de TMB/TDEE (em `lib/biometric-calculator.ts`)
- [X] Classificação automática de classe (função `classifyUser`)
- [X] Persistência de perfil (salvar perfil e criar GameState)
- [X] Redirecionamento para Dashboard ao finalizar triagem
- [X] Redirecionamento automático para Dashboard para usuários existentes (implementado)
- [ ] Testes E2E cobrindo fluxo de onboarding (Criar teste Playwright: onboarding -> triage -> dashboard)
- [ ] Acessibilidade: revisar labels, roles e foco (priorizar triage)

---

## Epic: Status RPG & Cálculos (Prioridade: Alta) ✅

- [X] Funções TMB/TDEE, BMI, peso e bodyfat (implementadas)
- [X] Cálculo de XP e decay básico (implementado)
- [X] Função `checkClassUnlock` (implementada)
- [ ] Documentar fórmulas e expectativas numéricas (README / comentários)
- [ ] Testes unitários adicionais para fórmulas críticas (adicionar cobertura)

---

## Epic: Rastreamento (Prioridade: Alta → Média)

- [X] Rastreamento de treinos (gigs / logs básicos)
- [X] Rastreamento de água (implementado)
- [X] Integração dos componentes de tracking com `use-game-state` (persistência e aplicação de XP) — **feito**
- [X] Funções de cálculo de XP/efeitos (`lib/tracking.ts`) e testes unitários (adicionados)
- [ ] Rastreamento de nutrição (LogNutrition.tsx) — **usar integração já pronta**
- [ ] Rastreamento de estudo (LogStudy.tsx) — **usar integração já pronta**
- [ ] Task manager (TaskManager.tsx) — **faltando**
- [ ] FinanceTracker (Dashboard financeiro) — **faltando**

Próximo passo: adicionar testes E2E para garantir que logging → dashboard/status funcione como esperado e adicionar unit tests para `use-game-state` logging methods.

---

## Epic: Personagem e Visual (Prioridade: Média)

- [ ] `CharacterDisplay.tsx` e sprites 16-bit
- [ ] Mudança de silhueta por peso
- [ ] Aura / brilho por status
- [ ] Equipamentos e inventário visual

Próximo passo: design assets & implementar placeholder visual responsivo.

---

## Epic: Shop & Recompensas (Prioridade: Alta)

- [X] Tela `shop` e compra básica (deduz Gold, adiciona inventário)
- [X] Criação de recompensas customizadas (`Add Custom Reward`)
- [ ] Exibir desconto dinâmico no UI (melhorar visual atual)
- [ ] Melhorar inventário (consumíveis, expiração)

---

## Epic: Streak & Progressão (Prioridade: Alta)

- [X] Streak counter e increment (básico)
- [X] Milestones básicos (definidos no documento)
- [ ] Penalidade de streak quebrada (applyStreakPenalty)
- [ ] Milestones automáticos e notificações (integração com notifications)

---

## Epic: Dashboard, Perfil e Estatísticas (Prioridade: Média)

- [X] Dashboard básico (Bio-Monitor, Streak, Quick Actions)
- [X] Profile (dados gerais)
- [ ] Tela de `Statistics.tsx` com gráficos
- [ ] Exportar CSV e filtros (7/30/90/1y)

---

## Epic: Notificações & In-App (Prioridade: Média)

- [ ] Local notifications agendadas (expo-notifications)
- [ ] In-app toasts/notifications (NotificationToast.tsx)
- [ ] Customização de horários de lembrete

---

## Epic: Persistência & Sync (Prioridade: Alta)

- [X] AsyncStorage para GameState (implementado)
- [X] AsyncStorage para user profile (implementado)
- [ ] Export / Import (backup & restore)
- [ ] Versionamento e migrações de dados

---

## Infra & Qualidade

- [X] ESLint a11y configurado
- [X] Playwright scaffold (até o momento vazio)
- [X] Vitest configurado (unit tests)
- [ ] Expansão da suíte E2E (priorizar onboarding + navegação)
- [ ] Corrigir violações de acessibilidade encontradas pelo linter
- [ ] Checklists de PR por épico (commits atômicos, descrição, testes)

---

## Notas de Processo e Próximos Passos Imediatos (minhas ações propostas)

1. Corrigir fluxo de first-run/returning user (feito) — abrir PR: `epic/onboarding-redirect` ✅
2. Adicionar testes unitários para funções biométricas (feito) — abrir PR: `test/biometric` ✅
3. Criar checklist E2E para onboarding e implementar teste Playwright (próximo)
4. Planejar EPICS e abrir PRs por épico com commits atômicos (priorizar Triagem, Rastreamento Nutrição e Personagem)

---

Se concordar, vou começar criando PRs pequenos e atômicos seguindo a ordem acima (Triagem fixes → Testes → E2E onboarding → Rastreamento Nutrição).
