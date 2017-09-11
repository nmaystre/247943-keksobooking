// 'use strict';
//
// (function () {
//   var getURL = 'https://1510.dump.academy/keksobooking/data';
//   var postURL = ' https://1510.dump.academy/keksobooking';
//
//   var backendFunction = function (url, type, onSuccess, onError, data) {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';
//
//     xhr.addEventListener('load', function () {
//       var error;
//       switch (xhr.status){
//         case 200:
//           onSuccess(xhr.response);
//           break;
//         case 400:
//           error = 'Неверный запрос';
//           break;
//         case 401:
//           error = 'Пользователь не авторизован';
//           break;
//         case 404:
//           error = 'Ничего не найдено';
//           break;
//         default:
//           error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
//       }
//       if (error) {
//         onError(error);
//       }
//     });
//     xhr.addEventListener('error', function () {
//       onError('Произошла ошибка соединения');
//     });
//     xhr.addEventListener('timeout', function () {
//       onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
//     });
//     xhr.timeout = 10000;
//     xhr.open(type, url);
//     xhr.send(data);
//     return backendFunction;
//   };
//
//   window.load = backendFunction(getURL, 'GET', onSuccess, onError, data);
//   window.save = backendFunction(postURL, 'POST', onSuccess, onError, data);
// })();
//
//
// 'use strict';
//
// (function () {
//   var getURL = 'https://1510.dump.academy/keksobooking/data';
//   var postURL = ' https://1510.dump.academy/keksobooking';
//   var backendFunction = function (url, type, data, backendCb) {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';
//
//     if (typeof backendCb === 'function') {
//       backendCb();
//     }
//   };
//
//   var backendLoad = backendFunction(getURL, 'GET', function (onSuccess, onError) {
//     xhr.addEventListener('load', function () {
//       var error;
//       switch (xhr.status) {
//         case 200:
//           onSuccess(xhr.response);
//           break;
//         case 400:
//           error = 'Неверный запрос';
//           break;
//         case 401:
//           error = 'Пользователь не авторизован';
//           break;
//         case 404:
//           error = 'Ничего не найдено';
//           break;
//         default:
//           error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
//       }
//       if (error) {
//         onError(error);
//       }
//     });
//     xhr.addEventListener('error', function () {
//       onError('Произошла ошибка соединения');
//     });
//     xhr.addEventListener('timeout', function () {
//       onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
//     });
//     xhr.timeout = 10000;
//     xhr.open(type, url);
//     xhr.send(data);
//   });
// })();


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