const Store = require('./store.js');
var exp;
var lvl;

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'progress',
  defaults: {
    // 800x600 is the default size of our window
    // windowBounds: { width: 600, height: 400 }
    experience: 0;
  }
});
