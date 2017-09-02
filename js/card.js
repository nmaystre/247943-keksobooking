'use strict';

window.card = (function () {
  var template = document.querySelector('#lodge-template').content;
  var dialogPanelParent = document.querySelector('#offer-dialog');
  var cardCloseBtn = dialogPanelParent.querySelector('.dialog__close');
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

    for (var i = 0; i < obj.offer.features.length; i++) {
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
    window.util.isEscEvent(evt, closeCard());

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
    window.util.isEscEvent(evt, closeCard());

  });

  cardCloseBtn.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeCard());

  });
  return createCard;

})();
