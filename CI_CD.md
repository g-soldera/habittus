# CI/CD - Habittus

## Visão Geral

O projeto Habittus utiliza **GitHub Actions** para automatizar o build e release do APK. O workflow é disparado automaticamente ao fazer push para a branch `main`.

## Fluxo de Trabalho

```
develop branch → Push/Commit → GitHub Actions Workflow
                                       ↓
                            Build APK (Debug + Release)
                                       ↓
                            Create Release with APKs
                                       ↓
                            Available for Download
```

## Branches

- **main**: Produção. Dispara build automaticamente
- **develop**: Desenvolvimento. Merge para main dispara release

## GitHub Actions Workflow

### Arquivo: `.github/workflows/build-apk.yml`

**Triggers:**
- Push para `main`
- Pull Request para `main`
- Manual trigger (workflow_dispatch)

**Steps:**
1. Checkout do código
2. Setup Node.js (v22)
3. Setup pnpm
4. Setup Java (v17)
5. Setup Android SDK
6. Install dependencies
7. Prebuild Android
8. Build APK (Debug)
9. Build APK (Release)
10. Upload artifacts
11. Create GitHub Release (apenas em push para main)
12. Comment on PR (apenas em PRs)

## Como Usar

### Fazer Deploy de Nova Versão

1. **Fazer commit na branch develop:**
   ```bash
   git checkout develop
   git add .
   git commit -m "Feature: Add new feature"
   git push origin develop
   ```

2. **Criar Pull Request para main:**
   ```bash
   # No GitHub, crie um PR de develop para main
   ```

3. **Merge para main:**
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

4. **Workflow dispara automaticamente:**
   - Acesse: https://github.com/g-soldera/habittus/actions
   - Acompanhe o build em tempo real

5. **Release criada automaticamente:**
   - Acesse: https://github.com/g-soldera/habittus/releases
   - Download do APK disponível

### Disparar Build Manual

1. Acesse: https://github.com/g-soldera/habittus/actions
2. Clique em "Build and Release APK"
3. Clique em "Run workflow"
4. Selecione a branch (main ou develop)
5. Clique em "Run workflow"

## Artifacts

Após o build, os seguintes arquivos estão disponíveis:

- **app-debug.apk**: Build de debug para testes
- **app-release.apk**: Build de release (se compilado com sucesso)

## Releases

As releases são criadas automaticamente com:
- Tag: `v{build_number}`
- APKs anexados
- Instruções de instalação
- Link para Expo Go

Acesse: https://github.com/g-soldera/habittus/releases

## Troubleshooting

### Build falha com erro de Java
- Verifique se Java 17 está instalado
- O workflow instala automaticamente, mas pode haver cache issues

### Build falha com erro de Android SDK
- O workflow instala automaticamente via `android-actions/setup-android`
- Limpe o cache do workflow se persistir

### APK não gerado
- Verifique os logs do workflow
- Pode ser necessário aumentar a memória do Gradle
- Tente disparar manualmente com `workflow_dispatch`

## Próximas Melhorias

- [ ] Assinar APK com chave privada
- [ ] Testar APK automaticamente com Espresso
- [ ] Fazer upload para Google Play Store
- [ ] Notificar Slack/Discord ao completar build
- [ ] Gerar changelog automático
