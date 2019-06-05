'use strict';
(function () {
  var URL_LOAD = 'https://shmitkin.github.io/Keksobooking/mock/data.json';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 5000;
  var SUCCESS_CODE = 200;
  var POST_TYPE = 'POST';
  var GET_TYPE = 'GET';

  var load = function (onSuccess, onError) {
    request(onSuccess, onError, GET_TYPE, URL_LOAD);
  };

  var upload = function (data, onSuccess, onError) {
    request(onSuccess, onError, POST_TYPE, URL_UPLOAD, data);
  };

  var request = function (onSuccess, onError, type, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    if (type === GET_TYPE) {
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = TIMEOUT;
    }
    xhr.open(type, url);
    xhr.send(data);
  };

  // Exports
  window.backend = {
    load: load,
    upload: upload
  };

})();
