'use strict';

var inventoryWindow = document.querySelector('.setup');
inventoryWindow.classList.remove('hidden');
var playerList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var createRandomData = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var wizards = [];
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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

var renderWizard = function () {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

playerList.appendChild(fragment);
inventoryWindow.querySelector('.setup-similar').classList.remove('hidden');
