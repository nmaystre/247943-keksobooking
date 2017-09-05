'use strict';

window.showcard = (function () {
  var dialogPanelParent = document.querySelector('#offer-dialog');
  var cardCloseBtn = dialogPanelParent.querySelector('.dialog__close');

  var showCard = function (element) {
    dialogPanelParent.classList.remove('hidden');
    var newContent = window.card.createCard(element);
    var dialogPanel = document.querySelector('.dialog__panel');
    dialogPanelParent.replaceChild(newContent, dialogPanel);
  };

  var closeCard = function (onClose) {
    dialogPanelParent.classList.add('hidden');
    document.removeEventListener('keydown', onCardEscPress);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  cardCloseBtn.addEventListener('click', function () {
    closeCard();
  });
  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeCard);
  });
  cardCloseBtn.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeCard);
  });
  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, closeCard);
  };

  return {
    showCard: showCard,
    onCardEscPress: onCardEscPress
  };
})();
