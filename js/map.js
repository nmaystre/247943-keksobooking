'use strict';

var ITEM_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ITEM_TYPE = ['flat', 'house', 'bungalo'];
var ITEM_CHECKIN = ['12:00', '13:00', '14:00'];
var ITEM_CHECKOUT = ['12:00', '13:00', '14:00'];
var ITEM_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var features = [];
var randomItem = {};
var randomArray = [];

var pinMap = document.querySelector('.tokyo__pin-map');
var pin = pinMap.querySelector('.pin');
var template = document.querySelector('#lodge-template').content;
var dialogPanel = document.querySelector('.dialog__panel');

var getRandomIndex = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function unique(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    var found = false;
    for (var j = 0; j < result.length; j++) {
      if (result[j] === str) {
        found = true;
      }
    }
    if (found === false) {
      result.push(str);
    }
  }
  return result;
}

var getRandomFeatures = function () {
  var randomFeaturesNumber = getRandomNumber(1, 6);
  for (var i = 0; i < randomFeaturesNumber; i++) {
    var pushedVar = ITEM_FEATURES[getRandomIndex(ITEM_FEATURES)];
    features[i] = pushedVar;
  }
  return unique(features);
};


var createRandomItem = function (i) {
  randomItem = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: ITEM_TITLE[getRandomIndex(ITEM_TITLE)],
      address: 'location.' + getRandomNumber(900, 300) + ', location.' + getRandomNumber(100, 50),
      price: getRandomNumber(1000, 1000000),
      type: ITEM_TYPE[getRandomIndex(ITEM_TYPE)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 5),
      checkin: ITEM_CHECKIN[getRandomIndex(ITEM_CHECKIN)],
      checkout: ITEM_CHECKOUT[getRandomIndex(ITEM_CHECKOUT)],
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

function generateElement(element) {
  var pinCopy = pin.cloneNode(true);
  pinCopy.style.left = (element.location.x - 20) + 'px';
  pinCopy.style.top = (element.location.y + 40) + 'px';
  var img = pinCopy.querySelector('img');
  img.src = element.author.avatar;
  return pinCopy;
}

for (var i = 0; i < 8; i++) {
  randomArray[i] = createRandomItem(i);
  pinMap.appendChild(generateElement(randomArray[i]));
}

var dialogPanelContent = template.cloneNode(true);
dialogPanelContent.querySelector('.lodge__title').innerHTML = randomArray[0].offer.title;
dialogPanelContent.querySelector('.lodge__price').innerHTML = randomArray[0].offer.price + '&#x20bd;/ночь';
var lodgeType;
switch (randomArray[0].offer.type) {
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
dialogPanelContent.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + randomArray[0].offer.guests + ' гостей в ' + randomArray[0].offer.rooms + ' комнатах';
dialogPanelContent.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + randomArray[0].offer.checkin + ' выезд до ' + randomArray[0].offer.checkout;

for (i = 0; i < randomArray[0].offer.features.length; i++) {
  var featuresSpan = document.createElement('span');
  featuresSpan.classList.add('feature__image', 'feature__image--' + randomArray[0].offer.features[i]);
  featuresSpan.innerHTML = randomArray[0].offer.features[i];
  dialogPanelContent.querySelector('.lodge__features').insertAdjacentHTML('beforeend', featuresSpan);
}
var templateAvatar = document.querySelector('.lodge__description');
var lodgeDescriptionContent = templateAvatar.cloneNode(true);
lodgeDescriptionContent.textContent = randomArray[0].offer.description;

var dialogTitleContent = document.querySelector('.dialog__title');
dialogTitleContent.src = randomArray[0].author.avatar;

var dialogPanelParent = document.querySelector('#offer-dialog');
dialogPanelParent.replaceChild(dialogPanelContent, dialogPanel);