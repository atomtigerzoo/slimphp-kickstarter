# 🙏 SlimPHP Kickstart

Simple kickstart repository for a SlimPHP application with gulp tasks, es6,
babel transpiling, minification and so on.

***

## 📄 Installation

- Clone (or download) this repository
- Edit `gulpfile.js` to match your development url and name
- Edit `bower.json` and `package.json` (project name, your details, etc)
- Run `npm install` to download and install all packages 
  (In some cases you will need to run `npm update` and `node rebuild node-sass` first)
- If everything went fine see *Gulp tasks* for development/build
- Develop your theme, install more npm or bower packages
- Be happy and contribute if you like 😍 


## 🔨 Gulp tasks

There are three gulp tasks you can run:

- `gulp`
This will start browsersync, compiles your SASS, transpiles your JavaScript
and will then watch for changes in the */src* directory and reload browsersync.

- `gulp clean`
This will clean your build folder if something went wrong after a build or if you
just wanted to test a build and keep it from your git.

- `gulp build`
This task compiles SASS, transpiles JavaScript, minifies both CSS and JS, 
concatenates everything, minimises your images, bumps the version number etc. 
Afterwards you can deploy/copy/upload the app and run it.


## 💬 Legal

- Author: Henning Stein <stein@atomtigerzoo.com>
