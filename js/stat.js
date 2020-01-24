'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_X = 100;
var CLOUD_Y = 10;
var TITLE_X = 120;
var TITLE_Y = 45;

var GAP = 10;
var FONT_GAP = 15;
var INDENT_COLUMN = 50;

var TEXT_HEIGHT = 25;
var BAR_WIDTH = 40;
var barHeight = 150;
var MAX_BAR_HEIGHT = 150;

var renderCloud = function (ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  if (arr.length !== 0) {
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }
  return maxElement;
};

var getColor = function (arrayIndex) {
  if (arrayIndex === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  } else {
    return 'hsl(237, ' + Math.round(Math.random() * 100) + '%' + ', 50%)';
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, 'rgba(0, 0, 0, 0.7)', CLOUD_X + GAP, CLOUD_Y + GAP);
  renderCloud(ctx, '#fff', CLOUD_X, CLOUD_Y);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', TITLE_X, TITLE_Y);
  ctx.fillText('Список результатов:', TITLE_X, TITLE_Y + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + INDENT_COLUMN + (BAR_WIDTH + INDENT_COLUMN) * i, TITLE_Y + GAP + FONT_GAP + MAX_BAR_HEIGHT + GAP + TEXT_HEIGHT);
    ctx.fillText(Math.round(times[i]), CLOUD_X + INDENT_COLUMN + (BAR_WIDTH + INDENT_COLUMN) * i, TITLE_Y + GAP + FONT_GAP + MAX_BAR_HEIGHT + GAP + (-(barHeight * times[i]) / maxTime));
    ctx.fillStyle = getColor(players[i]);
    ctx.fillRect(CLOUD_X + INDENT_COLUMN + (BAR_WIDTH + INDENT_COLUMN) * i, TITLE_Y + GAP + FONT_GAP + GAP + MAX_BAR_HEIGHT + GAP, BAR_WIDTH, -(barHeight * times[i]) / maxTime);
  }
};
