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

  advCheckin.addEventListener('change', function () {
    var newAdvCheckin = advCheckin.value;
    advCheckout.value = newAdvCheckin;
  });

  advCheckout.addEventListener('change', function () {
    var newAdvCheckout = advCheckout.value;
    advCheckin.value = newAdvCheckout;
  });

  advType.addEventListener('change', function () {
    var newAdvType = advType.value;
    switch (newAdvType) {
      case 'flat':
        advPrice.min = '1000';
        advPrice.value = '1000';
        break;
      case 'bungalo':
        advPrice.min = '0';
        advPrice.value = '0';
        break;
      case 'house':
        advPrice.min = '5000';
        advPrice.value = '5000';
        break;
      case 'palace':
        advPrice.min = '10000';
        advPrice.value = '10000';
    }
  });

  advRooms.addEventListener('change', function () {
    var newAdvRooms = advRooms.value;
    switch (newAdvRooms) {
      case '1':
        advGuests.value = '1';
        break;
      case '2':
        advGuests.value = '2';
        break;
      case '3':
        advGuests.value = '3';
        break;
      case '100':
        advGuests.value = '0';
    }
  });

  advGuests.addEventListener('change', function () {
    var newAdvGuests = advGuests.value;
    switch (newAdvGuests) {
      case '1':
        advRooms.value = '1';
        break;
      case '2':
        advRooms.value = '2';
        break;
      case '3':
        advRooms.value = '3';
        break;
      case '0':
        advRooms.value = '100';
    }
  });

  return {
    advAddress: advAddress
  };

})();
