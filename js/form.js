'use strict';

window.form = (function () {
  var ITEM_CHECKIN = ['12:00', '13:00', '14:00'];
  var ITEM_CHECKOUT = ['12:00', '13:00', '14:00'];
  var userAdv = document.querySelector('.notice__form');
  var advTitle = userAdv.querySelector('#title');
  var advPrice = userAdv.querySelector('#price');
  var advAddress = userAdv.querySelector('#address');
  var advType = userAdv.querySelector('#type');
  var advRooms = userAdv.querySelector('#room_number');
  var advGuests = userAdv.querySelector('#capacity');
  var advCheckin = userAdv.querySelector('#timein');
  var advCheckout = userAdv.querySelector('#timeout');

  advTitle.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  advAddress.addEventListener('invalid', function () {
    if (!advAddress.validity.valid) {
      if (advAddress.validity.valueMissing) {
        advAddress.setCustomValidity('Обязательное поле');
      }
    } else {
      advAddress.setCustomValidity('');
    }
  });

  advPrice.addEventListener('invalid', function () {
    if (!advPrice.validity.valid) {
      if (advPrice.validity.valueMissing) {
        advPrice.setCustomValidity('Обязательное поле');
      }
    } else {
      advPrice.setCustomValidity('');
    }
  });

  function syncValues(element, value) {
    element.value = value;
  }

  function syncValuesWithDisabled(element, valueArray) {
    var optionsList = element.children;
    [].forEach.call(optionsList, function (it) {
      var value = it.value;
      it.disabled = false;
      if (valueArray.indexOf(value) === -1) {
        it.disabled = true;
        it.selected = false;
      }
    });
  }

  function syncValuesWithMin(element, value) {
    element.min = value;
  }

  window.synchronizeFields(advCheckin, advCheckout, ITEM_CHECKIN, ITEM_CHECKOUT, syncValues);

  window.synchronizeFields(advCheckout, advCheckin, ITEM_CHECKOUT, ITEM_CHECKIN, syncValues);

  window.synchronizeFields(advType, advPrice, ['flat', 'house', 'bungalo', 'palace'], ['1000', '10000', '0', '10000'], syncValuesWithMin);

  window.synchronizeFields(advType, advPrice, ['flat', 'house', 'bungalo', 'palace'], ['1000', '10000', '0', '10000'], syncValues);

  window.synchronizeFields(advRooms, advGuests, ['100'], ['0'], syncValues);

  window.synchronizeFields(advRooms, advGuests, ['1', '2', '3', '100'], ['1', ['1', '2'], ['1', '2', '3'], '0'], syncValuesWithDisabled);


  function loadDataCb(text) {
    window.util.alertMessage(text);
    userAdv.reset();
    window.map.setCoords(window.map.defoltPinCoordX, window.map.defoltPinCoordY);
  }
  function errorDataCb(text) {
    window.util.alertMessage(text);
  }

  userAdv.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(userAdv), loadDataCb, errorDataCb);
    evt.preventDefault();
  });


  return {
    advAddress: advAddress
  };

})();
