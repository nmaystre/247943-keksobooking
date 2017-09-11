'use strict';

(function () {

  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinArray = [];
  window.backend.load(function (response) {
    pinArray = response;
    var draggablePin = document.querySelector('.pin__main');
    for (var i = 0; i < pinArray.length; i++) {
      pinMap.appendChild(window.pin.createPin(pinArray[i]));
    }
    pinMap.children[1].classList.add('pin--active');
    window.showcard.showCard(pinArray[0], function () {
      window.pin.deactivatePins();
    });
    draggablePin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX + 20,
        y: evt.clientY - 40
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
        var pinPositionLeft = (draggablePin.offsetLeft - shift.x);
        var pinPositionTop = (draggablePin.offsetTop - shift.y);
        draggablePin.style.top = pinPositionTop + 'px';
        draggablePin.style.left = pinPositionLeft + 'px';
        window.form.advAddress.value = 'x: ' + pinPositionLeft + ', y: ' + pinPositionTop;
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
})();
