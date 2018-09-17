// install dependencies for fx-extra and concat, since ng6 doesn't support
// porting yet
const fs = require('fs-extra');
const concat = require('concat');

// use async for production build
(async function build() {
  // register data to be concatinated
  const files = [
    './dist/AngularElement/runtime.js',
    './dist/AngularElement/polyfills.js',
    './dist/AngularElement/main.js'
  ];

  // ensure a directory named "poll", create if none
  await fs.ensureDir('poll');
  // concatinate files into a single Js file
  await concat(files, 'poll/poll.js');
  // copy styling from dist folder, since I used ViewEncapsulation, this is not necessary
  // await fs.copyFile('./dist/AngularElement/styles.css', 'poll/styles.css');
  // copy asset files from the dist folder asset directory to the "poll" directory
  await fs.copy('./dist/AngularElement/assets/img/', 'poll');
})();
