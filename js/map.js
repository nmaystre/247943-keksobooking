'use strict';


window.map = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var generateRandomArray = window.data.generateRandomArray();
  for (var i = 0; i < generateRandomArray.length; i++) {
    pinMap.appendChild(window.pin.createPin(generateRandomArray[i]));
  }
})();
