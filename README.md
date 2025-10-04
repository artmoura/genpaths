# 🚀 Path Generator

Um gerador automático de estruturas de arquivos e paths para projetos JavaScript/TypeScript. Crie rapidamente features completas com entities, repositories, interfaces, hooks e enums organizados de forma padronizada.

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
- ✅ **Suporte a múltiplos idiomas** (Português e Inglês)
- ✅ Templates personalizáveis
- ✅ Configuração flexível via arquivo `.genpaths.json`
- ✅ **Arquivos index.{ts/js} automáticos** em cada pasta de tipo
- ✅ **Pasta base configurável** (src, lib, ou nenhuma)
- ✅ Geração seletiva de tipos de arquivo
- ✅ Suporte a paths aninhados
- ✅ Modo interativo intuitivo
- ✅ CLI amigável com cores e emojis

## 🚀 Uso Rápido

## 🚀 Uso Rápido

### Gerar uma feature completa

```bash
npx genpaths create User
```

Isso criará a seguinte estrutura:
```
src/
  features/
    User/
      entities/
        User.entity.ts
        index.ts
      repositories/
        User.repository.ts
        index.ts
      interfaces/
        User.interface.ts
        index.ts
      hooks/
        User.hook.ts
        index.ts
      enums/
        User.enum.ts
        index.ts
```

### Gerar apenas tipos específicos
```bash
# Apenas entities e repositories
npx genpaths create Product --types entities,repositories

# Apenas hooks
npx genpaths create useAuth --types hooks

# Todos exceto enums
npx genpaths create Order --except enums
```

### Customizar localização

```bash
# Gerar em pasta base diferente
npx genpaths create shared/helpers --base-dir src/utils

# Gerar em pasta de saída diferente
npx genpaths create User --output-dir modules
```

### Especificar linguagem

```bash
# Forçar JavaScript
npx genpaths create Auth --js

# Forçar TypeScript
npx genpaths create Auth --ts
```

### Paths aninhados

```bash
# Cria em features/auth/Login/
npx genpaths create auth/Login
```

### Gerar apenas tipos específicos
```bash
# Apenas entities e interfaces
npx genpaths Product --only entities,interfaces

# Todos exceto enums
npx genpaths Order --except enums
````

### Especificar linguagem

```bash
npx genpaths create Auth --js

# Forçar TypeScript
npx genpaths create Auth --ts
```

### Paths aninhados

```bash
# Cria em features/auth/Login/
npx genpaths create auth/Login
```

## 📋 Comandos Disponíveis

### Gerar Feature

```bash
npx genpaths create <nome> [opções]
```

### Comandos Utilitários

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

| Opção                | Descrição                                    | Exemplo                              |
| -------------------- | -------------------------------------------- | ------------------------------------ |
| `--types <tipos>`    | Tipos a gerar                                | `--types entities,repositories`      |
| `--except <tipos>`   | Gera todos exceto os especificados           | `--except enums`                     |
| `--base-dir <pasta>` | Pasta base do projeto (sobrescreve config)   | `--base-dir src/utils`               |
| `--output-dir <pasta>`| Pasta de saída (sobrescreve config)         | `--output-dir modules`               |
| `--js`               | Força geração em JavaScript                  | `--js`                               |
| `--ts`               | Força geração em TypeScript                  | `--ts`                               |
| `--locale, -l`       | Define o idioma (pt-BR ou en)                | `--locale en`                        |
| `--interactive, -i`  | Força modo interativo                        | `-i`                                 |
| `--help, -h`         | Mostra ajuda                                 | `--help`                             |

### 🌍 Localização (i18n)

O genpaths suporta múltiplos idiomas para tornar a ferramenta mais acessível!

#### Idiomas Disponíveis

- 🇧🇷 **Português (pt-BR)** - Idioma padrão
- 🇺🇸 **Inglês (en)**

#### Como Usar

```bash
# Durante o init, escolha seu idioma preferido
npx genpaths init

# Ou defina diretamente via linha de comando
npx genpaths --locale en
npx genpaths User --locale pt-BR

# O idioma é salvo no .genpaths.json para uso futuro
```

#### Exemplos de Uso

**🇧🇷 Em Português:**
```bash
$ npx genpaths User

🏗️  Gerando feature "User" em typescript...
✨ Feature criada com sucesso!
```

**🇺🇸 In English:**
```bash
$ npx genpaths User --locale en

