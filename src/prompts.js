import inquirer from "inquirer";
import chalk from "chalk";
import { t } from "./i18n.js";

export async function promptForLocale() {
  const { locale } = await inquirer.prompt([
    {
      type: "list",
      name: "locale",
      message: chalk.cyan(t('prompt.locale')),
      choices: [
        { name: t('prompt.localePortuguese'), value: "pt-BR" },
        { name: t('prompt.localeEnglish'), value: "en" }
      ],
      default: "pt-BR"
    }
  ]);
  return locale;
}

export async function promptForLanguage() {
  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: chalk.cyan(t('prompt.language')),
      choices: [
        { name: t('prompt.languageTypescript'), value: "typescript" },
        { name: t('prompt.languageJavascript'), value: "javascript" }
      ],
      default: "typescript"
    }
  ]);
  return language;
}

export async function promptForFramework() {
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: chalk.cyan(t('prompt.framework')),
      choices: [
        { name: t('prompt.frameworkNone'), value: "none" },
        { name: t('prompt.frameworkReact'), value: "react" }
      ],
      default: "none"
    }
  ]);
  return framework;
}

export async function promptForOutputDir(currentDir = "features") {
  const { outputDir } = await inquirer.prompt([
    {
      type: "input",
      name: "outputDir",
      message: chalk.cyan(t('prompt.outputDir')),
      default: currentDir
    }
  ]);
  return outputDir;
}

export async function promptForBaseDir(currentBaseDir = "src") {
  const { baseDir } = await inquirer.prompt([
    {
      type: "input",
      name: "baseDir",
      message: chalk.cyan(t('prompt.baseDir')),
      default: currentBaseDir
    }
  ]);
  return baseDir.trim();
}

export async function promptForTypes(defaultTypes) {
  const { selectedTypes } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedTypes",
      message: chalk.cyan(t('prompt.types')),
      choices: [
        { name: t('prompt.typesEntities'), value: "entities", checked: defaultTypes.includes("entities") },
        { name: t('prompt.typesRepositories'), value: "repositories", checked: defaultTypes.includes("repositories") },
        { name: t('prompt.typesInterfaces'), value: "interfaces", checked: defaultTypes.includes("interfaces") },
        { name: t('prompt.typesHooks'), value: "hooks", checked: defaultTypes.includes("hooks") },
        { name: t('prompt.typesEnums'), value: "enums", checked: defaultTypes.includes("enums") }
      ],
      validate: (answer) => {
        if (answer.length < 1) {
          return t('prompt.typesValidate');
        }
        return true;
      }
    }
  ]);
  return selectedTypes;
}

export async function promptForFeatureName() {
  const { featureName } = await inquirer.prompt([
    {
      type: "input",
      name: "featureName",
      message: chalk.cyan(t('prompt.featureName')),
      validate: (input) => {
        if (!input.trim()) {
          return t('prompt.featureNameRequired');
        }
        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(input.trim())) {
          return t('prompt.featureNameInvalid');
        }
        return true;
      }
    }
  ]);
  return featureName.trim();
}

export async function promptForNestedPath() {
  const { hasNestedPath, nestedPath } = await inquirer.prompt([
    {
      type: "confirm",
      name: "hasNestedPath",
      message: chalk.cyan(t('prompt.nestedPath')),
      default: false
    },
    {
      type: "input",
      name: "nestedPath",
      message: chalk.cyan(t('prompt.nestedPathInput')),
      when: (answers) => answers.hasNestedPath,
      validate: (input) => {
        if (!input.trim()) {
          return t('prompt.nestedPathRequired');
        }
        return true;
      }
    }
  ]);

  return hasNestedPath ? nestedPath.trim() : "";
}

export async function promptForConfigSave() {
  const { saveConfig } = await inquirer.prompt([
    {
      type: "confirm",
      name: "saveConfig",
      message: chalk.cyan(t('prompt.configSave')),
      default: true
    }
  ]);
  return saveConfig;
}

export async function promptForInteractiveMode() {
  const { useInteractive } = await inquirer.prompt([
    {
      type: "confirm",
      name: "useInteractive",
      message: chalk.cyan(t('prompt.interactive')),
      default: true
    }
  ]);
  return useInteractive;
}
