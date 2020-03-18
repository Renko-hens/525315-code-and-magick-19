'use strict';

(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var playerList = document.querySelector('.setup-similar-list');

  var popup = document.querySelector('.setup');
  var form = popup.querySelector('.setup-wizard-form');
  var players = popup.querySelector('.setup-similar');

  var createRandomArrayData = function (arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
  };

  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var loadSucssesWizardHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    playerList.appendChild(fragment);
    players.classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(loadSucssesWizardHandler, errorHandler);

  var formSucsessSubmitHandler = function () {
    window.dialog.closePopup();
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), formSucsessSubmitHandler, errorHandler);
  };

  form.addEventListener('submit', formSubmitHandler);

  window.setup = {
    createRandomArrayData: createRandomArrayData
  };
})();
