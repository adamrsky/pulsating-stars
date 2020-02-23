/**
 * @class
 */
class PulsatingStars {

  /**
   * @constructor
   * @param {Canvas} canvas
   */
  constructor(canvas, options) {

    this.canvas = canvas;
    this.starSize = options.starSize || 26;
    this.starGap = options.starGap || 22;

    this.init();

  }

  /**
   * @function init
   */
  init() {

    const { width, height } = this.canvas.element;

    this.stars = [];

    this.tileRowCount = Math.floor(width / this.starSize);
    this.tileColumnCount = Math.floor(height / this.starSize);
    this.amountOfStars = this.tileRowCount * this.tileColumnCount;

    for (let i = 0; i < this.amountOfStars; i++) {
      let x = i % this.tileRowCount;
      let y = Math.floor(i / this.tileRowCount);
      this.addStar(new Star(x, y, this.starSize, this.starGap, this.canvas, i));
    }
  }

  resize() {
    this.init();
    this.draw();
  }

  /**
   * @function addStar
   * @param {Star} newElement
   */
  addStar(newElement) {

    this.stars.push(newElement);
    return this.stars.length;

  }

  /**
   * @function draw
   */
  draw() {
    const marginX = (this.canvas.element.width - ((this.starSize + this.starGap)
      * this.tileRowCount - this.starGap)) / 2;
    const marginY = (this.canvas.element.height - ((this.starSize + this.starGap)
      * this.tileColumnCount - this.starGap)) / 2;

    this.canvas.ctx.save();
    this.canvas.ctx.translate(marginX, marginY);

    this.stars.forEach((star) => {
      star.draw();
      star.update();
    });

    this.canvas.ctx.restore();
  }
}

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
