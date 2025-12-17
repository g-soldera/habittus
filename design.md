# Habittus - Mobile App Interface Design

## Overview
Habittus é uma aplicação de gamificação da vida real (Life RPG) com estética Cyberpunk. O usuário encarna um "Edgerunner" que gerencia hábitos, dívidas e recompensas em um ambiente futurista e imersivo.

**Plataforma**: iOS-style mobile app (React Native)
**Orientação**: Portrait (9:16)
**Modo de Uso**: Uma mão

---

## Screen List

### 1. **Onboarding / Character Creation**
- **Nome da Tela**: `CharacterCreationScreen`
- **Propósito**: Primeira experiência do usuário. Criar personagem e escolher classe.
- **Conteúdo Principal**:
  - Input de nome do Edgerunner
  - Seleção de classe (Netrunner, Solo, Fixer, Techie) com descrições
  - Confirmação e navegação para Dashboard

### 2. **Dashboard (Home)**
- **Nome da Tela**: `DashboardScreen`
- **Propósito**: Hub central. Visualizar status do personagem, estatísticas e acesso rápido às principais funcionalidades.
- **Conteúdo Principal**:
  - **Bio-Monitor**: Barras de progresso para RAM, Hardware, Cool, Credits
  - **Streak Counter**: Dias seguidos de login/cumprimento de metas
  - **Quick Actions**: Botões para Gigs, Loja, Perfil
  - **Próxima Gig**: Exibir próxima tarefa pendente

### 3. **Gigs (Tarefas/Hábitos)**
- **Nome da Tela**: `GigsScreen`
- **Propósito**: Listar e gerenciar tarefas diárias (Gigs) e dívidas (Bounties).
- **Conteúdo Principal**:
  - **Abas**: "Daily Gigs" e "Bounties"
  - **Daily Gigs**: Lista de hábitos recorrentes (ex: Beber água, Ler 10 pág)
    - Card com nome, ícone, XP/Gold recompensa
    - Checkbox para marcar como concluído
  - **Bounties**: Dívidas como inimigos com barra de HP (valor em R$)
    - Card com nome do "inimigo", valor, progresso de pagamento
    - Botão para registrar pagamento

### 4. **Gig Detail / Bounty Detail**
- **Nome da Tela**: `GigDetailScreen` / `BountyDetailScreen`
- **Propósito**: Visualizar detalhes de uma tarefa ou dívida específica.
- **Conteúdo Principal**:
  - Descrição completa
  - Recompensas (XP, Gold)
  - Histórico de conclusões (para Gigs)
  - Botão de ação (Completar Gig / Pagar Bounty)

### 5. **Shop (Loja)**
- **Nome da Tela**: `ShopScreen`
- **Propósito**: Visualizar e comprar recompensas customizadas.
- **Conteúdo Principal**:
  - **Saldo de Gold**: Exibição do Gold disponível
  - **Desconto Street Cred**: Mostrar % de desconto baseado em Streak
  - **Lista de Itens**: Cards com nome, descrição, preço (com desconto aplicado), ícone
  - **Filtros**: Categoria (Lazer, Comida, Viagem, etc.)
  - **Botão de Compra**: Comprar item com Gold

### 6. **Add Custom Reward**
- **Nome da Tela**: `AddRewardScreen`
- **Propósito**: Criar recompensa customizada.
- **Conteúdo Principal**:
  - Input: Nome da recompensa
  - Input: Descrição
  - Input: Custo em Gold
  - Seletor: Categoria
  - Botão: Salvar recompensa

### 7. **Profile / Settings**
- **Nome da Tela**: `ProfileScreen`
- **Propósito**: Visualizar perfil, estatísticas gerais e configurações.
- **Conteúdo Principal**:
  - Nome do Edgerunner
  - Classe escolhida
  - Estatísticas totais (XP total, Gold total, Gigs completadas)
  - Botão: Resetar dados (para teste)

---

## Primary Content and Functionality

### Character Creation
- **Input Fields**: Nome (text), Classe (selector com 4 opções)
- **Validação**: Nome não vazio, classe obrigatória
- **Ação**: Salvar em AsyncStorage e navegar para Dashboard

### Dashboard
- **Bio-Monitor Bars**:
  - RAM (0-100): Aumenta estudando
  - Hardware (0-100): Aumenta treinando
  - Cool (0-100): Aumenta meditando/resistindo a compras
  - Credits (0-10000): Aumenta poupando
- **Streak Counter**: Dias seguidos (número grande e destacado)
- **Quick Stats**: Total de Gigs completadas, Gold total

### Gigs Management
- **Daily Gigs**:
  - Listar tarefas recorrentes
  - Checkbox para marcar como concluído
  - Ao completar: +XP, +Gold, atualizar Bio-Monitor
  - Streak aumenta se todas as Gigs do dia forem completadas
- **Bounties**:
  - Listar dívidas com barra de HP (valor em R$)
  - Input para registrar pagamento
  - Ao pagar: reduz HP do inimigo, aumenta Credits

### Shop
- **Exibir Gold Disponível**: Topo da tela
- **Cálculo de Desconto**: `Preço_Final = Preço_Base * (1 - (Streak_Dias * 0.02))`
  - Cap máximo: 50% de desconto
- **Compra**: Deduz Gold, adiciona item ao inventário
- **Itens Customizados**: Usuário pode adicionar recompensas próprias

### Streak Mechanic
- **Contador**: Incrementa a cada login + cumprimento de metas diárias
- **Reset**: Se usuário não logar/completar metas por um dia, volta a 0
- **Benefício**: Desconto progressivo na loja

---

## Key User Flows

