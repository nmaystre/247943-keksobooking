'use strict';

window.showcard = (function () {
  var dialogPanelParent = document.querySelector('#offer-dialog');
  var cardCloseBtn = dialogPanelParent.querySelector('.dialog__close');
  var showCard = function (element, onClose) {
    dialogPanelParent.classList.remove('hidden');
    var newContent = window.card.createCard(element);
    var dialogPanel = document.querySelector('.dialog__panel');
    dialogPanelParent.replaceChild(newContent, dialogPanel);
    var closeCardCb = function () {
      closeCard(onClose);
    };
    var onCardEscPress = function (evt) {
      window.util.isEscEvent(evt, closeCardCb);
    };
    var onCardEntPress = function (evt) {
      window.util.isEnterEvent(evt, closeCardCb);
    };
    document.addEventListener('keydown', onCardEscPress);
    cardCloseBtn.addEventListener('click', closeCardCb);
    cardCloseBtn.addEventListener('keydown', onCardEntPress);
    var closeCard = function (cb) {
      dialogPanelParent.classList.add('hidden');
      document.removeEventListener('keydown', onCardEscPress);
      cardCloseBtn.removeEventListener('click', closeCardCb);
      cardCloseBtn.removeEventListener('keydown', onCardEntPress);
      if (typeof cb === 'function') {
        cb();
      }
    };
  };
  return {
    showCard: showCard
  };
})();
