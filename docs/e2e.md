# E2E Tests (Playwright) — Setup & Notes

Objetivo: validar jornadas críticas no web build (onboarding/triage, shop purchase, gigs/streak flows).

Status atual:
- Playwright configurado (`playwright.config.ts`) e teste placeholder adicionado em `tests/e2e/triage.spec.ts` (atualmente marcado como skip porque o servidor web não é iniciado automaticamente).

Plano de execução (próximos passos):
1. Configurar job no CI para gerar build web (`expo build:web` ou `expo export:web`) e servir em um passo anterior ao `playwright test`.
2. Atualizar testes para navegar para `http://localhost:<port>/triage` e executar o fluxo de onboarding.
3. Adicionar steps de captura de screenshots e gravação de vídeo em falhas para análise.

Comandos úteis:
- Rodar E2E local (após build e servidor): `pnpm test:e2e`
