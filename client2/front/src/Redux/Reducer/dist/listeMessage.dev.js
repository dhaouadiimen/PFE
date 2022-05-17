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

function listeMessageReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log("action", action);

  switch (action.type) {
    case _listeMessage.Refresh_Msj:
      return {
        listemessagesBydiscussion: action.payload.listemessagesBydiscussion
      };

    case _constants.PURGE:
      return {};

    default:
      return state;
  }
}