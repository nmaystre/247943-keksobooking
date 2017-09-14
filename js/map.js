'use strict';

(function () {
  var housingFiltersList = document.querySelector('.tokyo__filters');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var advList = [];
  var successHandler = function (response) {
    advList = response;
    mapUpdate();
  };
  var errorDataCb = function (text) {
    window.util.alertMessage(text);
  };

  window.backend.load(successHandler, errorDataCb);

  console.log(advList);

  function formDataUpdate() {
    var housingTypeValue = document.querySelector('#housing_type').value;
    var housingPriceValue = document.querySelector('#housing_price').value;
    var housingRoomValue = document.querySelector('#housing_room-number').value;
    var housingGuestValue = document.querySelector('#housing_guests-number').value;
    var housingFeaturesValues = [].map.call(document.querySelector('#housing_features').children, function (it) {
      return [it.children[0].value, it.children[0].checked];
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
    });

      // .filter(function (it) {
      //
      //   if (housingFeaturesValues.filter(function (it) {
      //       return (it[1] === true);
      //     }).length === 0) {
      //     return true;
      //   }
      //
      //   var hasItem = function(x, array){
      //     var found = false;
      //     array.forEach(function(it){ if (it === x){ found = true; } });
      //     return found;
      //   }
      //
      //   var ok = true;
      //   for (var i = 0; i < housingFeaturesValues.length; i++)
      //       if (housingFeaturesValues[i][1] === true) {
      //         var found = hasItem(housingFeaturesValues[i][0], it.offer.features);
      //         ok = ok && found;
      //       }
      //
      //
      //   return ok;
      // }
      // );

    return filteredData;
  }
  console.log(formDataUpdate());
  console.log(filteredData);

  function mapUpdate() {
    // var housingTypeValue = document.querySelector('#housing_type').value;
    // var housingPriceValue = document.querySelector('#housing_price').value;
    // var housingRoomValue = document.querySelector('#housing_room-number').value;
    // var housingGuestValue = document.querySelector('#housing_guests-number').value;
    // var housingFeaturesValues = [].map.call(document.querySelector('#housing_features').children, function (it) {
    //   return [it.children[0].value, it.children[0].checked];
    // });


    // var filteredData = advList.filter(function (it) {
    //   if (housingTypeValue === 'any') {
    //     return true;
    //   }
    //   return it.offer.type === housingTypeValue;
    // }).filter(function (it) {
    //   switch (housingPriceValue) {
    //     case 'any':
    //       return true;
    //     case 'middle':
    //       return (it.offer.price > 10000) && (it.offer.price <= 50000);
    //     case 'low':
    //       return (it.offer.price <= 10000);
    //     case 'high':
    //       return (it.offer.price > 50000);
    //   }
    //   return it.offer.price === housingPriceValue;
    // }).filter(function (it) {
    //   if (housingRoomValue === 'any') {
    //     return true;
    //   }
    //   return (it.offer.rooms === parseInt(housingRoomValue, 10));
    // }).filter(function (it) {
    //   if (housingGuestValue === 'any') {
    //     return true;
    //   }
    //   return it.offer.guests === parseInt(housingGuestValue, 10);
    // });


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
    emptyMap();
    mapUpdate();
  });

  // var filterArray = [
  //   '#housing_type',
  //   '#housing_price',
  //   '#housing_room-number',
  //   '#housing_guests-number'
  // ];

  // filterArray.map(function (it) {
  //   return document.querySelector(it);
  // }).forEach(function (it) {
  //   it.onchange = function () {
  //     emptyMap();
  //     window.backend.load(mapUpdate, errorDataCb);
  //   };
  // });
  //
  // [].forEach.call(document.querySelector('#housing_features').children, function(it) {
  //   it.children[0].onclick = function() {
  //     emptyMap();
  //     window.backend.load(mapUpdate, errorDataCb);
  //   };
  // });

  var emptyMap = function () {
    var pins = pinMap.querySelectorAll('.pin:not(.pin__main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].parentNode.removeChild(pins[i]);
    }
  };
})();
