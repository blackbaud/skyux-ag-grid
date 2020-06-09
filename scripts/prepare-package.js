const fs = require('fs-extra');
const sass = require('sass');
const tildeImporter = require('node-sass-tilde-importer');
const path = require('path');

function copyScss() {
  const result = sass.renderSync({
    file: path.resolve(__dirname, '../src/app/public/styles/ag-grid-styles.scss'),
    importer: tildeImporter
  });

  const target = path.resolve(__dirname, '../dist/css/sky-ag-grid.css');

  fs.ensureFileSync(target);
  fs.writeFileSync(target, result.css);
}

copyScss();
