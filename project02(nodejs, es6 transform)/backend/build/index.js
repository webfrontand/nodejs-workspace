'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-polyfill');

var app = (0, _express2.default)();
var port = 3000;

app.use('/api', _routes2.default);

app.listen(port, function () {
  console.log('Expressjs is running on port ' + port + ' !!!!!');
});