'use strict';

window.backend = (function () {
  var getURL = 'https://1510.dump.academy/keksobooking/data';
  var postURL = ' https://1510.dump.academy/keksobooking';

  function setup(onLoad, onError) {
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
    return xhr;
  }

  function load(onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', getURL);
    xhr.send();
  }

  function save(data, onLoad, onError) {
    var xhr = setup(function () {}, onError);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad('Данные успешно отправлены');
      }
    });

    xhr.open('POST', postURL);
    xhr.send(data);
  }

  return {
    load: load,
    save: save
  };

})();
