'use strict';

var ENTER_BUTTON = 'Enter';
var ESCAPE_BUTTON = 'Escape';
var LEFT_BUTTON_MOUSE = 0;

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


var createRandomArrayData = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var createWizard = function (arr, quantity) {
  for (var i = 0; i < quantity; i++) {
    arr[i] = {
      name: createRandomArrayData(WIZARDS_NAMES) + ' ' + createRandomArrayData(WIZARD_SURNAMES),
      coatColor: createRandomArrayData(COAT_COLORS),
      eyesColor: createRandomArrayData(EYES_COLORS)
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
  if (evt.key === ESCAPE_BUTTON) {
    closePopup();
  }
};

var setupOpenClickHandler = function (evt) {
  if (evt.key === ENTER_BUTTON || evt.button === LEFT_BUTTON_MOUSE) {
    openPopup();
  }
};

var setupCloseClickHandler = function (evt) {
  if (evt.key === ENTER_BUTTON || evt.button === LEFT_BUTTON_MOUSE) {
    closePopup();
  }
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
    var colorCoat = createRandomArrayData(COAT_COLORS);
    wizardCoat.style.fill = colorCoat;
    inputCoatColor.value = colorCoat;
  } else if (target === wizardEyes) {
    var colorEyes = createRandomArrayData(EYES_COLORS);
    wizardEyes.style.fill = colorEyes;
    inputEyesColor.value = colorEyes;
  }
};

var svgFireballClickHandler = function () {
  var colorFireball = createRandomArrayData(FIREBALL_COLORS);
  wizardFireball.style.background = colorFireball;
  inputFirebalColor.value = colorFireball;
};

popupButtonOpen.addEventListener('click', setupOpenClickHandler);
popupButtonOpen.addEventListener('keydown', setupOpenClickHandler);

