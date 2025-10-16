# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [3.0.0] - 2025-10-16

### 🚀 BREAKING CHANGES

- **Nova estrutura de organização**: Arquivos agora são gerados em pastas separadas por tipo (`src/entities/`, `src/repositories/`, etc.) ao invés de pastas por feature
- **Nomenclatura de arquivos**: Arquivos agora usam lowercase com sufixos (ex: `user.entity.ts` ao invés de `UserEntity.ts`)
- **Configuração de templates**: Nova estrutura no `.genpaths.json` com propriedades `folder`, `suffix`, `template` para cada tipo
- **Templates renomeados**: Formato mudou de `entity.template.ts` para `entity.ts.template`

### ✨ Adicionado

- **Comando `genpaths init`**: Inicializa projeto interativamente com templates e configuração
- **Suporte a React**: Templates para components (`.tsx`/`.jsx`) e hooks
- **Template de Enum**: Novo template para enumerações
- **Seleção de Framework**: Escolha entre "Nenhum" ou "React" durante o init
- **Auto-geração de index.ts**: Cria e atualiza automaticamente arquivos index.ts em cada pasta de tipo
- **Configuração avançada de templates**: Cada tipo pode ter folder, suffix e template customizados
- Função `initProject()` que configura projeto completo automaticamente
- Função `promptForFramework()` para seleção de framework

### 🔧 Melhorado

- **Organização mais limpa**: Estrutura folder-based facilita navegação e manutenção
- **Nomenclatura consistente**: Lowercase com sufixos segue convenções modernas
- **Melhor separação de conceitos**: Cada tipo de arquivo em sua própria pasta
- **Templates mais flexíveis**: Sistema de configuração mais poderoso
- **Melhor DX**: Setup inicial mais rápido com comando init

### 📝 Documentação

- Adicionado `IMPLEMENTATION.md` com detalhes da implementação
- Adicionado `INIT-TEST.md` com guia de testes
- README atualizado com seção sobre comando init
- Exemplos atualizados para nova estrutura

### 🎨 Templates Novos

- `enum.ts.template` / `enum.js.template`
- `component.tsx.template` / `component.jsx.template`
- `hook.ts.template` / `hook.js.template`

### 🌍 Traduções

- Adicionadas traduções para framework prompt (pt-BR e en)
- Adicionadas mensagens de inicialização de projeto

## [1.4.0] - 2025

### ✨ Adicionado

- **Suporte a tipos customizados**: Agora você pode criar qualquer tipo de arquivo além dos padrões (entities, hooks, repositories, interfaces, enums)
- Novo guia completo de tipos customizados (`CUSTOM_TYPES.md`)
- Mensagens de erro mais informativas quando templates não são encontrados
- Suporte inteligente para nomenclatura de tipos:
  - Tipos no plural (ex: `services`) automaticamente convertem para singular no nome do arquivo (ex: `service`)
  - Tipos sem plural (ex: `dto`) mantém o nome original

### 🔧 Melhorado

- Documentação expandida no README com exemplos de tipos customizados
- Exemplos práticos adicionados em `EXAMPLES.md`
- Lógica de resolução de templates mais robusta com fallbacks
- Melhor validação e mensagens de erro

### 📚 Documentação

- Adicionado guia completo de tipos customizados
- Expandidos exemplos práticos de uso
- Adicionada seção sobre regras e convenções
- Incluído troubleshooting para problemas comuns

## [1.3.0] - 2025

### ✨ Adicionado

- Suporte a pasta base configurável (`baseDir`)
- Comando `genpaths config` para ver configuração atual
- Modo interativo melhorado
- Templates personalizáveis via `generator/templates/`

### 🔧 Melhorado

- Estrutura de configuração mais flexível
- Melhor organização de arquivos gerados
- Suporte a projetos sem pasta base

## [1.2.0] - 2025

### ✨ Adicionado

- Arquivos index automáticos para cada tipo
- Suporte a paths aninhados
- Opções `--only` e `--except` para geração seletiva

### 🔧 Melhorado

- Performance na geração de arquivos
- Validação de tipos fornecidos

## [1.1.0] - 2025

### ✨ Adicionado

- Comando `genpaths init` para configuração interativa
- Comando `genpaths defaults` para copiar templates
- Suporte a TypeScript e JavaScript

### 🔧 Melhorado

- Interface CLI mais amigável
- Melhor tratamento de erros

## [1.0.0] - 2025

### ✨ Adicionado

- Primeira versão pública
- Geração básica de features
- Tipos padrão: entities, hooks, repositories, interfaces, enums
- Configuração via `.genpaths.json`
- Suporte a templates customizados

---

[1.4.0]: https://github.com/artmoura/genpaths/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/artmoura/genpaths/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/artmoura/genpaths/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/artmoura/genpaths/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/artmoura/genpaths/releases/tag/v1.0.0
