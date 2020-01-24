'use strict';

var RECT_WIDTH = 420;
var RECT_HEIGHT = 270;

var RECT_X = 100;
var RECT_Y = 10;
var TITLE_X = 120;
var TITLE_Y = 45;

var GAP = 10;
var FONT_GAP = 15;
var INDENT_COLUMN = 50;

var TEXT_HEIGHT = 25;
var BAR_WIDTH = 40;
var barHeight = 150;
var MAX_BAR_HEIGHT = 150;

var renderRect = function (options) {
  var ctx = options.ctx;

  var width = options.width || RECT_WIDTH;
  var height = options.height || RECT_HEIGHT;

  ctx.fillStyle = options.color;
  ctx.fillRect(options.x, options.y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getColor = function (arrayIndex) {
  var color = '';

  if (arrayIndex === 'Вы') {
    color = 'rgba(255, 0, 0, 1)';
  } else {
    color = 'hsl(237, ' + Math.round(Math.random() * 100) + '%' + ', 50%)';
  }

  return color;
};

window.renderStatistics = function (ctx, players, times) {
  renderRect({
    ctx: ctx,
    color: 'rgba(0, 0, 0, 0.7)',
    x: RECT_X + GAP,
    y: RECT_Y + GAP,
  });

  renderRect({
    ctx: ctx,
    color: '#fff',
    x: RECT_X,
    y: RECT_Y
  });

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', TITLE_X, TITLE_Y);
  ctx.fillText('Список результатов:', TITLE_X, TITLE_Y + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], RECT_X + INDENT_COLUMN + (BAR_WIDTH + INDENT_COLUMN) * i, TITLE_Y + GAP + FONT_GAP + MAX_BAR_HEIGHT + GAP + TEXT_HEIGHT);
    ctx.fillText(Math.round(times[i]), RECT_X + INDENT_COLUMN + (BAR_WIDTH + INDENT_COLUMN) * i, TITLE_Y + GAP + FONT_GAP + MAX_BAR_HEIGHT + GAP + (-(barHeight * times[i]) / maxTime));
    ctx.fillStyle = getColor(players[i]);
    ctx.fillRect(RECT_X + INDENT_COLUMN + (BAR_WIDTH + INDENT_COLUMN) * i, TITLE_Y + GAP + FONT_GAP + GAP + MAX_BAR_HEIGHT + GAP, BAR_WIDTH, -(barHeight * times[i]) / maxTime);
  }
};
