# 🚀 Path Generator

Um gerador automático de estruturas de arquivos e paths para projetos JavaScript/TypeScript. Crie rapidamente features completas com models, repositories, interfaces, hooks e enums organizados de forma padronizada.

## � Instalação

### Via NPX (Recomendado)
```bash
npx path-generator
```

### Instalação Global
```bash
npm install -g path-generator
```

## 🎯 Características

- ✅ Suporte para **JavaScript** e **TypeScript**
- ✅ Templates personalizáveis
- ✅ Configuração flexível via arquivo `.path-generator.json`
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
```

### Gerar apenas tipos específicos
```bash
# Apenas models e interfaces
npx path-generator Product --only models,interfaces

# Todos exceto enums
npx path-generator Order --except enums
```

### Especificar linguagem
```bash
# Forçar JavaScript
npx path-generator Auth --js

# Forçar TypeScript
npx path-generator Auth --ts
```

### Paths aninhados
```bash
# Cria em features/auth/Login/
npx path-generator auth Login
```

## 📋 Comandos Disponíveis

### Gerar Feature
```bash
npx path-generator <nome-da-feature> [opções]
npx path-generator <path> <nome-da-feature> [opções]
```

### Comandos Especiais
```bash
# Configurar projeto interativamente
npx path-generator init

# Copiar templates padrão para personalização
npx path-generator defaults

# Mostrar configuração atual
npx path-generator config

# Mostrar ajuda
npx path-generator --help
```

## ⚙️ Opções de CLI

| Opção | Descrição | Exemplo |
|-------|-----------|---------|
| `--only <tipos>` | Gera apenas os tipos especificados | `--only models,interfaces` |
| `--except <tipos>` | Gera todos exceto os especificados | `--except enums` |
| `--js` | Força geração em JavaScript | `--js` |
| `--ts` | Força geração em TypeScript | `--ts` |
| `--interactive, -i` | Força modo interativo | `-i` |
| `--help, -h` | Mostra ajuda | `--help` |

## 🔧 Configuração

### Arquivo `.path-generator.json`

Crie um arquivo `.path-generator.json` na raiz do seu projeto para personalizar as configurações:

```json
{
  "language": "typescript",
  "outputDir": "src/features",
  "defaultTypes": ["models", "repositories", "interfaces", "hooks"]
}
```

### Configuração Interativa
```bash
npx path-generator init
```

Este comando guiará você através de um processo interativo para configurar:
- Linguagem padrão (JS/TS)
- Diretório de saída
- Tipos de arquivo padrão

## 📁 Tipos de Arquivo Suportados

| Tipo | Descrição | Arquivo Gerado |
|------|-----------|----------------|
| `models` | Classes de modelo/entidade | `Feature.model.js/ts` |
| `repositories` | Camada de acesso a dados | `Feature.repository.js/ts` |
| `interfaces` | Interfaces TypeScript | `Feature.interface.ts` |
| `hooks` | Custom hooks (React/Vue) | `Feature.hook.js/ts` |
| `enums` | Enumerações | `Feature.enum.js/ts` |

## 🎨 Templates Personalizados

### Copiar Templates Padrão
```bash
npx path-generator defaults
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
npx path-generator Product --only models,interfaces,repositories

# Carrinho de compras
npx path-generator shopping Cart

# Sistema de pagamento
npx path-generator payment PaymentMethod --except hooks
```

### Autenticação
```bash
# Módulo de usuário completo
npx path-generator auth User

# Apenas interfaces de auth
npx path-generator auth Login --only interfaces
```

### API REST
```bash
# Para cada endpoint
npx path-generator api users --only models,repositories
npx path-generator api posts --only models,repositories
npx path-generator api comments --only models,repositories
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
cd path-generator

# Instalar dependências
npm install

# Testar localmente
npm link
path-generator --help
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

## � Suporte

- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/path-generator/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/seu-usuario/path-generator/discussions)
- 📖 **Documentação**: Este README

## 🎉 Agradecimentos

Obrigado a todos os contribuidores que ajudaram a tornar este projeto possível!

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no GitHub!**
