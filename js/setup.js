'use strict';

var ENTER_BUTTON = 'Enter';
var ESCAPE_BUTTON = 'Escape';
var MIN_NAME_LENGTH = '1';

var playerList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = [];
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var popup = document.querySelector('.setup');
var popupButtonOpen = document.querySelector('.setup-open');
var popupButtonClose = popup.querySelector('.setup-close');
var popupInputName = popup.querySelector('.setup-user-name');
var players = popup.querySelector('.setup-similar');

var wizardAppearance = document.querySelector('.setup-wizard-appearance');
var wizardEyes = wizardAppearance.querySelector('.wizard-eyes');
var wizardCoat = wizardAppearance.querySelector('.wizard-coat');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var inputEyesColor = wizardAppearance.querySelector('[name = "eyes-color"]');
var inputCoatColor = wizardAppearance.querySelector('[name = "coat-color"]');
var inputFirebalColor = wizardFireball.querySelector('[name = "fireball-color"]');

var createRandomData = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var createWizard = function (arr, quantity) {
  for (var i = 0; i < quantity; i++) {
    arr[i] = {
      name: createRandomData(WIZARDS_NAMES) + ' ' + createRandomData(WIZARD_SURNAMES),
      coatColor: createRandomData(COAT_COLORS),
      eyesColor: createRandomData(EYES_COLORS)
    };
  }
};

createWizard(wizards, 4);

var renderWizard = function (array) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = array.name;
  wizardElement.querySelector('.wizard-coat').style.fill = array.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = array.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

playerList.appendChild(fragment);
players.classList.remove('hidden');

// События
// RX.js (библиотека)
var openPopup = function () {
  popup.classList.remove('hidden');

  document.addEventListener('keydown', buttonEscPressHandler);
  popupInputName.addEventListener('focus', inputFocusHandler);
  popupInputName.addEventListener('blur', inputBlurHandler);
  popupButtonClose.addEventListener('click', setupCloseClickHandler);
  popupButtonClose.addEventListener('keydown', setupClosePressHandler);
  popupInputName.addEventListener('input', inputNameHandler);
  popupInputName.addEventListener('invalid', validityInputHandler);

  wizardAppearance.addEventListener('click', svgWizardClickHandler);
  wizardFireball.addEventListener('click', svgFireballClickHandler);
};

var closePopup = function () {
  popup.classList.add('hidden');

  document.removeEventListener('keydown', buttonEscPressHandler);
  popupInputName.removeEventListener('focus', inputFocusHandler);
  popupInputName.removeEventListener('blur', inputBlurHandler);
  popupButtonClose.removeEventListener('click', setupCloseClickHandler);
  popupButtonClose.removeEventListener('keydown', setupClosePressHandler);
  popupInputName.removeEventListener('input', inputNameHandler);
  popupInputName.removeEventListener('invalid', validityInputHandler);

  wizardAppearance.removeEventListener('click', svgWizardClickHandler);
  wizardFireball.removeEventListener('click', svgFireballClickHandler);
};

var setupOpenClickHandler = function () {
  openPopup();
};

var setupOpenPressHandler = function (evt) {
  if (evt.key === ENTER_BUTTON) {
    openPopup();
  }
};

var setupCloseClickHandler = function () {
  closePopup();
};

var setupClosePressHandler = function (evt) {
  if (evt.key === ENTER_BUTTON) {
    closePopup();
  }
};

var buttonEscPressHandler = function (evt) {
  if (evt.key === ESCAPE_BUTTON) {
    closePopup();
  }
};

var inputFocusHandler = function () {
  document.removeEventListener('keydown', buttonEscPressHandler);
};

var inputBlurHandler = function () {
  document.addEventListener('keydown', buttonEscPressHandler);
};

popupButtonOpen.addEventListener('click', setupOpenClickHandler);
popupButtonOpen.addEventListener('keydown', setupOpenPressHandler);

var validityInputHandler = function () {
  if (popupInputName.validity.toShort) {
    popupInputName.setCustomValidity('Имя должно состоять минимум из 1-го символа');
  } else if (popupInputName.validity.tooLong) {
    popupInputName.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (popupInputName.validity.valueMissing) {
    popupInputName.setCustomValidity('Обязательное поле');
  } else {
    popupInputName.setCustomValidity('');
  }
};

var inputNameHandler = function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-х символов');
  } else {
    target.setCustomValidity('');
  }
};

var svgWizardClickHandler = function (evt) {
  var target = evt.target;
  if (target === wizardCoat) {
    var colorCoat = createRandomData(COAT_COLORS);
    wizardCoat.style.fill = colorCoat;
    inputCoatColor.value = colorCoat;
  } else if (target === wizardEyes) {
    var colorEyes = createRandomData(EYES_COLORS);
    wizardEyes.style.fill = colorEyes;
    inputEyesColor.value = colorEyes;
  }
};

var svgFireballClickHandler = function () {
  var colorFireball = createRandomData(FIREBALL_COLORS);
  wizardFireball.style.background = colorFireball;
  inputFirebalColor.value = colorFireball;
};
