import { loadLocale, getAvailableLocales } from './locales/index.js';

let currentLocale = 'pt-BR';
let translations = loadLocale('pt-BR');

/**
 * Define o locale atual e carrega as traduções
 * @param {string} locale - Código do locale (pt-BR, en, etc.)
 */
export function setLocale(locale) {
  const loadedTranslations = loadLocale(locale);
  if (loadedTranslations) {
    currentLocale = locale;
    translations = loadedTranslations;
  }
}

/**
 * Retorna o locale atual
 * @returns {string} - Código do locale atual
 */
export function getLocale() {
  return currentLocale;
}

/**
 * Traduz uma chave usando dot notation
 * @param {string} key - Chave da tradução (ex: 'prompt.language', 'message.configSaved')
 * @param {...any} args - Argumentos para substituição de variáveis {0}, {1}, etc.
 * @returns {string} - Texto traduzido
 */
export function t(key, ...args) {
  // Navega pelo objeto usando dot notation
  const keys = key.split('.');
  let translation = translations;

  for (const k of keys) {
    if (translation && typeof translation === 'object') {
      translation = translation[k];
    } else {
      // Se não encontrar, retorna a chave
      console.warn(`⚠️  Tradução não encontrada: ${key}`);
      return key;
    }
  }

  // Se a tradução não foi encontrada, retorna a chave
  if (translation === undefined || translation === null) {
    console.warn(`⚠️  Tradução não encontrada: ${key}`);
    return key;
  }

  // Se for um objeto, não pode ser traduzido diretamente
  if (typeof translation === 'object') {
    console.warn(`⚠️  Chave incompleta, esperado string mas recebeu objeto: ${key}`);
    return key;
  }

  // Suporte a substituição de variáveis {0}, {1}, etc.
  if (args.length > 0) {
    return translation.replace(/\{(\d+)\}/g, (match, index) => {
      return args[index] !== undefined ? args[index] : match;
    });
  }

  return translation;
}

/**
 * Retorna lista de locales suportados
 * @returns {string[]} - Array com códigos dos locales disponíveis
 */
export function getSupportedLocales() {
  return getAvailableLocales();
}
