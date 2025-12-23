# Habittus - Backlog Prioritário (Atualizado)

> Esta versão do `todo.md` foi atualizada a partir da auditoria das histórias técnicas (`TECHNICAL_STORIES.md`) e do código atual. As tarefas estão organizadas por épico, com prioridade e próximos passos claros. Marque itens concluídos quando comitar e abra PR por épico.

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
