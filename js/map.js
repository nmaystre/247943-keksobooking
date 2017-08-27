'use strict';

var ITEM_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ITEM_TYPE = ['flat', 'house', 'bungalo'];
var ITEM_CHECKIN = ['12:00', '13:00', '14:00'];
var ITEM_CHECKOUT = ['12:00', '13:00', '14:00'];
var ITEM_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var randomArray = [];

var pinMap = document.querySelector('.tokyo__pin-map');
var template = document.querySelector('#lodge-template').content;
var dialogPanel = document.querySelector('.dialog__panel');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomFeatures = function () {
  var firstRandomFeature = getRandomNumber(0, ITEM_FEATURES.length);
  var lastRandomFeature = getRandomNumber(firstRandomFeature, ITEM_FEATURES.length);
  var newItemFeatures = ITEM_FEATURES.slice(firstRandomFeature, lastRandomFeature);
  return newItemFeatures;
};

var createRandomItem = function (i) {
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

for (var i = 0; i < 8; i++) {
  randomArray[i] = createRandomItem(i);
  pinMap.appendChild(generateElement(randomArray[i]));
}

var createDialogContent = function (obj) {
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

  var dialogTitleContent = document.querySelector('.dialog__title');
  dialogTitleContent.src = obj.author.avatar;
  return dialogPanelContent;
};

var dialogPanelParent = document.querySelector('#offer-dialog');
var newContent = createDialogContent(randomArray[i]);
dialogPanelParent.replaceChild(newContent, dialogPanel);

function generateElement(element) {
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

  var createDialogContent;
  var dialogPanelParent = document.querySelector('#offer-dialog');
  var newContent = createDialogContent(randomArray[element]);
  pinCopy.addEventListener('click', function (element) {
    var pinAll = document.getElementsByClassName('pin');

    for (i = 0; i < pinAll.length; i++) {
      pinAll[i].classList.remove('.pin--active');
    }
    pinCopy.classList.add('.pin--active');
    dialogPanelParent.replaceChild(newContent, dialogPanel);
  });
  return pinCopy;
}
