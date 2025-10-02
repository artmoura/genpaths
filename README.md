# 🚀 Path Generator

Um gerador automático de estruturas de arquivos e paths para projetos JavaScript/TypeScript. Crie rapidamente features completas com models, repositories, interfaces, hooks e enums organizados de forma padronizada.

## � Instalação

### Via NPX (Recomendado)

```bash
npx genpaths
```

### Instalação Global

```bash
npm install -g genpaths
```

## 🎯 Características

- ✅ Suporte para **JavaScript** e **TypeScript**
- ✅ Templates personalizáveis
- ✅ Configuração flexível via arquivo `.genpaths.json`
- ✅ Geração seletiva de tipos de arquivo
- ✅ Suporte a paths aninhados
- ✅ Modo interativo intuitivo
- ✅ CLI amigável com cores e emojis

## 🚀 Uso Rápido

### Gerar uma feature completa

```

Isso criará a seguinte estrutura:
```

features/
User/
models/
User.model.ts
repositories/
User.repository.ts
interfaces/
User.interface.ts
hooks/
User.hook.ts
enums/
User.enum.ts

````

### Gerar apenas tipos específicos
```bash
# Apenas models e interfaces
npx genpaths Product --only models,interfaces

# Todos exceto enums
npx genpaths Order --except enums
````

### Especificar linguagem

```bash
# Forçar JavaScript
npx genpaths Auth --js

# Forçar TypeScript
npx genpaths Auth --ts
```

### Paths aninhados

```bash
# Cria em features/auth/Login/
npx genpaths auth Login
```

## 📋 Comandos Disponíveis

### Gerar Feature

```bash
npx genpaths <nome-da-feature> [opções]
npx genpaths <path> <nome-da-feature> [opções]
```

### Comandos Especiais

```bash
# Configurar projeto interativamente
npx genpaths init

# Copiar templates padrão para personalização
npx genpaths defaults

# Mostrar configuração atual
npx genpaths config

# Mostrar ajuda
npx genpaths --help
```

## ⚙️ Opções de CLI

| Opção               | Descrição                          | Exemplo                    |
| ------------------- | ---------------------------------- | -------------------------- |
| `--only <tipos>`    | Gera apenas os tipos especificados | `--only models,interfaces` |
| `--except <tipos>`  | Gera todos exceto os especificados | `--except enums`           |
| `--js`              | Força geração em JavaScript        | `--js`                     |
| `--ts`              | Força geração em TypeScript        | `--ts`                     |
| `--interactive, -i` | Força modo interativo              | `-i`                       |
| `--help, -h`        | Mostra ajuda                       | `--help`                   |

## 🔧 Configuração

### Arquivo `.genpaths.json`

Crie um arquivo `.genpaths.json` na raiz do seu projeto para personalizar as configurações:

```json
{
  "language": "typescript",
  "outputDir": "src/features",
  "defaultTypes": ["models", "repositories", "interfaces", "hooks"]
}
```

### Configuração Interativa

```bash
npx genpaths init
```

Este comando guiará você através de um processo interativo para configurar:

- Linguagem padrão (JS/TS)
- Diretório de saída
- Tipos de arquivo padrão

## 📁 Tipos de Arquivo Suportados

| Tipo           | Descrição                  | Arquivo Gerado             |
| -------------- | -------------------------- | -------------------------- |
| `models`       | Classes de modelo/entidade | `Feature.model.js/ts`      |
| `repositories` | Camada de acesso a dados   | `Feature.repository.js/ts` |
| `interfaces`   | Interfaces TypeScript      | `Feature.interface.ts`     |
| `hooks`        | Custom hooks (React/Vue)   | `Feature.hook.js/ts`       |
| `enums`        | Enumerações                | `Feature.enum.js/ts`       |

## 🎨 Templates Personalizados

### Copiar Templates Padrão

```bash
npx genpaths defaults
```

Isso copiará os templates padrão para `./templates/` permitindo personalização.

### Estrutura de Templates

```
templates/
  models/
    {feature}.model.js
    {feature}.model.ts
  repositories/
    {feature}.repository.js
    {feature}.repository.ts
  interfaces/
    {feature}.interface.ts
  hooks/
    {feature}.hook.js
    {feature}.hook.ts
  enums/
    {feature}.enum.js
    {feature}.enum.ts
```

### Variáveis Disponíveis nos Templates

- `{{feature}}` - Nome da feature (capitalizado)
- `{{featureLower}}` - Nome da feature (minúsculo)

## 📝 Exemplos Práticos

### E-commerce

```bash
# Estrutura de produto
npx genpaths Product --only models,interfaces,repositories

# Carrinho de compras
npx genpaths shopping Cart

# Sistema de pagamento
npx genpaths payment PaymentMethod --except hooks
```

### Autenticação

```bash
# Módulo de usuário completo
npx genpaths auth User

# Apenas interfaces de auth
npx genpaths auth Login --only interfaces
```

### API REST

```bash
# Para cada endpoint
npx genpaths api users --only models,repositories
npx genpaths api posts --only models,repositories
npx genpaths api comments --only models,repositories
```

## 🛠️ Desenvolvimento

### Requisitos

- Node.js >= 14.0.0

### Dependências

- `chalk` - Cores no terminal
- `inquirer` - Prompts interativos

### Scripts de Desenvolvimento

```bash
# Clonar repositório
git clone <repository-url>
cd genpaths

# Instalar dependências
npm install

# Testar localmente
npm link
genpaths --help
```

## 🤝 Contribuindo

1. Fork o projeto [GitHub](https://github.com/artmoura/genpaths)
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

## � Suporte

- 🐛 **Issues**: [GitHub Issues](https://github.com/artmoura/genpaths/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/artmoura/genpaths/discussions)
- 📖 **Documentação**: Este README

## 🎉 Agradecimentos

Obrigado a todos os contribuidores que ajudaram a tornar este projeto possível!

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no GitHub!**
