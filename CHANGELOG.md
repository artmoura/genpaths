# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.4.0] - 2024

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

## [1.3.0] - 2024

### ✨ Adicionado

- Suporte a pasta base configurável (`baseDir`)
- Comando `genpaths config` para ver configuração atual
- Modo interativo melhorado
- Templates personalizáveis via `generator/templates/`

### 🔧 Melhorado

- Estrutura de configuração mais flexível
- Melhor organização de arquivos gerados
- Suporte a projetos sem pasta base

## [1.2.0] - 2024

### ✨ Adicionado

- Arquivos index automáticos para cada tipo
- Suporte a paths aninhados
- Opções `--only` e `--except` para geração seletiva

### 🔧 Melhorado

- Performance na geração de arquivos
- Validação de tipos fornecidos

## [1.1.0] - 2024

### ✨ Adicionado

- Comando `genpaths init` para configuração interativa
- Comando `genpaths defaults` para copiar templates
- Suporte a TypeScript e JavaScript

### 🔧 Melhorado

- Interface CLI mais amigável
- Melhor tratamento de erros

## [1.0.0] - 2024

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
