'use strict';

(function () {

  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinArray = window.data.generateRandomArray();
  var draggablePin = document.querySelector('.pin__main');
  var newAdvAddress;
  for (var i = 0; i < pinArray.length; i++) {
    pinMap.appendChild(window.pin.createPin(pinArray[i]));
  }
  draggablePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX - 20,
      y: evt.clientY + 40
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX - 20,
        y: moveEvt.clientY + 40
      };
      var pinPositionLeft = (draggablePin.offsetLeft - shift.x);
      var pinPositionTop = (draggablePin.offsetTop - shift.y);
      draggablePin.style.top = (pinPositionTop - shift.y) + 'px';
      draggablePin.style.left = (pinPositionLeft - shift.x) + 'px';
      newAdvAddress = 'x: ' + pinPositionLeft + ', y: ' + pinPositionTop;
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
