# Habittus - Guia Rápido de Teste Local

## Pré-requisitos
- Node.js 18+ (ou use nvm)
- pnpm ou npm
- iOS/Android emulator ou Expo Go (mobile)
- Tablet ou web browser (Metro/Expo)

## Instalação

```bash
# Clonar repo
git clone https://github.com/g-soldera/habittus.git
cd habittus

# Instalar dependências (use pnpm se disponível)
npm install
# ou
pnpm install
```

## Rodando a Aplicação

### Mobile (Expo)
```bash
# Iniciar Expo dev server
npx expo start

# Escanear QR com Expo Go app (iOS/Android)
# Ou pressionar 'i' para iOS ou 'a' para Android (emulator)
```

### Web
```bash
# Rodar no browser
npx expo start --web
# Pressionar 'w' ou abrir http://localhost:19006
```

## Testar o Fluxo Completo

### 1️⃣ **Primeiro Acesso (Onboarding)**
- Ao abrir a app pela primeira vez, será redirecionado para `/triage`
- Preencher os 7 passos:
  - ✍️ Nome, idade, gênero
  - 📏 Altura, peso, % gordura
  - 🎯 Selecionar 3+ objetivos (pilares)
  - 💪 Frequência treino e tipo
  - 🍎 Dieta e refeições/dia
  - 📚 Horas estudo por semana
  - 💰 Renda, dívida, horas sono
- Botão "Criar Personagem" aplica a classificação
- Redirecionado para Dashboard

### 2️⃣ **Dashboard (Home)**
- Mostra:
  - Nome do personagem e classe (com emoji)
  - Streak de login (verde)
  - XP progress bar (roxo)
  - Bio-Monitor com RAM/HARDWARE/COOL
  - Avisos de decay crítico (se houver)
  - Próxima gig recomendada
- Botões rápidos para Gigs, Loja, Perfil

### 3️⃣ **Logging de Atividades**
Navegue até os componentes de logging (ex: parte de Gigs):
- **Log Treino**: Escolher tipo (força, cardio, funcional, yoga) + duração + intensidade
  - Gera XP e afeta RAM/HARDWARE
- **Log Refeição**: Tipo de refeição + calorias
  - Afeta HARDWARE/COOL
- **Log Estudo**: Horas + nível foco
  - Afeta RAM/HARDWARE
- **Log Água**: Copos de água
  - Afeta COOL/HARDWARE

### 4️⃣ **Gigs & Bounties**
- **Gigs**: Tarefas diárias que dão XP/GOLD
  - Clicar "Completar" marca como feita (só uma vez por dia)
- **Bounties**: Chefes com HP em dinheiro
  - Pagar valor decresce HP
  - Ao atingir 0, bounty derrotada

### 5️⃣ **Loja**
- Listar rewards por categoria (leisure, food, travel, other)
- Desconto baseado no login streak (até 50%)
- Clicar "Comprar" para adquirir com gold
- Validação de gold suficiente
- Reward adicionada ao inventário

### 6️⃣ **Perfil**
- Ver classe com stats (7 atributos em bars)
- Inventário de rewards compradas
- Estatísticas gerais (XP, GOLD, GIGS completadas, STREAK)
- Botão para resetar jogo

## Testes Unitários

```bash
# Rodar suite de testes (pode falhar por issues de transform)
npx vitest

# Rodar um teste específico (funciona)
npx vitest tests/server/shop.test.ts
npx vitest tests/components/shop.test.tsx
npx vitest tests/use-game-state.purchase.test.ts
npx vitest tests/triage.refactor.test.tsx
```

### Testes Funcionais Confirmados ✅
- ✅ Shop list API
- ✅ Purchase mutation com mock DB
- ✅ UI click para compra
- ✅ Triage navigation e validação
- ✅ Client purchase logic com fallback

## Dados Iniciais

Ao criar novo jogo:
- **Character**: Nome customizado, classe por biometria, level 1
- **BioMonitor**: RAM/HARDWARE/COOL = 50% cada
- **Gold**: 100 inicial
- **Gigs**: 5 gigs pré-configuradas (Daily Workout, Study Session, etc.)
- **Bounties**: 2 bounties (Boss-level challenges)
- **Rewards**: Pizza, Movie Ticket, Book, etc. por categoria

## Configuração Avançada

### AsyncStorage (Persistência)
Dados salvos em AsyncStorage (emulador/dispositivo):
- `habittus_game_state` - Estado do jogo (stats, inventory, etc.)
- `habittus_user_profile` - Perfil do usuário (classe, biometria, etc.)

### Decay Automático
Se a app não for aberta por N dias:
- Stats decaem 10% por dia
- Ao abrir novamente, decay é aplicado automaticamente
- Avisos aparecem se stats < 30 ou bio-monitor crítico

## Troubleshooting

### "Text strings must be rendered within a <Text> component"
✅ Já corrigido! Gender buttons usam Pressable + ThemedText

### "props.pointerEvents is deprecated"
✅ Já corrigido! ThemedView move pointerEvents para style on web

### Testes com "Unexpected token 'typeof'"
⚠️ Problemas de transform/import no test environment (não bloqueador)
Workaround: Rodar testes específicos que funcionam

## Próximas Iterações

- [ ] Sincronizar gameState com backend
- [ ] Push notifications diárias
- [ ] Leaderboards
- [ ] Clans/Social features
- [ ] Advanced shop (NFTs, cosmetics)
- [ ] Analytics da jornada de saúde

---

**Data:** 22 de dezembro de 2025  
**Versão:** 0.2.0 (Épicos: Triage, Tracking, Status, Shop)

---

# 🧪 Session 5 - Novas Features para Testar

## 📱 Phase 6 - BioMonitor Melhorado
**Rota:** `/` (Home Tab)
- [ ] 4 barras (RAM, Hardware, Cool, Credits)
- [ ] Cores dinâmicas (red < 20%, yellow 20-50%, green 50-80%, cyan > 80%)
- [ ] Tooltips com "?" funcionam
- [ ] Class Warnings Panel aparece quando stats críticos

## 🎵 Phase 7 - Jukebox  
**Rota:** `/(tabs)/music` (Nova tab!)
- [ ] Playlist com 4 faixas
- [ ] Play/Pause/Next/Previous funcionam
- [ ] Gêneros exibem com cores (cyberpunk, synthwave, chillwave, focus)

## 📊 Epic: Rastreamento
**Rota:** `/(tabs)/tracking` (Nova tab!)
- [ ] Task Manager: adicionar/completar/deletar tarefas
- [ ] Finance Tracker: renda/gastos/saldo
- [ ] Log Nutrition (existente): calorias vs meta
- [ ] Log Study (existente): sessões de estudo
