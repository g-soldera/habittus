# Habittus - Backlog Prioritário (Atualizado)

> Esta versão do `todo.md` foi atualizada a partir da auditoria das histórias técnicas (`TECHNICAL_STORIES.md`) e do código atual. As tarefas estão organizadas por épico, com prioridade e próximos passos claros. Marque itens concluídos quando comitar e abra PR por épico.

---

## Epic: Triagem e Onboarding (Prioridade: Alta) ✅
- [x] Tela `triage.tsx` com 7 etapas implementada (validações básicas)  
- [x] Cálculo de TMB/TDEE (em `lib/biometric-calculator.ts`)  
- [x] Classificação automática de classe (função `classifyUser`)  
- [x] Persistência de perfil (salvar perfil e criar GameState)
- [x] Redirecionamento para Dashboard ao finalizar triagem
- [x] Redirecionamento automático para Dashboard para usuários existentes (implementado)
- [ ] Testes E2E cobrindo fluxo de onboarding (Criar teste Playwright: onboarding -> triage -> dashboard)
- [ ] Acessibilidade: revisar labels, roles e foco (priorizar triage)

---

## Epic: Status RPG & Cálculos (Prioridade: Alta) ✅
- [x] Funções TMB/TDEE, BMI, peso e bodyfat (implementadas)
- [x] Cálculo de XP e decay básico (implementado)
- [x] Função `checkClassUnlock` (implementada)
- [ ] Documentar fórmulas e expectativas numéricas (README / comentários)
- [ ] Testes unitários adicionais para fórmulas críticas (adicionar cobertura)

---

## Epic: Rastreamento (Prioridade: Alta → Média)
- [x] Rastreamento de treinos (gigs / logs básicos)  
- [x] Rastreamento de água (implementado)
- [ ] Rastreamento de nutrição (LogNutrition.tsx) — **faltando** (MVP v2)
- [ ] Rastreamento de estudo (LogStudy.tsx) — **faltando** (MVP v2)
- [ ] Task manager (TaskManager.tsx) — **faltando** (MVP v2)
- [ ] FinanceTracker (Dashboard financeiro) — **faltando**

Próximo passo: criar issues/PRs separados por componente (LogNutrition, LogStudy, TaskManager).

---

## Epic: Personagem e Visual (Prioridade: Média)
- [ ] `CharacterDisplay.tsx` e sprites 16-bit (MVP v2)
- [ ] Mudança de silhueta por peso (MVP v2)
- [ ] Aura / brilho por status (MVP v3)
- [ ] Equipamentos e inventário visual (MVP v3)

Próximo passo: design assets & implementar placeholder visual responsivo.

---

## Epic: Shop & Recompensas (Prioridade: Alta)
- [x] Tela `shop` e compra básica (deduz Gold, adiciona inventário)
- [x] Criação de recompensas customizadas (`Add Custom Reward`)
- [ ] Exibir desconto dinâmico no UI (melhorar visual atual)
- [ ] Melhorar inventário (consumíveis, expiração)

---

## Epic: Streak & Progressão (Prioridade: Alta)
- [x] Streak counter e increment (básico)
- [x] Milestones básicos (definidos no documento)
- [ ] Penalidade de streak quebrada (applyStreakPenalty)
- [ ] Milestones automáticos e notificações (integração com notifications)

---

## Epic: Dashboard, Perfil e Estatísticas (Prioridade: Média)
- [x] Dashboard básico (Bio-Monitor, Streak, Quick Actions)
- [x] Profile (dados gerais)
- [ ] Tela de `Statistics.tsx` com gráficos (MVP v2)
- [ ] Exportar CSV e filtros (7/30/90/1y)

---

## Epic: Notificações & In-App (Prioridade: Média)
- [ ] Local notifications agendadas (expo-notifications)
- [ ] In-app toasts/notifications (NotificationToast.tsx)
- [ ] Customização de horários de lembrete

---

## Epic: Persistência & Sync (Prioridade: Alta)
- [x] AsyncStorage para GameState (implementado)
- [x] AsyncStorage para user profile (implementado)
- [ ] Export / Import (backup & restore)
- [ ] Versionamento e migrações de dados

---

## Infra & Qualidade
- [x] ESLint a11y configurado
- [x] Playwright scaffold (até o momento vazio)  
- [x] Vitest configurado (unit tests)
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
