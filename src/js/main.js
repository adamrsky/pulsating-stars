// if (console?.clear) console.clear();
if (console && console.clear) console.clear();

const gui = new dat.GUI();

const folderStars = gui.addFolder('Stars');
const folderAnimation = gui.addFolder('Animation');

const canvas = new Canvas(
  document.getElementById("canvas"),
  {
    duration: 80,
    size: 26,
    gap: 22,
    stroke: '#FFF',
    background: '#000',
  }
);

canvas.addEntity((_canvas) =>
  _canvas.newEntity(
    new PulsatingStars(_canvas, {
      starSize: 26,
      starGap: 22,
    })
  )
);