'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  window.debounce = function (func, params) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      func(params);
    },
    DEBOUNCE_INTERVAL);
  };
})();
