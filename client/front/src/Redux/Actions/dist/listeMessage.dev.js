"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoRefreshMessage = exports.Refresh_Msj = void 0;

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _reduxPersist = require("redux-persist");

var _icons = require("@material-ui/icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Refresh_Msj = 'Refresh_Msj';
exports.Refresh_Msj = Refresh_Msj;

var AutoRefreshMessage = function AutoRefreshMessage() {
  return {
    type: Refresh_Msj,
    payload: {}
  };
};

exports.AutoRefreshMessage = AutoRefreshMessage;