'use strict';

(function () {
  var housingFiltersList = document.querySelector('.tokyo__filters');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var advList = [];
  var debounceInterval = 500;

  var successHandler = function (response) {
    advList = response;
    mapUpdate();
  };

  var errorDataCb = function (text) {
    window.util.alertMessage(text);
  };

  window.backend.load(successHandler, errorDataCb);

  function mapUpdate() {
    var housingTypeValue = document.querySelector('#housing_type').value;
    var housingPriceValue = document.querySelector('#housing_price').value;
    var housingRoomValue = document.querySelector('#housing_room-number').value;
    var housingGuestValue = document.querySelector('#housing_guests-number').value;
    var housingFeaturesValues = {};
    [].forEach.call(document.querySelector('#housing_features').children, function (it) {
      // return [it.children[0].value, it.children[0].checked];
      housingFeaturesValues[it.children[0].value] = it.children[0].checked;
    });

    var filteredData = advList.filter(function (it) {
      if (housingTypeValue === 'any') {
        return true;
      }
      return it.offer.type === housingTypeValue;
    }).filter(function (it) {
      switch (housingPriceValue) {
        case 'any':
          return true;
        case 'middle':
          return (it.offer.price > 10000) && (it.offer.price <= 50000);
        case 'low':
          return (it.offer.price <= 10000);
        case 'high':
          return (it.offer.price > 50000);
      }
      return it.offer.price === housingPriceValue;
    }).filter(function (it) {
      if (housingRoomValue === 'any') {
        return true;
      }
      return (it.offer.rooms === parseInt(housingRoomValue, 10));
    }).filter(function (it) {
      if (housingGuestValue === 'any') {
        return true;
      }
      return it.offer.guests === parseInt(housingGuestValue, 10);
    }).filter(function (it) {
      return Object.keys(housingFeaturesValues).map(function (el) {
        if (housingFeaturesValues[el] === false) {
          return true;
        }
        return it.offer.features.includes(el);
      }).reduce(function (acc, ok) {
        return acc && ok;
      }, true);
    });

    var pinArray = filteredData;
    var draggablePin = document.querySelector('.pin__main');

    for (var i = 0; i < pinArray.length; i++) {
      pinMap.appendChild(window.pin.createPin(pinArray[i]));
    }

    if (pinMap.children.length > 1) {
      pinMap.children[1].classList.add('pin--active');
      window.showcard.showCard(pinArray[0], function () {
        window.pin.deactivatePins();
      });
    }

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
  }

  housingFiltersList.addEventListener('change', function () {
    window.util.debounce(function () {
      emptyMap();
      mapUpdate();
    }, debounceInterval);
  });

  var emptyMap = function () {
    var pins = pinMap.querySelectorAll('.pin:not(.pin__main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].parentNode.removeChild(pins[i]);
    }
  };
})();
