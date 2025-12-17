# Habittus MVP - Todo List

## Phase 1: Core Infrastructure
- [x] Criar estrutura de tipos TypeScript (User, Gig, Bounty, Reward, etc.)
- [x] Implementar sistema de armazenamento local (AsyncStorage hooks)
- [x] Criar mocks JSON para dados iniciais
- [x] Implementar sistema de tema Cyberpunk (cores, tipografia)

## Phase 2: Character Creation & Onboarding
- [x] Criar tela de Character Creation (nome + classe)
- [x] Validar inputs (nome não vazio, classe obrigatória)
- [x] Salvar personagem em AsyncStorage
- [x] Navegação automática para Dashboard após criação

## Phase 3: Dashboard (Bio-Monitor)
- [x] Criar tela Dashboard com Bio-Monitor
- [x] Implementar barras de progresso (RAM, Hardware, Cool, Credits)
- [x] Exibir Streak Counter
- [x] Mostrar próxima Gig pendente
- [x] Implementar Quick Actions (botões para Gigs, Shop, Profile)

## Phase 4: Gigs Management
- [x] Criar tela Gigs com abas (Daily Gigs / Bounties)
- [x] Listar Daily Gigs com checkbox
- [x] Implementar lógica de conclusão de Gig (XP, Gold, atualizar Bio-Monitor)
- [x] Implementar Streak logic (incrementar se todas as Gigs completadas)
- [ ] Criar tela Gig Detail
- [x] Listar Bounties (dívidas) com barra de HP
- [ ] Criar tela Bounty Detail
- [x] Implementar sistema de pagamento de Bounty (reduz HP, aumenta Credits)

## Phase 5: Shop & Rewards
- [x] Criar tela Shop com lista de itens
- [x] Implementar cálculo de desconto Street Cred (Streak * 0.02, cap 50%)
- [x] Implementar sistema de compra (deduz Gold, adiciona ao inventário)
- [x] Criar tela Add Custom Reward
- [x] Validar inputs (nome, descrição, custo)
- [x] Salvar recompensas customizadas em AsyncStorage

## Phase 6: Profile & Settings
- [x] Criar tela Profile com estatísticas gerais
- [x] Exibir nome, classe, XP total, Gold total, Gigs completadas
- [x] Implementar botão de reset (para teste)
- [ ] Criar tela Settings (placeholder para futuras opções)

## Phase 7: Branding & Polish
- [ ] Gerar logo customizado (Cyberpunk style)
- [ ] Atualizar app.config.ts com branding
- [x] Aplicar tema Cyberpunk em todos os componentes
- [ ] Adicionar animações e feedback visual (haptic, glitch effects)
- [ ] Testar navegação end-to-end

## Phase 8: Testing & Delivery
- [ ] Testar fluxos principais (onboarding, gigs, shop, streak)
- [ ] Validar persistência de dados em AsyncStorage
- [ ] Testar em diferentes tamanhos de tela
- [ ] Criar checkpoint final
- [ ] Documentar instruções de execução
