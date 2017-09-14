'use strict';

window.pin = (function () {

  var deactivatePins = function () {

    var pins = document.getElementsByClassName('pin');
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('pin--active');
    }
  };

  var createPin = function (element) {
    var pinCopy = document.createElement('div');
    pinCopy.classList.add('pin');
    pinCopy.tabIndex = 0;
    var pinImg = document.createElement('img');
    pinImg.classList.add('rounded');
    pinImg.setAttribute('width', '40');
    pinImg.setAttribute('height', '44');
    pinCopy.appendChild(pinImg);
    pinCopy.style.left = (element.location.x - 20) + 'px';
    pinCopy.style.top = (element.location.y - 40) + 'px';
    pinImg.src = element.author.avatar;

    var activatePin = function () {
      deactivatePins();
      pinCopy.classList.add('pin--active');
    };

    pinCopy.addEventListener('click', function () {
      activatePin();
      window.showcard.showCard(element, function () {
        deactivatePins();
      });
    });

    pinCopy.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        activatePin();
        window.showcard.showCard(element, function () {
          deactivatePins();
        });
      });
    });

    return pinCopy;
  };

  return {
    createPin: createPin,
    deactivatePins: deactivatePins
  };

})();
