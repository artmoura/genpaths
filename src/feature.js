import path from "path";
import { ensureDirExists, ensureFile, loadTemplate, loadIndexTemplate } from "./utils.js";

export function createFeature(args, { only = [], except = [], config } = {}) {
  const featureName = args[args.length - 1];

  // Construir o caminho base considerando baseDir
  const pathParts = config.baseDir ? [config.baseDir, config.outputDir, ...args] : [config.outputDir, ...args];
  const basePath = path.join(process.cwd(), ...pathParts);

  const dirKeys = config.defaultTypes;
  let dirsToCreate = [...dirKeys];

  // Validar tipos fornecidos
  const allTypes = new Set(dirKeys);

  if (only.length > 0) {
    const invalidTypes = only.filter(type => !allTypes.has(type));
    if (invalidTypes.length > 0) {
      throw new Error(`Tipos inválidos em --only: ${invalidTypes.join(', ')}\nTipos válidos: ${dirKeys.join(', ')}`);
    }
    dirsToCreate = only;
  } else if (except.length > 0) {
    const invalidTypes = except.filter(type => !allTypes.has(type));
    if (invalidTypes.length > 0) {
      throw new Error(`Tipos inválidos em --except: ${invalidTypes.join(', ')}\nTipos válidos: ${dirKeys.join(', ')}`);
    }
    dirsToCreate = dirsToCreate.filter((dir) => !except.includes(dir));
  }

  ensureDirExists(basePath);

  dirsToCreate.forEach((dirKey) => {
    const fullPath = path.join(basePath, dirKey);
    ensureDirExists(fullPath);

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
    const filePath = path.join(fullPath, `${featureName}.${fileType}${config.fileExtension}`);
    const content = loadTemplate(dirKey, featureName, config.language);

    ensureFile(filePath, content);

    // Criar arquivo index.{ts/js} para cada tipo
    const indexPath = path.join(fullPath, `index${config.fileExtension}`);
    const indexContent = loadIndexTemplate(dirKey, featureName, config.language);
    ensureFile(indexPath, indexContent);
  });

  console.log(`✅ Feature "${featureName}" criada em: ${basePath}`);
}
