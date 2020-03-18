'use strict';

(function () {
  var statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    BAD_GATEWAY: 502
  };
  var TIMEOUT_IN_MS = 10000;

  var load = function (loadDataCallback, errorDataCallback) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case statusCode.OK:
          loadDataCallback(xhr.response);
          break;
        case statusCode.BAD_REQUEST:
          errorDataCallback('Не могу обработать запрос. Проверьте пожалуйста данные и повторите попытку');
          break;
        case statusCode.NOT_FOUND:
          errorDataCallback('По вашему запросу ничего не найдено. Проверьте пожалуйста данные и повторите попытку');
          break;
        case statusCode.BAD_GATEWAY:
          errorDataCallback('Ошибка на стороне сервера. Мы пытаемся исправить это. Повторите попытку чуть позже :)');
          break;
        default:
          if (xhr.responceType !== 'json') {
            throw new Error('Неизвестный тип данных: ' + xhr.responceType);
          } else {
            errorDataCallback('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
          }
      }
    });

    xhr.addEventListener('error', function () {
      errorDataCallback('Произошла ошибка соединения. Проверьте пожалуйста подключение к интернету');
    });

    xhr.addEventListener('timeout', function () {
      errorDataCallback('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.send();
  };

  var save = function (data, loadSuccsesCallback, loadErrorCallback) {
    var URL = 'https://js.dump.academy/code-and-magick';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', URL);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case statusCode.OK:
          loadSuccsesCallback();
          break;
        case statusCode.BAD_REQUEST:
          loadErrorCallback('Не могу отправить данные. ' + xhr.statusText);
          break;
        case statusCode.BAD_GATEWAY:
          loadErrorCallback('Нет ответа от сервера. Мы пытаемся исправить это. Повторите попытку чуть позже :) ' + xhr.statusText);
          break;
        default:
          if (xhr.responceType !== 'json') {
            throw new Error('Неизвестный тип данных: ' + xhr.responceType);
          } else {
            loadErrorCallback('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
          }
      }
    });

    xhr.addEventListener('error', function () {
      loadErrorCallback(xhr.response);
    });

    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
