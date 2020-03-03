'use strict';

(function () {
  var popup = document.querySelector('.setup');
  var popupButtonOpen = document.querySelector('.setup-open');
  var popupButtonClose = popup.querySelector('.setup-close');
  var popupInputName = popup.querySelector('.setup-user-name');

  var wizardAppearance = document.querySelector('.setup-wizard-appearance');
  var wizardEyes = wizardAppearance.querySelector('.wizard-eyes');
  var wizardCoat = wizardAppearance.querySelector('.wizard-coat');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var inputEyesColor = wizardAppearance.querySelector('[name = "eyes-color"]');
  var inputCoatColor = wizardAppearance.querySelector('[name = "coat-color"]');
  var inputFirebalColor = wizardFireball.querySelector('[name = "fireball-color"]');

  var openPopup = function () {
    popup.classList.remove('hidden');

    document.addEventListener('keydown', buttonEscPressHandler);
    popupButtonClose.addEventListener('click', setupCloseClickHandler);
    popupButtonClose.addEventListener('keydown', setupCloseClickHandler);
    popupInputName.addEventListener('focus', inputFocusHandler);
    popupInputName.addEventListener('blur', inputBlurHandler);
    popupInputName.addEventListener('invalid', validityInputHandler);

    wizardAppearance.addEventListener('click', svgWizardClickHandler);
    wizardFireball.addEventListener('click', svgFireballClickHandler);
  };

  var closePopup = function () {
    popup.classList.add('hidden');

    resetPositionPopup();

    document.removeEventListener('keydown', buttonEscPressHandler);
    popupButtonClose.removeEventListener('click', setupCloseClickHandler);
    popupButtonClose.removeEventListener('keydown', setupCloseClickHandler);
    popupInputName.removeEventListener('focus', inputFocusHandler);
    popupInputName.removeEventListener('blur', inputBlurHandler);
    popupInputName.removeEventListener('invalid', validityInputHandler);

    wizardAppearance.removeEventListener('click', svgWizardClickHandler);
    wizardFireball.removeEventListener('click', svgFireballClickHandler);
  };

  var buttonEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var setupOpenClickHandler = function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  };

  var setupCloseClickHandler = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  var inputFocusHandler = function () {
    document.removeEventListener('keydown', buttonEscPressHandler);
  };

  var inputBlurHandler = function () {
    document.addEventListener('keydown', buttonEscPressHandler);
  };

  var validityInputHandler = function () {
    if (popupInputName.validity.toShort) {
      popupInputName.setCustomValidity('Имя должно состоять минимум из 2-х символ');
    } else if (popupInputName.validity.tooLong) {
      popupInputName.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (popupInputName.validity.valueMissing) {
      popupInputName.setCustomValidity('Обязательное поле');
    } else {
      popupInputName.setCustomValidity('');
    }
  };

  var svgWizardClickHandler = function (evt) {
    var target = evt.target;
    if (target === wizardCoat) {
      window.util.getRandomColor(window.colorize.COAT_COLORS, wizardCoat, inputCoatColor);
    } else if (target === wizardEyes) {
      window.util.getRandomColor(window.colorize.EYES_COLORS, wizardEyes, inputEyesColor);
    }
  };

  var svgFireballClickHandler = function () {
    window.util.getRandomColor(window.colorize.FIREBALL_COLORS, wizardFireball, inputFirebalColor);
  };

  var resetPositionPopup = function () {
    popup.style.top = null;
    popup.style.left = null;
  };

  popupButtonOpen.addEventListener('click', setupOpenClickHandler);
  popupButtonOpen.addEventListener('keydown', setupOpenClickHandler);

})();

