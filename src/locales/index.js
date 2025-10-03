import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const localesCache = {};

/**
 * Carrega um arquivo de locale
 * @param {string} locale - Código do locale (pt-BR, en, etc.)
 * @returns {Object|null} - Objeto com as traduções ou null se não encontrar
 */
export function loadLocale(locale) {
  // Retorna do cache se já foi carregado
  if (localesCache[locale]) {
    return localesCache[locale];
  }

  try {
    const localePath = join(__dirname, `${locale}.json`);
    const content = readFileSync(localePath, 'utf-8');
    const translations = JSON.parse(content);

    // Armazena no cache
    localesCache[locale] = translations;

    return translations;
  } catch (error) {
    console.warn(`⚠️  Locale "${locale}" não encontrado, usando pt-BR como fallback`);

    // Fallback para pt-BR
    if (locale !== 'pt-BR') {
      return loadLocale('pt-BR');
    }

    return null;
  }
}

/**
 * Lista todos os locales disponíveis
 * @returns {string[]} - Array com códigos dos locales disponíveis
 */
export function getAvailableLocales() {
  return ['pt-BR', 'en'];
}
