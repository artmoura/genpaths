# 🚀 Path Generator

Um gerador automático de estruturas de arquivos e paths para projetos JavaScript/TypeScript. Crie rapidamente features completas com models, repositories, interfaces, hooks e enums organizados de forma padronizada.

## � Instalação

### Via NPX (Recomendado)
```bash
npx genpath
```

### Instalação Global
```bash
npm install -g genpath
```

## 🎯 Características

- ✅ Suporte para **JavaScript** e **TypeScript**
- ✅ Templates personalizáveis
- ✅ Configuração flexível via arquivo `.genpath.json`
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
npx genpath Product --only models,interfaces

# Todos exceto enums
npx genpath Order --except enums
```

### Especificar linguagem
```bash
# Forçar JavaScript
npx genpath Auth --js

# Forçar TypeScript
npx genpath Auth --ts
```

### Paths aninhados
```bash
# Cria em features/auth/Login/
npx genpath auth Login
```

## 📋 Comandos Disponíveis

### Gerar Feature
```bash
npx genpath <nome-da-feature> [opções]
npx genpath <path> <nome-da-feature> [opções]
```

### Comandos Especiais
```bash
# Configurar projeto interativamente
npx genpath init

# Copiar templates padrão para personalização
npx genpath defaults

# Mostrar configuração atual
npx genpath config

# Mostrar ajuda
npx genpath --help
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

### Arquivo `.genpath.json`

Crie um arquivo `.genpath.json` na raiz do seu projeto para personalizar as configurações:

```json
{
  "language": "typescript",
  "outputDir": "src/features",
  "defaultTypes": ["models", "repositories", "interfaces", "hooks"]
}
```

### Configuração Interativa
```bash
npx genpath init
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
npx genpath defaults
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
npx genpath Product --only models,interfaces,repositories

# Carrinho de compras
npx genpath shopping Cart

# Sistema de pagamento
npx genpath payment PaymentMethod --except hooks
```

### Autenticação
```bash
# Módulo de usuário completo
npx genpath auth User

# Apenas interfaces de auth
npx genpath auth Login --only interfaces
```

### API REST
```bash
# Para cada endpoint
npx genpath api users --only models,repositories
npx genpath api posts --only models,repositories
npx genpath api comments --only models,repositories
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
cd genpath

# Instalar dependências
npm install

# Testar localmente
npm link
genpath --help
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

## � Suporte

- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/genpath/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/seu-usuario/genpath/discussions)
- 📖 **Documentação**: Este README

## 🎉 Agradecimentos

Obrigado a todos os contribuidores que ajudaram a tornar este projeto possível!

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no GitHub!**
