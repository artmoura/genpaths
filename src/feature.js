import path from "path";
import { ensureDirExists, ensureFile, loadTemplate } from "./utils.js";

export function createFeature(args, { only = [], except = [], config } = {}) {
  const featureName = args[args.length - 1];
  const basePath = path.join(process.cwd(), config.outputDir, ...args);

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
      models: "model",
      hooks: "hook", 
      repositories: "repository",
      interfaces: "interface",
      enums: "enum"
    };
    
    const fileType = fileTypeMap[dirKey] || dirKey.slice(0, -1);
    const filePath = path.join(fullPath, `${featureName}.${fileType}${config.fileExtension}`);
    const content = loadTemplate(dirKey, featureName, config.language);

    ensureFile(filePath, content);
  });

  console.log(`✅ Feature "${featureName}" criada em: ${basePath}`);
}