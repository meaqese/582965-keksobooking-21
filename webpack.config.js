const path = require('path')

module.exports = {
  entry: [
    './js/debounce.js',
    './js/util.js',
    './js/main.js',
    './js/backend.js',
    './js/data.js',
    './js/form.js',
    './js/photo.js',
    './js/card.js',
    './js/pin.js',
    './js/move.js',
    './js/map.js',
    './js/filters.js'
  ],
  output: {
    'filename': 'bundle.js',
    'path': path.resolve(__dirname),
    'iife': true
  },
  devtool: false
};
