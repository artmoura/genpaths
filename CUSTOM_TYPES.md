# Guia de Tipos Customizados

Este guia explica como criar seus próprios tipos além dos padrões (entities, hooks, repositories, interfaces, enums).

## 📚 Índice

- [Como Funciona](#como-funciona)
- [Criando Seu Primeiro Tipo](#criando-seu-primeiro-tipo)
- [Exemplos Práticos](#exemplos-práticos)
- [Regras e Convenções](#regras-e-convenções)
- [Troubleshooting](#troubleshooting)

## Como Funciona

O genpaths permite criar qualquer tipo de arquivo customizado seguindo estas etapas:

1. **Criar pasta de templates** em `generator/templates/NOME_DO_TIPO/`
2. **Adicionar templates** com o placeholder `{{feature}}`
3. **Configurar no `.genpaths.json`** adicionando o tipo em `defaultTypes`
4. **Gerar features** normalmente com `genpaths NomeDaFeature`

## Criando Seu Primeiro Tipo

Vamos criar um tipo customizado chamado `services`:

### Passo 1: Criar a estrutura

```bash
mkdir -p generator/templates/services
```

### Passo 2: Criar o template principal

Crie o arquivo `generator/templates/services/{feature}.service.ts`:

```typescript
// Service for {{feature}}
export class {{feature}}Service {
  constructor(private repository: any) {}

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async create(data: any) {
    return await this.repository.create(data);
  }
}
```

### Passo 3: Criar o template de index

Crie o arquivo `generator/templates/services/index.ts`:

```typescript
export * from './{{feature}}.service';
```

### Passo 4: Configurar no projeto

Edite `.genpaths.json`:

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

### Passo 5: Usar o tipo

```bash
genpaths User
```

Resultado:
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

## Exemplos Práticos

### Controllers (API REST)

**Template:** `generator/templates/controllers/{feature}.controller.ts`

```typescript
import { {{feature}}Service } from '../services';

export class {{feature}}Controller {
  constructor(private service: {{feature}}Service) {}

  async index(req: any, res: any) {
    const items = await this.service.findAll();
    return res.json(items);
  }

  async show(req: any, res: any) {
    const item = await this.service.findById(req.params.id);
    return res.json(item);
  }

  async store(req: any, res: any) {
    const item = await this.service.create(req.body);
    return res.status(201).json(item);
  }

  async update(req: any, res: any) {
    const item = await this.service.update(req.params.id, req.body);
    return res.json(item);
  }

  async destroy(req: any, res: any) {
    await this.service.delete(req.params.id);
    return res.status(204).send();
  }
}
```

**Index:** `generator/templates/controllers/index.ts`

```typescript
export * from './{{feature}}.controller';
```

### DTOs (Data Transfer Objects)

**Template:** `generator/templates/dtos/{feature}.dto.ts`

```typescript
export class Create{{feature}}DTO {
  name: string;
  description: string;
  // Add more properties
}

export class Update{{feature}}DTO {
  name?: string;
  description?: string;
  // Add more properties
}

export class {{feature}}DTO {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Index:** `generator/templates/dtos/index.ts`

```typescript
export * from './{{feature}}.dto';
```

### Validators

**Template:** `generator/templates/validators/{feature}.validator.ts`

```typescript
export class {{feature}}Validator {
  validateCreate(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name || data.name.trim() === '') {
      errors.push('Name is required');
    }

    if (data.name && data.name.length < 3) {
      errors.push('Name must be at least 3 characters');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  validateUpdate(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (data.name && data.name.length < 3) {
      errors.push('Name must be at least 3 characters');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
```

**Index:** `generator/templates/validators/index.ts`

```typescript
export * from './{{feature}}.validator';
```

### Schemas (Zod/Yup)

**Template:** `generator/templates/schemas/{feature}.schema.ts`

```typescript
import { z } from 'zod';

export const {{feature}}Schema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const Create{{feature}}Schema = {{feature}}Schema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const Update{{feature}}Schema = Create{{feature}}Schema.partial();

export type {{feature}} = z.infer<typeof {{feature}}Schema>;
export type Create{{feature}} = z.infer<typeof Create{{feature}}Schema>;
export type Update{{feature}} = z.infer<typeof Update{{feature}}Schema>;
```

**Index:** `generator/templates/schemas/index.ts`

```typescript
export * from './{{feature}}.schema';
```

### Use Cases (Clean Architecture)

**Template:** `generator/templates/usecases/{feature}.usecase.ts`

```typescript
import { {{feature}}Repository } from '../repositories';

export class Create{{feature}}UseCase {
  constructor(private repository: {{feature}}Repository) {}

  async execute(data: any) {
    // Validate data
    if (!data.name) {
      throw new Error('Name is required');
    }

    // Business logic
    const item = await this.repository.create(data);

    return item;
  }
}

export class Get{{feature}}UseCase {
  constructor(private repository: {{feature}}Repository) {}

  async execute(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new Error('{{feature}} not found');
    }

    return item;
  }
}
```

**Index:** `generator/templates/usecases/index.ts`

```typescript
export * from './{{feature}}.usecase';
```

### Middleware

**Template:** `generator/templates/middlewares/{feature}.middleware.ts`

```typescript
export class {{feature}}Middleware {
  async handle(req: any, res: any, next: any) {
    // Middleware logic for {{feature}}
    console.log(`Processing {{feature}} request`);

    // Validation or transformation
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
  }
}
```

**Index:** `generator/templates/middlewares/index.ts`

```typescript
export * from './{{feature}}.middleware';
```

## Regras e Convenções

### Nomenclatura de Arquivos

O sistema automaticamente converte o nome da pasta para o nome do arquivo:

- **Tipos com 's' final**: Remove o 's'
  - `services` → `service`
  - `controllers` → `controller`
  - `validators` → `validator`

- **Tipos sem 's'**: Mantém o nome
  - `dto` → `dto`
  - `middleware` → `middleware`

### Estrutura de Pastas

```
generator/
  templates/
    TIPO_PLURAL/
      {feature}.TIPO_SINGULAR.extensao
      index.extensao
```

Exemplos:
- `services/{feature}.service.ts`
- `controllers/{feature}.controller.ts`
- `dtos/{feature}.dto.ts`

### Placeholders Disponíveis

- `{{feature}}` - Nome capitalizado da feature (ex: `User`)
- O sistema capitaliza automaticamente a primeira letra

### Arquivos Obrigatórios

Para cada tipo customizado, você precisa criar:

1. **Template principal**: `{feature}.TIPO.extensao`
2. **Template index**: `index.extensao`

## Configuração Completa

Exemplo de `.genpaths.json` com vários tipos customizados:

```json
{
  "language": "typescript",
  "baseDir": "src",
  "outputDir": "features",
  "defaultTypes": [
    "entities",
    "repositories",
    "services",
    "controllers",
    "dtos",
    "validators",
    "schemas",
    "usecases",
    "middlewares"
  ]
}
```

## Usando Tipos Customizados

### Gerar todos os tipos

```bash
genpaths User
```

### Gerar apenas tipos específicos

```bash
# Apenas services e controllers
genpaths Product --only services,controllers

# Todos exceto validators
genpaths Order --except validators
```

### Combinar tipos padrão e customizados

```bash
# entities, repositories e services
genpaths Payment --only entities,repositories,services
```

## Troubleshooting

### Erro: "Template não encontrado"

```
❌ Erro: Template não encontrado para o tipo "services".
Esperado em: generator/templates/services/{feature}.service.ts
```

**Solução:**
1. Verifique se a pasta existe: `generator/templates/services/`
2. Verifique se o template existe: `{feature}.service.ts`
3. Verifique se o index existe: `index.ts`

### Tipo não aparece no arquivo gerado

**Problema:** Adicionou o tipo no `.genpaths.json` mas não foi gerado

**Solução:**
1. Verifique a ortografia no `defaultTypes`
2. Certifique-se de que criou os templates
3. Execute `genpaths config` para ver a configuração atual

### Nome do arquivo incorreto

**Problema:** Esperava `Product.service.ts` mas gerou `Product.services.ts`

**Solução:**
- Use o nome da pasta no plural: `services/`
- O sistema remove o 's' automaticamente
- Se o tipo não termina com 's', use o nome desejado: `dto/` → `dto`

### Placeholder não substituído

**Problema:** O arquivo gerado contém `{{feature}}` ao invés do nome

**Solução:**
- Use exatamente `{{feature}}` (com chaves duplas)
- Não use `{feature}` (chaves simples) no conteúdo do arquivo
- `{feature}` é apenas para o nome do arquivo de template

## Dicas Avançadas

### 1. Templates para JavaScript e TypeScript

Crie ambas as versões se seu projeto suporta ambas:

```
generator/templates/services/
  {feature}.service.ts
  {feature}.service.js
  index.ts
  index.js
```

### 2. Importações Relativas

Use importações relativas nos templates:

```typescript
import { {{feature}}Repository } from '../repositories';
import { {{feature}}DTO } from '../dtos';
```

### 3. Comentários Úteis

Adicione comentários que ajudem outros desenvolvedores:

```typescript
/**
 * Service for {{feature}}
 *
 * Handles business logic for {{feature}} operations
 */
export class {{feature}}Service {
  // ...
}
```

### 4. Boas Práticas

- Mantenha templates simples e claros
- Siga os padrões do seu projeto
- Use interfaces e tipos quando apropriado
- Adicione validações básicas
- Documente o propósito de cada método

## Exemplos de Projetos

### API REST Completa

```json
{
  "defaultTypes": [
    "entities",
    "repositories",
    "services",
    "controllers",
    "validators",
    "dtos"
  ]
}
```

### Clean Architecture

```json
{
  "defaultTypes": [
    "entities",
    "repositories",
    "usecases",
    "controllers",
    "presenters"
  ]
}
```

### React/Next.js

```json
{
  "defaultTypes": [
    "components",
    "hooks",
    "services",
    "types",
    "utils"
  ]
}
```

---

## 🎯 Conclusão

Com tipos customizados, você pode adaptar o genpaths para qualquer arquitetura ou padrão de projeto. A flexibilidade permite criar exatamente a estrutura que seu time precisa, mantendo a consistência em todo o projeto.

**Lembre-se:**
1. Crie templates em `generator/templates/TIPO/`
2. Use `{{feature}}` como placeholder
3. Adicione o tipo em `.genpaths.json`
4. Use normalmente com `genpaths NomeDaFeature`

---

📚 **Mais recursos:**
- [README principal](README.md)
- [Exemplos de configuração](EXAMPLES.md)
- [GitHub](https://github.com/artmoura/genpaths)
