"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discussionReducer = discussionReducer;

var _constants = require("redux-persist/lib/constants");

var _Discussions = _interopRequireDefault(require("../../components/discussions/Discussions"));

var _discussion = require("../Actions/discussion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//import {Messenger} from "../../pages/Messenger/Messenger.jsx"
//0679136800 
var initialState = {
  discussion: {}
};

function discussionReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log("action", action);

  switch (action.type) {
    case _discussion.Refresh_Discu:
      return _objectSpread({}, state, {
        discussion: action.payload.discussion
      });

    case _constants.PURGE:
      return {};

    default:
      return state;
  }
}