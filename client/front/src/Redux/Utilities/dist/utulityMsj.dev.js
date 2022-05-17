"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostMessage = exports.GetMessage = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _messagesService = require("../../Services/messagesService");

var _listeMessage = require("../Actions/listeMessage");

var GetMessage = function GetMessage(dispatch, discussionId) {
  var resp;
  return regeneratorRuntime.async(function GetMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _messagesService.MessageService)(discussionId));

        case 2:
          resp = _context.sent;
          console.log("ressssssspp", resp);

          if (resp.status === 200) {
            console.log("okkkkkk");
            dispatch((0, _listeMessage.AutoRefreshMessage)(resp.data.listemessagesBydiscussion));
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.GetMessage = GetMessage;

var PostMessage = function PostMessage(dispatch, discussionId) {
  var resp;
  return regeneratorRuntime.async(function PostMessage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _messagesService.PostMessageService)(discussionId));

        case 2:
          resp = _context2.sent;
          console.log("ressssssspp!!!!!!!!!!!!!!!!!!!!!!!!!!!", resp);

          if (resp.status === 200) {
            console.log("o:::::::::::::::::::::::::::::::::::::::");
            dispatch((0, _listeMessage.AutoRefreshMessage)(resp.data.listemessagesBydiscussion));
          }

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.PostMessage = PostMessage;