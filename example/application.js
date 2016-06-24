/* eslint-disable */
window.onload = function () {
  addExample('vlight.svg')
  addExample('styles.svg')
};

function addExample(path) {
	// Create renderer and view
  var container = new PIXI.Container();
  var renderer = PIXI.autoDetectRenderer(810, 800, {
    antialias: true
  });
  document.body.appendChild(renderer.view);
  var graphics = new PIXI.Graphics()
  graphics.scale.x = 10
  graphics.scale.y = 10
  container.addChild(graphics);

  $.get(path, function (content) {
    SVGGraphics.drawSVG(graphics, content);
    renderer.render(container);
  });
}