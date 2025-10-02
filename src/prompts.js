import inquirer from "inquirer";
import chalk from "chalk";

export async function promptForLanguage() {
  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: chalk.cyan("🔧 Qual linguagem você está usando?"),
      choices: [
        { name: "TypeScript (.ts)", value: "typescript" },
        { name: "JavaScript (.js)", value: "javascript" }
      ],
      default: "typescript"
    }
  ]);
  return language;
}

export async function promptForOutputDir(currentDir = "features") {
  const { outputDir } = await inquirer.prompt([
    {
      type: "input",
      name: "outputDir",
      message: chalk.cyan("📁 Qual pasta para gerar os arquivos?"),
      default: currentDir
    }
  ]);
  return outputDir;
}

export async function promptForTypes(defaultTypes) {
  const { selectedTypes } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedTypes",
      message: chalk.cyan("📋 Quais tipos você quer gerar?"),
      choices: [
        { name: "Models (classes de dados)", value: "models", checked: defaultTypes.includes("models") },
        { name: "Repositories (acesso a dados)", value: "repositories", checked: defaultTypes.includes("repositories") },
        { name: "Interfaces (contratos)", value: "interfaces", checked: defaultTypes.includes("interfaces") },
        { name: "Hooks (custom hooks)", value: "hooks", checked: defaultTypes.includes("hooks") },
        { name: "Enums (enumerações)", value: "enums", checked: defaultTypes.includes("enums") }
      ],
      validate: (answer) => {
        if (answer.length < 1) {
          return "Você deve escolher pelo menos um tipo!";
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
      message: chalk.cyan("🏗️  Qual o nome da feature?"),
      validate: (input) => {
        if (!input.trim()) {
          return "Nome da feature é obrigatório!";
        }
        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(input.trim())) {
          return "Nome deve começar com letra e conter apenas letras e números!";
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
      message: chalk.cyan("📂 Quer criar em uma subpasta? (ex: auth/login)"),
      default: false
    },
    {
      type: "input",
      name: "nestedPath",
      message: chalk.cyan("📂 Digite o caminho (ex: auth):"),
      when: (answers) => answers.hasNestedPath,
      validate: (input) => {
        if (!input.trim()) {
          return "Caminho é obrigatório quando selecionado!";
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
      message: chalk.cyan("💾 Salvar essas configurações para próximas execuções?"),
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
      message: chalk.cyan("🤖 Usar modo interativo? (recomendado para primeira vez)"),
      default: true
    }
  ]);
  return useInteractive;
}