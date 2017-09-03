'use strict';

window.showcard = (function () {
  var showCard = function (element, onClose) {
    var dialogPanelParent = document.querySelector('#offer-dialog');
    dialogPanelParent.classList.remove('hidden');
    var newContent = window.card.createCard(element);
    var dialogPanel = document.querySelector('.dialog__panel');
    dialogPanelParent.replaceChild(newContent, dialogPanel);
    if (typeof onClose === 'function') {
      onClose();
    }
  };
  return {
    showCard: showCard
  };
})();
