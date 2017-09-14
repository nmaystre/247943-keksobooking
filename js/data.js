'use strict';

window.data = (function () {
  var ITEM_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var ITEM_TYPE = ['flat', 'house', 'bungalo'];
  var ITEM_CHECKIN = ['12:00', '13:00', '14:00'];
  var ITEM_CHECKOUT = ['12:00', '13:00', '14:00'];
  var ITEM_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // var getRandomNumber = function (min, max) {
  //   return Math.floor(Math.random() * (max - min)) + min;
  // };
  //
  // var getRandomFeatures = function () {
  //   var firstRandomFeature = getRandomNumber(0, ITEM_FEATURES.length);
  //   var lastRandomFeature = getRandomNumber(firstRandomFeature, ITEM_FEATURES.length);
  //   var newItemFeatures = ITEM_FEATURES.slice(firstRandomFeature, lastRandomFeature);
  //   return newItemFeatures;
  // };
  //
  // var generateItem = function (i) {
  //   var randomItem = {
  //     author: {
  //       avatar: 'img/avatars/user0' + (i + 1) + '.png'
  //     },
  //     offer: {
  //       title: ITEM_TITLE[getRandomNumber(0, ITEM_TITLE.length)],
  //       address: 'location.' + getRandomNumber(900, 300) + ', location.' + getRandomNumber(100, 50),
  //       price: getRandomNumber(1000, 1000000),
  //       type: ITEM_TYPE[getRandomNumber(0, ITEM_TYPE.length)],
  //       rooms: getRandomNumber(1, 5),
  //       guests: getRandomNumber(1, 5),
  //       checkin: ITEM_CHECKIN[getRandomNumber(0, ITEM_CHECKIN.length)],
  //       checkout: ITEM_CHECKOUT[getRandomNumber(0, ITEM_CHECKOUT.length)],
  //       features: getRandomFeatures(),
  //       description: '',
  //       photos: []
  //     },
  //     location: {
  //       x: getRandomNumber(300, 900),
  //       y: getRandomNumber(100, 500)
  //     }
  //   };
  //   return randomItem;
  // };

  return {
    // generateRandomArray: function () {
    //   var randomArray = [];
    //   for (var i = 0; i < 8; i++) {
    //     randomArray.push(generateItem(i));
    //   }
    //   return randomArray;
    // },
    ITEM_CHECKIN: ITEM_CHECKIN,
    ITEM_CHECKOUT: ITEM_CHECKOUT};
})();