🏗️  Generating feature "User" in typescript...
✨ Feature created successfully!
```

#### Contribuindo com Traduções

Quer adicionar um novo idioma? É fácil!

1. Crie um arquivo `src/locales/[codigo].json` (ex: `es.json` para espanhol)
2. Copie a estrutura de `en.json` ou `pt-BR.json`
3. Traduza todas as strings
4. Adicione o idioma em `src/locales/index.js`
5. Atualize o prompt em `src/prompts.js`
6. Abra um Pull Request! 🎉

## 🔧 Configuração

### Arquivo `.genpaths.json`

Crie um arquivo `.genpaths.json` na raiz do seu projeto para personalizar as configurações.

#### Configuração Padrão (TypeScript + src/)

Este é o padrão criado pelo comando `genpaths init`:

```json
{
  "language": "typescript",
  "locale": "pt-BR",
  "baseDir": "src",
  "outputDir": "features",
  "defaultTypes": [
    "entities",
    "hooks",
    "repositories",
    "interfaces",
    "enums"
  ]
}
```

#### Exemplos de Configurações

**JavaScript sem pasta base (Inglês):**
```json
{
  "language": "javascript",
  "locale": "en",
  "baseDir": "",
  "outputDir": "features",
  "defaultTypes": ["entities", "repositories"]
}
```

**TypeScript com pasta lib:**
```json
{
  "language": "typescript",
  "locale": "pt-BR",
  "baseDir": "lib",
  "outputDir": "modules",
  "defaultTypes": ["entities", "interfaces", "hooks"]
}
```

**Projeto minimalista:**
```json
{
  "language": "javascript",
  "locale": "en",
  "baseDir": "",
  "outputDir": "components",
  "defaultTypes": ["entities"]
}
```

#### Opções de Configuração

| Opção | Descrição | Exemplo | Padrão |
|-------|-----------|---------|--------|
| `language` | Linguagem do projeto | `"typescript"` ou `"javascript"` | `"typescript"` |
| `locale` | Idioma da interface | `"pt-BR"` ou `"en"` | `"pt-BR"` |
| `baseDir` | Pasta base do projeto | `"src"`, `"lib"`, `""` (vazio para nenhuma) | `"src"` |
| `outputDir` | Pasta onde features serão criadas | `"features"`, `"modules"` | `"features"` |
| `defaultTypes` | Tipos de arquivo a serem gerados | `["entities", "hooks"]` | `["entities", "hooks", "repositories", "interfaces", "enums"]` |

### Configuração Interativa

```bash
npx genpaths init
```

Este comando guiará você através de um processo interativo para configurar:

- **Idioma preferido** (Português ou Inglês)
- Linguagem padrão (JS/TS)
- Pasta base (src, lib, ou nenhuma)
- Diretório de saída
- Tipos de arquivo padrão

### Usando o Arquivo de Exemplo

Você pode copiar o arquivo de exemplo incluído no pacote:
```bash
# Se instalado globalmente
cp $(npm root -g)/genpaths/.genpaths.json.example .genpaths.json

# Ou criar manualmente com os valores padrão
cat > .genpaths.json << 'EOF'
{
  "language": "typescript",
  "baseDir": "src",
  "outputDir": "features",
  "defaultTypes": ["entities", "hooks", "repositories", "interfaces", "enums"]
}
EOF
```

## 🎨 Arquivos Index Automáticos

Cada pasta de tipo gera automaticamente um arquivo `index.{ts/js}` que exporta o arquivo da feature:

```typescript
// src/features/User/entities/index.ts
export * from './User.entity';

// src/features/User/hooks/index.ts
export * from './User.hook';
```

Isso permite importações mais limpas:
```typescript
// Ao invés de:
import { Userentity } from './features/User/entities/User.entity';

// Você pode usar:
import { Userentity } from './features/User/entities';
```

## 📁 Tipos de Arquivo Suportados

| Tipo           | Descrição                  | Arquivo Gerado             |
| -------------- | -------------------------- | -------------------------- |
| `entities`       | Classes de entityo/entidade | `Feature.entity.js/ts`      |
| `repositories` | Camada de acesso a dados   | `Feature.repository.js/ts` |
| `interfaces`   | Interfaces TypeScript      | `Feature.interface.ts`     |
| `hooks`        | Custom hooks (React/Vue)   | `Feature.hook.js/ts`       |
| `enums`        | Enumerações                | `Feature.enum.js/ts`       |

## 🎨 Templates Personalizados

### Copiar Templates Padrão

```bash
npx genpaths defaults
```

Isso copiará os templates padrão para `./generator/templates/` permitindo personalização.

### Estrutura de Templates

```
generator/
  templates/
    entities/
      {feature}.entity.js
      {feature}.entity.ts
      index.js
      index.ts
    repositories/
      {feature}.repository.js
      {feature}.repository.ts
      index.js
      index.ts
    interfaces/
      {feature}.interface.ts
      {feature}.interface.js
      index.js
      index.ts
    hooks/
      {feature}.hook.js
      {feature}.hook.ts
      index.js
      index.ts
    enums/
      {feature}.enum.js
      {feature}.enum.ts
      index.js
      index.ts
