# multi-lang
[![NPM](https://nodei.co/npm/multi-lang.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/multi-lang/)  

Simple module for Node.js to use equivalent translated string, Specify language on function call as optional argument or just specify it with config file, switch between any translation with just use function `lang` argument.  

[Persian version of readme is on my blog](http://newvertex.blog.ir/post/%D8%A7%D9%86%D8%AA%D8%B4%D8%A7%D8%B1-%D9%85%D8%A7%DA%98%D9%88%D9%84-multi-lang)

## Simple example
A simple example with default configuration and demo lang.json file. ([More info](#installation))  
In this example we use [sample lang.json](#language-file) file is in this page
```js
const __ = require('multi-lang')();

console.log('Hello'); // output: Hello

console.log(__('Hello')); // output: Hello

console.log(__('Hello', 'fr')); // output: Bonjour

__.config.lang = 'en';

console.log(__('name-prompt')); // output: Enter your name please

console.log(__('name-prompt', 'fa')); // output: لطفا نام خود را وارد نمایید

console.log(__('name-prompt', 'fr')); // output: Entrez votre nom s'il vous plaît

// Use placeholder

let introMarty = __('intro', {name: 'Marty', age: 10}); // introMarty = "Hello my name is Marty, I'm 10 years old!"

let introAlex = __('intro', {name: 'Alex', age: 11}); // introAlex = "Hello my name is Alex, I'm 11 years old!"

let introEmpty = __('intro', 'fa'); // introEmpty = "سلام اسم من است، سن من " , because there is no data object send to it the placeholders removed and just text returned

let memlanInfo = {
  name: 'Melman',
  age: '12'
};

let introMelmanFa = __('simpleIntro', melmanInfo, 'fa');  // introMelmanFa = "سلام اسم من melman "

let introMelmanFr = __('simpleIntro', melmanInfo, 'fr');  // introMelmanFr = "simpleIntro" , because there is no fr defined in lang.json file

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
* You can use your full text as key to access translated or the same text.
* You can add a simple specific text as key to get translated text.(Recommended)
* you can use `%{object-key-name}` as a placeholder on the key or any of translations texts, if you do this you can pass data on function call to populate the string and get a formated text with data.(Recommended)

**A simple lang.json file:**
```json
{
  "simpleIntro": {
    "en": "Hello I'm %{name}",
    "fa": "سلام اسم من %{name}"
  },
  "intro": {
    "en": "Hello my name is %{name}, I'm %{age} years old!",
    "fa": "سلام اسم من %{name}است، سن من %{age}"
  },
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
### Get translated text with `__(text[data, lang])`
```js
__('Hello') // return the same text because of default language

__('Hello', 'fa') // return the translated text

__('intro', {name: 'Gloriya'}, 'en')  // return intro text with replaced name placeholder with name passed as data  

__.config.lang = 'fa';
__('Hello') // return the translated text because global lang is set to fa

```
**Note:** If the text or requested lang does not exists in lang.json file, the same text will be returned  
**Note:** To use original text instead of translations text you have to set `lang` argument to `default`
