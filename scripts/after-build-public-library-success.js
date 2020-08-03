async function runAsync() {
  console.log('Preparing package for NPM...');
  require('./prepare-package');
  console.log('Done preparing package.');
}

module.exports = {
  runAsync
};
