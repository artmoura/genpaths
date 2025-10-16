import fs from "fs";
import path from "path";
import { t, setLocale } from "./i18n.js";

export class ProjectConfig {
  constructor() {
    this.configPath = path.join(process.cwd(), ".genpaths.json");
    this.config = this.loadConfig();
    // Configura locale
    if (this.config.locale) {
      setLocale(this.config.locale);
    }
  }

  loadConfig() {
    if (fs.existsSync(this.configPath)) {
      try {
        return JSON.parse(fs.readFileSync(this.configPath, "utf-8"));
      } catch (error) {
        console.warn(t('error.invalidConfig'));
      }
    }

    return {
      language: "typescript",
      locale: "pt-BR",
      baseDir: "src",
      outputDir: "",
      defaultTypes: ["entities", "repositories", "use-cases"],
      templates: {
        entities: {
          enabled: true,
          folder: "entities",
          suffix: ".entity",
          template: "entity"
        },
        repositories: {
          enabled: true,
          folder: "repositories",
          suffix: ".repository",
          template: "repository"
        },
        "use-cases": {
          enabled: true,
          folder: "use-cases",
          suffix: ".use-case",
          template: "use-case"
        }
      },
      createIndex: true,
      indexExports: ["entities", "repositories", "use-cases"]
    };
  }

  saveConfig() {
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
  }

  get language() {
    return this.config.language;
  }

  get locale() {
    return this.config.locale || "pt-BR";
  }

  get baseDir() {
    return this.config.baseDir || "";
  }

  get outputDir() {
    return this.config.outputDir;
  }

  get defaultTypes() {
    return this.config.defaultTypes;
  }

  get templates() {
    return this.config.templates || {};
  }

  get createIndex() {
    return this.config.createIndex !== undefined ? this.config.createIndex : false;
  }

  get indexExports() {
    return this.config.indexExports || [];
  }

  get fileExtension() {
    return this.language === "typescript" ? ".ts" : ".js";
  }

  updateConfig(updates) {
    this.config = { ...this.config, ...updates };
    this.saveConfig();
  }
}
