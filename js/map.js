'use strict';


var pinMap = document.querySelector('.tokyo__pin-map');
var pinArray = window.data.generateRandomArray();
for (var i = 0; i < pinArray.length; i++) {
  pinMap.appendChild(window.pin.createPin(pinArray[i]));
}


