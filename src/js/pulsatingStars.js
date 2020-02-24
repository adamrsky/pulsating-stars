/**
 * Class representing PulsatingStars.
 */
class PulsatingStars {

  /**
   * Create PulsatingStars.
   * @param {Canvas} canvas Canvas object.
   */
  constructor(canvas, options) {

    this.canvas = canvas;
    this.starSize = options.starSize || 26;
    this.starGap = options.starGap || 22;

    this.init();

  }

  /**
   * Initialize PulsatingStars.
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

  /**
   * Handle resize.
   */
  resize() {
    this.init();
    this.draw();
  }

  /**
   * Add new star.
   * @param {Star} newElement Star to be added.
   * @return {Number} New length of stars array.
   */
  addStar(newElement) {

    this.stars.push(newElement);
    return this.stars.length;

  }

  /**
   * Draw stars.
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