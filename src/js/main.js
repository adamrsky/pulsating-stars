// if (console?.clear) console.clear();
if (console && console.clear) console.clear();

const gui = new dat.GUI();

const folderStars = gui.addFolder('Stars');
const folderAnimation = gui.addFolder('Animation');

const canvas = new Canvas(
  document.getElementById("canvas"),
  {
    duration: 50,
    stroke: '#FFF',
    background: '#000'
  }
);

canvas.addEntity((_canvas) =>
  _canvas.newEntity(
    new PulsatingStars(_canvas, {
      starSize: 40,
      starSpacing: 22,
      starOffsetX: 20,
      starOffsetY: 50
    })
  )
);

const pulsatingStars = canvas.entities[0];

const starSize = folderStars.add(pulsatingStars, 'starSize', 0, 100).step(1);
starSize.onChange(() => {
  pulsatingStars.updateStarSize();
});

const starSpacing = folderStars.add(pulsatingStars, 'starSpacing', 0, 100).step(1);
starSpacing.onChange(() => {
  pulsatingStars.updateStarSpacing();
});

const starOffsetX = folderAnimation.add(pulsatingStars, 'starOffsetX', -100, 100).step(1);
starOffsetX.onChange(() => {
  pulsatingStars.updateStarOffsetX();
});

const starOffsetY = folderAnimation.add(pulsatingStars, 'starOffsetY', -100, 100).step(1);
starOffsetY.onChange(() => {
  pulsatingStars.updateStarOffsetY();
});

const maxTick = folderAnimation.add(canvas, 'maxTick', 20, 320).step(1);
maxTick.onChange(() => {
  canvas.initEntities();
});