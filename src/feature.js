import path from "path";
import { ensureDirExists, ensureFile, loadTemplate, createIndexFile } from "./utils.js";

export function createFeature(args, { only = [], except = [], config } = {}) {
  const featureName = args[args.length - 1];

  // Extrai o nome da feature e o path aninhado (se houver)
  // Ex: "Main/User" -> featureName = "User", nestedPath = "Main"
  const pathParts = featureName.split('/');
  const actualFeatureName = pathParts[pathParts.length - 1];
  const nestedPath = pathParts.slice(0, -1).join('/');

  // Nome em minúsculo para arquivos
  const lowerFeatureName = actualFeatureName.toLowerCase();
  const lowerNestedPath = nestedPath ? nestedPath.toLowerCase() : '';

  // Construir o caminho base considerando baseDir e outputDir
  const pathPartsArray = [];
  if (config.baseDir) pathPartsArray.push(config.baseDir);
  if (config.outputDir) pathPartsArray.push(config.outputDir);

  const basePath = path.join(process.cwd(), ...pathPartsArray);

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

    // Se houver path aninhado, adiciona ao folderPath
    const folderPath = lowerNestedPath
      ? path.join(basePath, folder, lowerNestedPath)
      : path.join(basePath, folder);

    ensureDirExists(folderPath);

    // Pega o suffix (ex: ".entity", ".repository")
    const suffix = templateConfig?.suffix || '';

    // Usar extensão configurada no template, se especificada
    // Caso contrário, usa a extensão padrão da linguagem (com ponto)
    let extension = templateConfig?.extension
      ? `.${templateConfig.extension}`
      : config.fileExtension;

    // Nome do arquivo: user.entity.ts ou User.tsx
    const fileName = `${lowerFeatureName}${suffix}${extension}`;
    const filePath = path.join(folderPath, fileName);
    const content = loadTemplate(type, actualFeatureName, config);

    ensureFile(filePath, content);

    // Criar/atualizar index.ts na pasta do tipo (sem o nested path)
    if (config.createIndex) {
      const shouldCreateIndex = config.indexExports === true ||
                               (Array.isArray(config.indexExports) && config.indexExports.includes(type));

      if (shouldCreateIndex) {
        // Index na raiz da pasta do tipo (não dentro da subpasta)
        const indexFolderPath = path.join(basePath, folder);
        const indexPath = lowerNestedPath ? path.join(lowerNestedPath, lowerFeatureName) : lowerFeatureName;
        createIndexFile(indexFolderPath, indexPath, suffix, extension);
      }
    }
  });

  console.log(`✅ Feature "${featureName}" criada em: ${basePath}`);
}
