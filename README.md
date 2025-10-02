# Path Generator

Gerador automático de paths e estruturas de arquivos para projetos TypeScript e JavaScript.

## 🚀 Instalação

```bash
# Via npx (recomendado)
npx path-generator User

# Ou instalar globalmente
npm install -g path-generator
```

## 🤖 Modo Interativo (Recomendado)

Para iniciantes ou configuração de projeto:

```bash
# Primeira execução ou configuração
npx path-generator --interactive
# ou
npx path-generator init

# Força modo interativo
npx path-generator -i
```

O modo interativo oferece:
- ✅ Configuração guiada do projeto
- ✅ Seleção visual de tipos de arquivo
- ✅ Validação de entrada em tempo real
- ✅ Persistência de configurações
- ✅ Interface amigável para iniciantes

## ⚡ Uso Rápido

### Gerar uma feature completa

```bash
npx path-generator User
```

### Escolher linguagem

```bash
# JavaScript
npx path-generator User --js

# TypeScript (padrão)
npx path-generator User --ts
```

### Gerar apenas alguns tipos

```bash
# Apenas models e repositories
npx path-generator User --only models,repositories

# Tudo exceto enums
npx path-generator User --except enums
```

### Features aninhadas

```bash
npx path-generator auth User
# Cria em features/auth/User/...
```

## 📁 Estruturas Geradas

### TypeScript
```
features/
├── User/
│   ├── models/User.model.ts
│   ├── repositories/User.repository.ts
│   ├── interfaces/User.interface.ts
│   ├── hooks/User.hook.ts
│   └── enums/User.enum.ts
```

### JavaScript
```
features/
├── User/
│   ├── models/User.model.js
│   ├── repositories/User.repository.js
│   ├── interfaces/User.interface.js (JSDoc)
│   ├── hooks/User.hook.js
│   └── enums/User.enum.js
```

## ⚙️ Configuração

### Ver configuração atual
```bash
npx path-generator config
```

### Arquivo de configuração
O arquivo `.path-generator.json` é criado automaticamente na raiz do projeto:

```json
{
  "language": "typescript",
  "outputDir": "features", 
  "defaultTypes": ["models", "hooks", "repositories", "interfaces", "enums"]
}
```

### Configuração manual
Você pode editar o arquivo `.path-generator.json` para:
- Alterar linguagem padrão
- Mudar diretório de saída
- Definir tipos padrão a serem gerados

## 🎨 Customizar Templates

```bash
# Copiar templates para personalização
npx path-generator defaults

# Para JavaScript
npx path-generator defaults --js

# Para TypeScript  
npx path-generator defaults --ts
```

Isso criará a pasta `generator/templates/` no seu projeto, onde você pode customizar os templates.

### Exemplo de template customizado

```typescript
// generator/templates/models/{feature}.model.ts
export class {{feature}}Model {
  id: string;
  name: string;
  createdAt: Date;

  constructor(data: Partial<{{feature}}Model>) {
    Object.assign(this, data);
  }

  // Métodos customizados...
}
```

Quando você executar `npx path-generator User`, o `{{feature}}` será substituído por `User`, gerando o arquivo `User.model.ts`.

## 📝 Formato de Arquivos

O gerador segue o padrão **`{feature}.{tipo}.{extensão}`**:

- ✅ `User.model.ts` - Model TypeScript
- ✅ `User.model.js` - Model JavaScript  
- ✅ `User.hook.ts` - Hook TypeScript
- ✅ `Product.repository.js` - Repository JavaScript
- ✅ `Order.interface.ts` - Interface TypeScript

### Templates Customizados

Os templates usam o formato `{feature}.{tipo}.{extensão}` e devem estar em:
```
generator/templates/
├── models/{feature}.model.ts
├── hooks/{feature}.hook.ts
├── repositories/{feature}.repository.ts
├── interfaces/{feature}.interface.ts
└── enums/{feature}.enum.ts
```

## 📋 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npx path-generator <nome>` | Gera feature com configurações padrão |
| `npx path-generator --interactive` | Modo interativo |
| `npx path-generator init` | Configuração inicial interativa |
| `npx path-generator config` | Mostra configuração atual |
| `npx path-generator defaults` | Copia templates para customização |

## 🔧 Opções

| Opção | Descrição |
|-------|-----------|
| `--only <tipos>` | Gera apenas os tipos especificados |
| `--except <tipos>` | Gera todos exceto os especificados |
| `--js` | Força geração JavaScript |
| `--ts` | Força geração TypeScript |
| `--interactive, -i` | Força modo interativo |
| `--help, -h` | Mostra ajuda |

## 🎯 Tipos de Arquivo Suportados

- **models**: Classes de modelo de dados
- **repositories**: Classes de repositório para acesso a dados  
- **interfaces**: Interfaces TypeScript / JSDoc
- **hooks**: Custom hooks (React/Vue)
- **enums**: Enumerações TypeScript / Objects JavaScript

## 💡 Exemplos Práticos

```bash
# Configuração inicial
npx path-generator init

# Feature simples
npx path-generator User

# Feature com tipos específicos
npx path-generator Product --only models,interfaces

# Feature JavaScript
npx path-generator Component --js

# Feature aninhada
npx path-generator auth Login

# Usando configuração personalizada
npx path-generator Button  # usa .path-generator.json

# Copiando templates para customização
npx path-generator defaults --js
```

## 🔄 Migração TypeScript ↔ JavaScript

O gerador detecta automaticamente sua preferência e persiste a configuração. Você pode alternar facilmente:

```bash
# Mudar para JavaScript
npx path-generator User --js

# Voltar para TypeScript  
npx path-generator User --ts

# Atualizar templates
npx path-generator defaults --js
```

## 🚨 Problema Resolvido

✅ **Antes**: Templates com `DefaultModel` hardcoded  
✅ **Depois**: Sistema de placeholders `{{feature}}` → `UserModel`  
✅ **Antes**: Apenas TypeScript  
✅ **Depois**: TypeScript + JavaScript  
✅ **Antes**: Configuração manual  
✅ **Depois**: Modo interativo + persistência  