### Flow 1: Onboarding (Primeiro Acesso)
1. Usuário abre app → Verifica se há dados salvos
2. Se não há dados → Exibe CharacterCreationScreen
3. Usuário digita nome e escolhe classe
4. Clica "Começar Jornada" → Salva dados, navega para Dashboard
5. Dashboard exibido com Bio-Monitor zerado e Streak = 0

### Flow 2: Completar Gig Diária
1. Usuário em Dashboard → Vê "Próxima Gig: Beber água"
2. Clica em "Gigs" → Exibe lista de Daily Gigs
3. Encontra "Beber água" → Clica checkbox
4. Sistema: +10 XP, +5 Gold, RAM +5
5. Gig marcada como concluída (visual feedback: ✓)
6. Se todas as Gigs do dia completadas → Streak +1

### Flow 3: Pagar Dívida (Bounty)
1. Usuário em Dashboard → Clica "Bounties"
2. Vê inimigo "Cartão de Crédito" com HP = R$ 5000
3. Clica em bounty → Exibe BountyDetailScreen
4. Input: Digita valor de pagamento (ex: R$ 500)
5. Clica "Pagar" → Deduz Gold, reduz HP do inimigo
6. Se HP = 0 → Bounty eliminada, mensagem de vitória

### Flow 4: Comprar Recompensa
1. Usuário em Dashboard → Clica "Loja"
2. Vê lista de itens com preços
3. Se Streak = 10 → Desconto de 20% aplicado automaticamente
4. Clica em item → Exibe detalhes
5. Clica "Comprar" → Deduz Gold, item adicionado ao inventário
6. Feedback: "Recompensa desbloqueada!"

### Flow 5: Criar Recompensa Customizada
1. Usuário em Shop → Clica "Adicionar Recompensa"
2. Preenche: Nome, Descrição, Custo, Categoria
3. Clica "Salvar" → Recompensa adicionada à loja pessoal
4. Volta para Shop → Nova recompensa visível na lista

---

## Color Choices (Cyberpunk Aesthetic)

### Primary Colors
- **Fundo Escuro**: `#0a0e27` (Dark Slate/Black)
- **Neon Ciano**: `#00d9ff` (Accent Principal)
- **Neon Magenta**: `#ff006e` (Destaque/Alerta)
- **Neon Verde**: `#39ff14` (Sucesso/Positivo)
- **Neon Roxo**: `#b537f2` (Secundário)

### Text Colors
- **Texto Primário**: `#ffffff` (Branco puro)
- **Texto Secundário**: `#a0aec0` (Cinza claro)
- **Texto Desativado**: `#4a5568` (Cinza escuro)

### Surface Colors
- **Card Background**: `#1a1f3a` (Azul escuro)
- **Input Background**: `#0f1419` (Preto com toque de azul)
- **Button Background**: `#00d9ff` (Ciano)
- **Button Text**: `#0a0e27` (Preto)

### Status Colors
- **Success (Verde)**: `#39ff14`
- **Warning (Amarelo)**: `#ffff00`
- **Error (Vermelho)**: `#ff0055`
- **Info (Ciano)**: `#00d9ff`

### Gradients
- **Neon Glow**: Ciano → Magenta (para cards destacados)
- **Dark Gradient**: `#0a0e27` → `#1a1f3a` (fundo)

---

## Typography

- **Títulos (32px)**: Bold, Monospaced (estilo terminal)
- **Subtítulos (20px)**: Bold, Monospaced
- **Body (16px)**: Regular, Monospaced
- **Caption (12px)**: Regular, Monospaced
- **Font Family**: `Courier New` ou `Menlo` (monospaced para vibe cyberpunk)

---

## Layout & Spacing

- **Grid Base**: 8px
- **Padding Padrão**: 16px
- **Espaço entre elementos**: 12px, 16px, 24px
- **Border Radius**: 8px (cards), 4px (inputs)
- **Safe Area**: Respeitar notch/home indicator

---

## Components & Interactions

### Bio-Monitor Bar
- Barra de progresso com brilho neon
- Cor: Ciano com sombra/glow
- Animação: Pulsação ao atualizar

### Gig Card
- Card com borda neon (Ciano ou Magenta)
- Checkbox com animação ao clicar
- Ícone representativo

### Bounty Card
- Card com barra de HP (estilo jogo)
- Cor da barra: Verde (saudável) → Amarelo → Vermelho (crítico)
- Animação: Shake ao receber dano

### Shop Item Card
- Imagem/ícone do item
- Nome, descrição, preço (com desconto destacado)
- Botão "Comprar" com feedback visual

### Streak Counter
- Número grande (48px+)
- Brilho neon (Ciano ou Verde)
- Animação: Pulse a cada novo dia

---

## Navigation Structure

```
Tab Navigation (Bottom):
├── Home (Dashboard)
├── Gigs
├── Shop
└── Profile

Modal Screens:
├── Character Creation (Onboarding)
├── Gig Detail
├── Bounty Detail
├── Add Reward
└── Settings
```

---

## Accessibility & Performance

- **Touch Targets**: Mínimo 44pt para botões
- **Contraste**: Textos em branco sobre fundo escuro (WCAG AA)
- **Animações**: Suave, sem flashing excessivo
- **Performance**: FlatList para listas longas, memoização de componentes
- **Offline**: Todos os dados salvos localmente em AsyncStorage

---

## Notes

- A estética Cyberpunk é alcançada através de cores neon vibrantes, tipografia monospaced e efeitos de brilho/glow.
- Todas as interações devem ter feedback visual imediato (haptic, animação, mudança de cor).
- O app deve funcionar completamente offline, com sincronização em tempo real via AsyncStorage.
- Futuras fases podem adicionar Guildas, Painel Admin e sincronização com backend.
