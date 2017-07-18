# 🙏 SlimPHP Kickstart

Simple kickstart repository for a SlimPHP application with gulp tasks, es6,
babel transpiling, minification and so on.

***

## 📄 Installation

- Clone/download this repository.
- Edit `gulpfile.js` to match your projects details.
- Copy `gulpconfig.json.default` to `gulpconfig.json` and set your projects 
  development url here. This will be used by BrowserSync for development.
- Edit `package.json` (project name, details, etc).
- Run `yarn install` to download and install all packages.
- _Optional:_ Add `bower.json` and add packages to your liking.
- Duplicate the `*.default` files inside `app/config/` and remove the `.default`
  ending. Edit if needed. The database file is only needed if you want to use
  MySQL in your project. Enable database usage in `app/dependencies.php` if so.
- If everything went fine see *Gulp tasks* below for development/builds.
- Browse to the above URL or use the browsersync URl to see your app.
- Develop your app, install more yarn or bower packages.
- Be happy and contribute if you like to help 😍 


## 🔨 Gulp tasks

There are three gulp tasks you can run:

- `gulp`
This will start browsersync, compiles your SASS, transpiles your JavaScript
and will then watch for changes in the */src* directory and reload browsersync.

- `gulp build`
This task compiles SASS, transpiles JavaScript, minifies both CSS and JS, 
concatenates everything, minimises your images, bumps the version number etc. 
Afterwards you can deploy/copy/upload the app and run it.

- `gulp clean`
This will clean up your projects build files if something went wrong after a 
build or long time maybe.


## 💬 Legal

- Author: Henning Stein <stein@atomtigerzoo.com>
- License: MIT
