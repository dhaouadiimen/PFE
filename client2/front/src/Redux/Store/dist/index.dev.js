"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanStore = cleanStore;
exports["default"] = exports.getState = exports.persistor = exports.store = exports.logger = exports.persistConfig = void 0;

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _redux = require("redux");

var _reduxPersist = require("redux-persist");

var _axios = _interopRequireDefault(require("axios"));

var _reduxLogger = require("redux-logger");

var _discussion = require("../Reducer/discussion");

var _profile = require("../Reducer/profile");

var _listeMessage = require("../Reducer/listeMessage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var persistConfig = {
  key: 'root',
  whitelist: [''],
  storage: _storage["default"],
  version: 1,
  blacklist: []
};
exports.persistConfig = persistConfig;
var persistedReducer = (0, _reduxPersist.persistReducer)(persistConfig, (0, _redux.combineReducers)({
  listemessagesBydiscussion: _listeMessage.listeMessageReducer,
  //discussion:discussionReducer,
  profile: _profile.profileReducer
}));
var logger = (0, _reduxLogger.createLogger)({});
exports.logger = logger;
var store = (0, _redux.createStore)(persistedReducer, (0, _redux.applyMiddleware)(logger));
exports.store = store;
var persistor = (0, _reduxPersist.persistStore)(store);
exports.persistor = persistor;

function cleanStore() {
  return regeneratorRuntime.async(function cleanStore$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(persistor.purge());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(persistor.flush());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(persistor.persist());

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(store.dispatch({
            type: _reduxPersist.REHYDRATE
          }));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

var getState = function getState() {
  return store.getState();
};

exports.getState = getState;
var _default = {
  store: store,
  getState: getState,
  persistor: persistor
};
exports["default"] = _default;