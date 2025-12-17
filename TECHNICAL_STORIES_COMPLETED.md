# Habittus - Histórias Técnicas (Concluídas)

Este arquivo lista as histórias técnicas que já foram implementadas no código-base ou que foram avaliadas como concluídas durante a auditoria inicial. Ele será mantido e atualizado conforme avançamos por cada épico — histórias pendentes permanecem em `TECHNICAL_STORIES.md`.

## Observação
- As entradas abaixo indicam implementação funcional mínima ou parcial suficiente para o MVP descrito no documento original. Onde aplicável incluo referências de arquivos/locais no repositório que implementam ou suportam a história.

---

## Epic 1: Sistema de Triagem e Onboarding
- US-1.1 a US-1.7: Tela de triagem com 7 etapas, validação básica, persistência de perfil (salvar em AsyncStorage) — implementação principal em `app/triage.tsx` e `hooks/use-game-state.ts`. ✅
- US-1.8: Classificação automática de classe (função `classifyUser`) — implementação em `lib/biometric-calculator.ts`. ✅

## Epic 2: Sistema de Status RPG
- Cálculos: TMB/TDEE/BMI, cálculo de peso, body fat, cálculo de XP e decay — implementados em `lib/biometric-calculator.ts`. ✅
- Função `checkClassUnlock` (desbloqueio de classes secretas) — implementada em `lib/biometric-calculator.ts` (algoritmo presente, pode necessitar ajustes de critérios). ✅

## Epic 3: Rastreamento (parcial)
- Rastreamento de treinos (gigs) — sistema de Gigs e conclusão implementados (ver `hooks/use-game-state.ts`, `app/(tabs)/gigs`). ✅
- Rastreamento de água — implementado (componentes e integração básica). ✅

## Epic 5: Shop & Recompensas
- Shop básico, compra com Gold, criação de recompensas customizadas e persistência — implementado (ver `app/(tabs)/shop` e `hooks/use-game-state.ts`). ✅

## Epic 7: Streak & Progressão
- Streak counter e incremento básico — implementado no `gameState` / `bioMonitor` (ver `hooks/use-game-state.ts`). ✅

## Epic 8: Dashboard & Perfil
- Dashboard básico (Bio-Monitor, Streak, Quick Actions) — implementado em `app/(tabs)/index.tsx`. ✅
- Profile básico com estatísticas gerais — implementado (ver `app/(tabs)/profile.tsx`). ✅

## Infra & Qualidade
- Infra de testes unitários (Vitest) e alguns testes adicionados. ✅
- Scaffolding Playwright e um teste E2E inicial (onboarding → triage → dashboard) — arquivos em `playwright.config.ts` e `tests/e2e/onboarding.spec.ts`. ✅

---

## Observações adicionais
- Apesar das implementações marcadas como concluídas, muitas histórias têm pontos de melhoria (mais validação, acessibilidade, cobertura de testes, UX refinada). Esses refinamentos estão listados como pendências no documento principal (`TECHNICAL_STORIES.md`).

> Este arquivo foi criado automaticamente como parte da auditoria e será mantido para registro histórico. À medida que novas histórias forem completadas, irei movê-las daqui e atualizar `TECHNICAL_STORIES.md` para refletir o estado atual.
