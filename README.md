# `_hka_`
My WordPress Starter Theme
_hka_ is based on Underscores https://underscores.me/

# Getting Started

## Change the name
The first thing you want to do is copy the `_hka_` directory and change the name to something else, and then you'll need to do a six-step find and replace on the name in all the templates.
1. Search for `'_hka'` (inside single quotations) to capture the text domain.
2. Search for `_hka__` to capture all the function names.
3. Search for Text Domain: `_hka` in style.scss.
4. Search for ` _hka_` (with a space before it) to capture DocBlocks.
5. Search for `_hka_-` to capture prefixed handles.
6. Search for `_hka_` to capture the text domain in config.json
 
## Requirements
- [NodeJS](https://nodejs.org/)
- [Gulp](https://gulpjs.com/)

## Install
```
npm install
```

## Run
```
gulp
```

To build sass files separately, run

```
gulp sass
```

Check text domain
```
gulp check-domain
```

To generate *.pot file, run
```
gulp translate
```

Zip
```
gulp zip
```

## Linter tools
#### Require
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)
- [WordPress-Coding-Standards](https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards)

```
npm run eslint
npm run eslint-fix
npm run stylelint
npm run stylelint-fix
npm run phpcs
npm run phpcs-fix
```
