# Acessibilidade — Checklist & Scripts

Objetivo: garantir que componentes principais (Triagem, Shop, Gigs, Dashboard) sejam acessíveis para leitores de tela e navegação por teclado.

Checklist inicial:
- [ ] Todos os botões e elementos interativos possuem `accessibilityLabel` quando o texto não é descritivo
- [ ] Inputs possuem `placeholder` e `accessibilityLabel`
- [ ] Contraste de cores atende ao mínimo (WCAG AA)
- [ ] Roles/accessible props aplicados quando necessário
- [ ] Testes automatizados via ESLint (`eslint-plugin-jsx-a11y`) e, futuramente, axe-core

Como rodar as checagens:
- Instale dependências: `pnpm install`
- Rodar ESLint accessibility rules: `pnpm lint:a11y`

Notas:
- Este é um ponto de partida; as regras serão refinadas com base nos resultados e em testes E2E com leitores de tela.
