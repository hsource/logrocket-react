'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setupReact;

var _reactDom = require('react-dom');

var injectEventPluginsByName = void 0;
// from https://github.com/facebook/react/blob/v16.5.1/packages/react-dom/src/client/ReactDOM.js#L750
var secret = _reactDom.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
if (secret && secret.Events && secret.Events[3]) {
  injectEventPluginsByName = secret.Events[3];
} else {
  injectEventPluginsByName = function injectEventPluginsByName() {
    console.warn('logrocket-react does not work with this version of React');
  };
}

function setupReact() {
  injectEventPluginsByName({
    ResponderEventPlugin: {
      extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent) {
        if (topLevelType !== 'click' || !targetInst) {
          return;
        }

        var currentElement = targetInst.return;

        var names = [];
        while (currentElement && currentElement.type) {
          var name = currentElement.type.displayName || currentElement.type.name;
          if (name) {
            names.push(name);
          }
          currentElement = currentElement.return;
        }

        // eslint-disable-next-line no-param-reassign
        nativeEvent.__lrName = names;
      }
    }
  });
}
module.exports = exports['default'];