'use strict';

window.util = (function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  function alertMessage(text) {
    var node = document.createElement('div');
    document.body.appendChild(node);
    node.className = 'alert-message';
    node.style.position = 'fixed';
    node.style.left = 50 + '%';
    node.style.top = 50 + '%';
    node.style.marginLeft = '-150' + 'px';
    node.style.backgroundColor = '#f2f2f2';
    node.style.width = 300 + 'px';
    node.style.padding = 20 + 'px';
    node.style.textAlign = 'center';
    node.innerText = text;
    setTimeout(function () {
      document.body.removeChild(node);
    }, 1000);
  }

  var lastTimeout;
  var debounce = function (fun, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, interval);
  };

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    alertMessage: alertMessage,
    debounce: debounce
  };
})();
