#!/usr/bin/env node
import chalk from "chalk";
import { createFeature } from "../src/feature.js";
import { copyDefaults, initProject } from "../src/utils.js";
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
  promptForLocale,
  promptForFramework
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
  console.log(chalk.blue(`\n${t('help.title')}\n\n${chalk.yellow(t('help.usage'))}\n  ${t('help.usageLine1')}\n\n${chalk.yellow(t('help.commands'))}\n  create <nome>              ${t('help.commandsCreate')}\n  init                       ${t('help.commandsInit')}\n  config                     ${t('help.commandsConfig')}\n  defaults                   ${t('help.commandsDefaults')}\n\n${chalk.yellow(t('help.options'))}\n  --types <tipos>            ${t('help.optionsTypes')}\n  --except <tipos>           ${t('help.optionsExcept')}\n  --base-dir <pasta>         ${t('help.optionsBaseDir')}\n  --output-dir <pasta>       ${t('help.optionsOutputDir')}\n  --js                       ${t('help.optionsJs')}\n  --ts                       ${t('help.optionsTs')}\n  --locale, -l <code>        ${t('help.optionsLocale')}\n  --interactive, -i          ${t('help.optionsInteractive')}\n  --help, -h                 ${t('help.optionsHelp')}\n\n${chalk.yellow(t('help.availableTypes'))}\n  entities, repositories, interfaces, hooks, enums\n\n${chalk.yellow(t('help.examples'))}\n  npx genpaths create User\n  npx genpaths create customers --types entities,repositories,hooks\n  npx genpaths create shared/helpers --base-dir src/utils\n  npx genpaths create auth/User --types entities,repositories\n  npx genpaths create Product --except enums --js\n  npx genpaths create --interactive\n  npx genpaths init\n\n${chalk.gray(t('help.moreInfo'))}\n`));
}

async function runInteractiveMode(config) {
  console.log(chalk.blue('\n' + t('message.interactiveMode') + '\n'));

  // Se não há configuração, configura o projeto
  if (!config.configPath) {
    console.log(chalk.yellow(t('message.configuringProject')));

    // Perguntar idioma primeiro se não houver configuração
    if (!config.config.locale) {
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
  let types = [];
  let except = [];
  const featureArgs = [];
  let forceLanguage = null;
  let forceLocale = null;
  let forceBaseDir = null;
  let forceOutputDir = null;

  args.forEach((arg, i) => {
    if (arg === "--types") {
      const nextArg = args[i + 1];
      if (nextArg) {
        types = nextArg.split(",").map(s => s.trim());
      }
    } else if (arg === "--except") {
      const nextArg = args[i + 1];
      if (nextArg) {
        except = nextArg.split(",").map(s => s.trim());
      }
    } else if (arg === "--base-dir") {
      const nextArg = args[i + 1];
      if (nextArg) {
        forceBaseDir = nextArg;
      }
    } else if (arg === "--output-dir") {
      const nextArg = args[i + 1];
      if (nextArg) {
        forceOutputDir = nextArg;
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

  // Aplica override de baseDir se especificado
  if (forceBaseDir !== null) {
    config.config.baseDir = forceBaseDir;
  }

  // Aplica override de outputDir se especificado
  if (forceOutputDir !== null) {
    config.config.outputDir = forceOutputDir;
  }

  return {
    featureArgs,
    options: { only: types, except, config }
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

    const command = args[0];

    if (command === "defaults") {
      // Verifica se foi especificada uma linguagem específica
      let language = config.language;
      if (args.includes('--js')) language = 'javascript';
      if (args.includes('--ts')) language = 'typescript';

      copyDefaults(language);
      return;
    }

    if (command === "init") {
      console.log(chalk.blue('\n' + t('message.initProject') + '\n'));

      // Perguntar idioma primeiro
      const locale = await promptForLocale();
      setLocale(locale);

      const language = await promptForLanguage();
      const framework = await promptForFramework();

      initProject(language, framework);
      return;
    }

    if (command === "config") {
      console.log(chalk.blue('\n' + t('message.currentConfig')));
      console.log(chalk.gray(t('message.configLanguage')), chalk.green(config.language));
      console.log(chalk.gray(t('message.configLocale')), chalk.green(config.locale));
      console.log(chalk.gray(t('message.configBaseDir')), chalk.green(config.baseDir || t('message.configBaseDirNone')));
      console.log(chalk.gray(t('message.configOutputDir')), chalk.green(config.outputDir));
      console.log(chalk.gray(t('message.configDefaultTypes')), chalk.green(config.defaultTypes.join(', ')));
      console.log(chalk.gray(t('message.configExtension')), chalk.green(config.fileExtension));
      return;
    }

    // Comando 'create' ou modo interativo (não mais 'init')
    if (command === "create" && (args.includes('--interactive') || args.includes('-i'))) {
      // Remove 'create' dos args se existir para processar corretamente
      args.shift();
      const { featureArgs, options } = await runInteractiveMode(config);

      // Validar nome
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

      console.log(chalk.blue(`\n${t('message.generating', featureArgs[featureArgs.length - 1], config.language)}\n`));
      createFeature(featureArgs, options);
      return;
    }

    // Comando 'create' (modo não-interativo)
    if (command === "create") {
      // Remove 'create' dos args
      args.shift();
      const { featureArgs, options } = await runCommandMode(config);

      // Validar nome
      if (featureArgs.length === 0) {
        console.error(chalk.red(t('error.featureRequired')));
        console.log(t('error.createCommandHint'));
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

      console.log(chalk.blue(`\n${t('message.generating', featureArgs[featureArgs.length - 1], config.language)}\n`));
      createFeature(featureArgs, options);
      return;
    }

    // Comando inválido
    console.error(chalk.red(t('error.unknownCommand', command)));
    console.log(chalk.yellow(t('error.unknownCommandHint')));
    console.log(chalk.gray('Run: npx genpaths --help'));
    process.exit(1);

  } catch (error) {
    console.error(chalk.red(t('error.generic')), error.message);
    process.exit(1);
  }
}

main();
