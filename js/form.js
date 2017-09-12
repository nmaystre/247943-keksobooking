'use strict';

window.form = (function () {
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

  var syncValues = function (element, value) {
    element.value = value;
  };
  window.synchronizeFields(advCheckin, advCheckout, window.data.ITEM_CHECKIN, window.data.ITEM_CHECKOUT, syncValues);
  window.synchronizeFields(advCheckout, advCheckin, window.data.ITEM_CHECKOUT, window.data.ITEM_CHECKIN, syncValues);

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  window.synchronizeFields(advType, advPrice, ['flat', 'house', 'bungalo', 'palace'], ['1000', '5000', '0', '10000'], syncValueWithMin);
  window.synchronizeFields(advType, advPrice, ['flat', 'house', 'bungalo', 'palace'], ['1000', '5000', '0', '10000'], syncValues);
  window.synchronizeFields(advRooms, advGuests, ['1', '2', '3', '100'], ['1', '2', '3', '0'], syncValues);
  window.synchronizeFields(advGuests, advRooms, ['1', '2', '3', '0'], ['1', '2', '3', '100'], syncValues);

  var loadDataCb = function () {
    window.util.alertMessage('данные успешно отправлены!');
    userAdv.reset();
  };
  var errorDataCb = function () {
    window.util.alertMessage('произошла ошибка!');
  };

  userAdv.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(userAdv), loadDataCb, errorDataCb);
    evt.preventDefault();
  });


  return {
    advAddress: advAddress
  };

})();
