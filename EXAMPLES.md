# Exemplos de Configuração .genpaths.json

## 📋 Configuração Padrão (Recomendada)

Esta é a configuração criada automaticamente pelo comando `genpaths init`:

```json
{
  "language": "typescript",
  "baseDir": "src",
  "outputDir": "features",
  "defaultTypes": [
    "models",
    "hooks",
    "repositories",
    "interfaces",
    "enums"
  ]
}
```

### Resultado:
```
src/features/User/
  ├── models/
  │   ├── User.model.ts
  │   └── index.ts
  ├── hooks/
  │   ├── User.hook.ts
  │   └── index.ts
  ├── repositories/
  │   ├── User.repository.ts
  │   └── index.ts
  ├── interfaces/
  │   ├── User.interface.ts
  │   └── index.ts
  └── enums/
      ├── User.enum.ts
      └── index.ts
```

---

## 🎯 Casos de Uso Específicos

### 1. Projeto JavaScript Puro

```json
{
  "language": "javascript",
  "baseDir": "",
  "outputDir": "features",
  "defaultTypes": ["models", "repositories"]
}
```

**Uso:** `genpaths Product`

**Resultado:**
```
features/Product/
  ├── models/
  │   ├── Product.model.js
  │   └── index.js
  └── repositories/
      ├── Product.repository.js
      └── index.js
```

---

### 2. Projeto Node.js com pasta lib/

```json
{
  "language": "javascript",
  "baseDir": "lib",
  "outputDir": "modules",
  "defaultTypes": ["models", "repositories", "interfaces"]
}
```

**Uso:** `genpaths Order`

**Resultado:**
```
lib/modules/Order/
  ├── models/
  │   ├── Order.model.js
  │   └── index.js
  ├── repositories/
  │   ├── Order.repository.js
  │   └── index.js
  └── interfaces/
      ├── Order.interface.js
      └── index.js
```

---

### 3. Aplicação React/Vue com Hooks

```json
{
  "language": "typescript",
  "baseDir": "src",
  "outputDir": "features",
  "defaultTypes": ["models", "hooks", "interfaces"]
}
```

**Uso:** `genpaths auth Login`

**Resultado:**
```
src/features/auth/Login/
  ├── models/
  │   ├── Login.model.ts
  │   └── index.ts
  ├── hooks/
  │   ├── Login.hook.ts
  │   └── index.ts
  └── interfaces/
      ├── Login.interface.ts
      └── index.ts
```

---

### 4. API REST/GraphQL Backend

```json
{
  "language": "typescript",
  "baseDir": "src",
  "outputDir": "api",
  "defaultTypes": ["models", "repositories", "interfaces"]
}
```

**Uso:** `genpaths users`

**Resultado:**
```
src/api/users/
  ├── models/
  │   ├── Users.model.ts
  │   └── index.ts
  ├── repositories/
  │   ├── Users.repository.ts
  │   └── index.ts
  └── interfaces/
      ├── Users.interface.ts
      └── index.ts
```

---

### 5. Monorepo - Pacote Específico

```json
{
  "language": "typescript",
  "baseDir": "packages/core/src",
  "outputDir": "domain",
  "defaultTypes": ["models", "interfaces", "enums"]
}
```

**Uso:** `genpaths Payment`

**Resultado:**
```
packages/core/src/domain/Payment/
  ├── models/
  │   ├── Payment.model.ts
  │   └── index.ts
  ├── interfaces/
  │   ├── Payment.interface.ts
  │   └── index.ts
  └── enums/
      ├── Payment.enum.ts
      └── index.ts
```

---

### 6. Projeto Minimalista (Apenas Models)

```json
{
  "language": "javascript",
  "baseDir": "",
  "outputDir": "models",
  "defaultTypes": ["models"]
}
```

**Uso:** `genpaths User`

**Resultado:**
```
models/User/
  └── models/
      ├── User.model.js
      └── index.js
```

---

### 7. Microserviços

```json
{
  "language": "typescript",
  "baseDir": "src",
  "outputDir": "services",
  "defaultTypes": ["models", "repositories", "interfaces"]
}
```

**Uso:** `genpaths notifications Email`

**Resultado:**
```
src/services/notifications/Email/
  ├── models/
  │   ├── Email.model.ts
  │   └── index.ts
  ├── repositories/
  │   ├── Email.repository.ts
  │   └── index.ts
  └── interfaces/
      ├── Email.interface.ts
      └── index.ts
```

---

## 💡 Dicas

### Sem pasta base
Use `"baseDir": ""` para projetos que não precisam de pasta src/lib:
```json
{
  "baseDir": ""
}
```

### Múltiplos níveis de aninhamento
Você pode criar features aninhadas:
```bash
genpaths ecommerce products Cart
```

Com `baseDir: "src"` e `outputDir: "features"`:
```
src/features/ecommerce/products/Cart/
```

### Override temporário de linguagem
Mesmo com configuração TypeScript, você pode forçar JavaScript:
```bash
genpaths User --js
```

---

## 🔄 Migrando de Versões Antigas

Se você tem um `.genpaths.json` antigo sem `baseDir`, apenas adicione:

```json
{
  "language": "typescript",
  "baseDir": "src",          // ← Adicione esta linha
  "outputDir": "features",
  "defaultTypes": ["models", "hooks"]
}
```

Se você não quer pasta base, use string vazia:
```json
{
  "baseDir": ""  // Sem pasta base
}
```
