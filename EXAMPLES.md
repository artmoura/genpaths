# Exemplos de Configuração .genpaths.json

## 📋 Configuração Padrão (Recomendada)

Esta é a configuração criada automaticamente pelo comando `genpaths init`:

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
    "enums"
  ]
}
```

### Resultado:
```
src/features/User/
  ├── entities/
  │   ├── User.entity.ts
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
  "defaultTypes": ["entities", "repositories"]
}
```

**Uso:** `genpaths Product`

**Resultado:**
```
features/Product/
  ├── entities/
  │   ├── Product.entity.js
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
  "defaultTypes": ["entities", "repositories", "interfaces"]
}
```

**Uso:** `genpaths Order`

**Resultado:**
```
lib/modules/Order/
  ├── entities/
  │   ├── Order.entity.js
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
  "defaultTypes": ["entities", "hooks", "interfaces"]
}
```

**Uso:** `genpaths auth Login`

**Resultado:**
```
src/features/auth/Login/
  ├── entities/
  │   ├── Login.entity.ts
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
  "defaultTypes": ["entities", "repositories", "interfaces"]
}
```

**Uso:** `genpaths users`

**Resultado:**
```
src/api/users/
  ├── entities/
  │   ├── Users.entity.ts
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
  "defaultTypes": ["entities", "interfaces", "enums"]
}
```

**Uso:** `genpaths Payment`

**Resultado:**
```
packages/core/src/domain/Payment/
  ├── entities/
  │   ├── Payment.entity.ts
  │   └── index.ts
  ├── interfaces/
  │   ├── Payment.interface.ts
  │   └── index.ts
  └── enums/
      ├── Payment.enum.ts
      └── index.ts
```

---

### 6. Projeto Minimalista (Apenas entities)

```json
{
  "language": "javascript",
  "baseDir": "",
  "outputDir": "entities",
  "defaultTypes": ["entities"]
}
```

**Uso:** `genpaths User`

**Resultado:**
```
entities/User/
  └── entities/
      ├── User.entity.js
      └── index.js
```

---

### 7. Microserviços

```json
{
  "language": "typescript",
  "baseDir": "src",
  "outputDir": "services",
  "defaultTypes": ["entities", "repositories", "interfaces"]
}
```

**Uso:** `genpaths notifications Email`

**Resultado:**
```
src/services/notifications/Email/
  ├── entities/
  │   ├── Email.entity.ts
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

## 🎨 Tipos Customizados

### Exemplo 1: Services

**Configuração:**
```json
{
  "language": "typescript",
  "baseDir": "src",
  "outputDir": "features",
  "defaultTypes": [
    "entities",
    "repositories",
    "services"
  ]
}
```

**Templates customizados:**
```bash
# Criar estrutura
mkdir -p generator/templates/services

# Template do service
cat > generator/templates/services/{feature}.service.ts << 'EOF'
// Service for {{feature}}
export class {{feature}}Service {
  constructor(private repository: {{feature}}Repository) {}

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async create(data: any) {
    return await this.repository.create(data);
  }
}
EOF

# Template do index
cat > generator/templates/services/index.ts << 'EOF'
export * from './{{feature}}.service';
EOF
```

**Uso:** `genpaths User`

**Resultado:**
```
src/features/User/
  ├── entities/
  │   ├── User.entity.ts
  │   └── index.ts
  ├── repositories/
  │   ├── User.repository.ts
  │   └── index.ts
  └── services/
      ├── User.service.ts
      └── index.ts
```

---

### Exemplo 2: Controllers (NestJS/Express)

**Configuração:**
```json
{
  "language": "typescript",
  "baseDir": "src",
  "outputDir": "modules",
  "defaultTypes": [
    "controllers",
    "services",
    "dtos"
  ]
}
```

**Templates customizados:**
```bash
# Controllers
mkdir -p generator/templates/controllers
cat > generator/templates/controllers/{feature}.controller.ts << 'EOF'
import { Controller, Get, Post } from '@nestjs/common';
import { {{feature}}Service } from '../services';

@Controller('{{feature}}')
export class {{feature}}Controller {
  constructor(private service: {{feature}}Service) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }
}
EOF

cat > generator/templates/controllers/index.ts << 'EOF'
export * from './{{feature}}.controller';
EOF

# DTOs
mkdir -p generator/templates/dtos
cat > generator/templates/dtos/{feature}.dto.ts << 'EOF'
export class Create{{feature}}DTO {
  name: string;
  // Add more properties
}

export class Update{{feature}}DTO {
  name?: string;
  // Add more properties
}
EOF

cat > generator/templates/dtos/index.ts << 'EOF'
export * from './{{feature}}.dto';
EOF
```

**Uso:** `genpaths Product`

**Resultado:**
```
src/modules/Product/
  ├── controllers/
  │   ├── Product.controller.ts
  │   └── index.ts
  ├── services/
  │   ├── Product.service.ts
  │   └── index.ts
  └── dtos/
      ├── Product.dto.ts
      └── index.ts
```

---

### Exemplo 3: Validators + Schemas

**Configuração:**
```json
{
  "language": "typescript",
  "baseDir": "src",
  "outputDir": "features",
  "defaultTypes": [
    "entities",
    "validators",
    "schemas"
  ]
}
```

**Templates customizados:**
```bash
# Validators
mkdir -p generator/templates/validators
cat > generator/templates/validators/{feature}.validator.ts << 'EOF'
export class {{feature}}Validator {
  validate(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Add validation logic

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
EOF

cat > generator/templates/validators/index.ts << 'EOF'
export * from './{{feature}}.validator';
EOF

# Schemas (Zod/Yup)
mkdir -p generator/templates/schemas
cat > generator/templates/schemas/{feature}.schema.ts << 'EOF'
import { z } from 'zod';

export const {{feature}}Schema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  // Add more fields
});

export type {{feature}} = z.infer<typeof {{feature}}Schema>;
EOF

cat > generator/templates/schemas/index.ts << 'EOF'
export * from './{{feature}}.schema';
EOF
```

---

## 🔄 Migrando de Versões Antigas

Se você tem um `.genpaths.json` antigo sem `baseDir`, apenas adicione:

```json
{
  "language": "typescript",
  "baseDir": "src",          // ← Adicione esta linha
  "outputDir": "features",
  "defaultTypes": ["entities", "hooks"]
}
```

Se você não quer pasta base, use string vazia:
```json
{
  "baseDir": ""  // Sem pasta base
}
```
