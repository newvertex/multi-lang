# multi-lang
Simple module for Node.js to use equivalent translated string instead of default text or not!  

## Simple example
A simple example with default configuration and demo lang.json file. ([More info](#Installation))
```js
const __ = require('multi-lang');

console.log('Hello'); // output: Hello

console.log(__('Hello')); // output: Hello

console.log(__('Hello', 'fr')); // output: Bonjour
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

## Usage
To using it as node module after installation you have to require it into your script file as normal module.  

### Language file
First of all you have to create a lang.json file to keep all translations on it.  
**A simple lang.json file:**
```json
{
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
**Note:** Language file name is optional you can name it anything else but have to specify on config object. ([More info](#Configuration))

### Importing
You can use `__`(double underscore) to have simple access or any other name you like on loading module into your script like other node modules.  

```js
const __ = require('multi-lang');
```
### Configuration
`filePath`: default value is lang.json file but you can change it to anything you want.  
**Note:** language file have to be a valid json file like above
[example](#Language-file).  

Change all config fields together.  
**Note:** Don't use this if you wan't to change just one field, because all fields are required.

```js
__.config = {
  filePath: './lang.json',
  lang: 'default',
  showError: true
};
```
Change just one field(Change language from default one to fa):  
```js
__.config.lang = 'fa';
```
### `__(text[, lang])`
```js
__('Hello') // return the same text because of default language

__('Hello', 'fa') // return the translated text

__.config.lang = 'fa';
__('Hello') // return the translated text because global lang is set to fa
```
**Note:** If the text or requested lang does not exists in lang.json file, the same text will be returned
