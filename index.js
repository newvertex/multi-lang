const fs = require('fs');

// Current language.json file path
let langFilePath = './lang.json';

// Current selected language, will be used to pick a correct translations
let lang = 'default';

// Keep all the translations on texts variable to have fast easy access
let texts = null;

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
