const fs = require('fs');

// Current language.json file path
let langFilePath = './lang.json';

// Current selected language, will be used to pick a correct translations
let currentLang = 'default';

// Keep all the translations on texts variable to have fast easy access
let texts = null;

// A flag to check if requested translation not exists return text with symbol
// and output a console.error or not, just return original text
let showError = true;

/**
 * Read language.json file that's contain the list of all translations
 * `lang.json` file should have correct structure to work correct
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
 *
 * @method readLangFile
 * @return {Promise}     use promise.then(json) on call to get data
 */
function readLangFile() {
  return new Promise(function(resolve, reject) {

    fs.readFile(langFilePath, {'encoding': 'utf8'}, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return reject(new Error('lang.json file does not exists, Program will continue with default language'));
        } else {
          return reject(err);
        }
      }

      return resolve(JSON.parse(data));
    });
  });
}

// Read lang file on required
readLangFile()
  .then(json => {
    texts = json;
  })
  .catch(err => {
    console.log(err.message);
  });

function __(text, lang = currentLang) {
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
    // If texts not available then it's on loading, return original text
    console.error('Loading translation, please refresh your call!');
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
