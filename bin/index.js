#!/usr/bin/env node
import chalk from "chalk";
import { createFeature } from "../src/feature.js";
import { copyDefaults } from "../src/utils.js";
import { ProjectConfig } from "../src/config.js";
import {
  promptForLanguage,
  promptForOutputDir,
  promptForBaseDir,
  promptForTypes,
  promptForFeatureName,
  promptForNestedPath,
  promptForConfigSave,
  promptForInteractiveMode
} from "../src/prompts.js";

const args = process.argv.slice(2);

// Função para mostrar ajuda
function showHelp() {
  console.log(chalk.blue(`
🚀 Path Generator - Gerador automático de estruturas de arquivos

${chalk.yellow('Uso:')}
  npx genpaths [comando] [opções]
  npx genpaths <nome-da-feature> [opções]

${chalk.yellow('Comandos:')}
  defaults                    Copia templates padrão para personalização
  init                        Configura o projeto interativamente
  config                      Mostra configuração atual

${chalk.yellow('Opções:')}
  --only <tipos>             Gera apenas os tipos especificados
  --except <tipos>           Gera todos os tipos exceto os especificados
  --interactive, -i          Força modo interativo
  --js                       Gera arquivos JavaScript
  --ts                       Gera arquivos TypeScript
  --help, -h                 Mostra esta ajuda

${chalk.yellow('Tipos disponíveis:')}
  models, repositories, interfaces, hooks, enums

${chalk.yellow('Exemplos:')}
  npx genpaths User
  npx genpaths Product --only models,interfaces
  npx genpaths Order --except enums --js
  npx genpaths auth Login
  npx genpaths init
  npx genpaths defaults

${chalk.gray('Para mais informações: https://github.com/seu-usuario/genpaths')}
`));
}

async function runInteractiveMode(config) {
  console.log(chalk.blue('\n🤖 Modo Interativo\n'));

  // Se não há configuração, configura o projeto
  if (!config.configPath || args.includes('init')) {
    console.log(chalk.yellow('⚙️  Configurando projeto...'));

    const language = await promptForLanguage();
    const baseDir = await promptForBaseDir(config.baseDir);
    const outputDir = await promptForOutputDir(config.outputDir);
    const defaultTypes = await promptForTypes(config.defaultTypes);

    config.updateConfig({ language, baseDir, outputDir, defaultTypes });
    console.log(chalk.green('✅ Configuração salva!\n'));
  }

  // Prompt para feature
  const featureName = await promptForFeatureName();
  const nestedPath = await promptForNestedPath();
  const selectedTypes = await promptForTypes(config.defaultTypes);

  // Constrói argumentos
  const featureArgs = nestedPath ? [nestedPath, featureName] : [featureName];

  return {
    featureArgs,
    options: { only: selectedTypes, config }
  };
}

async function runCommandMode(config) {
  let only = [];
  let except = [];
  const featureArgs = [];
  let forceLanguage = null;

  args.forEach((arg, i) => {
    if (arg === "--only") {
      const nextArg = args[i + 1];
      if (nextArg) {
        only = nextArg.split(",").map(s => s.trim());
      }
    } else if (arg === "--except") {
      const nextArg = args[i + 1];
      if (nextArg) {
        except = nextArg.split(",").map(s => s.trim());
      }
    } else if (arg === "--js") {
      forceLanguage = "javascript";
    } else if (arg === "--ts") {
      forceLanguage = "typescript";
    } else if (!args[i - 1]?.startsWith("--")) {
      featureArgs.push(arg);
    }
  });

  // Aplica override de linguagem se especificado
  if (forceLanguage) {
    config.updateConfig({ language: forceLanguage });
  }

  return {
    featureArgs,
    options: { only, except, config }
  };
}

async function main() {
  try {
    const config = new ProjectConfig();

    // Verificar comandos especiais
    if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
      showHelp();
      return;
    }

    if (args[0] === "defaults") {
      // Verifica se foi especificada uma linguagem específica
      let language = config.language;
      if (args.includes('--js')) language = 'javascript';
      if (args.includes('--ts')) language = 'typescript';

      copyDefaults(language);
      return;
    }

    if (args[0] === "config") {
      console.log(chalk.blue('\n📋 Configuração atual:'));
      console.log(chalk.gray('Linguagem:'), chalk.green(config.language));
      console.log(chalk.gray('Pasta base:'), chalk.green(config.baseDir || '(nenhuma)'));
      console.log(chalk.gray('Pasta de saída:'), chalk.green(config.outputDir));
      console.log(chalk.gray('Tipos padrão:'), chalk.green(config.defaultTypes.join(', ')));
      console.log(chalk.gray('Extensão:'), chalk.green(config.fileExtension));
      return;
    }

    // Verificar se deve usar modo interativo
    const useInteractive = args.includes('--interactive') || args.includes('-i') || args[0] === 'init';

    let featureArgs, options;

    if (useInteractive) {
      ({ featureArgs, options } = await runInteractiveMode(config));
    } else {
      ({ featureArgs, options } = await runCommandMode(config));
    }

    // Validar se foi fornecido um nome de feature
    if (featureArgs.length === 0) {
      console.error(chalk.red("❌ Erro: Nome da feature é obrigatório"));
      console.log("Use: npx genpaths <nome-da-feature>");
      console.log("Ou use: npx genpaths --interactive");
      process.exit(1);
    }

    // Executar geração
    console.log(chalk.blue(`\n🏗️  Gerando feature "${featureArgs[featureArgs.length - 1]}" em ${config.language}...\n`));
    createFeature(featureArgs, options);

  } catch (error) {
    console.error(chalk.red("❌ Erro:"), error.message);
    process.exit(1);
  }
}

main();
