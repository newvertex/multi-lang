module.exports = function(langFile = './lang.json', defaultLang = 'default', defaultShowError = true) {
  // Keep all the translations on texts variable to have fast easy access
  // Use require instead of fs.readFile to load lang.json file
  let texts = require(process.cwd() + '/' + langFile);

  let module = null;

  let config = {
    lang: defaultLang,
    showError: defaultShowError
  };

  const placeholderRegex = /%{\w+}/g;

  function implant(text, data) {
    return text.replace(placeholderRegex, (item) => {
      return data[item.match(/%{(\w+)}/)[1]] || '';
    });
  }

  module = function __(text, data = {}, lang = config.lang) {
    // Check if data pass as string then use it as lang parameter
    if (typeof data === 'string') {
      lang = data;
      data = {};
    }

    // If on default language then return the same text no need to continue
    if (lang === 'default') {
      // If data exists then replace data object with original text placeholder
      return implant(text, data);
    }

    let result = null;

    // Get current text translations
    let t = texts[text];

    // If current text available then it's have all translations
    if (typeof t !== 'undefined' && t) {
      // Get selected language translation text
      result = t[lang];
    }

    // If we have result then return it or return original text with error
    if (result) {
      // If data exists replace data object with result text placeholder
      return implant(result, data);
    } else {
      if (config.showError) {
        console.error(`The requested translation not found!\n
          Original text: ${text}\nRequested lang: ${lang}\nData object: ${data}`);
        return '__' + text + '__';
      } else {
        return text.replace(placeholderRegex, '');
      }
    }
  }

  module.config = config;
  return module;
}
