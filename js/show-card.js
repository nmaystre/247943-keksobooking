'use strict';

window.showcard = (function () {
  var dialogPanelParent = document.querySelector('#offer-dialog');
  var cardCloseBtn = dialogPanelParent.querySelector('.dialog__close');
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
  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, closeCard);
  };
  var showCard = function (element) {
    dialogPanelParent.classList.remove('hidden');
    var newContent = window.card.createCard(element);
    var dialogPanel = document.querySelector('.dialog__panel');
    dialogPanelParent.replaceChild(newContent, dialogPanel);
    document.addEventListener('keydown', onCardEscPress);
  };
  var onCardEntPress = function (evt) {
    window.util.isEnterEvent(evt, closeCard);
  };
  cardCloseBtn.addEventListener('keydown', onCardEntPress);
  return {
    showCard: showCard
  };
})();
