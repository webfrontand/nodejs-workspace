'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.message = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function get(url) {
  return new Promise(function (resolve, reject) {
    (0, _request2.default)({
      method: 'GET',
      url: url,
      json: true,
      headers: {
        'User-Agent': 'request'
      }
    }, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

var message = exports.message = function _callee(req, res) {
  var gists;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(get('https://api.github.com/gists/public'));

        case 2:
          gists = _context.sent;

          res.json({
            text: gists,
            alert: "hello world"
          });

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};