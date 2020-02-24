/**
 * Class representing Star.
 */
class Star {

  /**
   * Create Star.
   * @param {number} x X position.
   * @param {number} y Y position.
   * @param {number} size Size of Star.
   * @param {number} spacing Spacing between stars.
   * @param {Canvas} canvas Canvas on which star will be drawn.
   * @param {number} index Index of Star.
   * @param {number} offsetX X offset of Star.
   * @param {number} offsetY Y offset of Star.
   */
  constructor(x, y, size, spacing, canvas, index, offsetX, offsetY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.spacing = spacing;
    this.canvas = canvas;
    this.index = index;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.init();
  }

  /**
   * Initialize Star.
   */
  init() {
    let { tick, maxTick } = this.canvas;
    this.offset = Math.abs((this.x * this.offsetX) + this.y * this.offsetY);
    this.animDuration = maxTick / 2;
    this.tick = (tick + this.offset) % maxTick;
    this.maxTick = maxTick;
  }

  /**
   * Update Star.
   */
  update() {
    if(++this.tick >= this.maxTick) this.tick = 1;
  }

  /**
   * Draw Star.
   */
  draw() {

    const { ctx } = this.canvas;

    // ctx.fillStyle = 'grey';

    // ctx.fillRect(
    //   this.x * (this.size + this.spacing),
    //   this.y * (this.size + this.spacing),
    //   this.size, this.size
    // );

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.25;
    ctx.lineCap = "round";

    let gap = this.size * .1;

    let animProgress;

    if (this.tick < this.animDuration) {
      animProgress = this.tick;
    } else {
      animProgress = this.animDuration - (this.tick % this.animDuration);
    }

    let centerX = this.x * (this.size + this.spacing) + this.size / 2;
    let centerY = this.y * (this.size + this.spacing) + this.size / 2;

    let len = this.size / 2 - gap;
    let per = animProgress / this.animDuration;
    if(per < 0) per = 0;

    ctx.beginPath();

    // right
    ctx.moveTo(
      (centerX + gap * per),
      centerY
    );

    ctx.lineTo(
      (centerX + gap * per) + len * per,
      centerY
    );

    // left
    ctx.moveTo(
      (centerX - gap * per),
      centerY
    );

    ctx.lineTo(
      (centerX - gap * per) - len * per,
      centerY
    );
    // down
    ctx.moveTo(
      centerX,
      (centerY + gap * per)
    );

    ctx.lineTo(
      centerX,
      (centerY + gap * per) + len * per
    );

    // top
    ctx.moveTo(
      centerX,
      (centerY - gap * per)
    );

    ctx.lineTo(
      centerX,
      (centerY - gap * per) - len * per
    );

    ctx.stroke();

  }
}
