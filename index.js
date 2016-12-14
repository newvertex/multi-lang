/**
 * e.g. lang.json:
 * {
 *   "Welcome": {
 *     "fa": "خوش آمدید",
 *     "fr": "Bienvenue"
 *   },
 *   "Hello": {
 *     "fa": "سلام",
 *     "fr": "Bonjour"
 *   }
 * }
 */

let config = {
  filePath: './lang.json',
  lang: 'default',
  showError: true
};

// Keep all the translations on texts variable to have fast easy access
// Use require instead of fs.readFile to load lang.json file
let texts = require(config.filePath);

function __(text, lang = config.lang) {
  console.log(config.lang);
  // If on default language then return the same text no need to continue
  if (lang === 'default') {
    return text;
  }

  let result = null;

  // If texts load correctly then can access to it's fields
  if (texts) {
    // Get current text translations
    let t = texts[text];

    // If current text available then it's have all translations
    if (typeof t !== 'undefined' && t) {
      // Get selected language translation text
      result = t[lang];
    }
  } else {
    // If texts not available then it's not loaded, return original text
    console.error(`Cant access to ${config.filePath}!`);
    return text;
  }

  // If we have result then return it or return original text with error
  if (result) {
    return result;
  } else {
    if (showError) {
      console.error(`The requested translation not found!\nOriginal text: ${text}\nRequested lang: ${lang}`);
      return '__' + text + '__';
    } else {
      return text;
    }
  }
}

module.exports = __;
module.exports.config = config;
