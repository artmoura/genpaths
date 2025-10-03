#!/usr/bin/env node
import chalk from "chalk";
import { createFeature } from "../src/feature.js";
import { copyDefaults } from "../src/utils.js";
import { ProjectConfig } from "../src/config.js";
import { t, setLocale } from "../src/i18n.js";
import {
  promptForLanguage,
  promptForOutputDir,
  promptForBaseDir,
  promptForTypes,
  promptForFeatureName,
  promptForNestedPath,
  promptForConfigSave,
  promptForInteractiveMode,
  promptForLocale
} from "../src/prompts.js";

const args = process.argv.slice(2);

// Função para validar nome de feature
function isValidFeatureName(name) {
  // Não pode começar com - ou --
  if (name.startsWith('-')) {
    return { valid: false, reason: 'invalidStart' };
  }

  // Deve começar com letra
  if (!/^[a-zA-Z]/.test(name)) {
    return { valid: false, reason: 'mustStartWithLetter' };
  }

  // Pode conter letras, números, underscore e barra
  if (!/^[a-zA-Z][a-zA-Z0-9_\/]*$/.test(name)) {
    return { valid: false, reason: 'invalidCharacters' };
  }

  return { valid: true };
}

// Função para mostrar ajuda
function showHelp() {
  console.log(chalk.blue(`\n${t('help.title')}\n\n${chalk.yellow(t('help.usage'))}\n  ${t('help.usageLine1')}\n  ${t('help.usageLine2')}\n\n${chalk.yellow(t('help.commands'))}\n  defaults                    ${t('help.commandsDefaults')}\n  init                        ${t('help.commandsInit')}\n  config                      ${t('help.commandsConfig')}\n\n${chalk.yellow(t('help.options'))}\n  --only <tipos>             ${t('help.optionsOnly')}\n  --except <tipos>           ${t('help.optionsExcept')}\n  --interactive, -i          ${t('help.optionsInteractive')}\n  --js                       ${t('help.optionsJs')}\n  --ts                       ${t('help.optionsTs')}\n  --locale, -l <locale>      ${t('help.optionsLocale')}\n  --help, -h                 ${t('help.optionsHelp')}\n\n${chalk.yellow(t('help.availableTypes'))}\n  entities, repositories, interfaces, hooks, enums\n\n${chalk.yellow(t('help.examples'))}\n  npx genpaths User\n  npx genpaths Product --only entities,interfaces\n  npx genpaths Order --except enums --js\n  npx genpaths auth Login\n  npx genpaths init\n  npx genpaths defaults\n  npx genpaths --locale en\n  npx genpaths User --locale pt-BR\n\n${chalk.gray(t('help.moreInfo'))}\n`));
}

async function runInteractiveMode(config) {
  console.log(chalk.blue('\n' + t('message.interactiveMode') + '\n'));

  // Se não há configuração, configura o projeto
  if (!config.configPath || args.includes('init')) {
    console.log(chalk.yellow(t('message.configuringProject')));

    // Perguntar idioma primeiro se for init ou não houver configuração
    if (!config.config.locale || args.includes('init')) {
      const locale = await promptForLocale();
      setLocale(locale);
      config.updateConfig({ locale });
    }

    const language = await promptForLanguage();
    const baseDir = await promptForBaseDir(config.baseDir);
    const outputDir = await promptForOutputDir(config.outputDir);
    const defaultTypes = await promptForTypes(config.defaultTypes);

    config.updateConfig({ language, baseDir, outputDir, defaultTypes });
    console.log(chalk.green(t('message.configSaved') + '\n'));
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
  let forceLocale = null;

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
    } else if (arg === "--locale" || arg === "-l") {
      const nextArg = args[i + 1];
      if (nextArg) {
        forceLocale = nextArg;
      }
    } else if (!args[i - 1]?.startsWith("--") && !args[i - 1]?.startsWith("-")) {
      // Só adiciona se não for uma flag
      if (!arg.startsWith('-')) {
        featureArgs.push(arg);
      }
    }
  });

  // Aplica override de locale se especificado
  if (forceLocale) {
    setLocale(forceLocale);
    config.updateConfig({ locale: forceLocale });
  }

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
      console.log(chalk.blue('\n' + t('message.currentConfig')));
      console.log(chalk.gray(t('message.configLanguage')), chalk.green(config.language));
      console.log(chalk.gray(t('message.configLocale')), chalk.green(config.locale));
      console.log(chalk.gray(t('message.configBaseDir')), chalk.green(config.baseDir || t('message.configBaseDirNone')));
      console.log(chalk.gray(t('message.configOutputDir')), chalk.green(config.outputDir));
      console.log(chalk.gray(t('message.configDefaultTypes')), chalk.green(config.defaultTypes.join(', ')));
      console.log(chalk.gray(t('message.configExtension')), chalk.green(config.fileExtension));
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
      console.error(chalk.red(t('error.featureRequired')));
      console.log(t('error.featureRequiredHint1'));
      console.log(t('error.featureRequiredHint2'));
      process.exit(1);
    }

    // Validar nomes de features
    for (const featureName of featureArgs) {
      const validation = isValidFeatureName(featureName);
      if (!validation.valid) {
        console.error(chalk.red(t('error.invalidFeatureName', featureName)));

        if (validation.reason === 'invalidStart') {
          console.log(chalk.yellow(t('error.featureNameStartsWithDash')));
          console.log(chalk.gray(t('error.featureNameStartsWithDashHint')));
        } else if (validation.reason === 'mustStartWithLetter') {
          console.log(chalk.yellow(t('error.featureNameMustStartWithLetter')));
        } else if (validation.reason === 'invalidCharacters') {
          console.log(chalk.yellow(t('error.featureNameInvalidCharacters')));
          console.log(chalk.gray(t('error.featureNameValidFormat')));
        }

        process.exit(1);
      }
    }

    // Executar geração
    console.log(chalk.blue(`\n${t('message.generating', featureArgs[featureArgs.length - 1], config.language)}\n`));
    createFeature(featureArgs, options);

  } catch (error) {
    console.error(chalk.red(t('error.generic')), error.message);
    process.exit(1);
  }
}

main();
