/**
 * Class representing Star.
 */
class Star {

  /**
   * Create Star.
   * @param {number} x X position.
   * @param {number} y Y position.
   * @param {number} size Size of star.
   * @param {number} spacing Spacing between stars.
   * @param {Canvas} canvas Canvas on which star will be drawn.
   * @param {number} index Index of star.
   */
  constructor(x, y, size, spacing, canvas, index) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.spacing = spacing;
    this.canvas = canvas;
    this.index = index;
    this.init();
  }

  /**
   * Initialize Star.
   */
  init() {
    let { tick, maxTick } = this.canvas;
    this.offset = (this.x * 8) + this.y * 20;
    this.animDuration = maxTick / 2;
    this.tick = (tick + this.offset) % maxTick;
    this.maxTick = maxTick;
  }

  /**
   * Set Star size.
   * @param {number} size New Star size.
   */
  setSize(size) {
    this.size = size;
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

    const { maxTick, ctx } = this.canvas;

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
