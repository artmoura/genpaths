import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function resolveTemplatePath(dirKey, language = "typescript") {
  // Define o nome correto do arquivo baseado no tipo
  const fileTypeMap = {
    entities: "entity",
    hooks: "hook",
    repositories: "repository",
    interfaces: "interface",
    enums: "enum"
  };

  // Para tipos customizados, usa o nome do tipo menos o 's' final (se houver)
  // ou mantém o nome do tipo se não terminar com 's'
  const fileType = fileTypeMap[dirKey] || (dirKey.endsWith('s') ? dirKey.slice(0, -1) : dirKey);
  const extension = language === "typescript" ? "ts" : "js";

  // caminho customizado no projeto do usuário
  const userPath = path.join(process.cwd(), "generator", "templates", dirKey, `{feature}.${fileType}.${extension}`);
  if (fs.existsSync(userPath)) {
    return userPath;
  }

  // fallback para default do pacote
  const packagePath = path.join(__dirname, "templates", dirKey, `{feature}.${fileType}.${extension}`);
  if (fs.existsSync(packagePath)) {
    return packagePath;
  }

  // Se não encontrou, lança erro informativo
  throw new Error(
    `Template não encontrado para o tipo "${dirKey}".\n` +
    `Esperado em: generator/templates/${dirKey}/{feature}.${fileType}.${extension}\n` +
    `Ou em: src/templates/${dirKey}/{feature}.${fileType}.${extension}\n\n` +
    `Para criar um tipo customizado:\n` +
    `1. Crie a pasta: generator/templates/${dirKey}/\n` +
    `2. Adicione o template: {feature}.${fileType}.${extension}\n` +
    `3. Adicione o index: index.${extension}\n` +
    `4. Use {{feature}} como placeholder no template`
  );
}

export function loadTemplate(dirKey, featureName, language = "typescript") {
  const templatePath = resolveTemplatePath(dirKey, language);
  let content = fs.readFileSync(templatePath, "utf-8");

  // Capitaliza a primeira letra para nomes de classes/interfaces
  const capitalizedFeature = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  return content.replace(/\{\{feature\}\}/g, capitalizedFeature);
}

export function resolveIndexTemplatePath(dirKey, language = "typescript") {
  const extension = language === "typescript" ? "ts" : "js";

  // caminho customizado no projeto do usuário
  const userPath = path.join(process.cwd(), "generator", "templates", dirKey, `index.${extension}`);
  if (fs.existsSync(userPath)) {
    return userPath;
  }

  // fallback para default do pacote
  const packagePath = path.join(__dirname, "templates", dirKey, `index.${extension}`);
  if (fs.existsSync(packagePath)) {
    return packagePath;
  }

  // Se não encontrou, lança erro informativo
  throw new Error(
    `Template index não encontrado para o tipo "${dirKey}".\n` +
    `Esperado em: generator/templates/${dirKey}/index.${extension}\n` +
    `Ou em: src/templates/${dirKey}/index.${extension}\n\n` +
    `Para criar um tipo customizado:\n` +
    `1. Crie a pasta: generator/templates/${dirKey}/\n` +
    `2. Adicione o index: index.${extension}\n` +
    `3. Use {{feature}} como placeholder no template`
  );
}

export function loadIndexTemplate(dirKey, featureName, language = "typescript") {
  const templatePath = resolveIndexTemplatePath(dirKey, language);
  let content = fs.readFileSync(templatePath, "utf-8");

  // Capitaliza a primeira letra para nomes de classes/interfaces
  const capitalizedFeature = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  return content.replace(/\{\{feature\}\}/g, capitalizedFeature);
}

export function copyDefaults(language = "typescript") {
  const extension = language === "typescript" ? "ts" : "js";
  const src = path.join(__dirname, "templates");
  const dest = path.join(process.cwd(), "generator", "templates");

  ensureDirExists(dest);

  // Copia apenas os arquivos da linguagem selecionada
  const dirs = ["entities", "hooks", "repositories", "interfaces", "enums"];

  dirs.forEach(dir => {
    const srcDir = path.join(src, dir);
    const destDir = path.join(dest, dir);
    ensureDirExists(destDir);

    const files = fs.readdirSync(srcDir).filter(file => file.endsWith(`.${extension}`));
    files.forEach(file => {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      fs.copyFileSync(srcFile, destFile);
    });
  });

  console.log(`✨ Templates padrão (${language}) copiados para generator/templates`);
  console.log(`📝 Use o formato {feature}.tipo.${extension} para seus templates customizados`);
  console.log(`📝 Arquivos index.${extension} também foram copiados para cada tipo`);
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
