'use strict';


var pinMap = document.querySelector('.tokyo__pin-map');
var generateNewPin = window.data.generateRandomArray();
for (var i = 0; i < generateNewPin.length; i++) {
  pinMap.appendChild(window.pin.createPin(generateNewPin[i]));
}


