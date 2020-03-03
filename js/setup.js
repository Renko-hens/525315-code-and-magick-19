'use strict';

(function () {
  var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var wizards = [];

  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var playerList = document.querySelector('.setup-similar-list');

  var popup = document.querySelector('.setup');
  var players = popup.querySelector('.setup-similar');

  var createRandomArrayData = function (arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
  };

  var createWizard = function (arr, quantity) {
    for (var i = 0; i < quantity; i++) {
      arr[i] = {
        name: createRandomArrayData(WIZARDS_NAMES) + ' ' + createRandomArrayData(WIZARD_SURNAMES),
        coatColor: createRandomArrayData(window.colorize.COAT_COLORS),
        eyesColor: createRandomArrayData(window.colorize.EYES_COLORS)
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

  window.setup = {
    createRandomArrayData: createRandomArrayData
  };
})();
