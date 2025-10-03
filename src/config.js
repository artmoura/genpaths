import fs from "fs";
import path from "path";

export class ProjectConfig {
  constructor() {
    this.configPath = path.join(process.cwd(), ".genpaths.json");
    this.config = this.loadConfig();
  }

  loadConfig() {
    if (fs.existsSync(this.configPath)) {
      try {
        return JSON.parse(fs.readFileSync(this.configPath, "utf-8"));
      } catch (error) {
        console.warn("⚠️  Arquivo de configuração inválido, usando padrões");
      }
    }

    return {
      language: "typescript",
      baseDir: "src",
      outputDir: "features",
      defaultTypes: ["entities", "hooks", "repositories", "interfaces", "enums"]
    };
  }

  saveConfig() {
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
  }

  get language() {
    return this.config.language;
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

  get fileExtension() {
    return this.language === "typescript" ? ".ts" : ".js";
  }

  updateConfig(updates) {
    this.config = { ...this.config, ...updates };
    this.saveConfig();
  }
}
