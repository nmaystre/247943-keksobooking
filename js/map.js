'use strict';


window.map = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var generateRandomArray = window.data.generateRandomArray();
  var draggablePin = document.querySelector('.pin__main');
  var newAdvAddress;
  for (var i = 0; i < generateRandomArray.length; i++) {
    pinMap.appendChild(window.pin.createPin(generateRandomArray[i]));
  }
  draggablePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      draggablePin.style.top = (draggablePin.offsetTop - shift.y) + 'px';
      draggablePin.style.left = (draggablePin.offsetLeft - shift.x) + 'px';
      newAdvAddress = 'x: ' + draggablePin.style.top + ', y: ' + draggablePin.style.left;
      window.form.advAddress.value = newAdvAddress;
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

