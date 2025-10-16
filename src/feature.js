import path from "path";
import { ensureDirExists, ensureFile, loadTemplate, createIndexFile } from "./utils.js";

export function createFeature(args, { only = [], except = [], config } = {}) {
  const featureName = args[args.length - 1];

  // Nome em minúsculo para arquivos
  const lowerFeatureName = featureName.toLowerCase();

  // Construir o caminho base considerando baseDir e outputDir
  const pathParts = [];
  if (config.baseDir) pathParts.push(config.baseDir);
  if (config.outputDir) pathParts.push(config.outputDir);

  const basePath = path.join(process.cwd(), ...pathParts);

  const types = config.defaultTypes;
  let typesToCreate = [...types];

  // Validar tipos fornecidos
  const allTypes = new Set(types);

  if (only.length > 0) {
    const invalidTypes = only.filter(type => !allTypes.has(type));
    if (invalidTypes.length > 0) {
      throw new Error(`Tipos inválidos em --types: ${invalidTypes.join(', ')}\nTipos válidos: ${types.join(', ')}`);
    }
    typesToCreate = only;
  } else if (except.length > 0) {
    const invalidTypes = except.filter(type => !allTypes.has(type));
    if (invalidTypes.length > 0) {
      throw new Error(`Tipos inválidos em --except: ${invalidTypes.join(', ')}\nTipos válidos: ${types.join(', ')}`);
    }
    typesToCreate = typesToCreate.filter((type) => !except.includes(type));
  }

  ensureDirExists(basePath);

  typesToCreate.forEach((type) => {
    const templateConfig = config.templates?.[type];

    // Se o tipo não está habilitado, pula
    if (templateConfig && !templateConfig.enabled) {
      return;
    }

    // Pega a pasta do tipo (ex: "entities", "repositories")
    const folder = templateConfig?.folder || type;
    const folderPath = path.join(basePath, folder);
    ensureDirExists(folderPath);

    // Pega o suffix (ex: ".entity", ".repository")
    const suffix = templateConfig?.suffix || '';
    const extension = config.fileExtension;

    // Nome do arquivo: user.entity.ts
    const fileName = `${lowerFeatureName}${suffix}${extension}`;
    const filePath = path.join(folderPath, fileName);
    const content = loadTemplate(type, featureName, config);

    ensureFile(filePath, content);

    // Criar/atualizar index.ts na pasta do tipo
    if (config.createIndex && config.indexExports?.includes(type)) {
      createIndexFile(folderPath, lowerFeatureName, suffix, extension);
    }
  });

  console.log(`✅ Feature "${featureName}" criada em: ${basePath}`);
}
