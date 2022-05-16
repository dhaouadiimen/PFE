"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageService = MessageService;

var _axios = _interopRequireDefault(require("axios"));

var _axiosInstance = require("../Config/axios-instance");

var _Urls = require("../Urls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function MessageService(id) {
  var response;
  return regeneratorRuntime.async(function MessageService$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axiosInstance.isAuthInstance.get((0, _Urls.getMessageUrl)(id)));

        case 3:
          response = _context.sent;
          console.log("**********", response);
          return _context.abrupt("return", response);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log('resp errro====>', _context.t0);
          return _context.abrupt("return", _context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}