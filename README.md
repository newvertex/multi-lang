# multi-lang
[![NPM](https://nodei.co/npm/multi-lang.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/multi-lang/)  

Simple module for Node.js to use equivalent translated string, Specify language on function call as optional argument or just specify it with config file, switch between any translation with just use function `lang` argument.  

[Persian version of readme is on my blog](http://newvertex.blog.ir/post/%D8%A7%D9%86%D8%AA%D8%B4%D8%A7%D8%B1-%D9%85%D8%A7%DA%98%D9%88%D9%84-multi-lang)

## Simple example
A simple example with default configuration and demo lang.json file. ([More info](#installation))
```js
const __ = require('multi-lang')();

console.log('Hello'); // output: Hello

console.log(__('Hello')); // output: Hello

console.log(__('Hello', 'fr')); // output: Bonjour

__.config.lang = 'en';

console.log(__('name-prompt')); // output: Enter your name please

console.log(__('name-prompt', 'fa')); // output: لطفا نام خود را وارد نمایید

console.log(__('name-prompt', 'fr')); // output: Entrez votre nom s'il vous plaît
```

### How to use
1. Create a valid lang.js file
2. Import module
3. Set `config.lang` to your selected language
4. Call `__('Your text')` to get translated text

## Installation
with npm:
```bash
$ npm install --save multi-lang    

```
or with yarn:  
```
$ yarn add multi-lang
```

### Language file
First of all you have to create a lang.json file to keep all translations on it.  
**A simple lang.json file:**
```json
{
  "name-prompt": {
    "en": "Enter your name please",
    "fa": "لطفا نام خود را وارد نمایید",
    "fr": "Entrez votre nom s'il vous plaît"
  },
  "Welcome": {
    "fa": "خوش آمدید",
    "fr": "Bienvenue"
  },
  "Hello": {
    "fa": "سلام",
    "fr": "Bonjour"
  }
}
```
**Note:** Language file name is optional you can name it anything else but have to specify it on require module. ([More info](#configuration))

### Importing
You can use `__`(double underscore) to have simple access or any other name you like on loading module into your script like other node modules, you can pass language.json file as argument to module when importing it.  

```js
const __ = require('multi-lang')(); // Import module with default lang.json file

const __ = require('multi-lang')('your-lang-file.json'); // Import module with your-lang-file.json file

```
**Note:** language file have to be a valid json file like above
[example](#language-file).  

### Configuration
Change all config fields together.  
**Note:** Don't use this if you wan't to change just one field, because all fields are required.

```js
__.config = {
  lang: 'default',
  showError: true
};
```
Change just one field(Change language from default one to fa):  
```js
__.config.lang = 'fa';
```
### Get translated text with `__(text[, lang])`
```js
__('Hello') // return the same text because of default language

__('Hello', 'fa') // return the translated text

__.config.lang = 'fa';
__('Hello') // return the translated text because global lang is set to fa
```
**Note:** If the text or requested lang does not exists in lang.json file, the same text will be returned  
**Note:** To use original text instead of translations text you have to set `lang` argument to `default`
