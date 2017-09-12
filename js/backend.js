'use strict';

window.backend = (function () {
  var getURL = 'https://1510.dump.academy/keksobooking/data';
  var postURL = ' https://1510.dump.academy/keksobooking';

  var load = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }

    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.open('GET', getURL);
    xhr.send();

  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onLoad('Данные успешно отправлены');
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', postURL);
    xhr.send(data);

  };

  return {
    load: load,
    save: save
  };

})();
