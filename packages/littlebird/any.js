'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = any;

var _concurrent = require('./__internal__/concurrent');

var _concurrent2 = _interopRequireDefault(_concurrent);

var _SubError = require('./__internal__/SubError');

var _SubError2 = _interopRequireDefault(_SubError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function any(iterable) {
  var winner = void 0;

  return Promise.resolve(iterable).then((0, _concurrent2.default)({
    breakOnError: false,
    onResolved: function onResolved(value) {
      winner = value;
    },

    onCompleted: function onCompleted(done, throws) {
      return function (count, values, errors) {
        if (winner) {
          done(winner);
        } else if (errors.length === values.length) {
          throws(new _SubError2.default(errors));
        }
      };
    }
  }));
}