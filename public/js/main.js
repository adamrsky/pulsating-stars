// if (console?.clear) console.clear();
if (console && console.clear) console.clear();

const gui = new dat.GUI();

const folderStars = gui.addFolder('Stars');
const folderAnimation = gui.addFolder('Animation');

const canvas = new Canvas(
  document.getElementById("canvas"),
  {
    duration: 80,
    stroke: '#FFF',
    background: '#000',
  }
);

canvas.addEntity((_canvas) =>
  _canvas.newEntity(
    new PulsatingStars(_canvas, {
      starSize: 26,
      starSpacing: 22,
    })
  )
);

const pulsatingStars = canvas.entities[0];

const starSize = folderStars.add(pulsatingStars, 'starSize', 10);
starSize.onChange(() => {
  pulsatingStars.updateStarSize();
});

const starSpacing = folderStars.add(pulsatingStars, 'starSpacing', 0);
starSpacing.onChange(() => {
  pulsatingStars.updateStarSpacing();
});

const maxTick = folderAnimation.add(canvas, 'maxTick', 20, 320).step(1);
maxTick.onChange(() => {
  canvas.initEntities();
});