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
    this.starSpacing = options.starSpacing || 22;

    this.init();

  }

  /**
   * Initialize PulsatingStars.
   */
  init() {

    const { width, height } = this.canvas.element;

    this.stars = [];

    this.tileRowCount = Math.floor((width) / (this.starSize + this.starSpacing));
    this.tileColumnCount = Math.floor((height) / (this.starSize + this.starSpacing));
    this.amountOfStars = this.tileRowCount * this.tileColumnCount;

    for (let i = 0; i < this.amountOfStars; i++) {
      let x = i % this.tileRowCount;
      let y = Math.floor(i / this.tileRowCount);
      this.addStar(new Star(x, y, this.starSize, this.starSpacing, this.canvas, i));
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
   * @return {number} New length of stars array.
   */
  addStar(newElement) {
    this.stars.push(newElement);
    return this.stars.length;
  }

  /**
   * Set stars size.
   * @param {number} size New Star size.
   */
  setStarSize(size) {
    this.starSize = size;
  }

  /**
   * Update stars size.
   */
  updateStarSize() {
    this.stars.forEach(e => {
      e.setSize(this.starSize);
    });
    this.init();
  }

  /**
   * Set stars spacing.
   * @param {number} spacing New Star spacing.
   */
  setStarSpacing(spacing) {
    this.starSpacing = spacing;
  }

  /**
   * Update stars spacing.
   */
  updateStarSpacing() {
    this.stars.forEach(e => {
      e.setSize(this.starSpacing);
    });
    this.init();
  }

  /**
   * Draw stars.
   */
  draw() {
    const marginX = (this.canvas.element.width - ((this.starSize + this.starSpacing)
      * this.tileRowCount - this.starSpacing)) / 2;
    const marginY = (this.canvas.element.height - ((this.starSize + this.starSpacing)
      * this.tileColumnCount - this.starSpacing)) / 2;

    this.canvas.ctx.save();
    this.canvas.ctx.translate(marginX, marginY);

    this.stars.forEach((star) => {
      star.draw();
      star.update();
    });

    this.canvas.ctx.restore();
  }
}