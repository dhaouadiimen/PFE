"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listeMessageReducer = listeMessageReducer;

var _constants = require("redux-persist/lib/constants");

var _listeMessage = require("../Actions/listeMessage");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//0679136800 
var initialState = {
  listemessagesBydiscussion: []
};

var getMessages = function getMessages() {
  var res;
  return regeneratorRuntime.async(function getMessages$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("http://localhost:3000/message/62752a322047424709a53c05"));

        case 3:
          res = _context.sent;
          console.log("resss", res.data);
          return _context.abrupt("return", res);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

function listeMessageReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === _listeMessage.Refresh_Msj) {
    getMessages();
  }

  ;
  console.log("action", action);

  switch (action.type) {
    case _listeMessage.Refresh_Msj:
      return {
        listemessagesBydiscussion: []
      };

    case _constants.PURGE:
      return {};

    default:
      return state;
  }
}