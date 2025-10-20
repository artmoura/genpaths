import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function resolveTemplatePath(type, config) {
  const extension = config.language === "typescript" ? "ts" : "js";

  // Pega configuração do template
  const templateConfig = config.templates?.[type];
  let templateName = templateConfig?.template || type;

  // Nome do arquivo: entity.ts.template ou entity.js.template
  const templateFileName = `${templateName}.${extension}.template`;

  // caminho customizado no projeto do usuário
  const userPath = path.join(process.cwd(), ".genpaths", "templates", templateFileName);
  if (fs.existsSync(userPath)) {
    return userPath;
  }

  // fallback para default do pacote npm
  const packagePath = path.join(__dirname, "..", ".genpaths", "templates", templateFileName);
  if (fs.existsSync(packagePath)) {
    return packagePath;
  }

  // Se não encontrou, lança erro informativo
  throw new Error(
    `Template não encontrado para o tipo "${type}".\n` +
    `Esperado em: .genpaths/templates/${templateFileName}\n\n` +
    `Para criar um tipo customizado:\n` +
    `1. Crie o arquivo: .genpaths/templates/${templateName}.{ts,js}.template\n` +
    `2. Use {{FEATURE_NAME}} como placeholder no template\n` +
    `3. Use {{FEATURE_NAME_LOWER}} para versão minúscula`
  );
} export function loadTemplate(type, featureName, config) {
  const templatePath = resolveTemplatePath(type, config);
  let content = fs.readFileSync(templatePath, "utf-8");

  // Capitaliza a primeira letra para nomes de classes/interfaces
  const capitalizedFeature = featureName.charAt(0).toUpperCase() + featureName.slice(1);
  const lowerFeature = featureName.toLowerCase();

  return content
    .replace(/\{\{FEATURE_NAME\}\}/g, capitalizedFeature)
    .replace(/\{\{FEATURE_NAME_LOWER\}\}/g, lowerFeature);
}

export function createIndexFile(folderPath, featureName, suffix, extension) {
  const indexPath = path.join(folderPath, `index${extension}`);
  const exportLine = `export * from './${featureName}${suffix}';\n`;

  // Se já existe, adiciona a linha (se não existir já)
  if (fs.existsSync(indexPath)) {
    const currentContent = fs.readFileSync(indexPath, 'utf-8');
    if (!currentContent.includes(exportLine.trim())) {
      fs.appendFileSync(indexPath, exportLine);
      console.log(`📝 Atualizado: ${indexPath}`);
    }
  } else {
    // Cria novo
    fs.writeFileSync(indexPath, exportLine);
    console.log(`📄 Criado: ${indexPath}`);
  }
}

function capitalizedType(type) {
  // use-cases -> UseCases
  // entities -> Entities
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

export function initProject(language = "typescript") {
  const extension = language === "typescript" ? "ts" : "js";
  const src = path.join(__dirname, "..", ".genpaths", "templates");
  const dest = path.join(process.cwd(), ".genpaths", "templates");
  const configDest = path.join(process.cwd(), ".genpaths.json");

  ensureDirExists(dest);

  // Templates base (sempre incluídos)
  const baseTemplates = ["entity", "repository", "use-case"];

  // Templates adicionais comuns
  const commonTemplates = ["enum", "component", "hook"];

  const allTemplates = [
    ...baseTemplates,
    ...commonTemplates,
  ];

  let copiedCount = 0;

  allTemplates.forEach(template => {
    // Para components, precisa usar tsx/jsx
    let ext = extension;
    if (template === "component" && language === "typescript") {
      ext = "tsx";
    } else if (template === "component" && language === "javascript") {
      ext = "jsx";
    }

    const srcFile = path.join(src, `${template}.${ext}.template`);
    const destFile = path.join(dest, `${template}.${ext}.template`);

    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
      copiedCount++;
    }
  });

  // Cria .genpaths.json se não existir
  if (!fs.existsSync(configDest)) {
    const defaultTypes = ["entity", "repository", "use-case", "enum"];

    const defaultConfig = {
      baseDir: "src",
      outputDir: "",
      language: language,
      defaultTypes: defaultTypes,
      createIndex: true,
      indexExports: true,
      templates: {
        entity: {
          enabled: true,
          folder: "entities",
          suffix: ".entity",
          template: "entity"
        },
        repository: {
          enabled: true,
          folder: "repositories",
          suffix: ".repository",
          template: "repository"
        },
        "use-case": {
          enabled: true,
          folder: "use-cases",
          suffix: ".use-case",
          template: "use-case"
        },
        enum: {
          enabled: true,
          folder: "enums",
          suffix: ".enum",
          template: "enum"
        },
        component: {
          enabled: false,
          folder: "components",
          suffix: "",
          template: "component"
        },
        hook: {
          enabled: false,
          folder: "hooks",
          suffix: "",
          template: "hook"
        }
      }
    };

    fs.writeFileSync(configDest, JSON.stringify(defaultConfig, null, 2), "utf-8");
    console.log(`\n✅ Arquivo de configuração criado: .genpaths.json`);
  } else {
    console.log(`\n⚠️  .genpaths.json já existe (não foi sobrescrito)`);
  }

  console.log(`\n✨ ${copiedCount} templates copiados para .genpaths/templates/`);
  console.log(`\n📝 Templates disponíveis:`);
  allTemplates.forEach(t => {
    let ext = extension;
    if (t === "component") ext = language === "typescript" ? "tsx" : "jsx";
    console.log(`   - ${t}.${ext}.template`);
  });
  console.log(`\n🚀 Pronto! Agora você pode usar:`);
  console.log(`   genpaths create NomeDaFeature`);
  console.log(`\n💡 Dica: Edite os templates em .genpaths/templates/ para personalizar`);
}

export function copyDefaults(language = "typescript") {
  const extension = language === "typescript" ? "ts" : "js";
  const src = path.join(__dirname, "..", ".genpaths", "templates");
  const dest = path.join(process.cwd(), ".genpaths", "templates");

  ensureDirExists(dest);

  // Copia apenas os templates da linguagem selecionada
  const templates = ["entity", "repository", "use-case"];

  templates.forEach(template => {
    const srcFile = path.join(src, `${template}.template.${extension}`);
    const destFile = path.join(dest, `${template}.template.${extension}`);

    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
    }
  });

  console.log(`✨ Templates padrão (${language}) copiados para .genpaths/templates`);
  console.log(`📝 Arquivos: entity.template.${extension}, repository.template.${extension}, use-case.template.${extension}`);
  console.log(`📝 Use {{FEATURE_NAME}} e {{FEATURE_NAME_LOWER}} como placeholders`);
}

export function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function ensureFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`📄 Criado: ${filePath}`);
  } else {
    console.log(`⚠️  Já existe: ${filePath}`);
  }
}
