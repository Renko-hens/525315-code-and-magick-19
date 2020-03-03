'use strict';

window.util = (function () {
  var ENTER_BUTTON = 'Enter';
  var ESCAPE_BUTTON = 'Escape';
  var LEFT_BUTTON_MOUSE = 0;

  var isEscEvent = function (evt, action) {
    if (evt.key === ESCAPE_BUTTON) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_BUTTON || evt.button === LEFT_BUTTON_MOUSE) {
      action();
    }
  };

  var getRandomColor = function (arrayColor, elementColor, valueColor) {
    var color = window.setup.createRandomArrayData(arrayColor);
    if (elementColor.tagName.toLowerCase() === 'div') {
      elementColor.style.backgroundColor = color;
    } else {
      elementColor.style.fill = color;
    }
    valueColor.value = color;
  };

  return {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomColor: getRandomColor
  };
})();
