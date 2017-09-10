'use strict';

window.synchronizeFields = (function () {
  var synchronizeFields = function (input1, input2, values1, values2, syncFunction) {

    input1.addEventListener('change', function () {

      for (var i = 0; i < values1.length; i++) {
        if (values1[i] === input1.value) {
          syncFunction(input2, values2[i]);
        }
      }
    });

  };
  return synchronizeFields;
})();
