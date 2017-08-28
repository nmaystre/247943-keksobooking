'use strict';

var ITEM_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ITEM_TYPE = ['flat', 'house', 'bungalo'];
var ITEM_CHECKIN = ['12:00', '13:00', '14:00'];
var ITEM_CHECKOUT = ['12:00', '13:00', '14:00'];
var ITEM_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var randomArray = [];
var pinMap = document.querySelector('.tokyo__pin-map');
var template = document.querySelector('#lodge-template').content;
var dialogPanelParent = document.querySelector('#offer-dialog');
var cardCloseBtn = dialogPanelParent.querySelector('.dialog__close');

var userAdv = document.querySelector('.notice__form');
var advTitle = userAdv.querySelector('#title');
var advPrice = userAdv.querySelector('#price');
var advAddress = userAdv.querySelector('#address');
var advType = userAdv.querySelector('#type');
var advRooms = userAdv.querySelector('#room_number');
var advGuests = userAdv.querySelector('#capacity');
var advCheckin = userAdv.querySelector('#timein');
var advCheckout = userAdv.querySelector('#timeout');


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomFeatures = function () {
  var firstRandomFeature = getRandomNumber(0, ITEM_FEATURES.length);
  var lastRandomFeature = getRandomNumber(firstRandomFeature, ITEM_FEATURES.length);
  var newItemFeatures = ITEM_FEATURES.slice(firstRandomFeature, lastRandomFeature);
  return newItemFeatures;
};

var generateItem = function (i) {
  var randomItem = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: ITEM_TITLE[getRandomNumber(0, ITEM_TITLE.length)],
      address: 'location.' + getRandomNumber(900, 300) + ', location.' + getRandomNumber(100, 50),
      price: getRandomNumber(1000, 1000000),
      type: ITEM_TYPE[getRandomNumber(0, ITEM_TYPE.length)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 5),
      checkin: ITEM_CHECKIN[getRandomNumber(0, ITEM_CHECKIN.length)],
      checkout: ITEM_CHECKOUT[getRandomNumber(0, ITEM_CHECKOUT.length)],
      features: getRandomFeatures(),
      description: '',
      photos: []
    },
    location: {
      x: getRandomNumber(300, 900),
      y: getRandomNumber(100, 500)
    }
  };
  return randomItem;
};

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
  pinCopy.style.top = (element.location.y + 40) + 'px';
  pinImg.src = element.author.avatar;

  var activatePin = function () {
    deactivatePins();
    pinCopy.classList.add('pin--active');
  };
  var showCard = function () {
    dialogPanelParent.classList.remove('hidden');
    var newContent = createCard(element);
    var dialogPanel = document.querySelector('.dialog__panel');
    dialogPanelParent.replaceChild(newContent, dialogPanel);
  };
  pinCopy.addEventListener('click', function () {
    activatePin();
    showCard();
  });
  pinCopy.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activatePin();
      showCard();
    }
  });
  return pinCopy;
};

var createCard = function (obj) {
  var dialogPanelContent = template.cloneNode(true);
  dialogPanelContent.querySelector('.lodge__title').innerHTML = obj.offer.title;
  dialogPanelContent.querySelector('.lodge__price').innerHTML = obj.offer.price + '&#x20bd;/ночь';
  var lodgeType;
  switch (obj.offer.type) {
    case 'flat':
      lodgeType = 'Квартира';
      break;
    case 'bungalo':
      lodgeType = 'Бунгало';
      break;
    case 'house':
      lodgeType = 'Дом';
      break;
    default:
      lodgeType = 'Хз что это';
  }

  dialogPanelContent.querySelector('.lodge__type').textContent = lodgeType;
  dialogPanelContent.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + obj.offer.guests + ' гостей в ' + obj.offer.rooms + ' комнатах';
  dialogPanelContent.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + obj.offer.checkin + ' выезд до ' + obj.offer.checkout;

  for (i = 0; i < obj.offer.features.length; i++) {
    var featuresSpan = document.createElement('span');
    featuresSpan.classList.add('feature__image', 'feature__image--' + obj.offer.features[i]);
    dialogPanelContent.querySelector('.lodge__features').appendChild(featuresSpan);
  }

  var templateAvatar = document.querySelector('.lodge__description');
  var lodgeDescriptionContent = templateAvatar.cloneNode(true);
  lodgeDescriptionContent.textContent = obj.offer.description;

  var dialogTitle = document.querySelector('.dialog__title');
  var dialogTitleContent = dialogTitle.children[0];
  dialogTitleContent.src = obj.author.avatar;

  document.addEventListener('keydown', onCardEscPress);
  return dialogPanelContent;
};

var onCardEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
};

var closeCard = function () {
  dialogPanelParent.classList.add('hidden');
  deactivatePins();
  document.removeEventListener('keydown', onCardEscPress);
};

cardCloseBtn.addEventListener('click', function () {
  closeCard();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
});

cardCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeCard();
  }
});

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

advCheckin.addEventListener('input', function () {
  var newAdvCheckin = advCheckin.value;
  advCheckout.value = newAdvCheckin;
});

advType.addEventListener('input', function () {
  var newAdvType = advType.value;
  switch (newAdvType) {
    case 'flat':
      advPrice.minLength = '1000';
      advPrice.placeholder = '1000';
      break;
    case 'bungalo':
      advPrice.minLength = '0';
      advPrice.placeholder = '0';
      break;
    case 'house':
      advPrice.minLength = '5000';
      advPrice.placeholder = '5000';
      break;
    case 'palace':
      advPrice.minLength = '10000';
      advPrice.placeholder = '10000';
  }
});

advRooms.addEventListener('input', function () {
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

advGuests.addEventListener('input', function () {
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

var customValidation = function () {
  invalidities: [],
    
}

for (var i = 0; i < 8; i++) {
  randomArray[i] = generateItem(i);
  pinMap.appendChild(createPin(randomArray[i]));
}