```

### Variáveis Disponíveis nos Templates

- `{{feature}}` - Nome da feature (capitalizado)
- `{{featureLower}}` - Nome da feature (minúsculo)

### Criar Tipos Customizados

Você pode criar seus próprios tipos além dos padrões (entities, hooks, repositories, interfaces, enums):

#### Passo 1: Criar a estrutura de templates

```bash
# Criar pasta para o novo tipo
mkdir -p generator/templates/services

# Criar template do arquivo principal
cat > generator/templates/services/{feature}.service.ts << 'EOF'
// Service for {{feature}}
export class {{feature}}Service {
  constructor() {
    // Initialize service
  }

  async find{{feature}}ById(id: string) {
    // Implementation
  }
}
EOF

# Criar template do index
cat > generator/templates/services/index.ts << 'EOF'
export * from './{{feature}}.service';
EOF
```

#### Passo 2: Adicionar ao arquivo de configuração

Edite `.genpaths.json` e adicione seu tipo customizado:

```json
{
  "language": "typescript",
  "baseDir": "src",
  "outputDir": "features",
  "defaultTypes": [
    "entities",
    "hooks",
    "repositories",
    "interfaces",
    "enums",
    "services"
  ]
}
```

#### Passo 3: Usar o tipo customizado

```bash
# Gerar feature com o novo tipo
npx genpaths User

# Ou apenas o tipo customizado
npx genpaths User --only services
```

Isso criará:
```
src/
  features/
    User/
      services/
        User.service.ts
        index.ts
```

### Regras para Tipos Customizados

1. **Nome da pasta**: Use o nome do tipo no plural (ex: `services`, `controllers`, `validators`)
2. **Nome do arquivo**: O sistema remove o 's' final automaticamente (ex: `services` → `service`)
   - Se o tipo não termina com 's', mantém o nome (ex: `dto` → `dto`)
3. **Template principal**: `{feature}.TIPO.extensao` (ex: `{feature}.service.ts`)
4. **Template index**: `index.extensao` (ex: `index.ts`)
5. **Placeholder**: Use `{{feature}}` para o nome capitalizado da feature

### Exemplos de Tipos Customizados

#### Controllers
```typescript
// generator/templates/controllers/{feature}.controller.ts
export class {{feature}}Controller {
  async handle(req, res) {
    // Implementation
  }
}
```

#### DTOs
```typescript
// generator/templates/dtos/{feature}.dto.ts
export interface {{feature}}DTO {
  id: string;
  // Add properties
}
```

#### Validators
```typescript
// generator/templates/validators/{feature}.validator.ts
export class {{feature}}Validator {
  validate(data: any): boolean {
    // Validation logic
    return true;
  }
}
```

## 📝 Exemplos Práticos

### E-commerce

```bash
# Estrutura de produto
npx genpaths Product --only entities,interfaces,repositories

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
npx genpaths api users --only entities,repositories
npx genpaths api posts --only entities,repositories
npx genpaths api comments --only entities,repositories
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

Contribuições são bem-vindas! Aqui estão algumas formas de ajudar:

### 🌍 Adicionar Traduções

Quer adicionar um novo idioma?

1. Crie `src/locales/[codigo].json` (ex: `es.json`)
2. Copie e traduza a estrutura de `en.json` ou `pt-BR.json`
3. Adicione o código em `src/locales/index.js`
4. Atualize `src/prompts.js` com a nova opção

### 💻 Código

1. Fork o projeto [GitHub](https://github.com/artmoura/genpaths)
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

## 📚 Documentação Adicional

- 📖 [EXAMPLES.md](EXAMPLES.md) - Exemplos práticos detalhados de uso
- 🔧 [CUSTOM_TYPES.md](CUSTOM_TYPES.md) - Como criar tipos customizados
- 📝 [CHANGELOG.md](CHANGELOG.md) - Histórico de versões e mudanças

## 🆘 Suporte

- 🐛 **Issues**: [GitHub Issues](https://github.com/artmoura/genpaths/issues)

## 🎉 Agradecimentos

Obrigado a todos os contribuidores que ajudaram a tornar este projeto possível!

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no GitHub!**
