/**
 * @class Star
 */
class Star {

  /**
   * @constructor Star
   * @param {Number} x
   * @param {Number} y
   * @param {Number} size
   * @param {Number} gap
   * @param {Canvas} canvas
   * @param {Number} index
   */
  constructor(x, y, size, gap, canvas, index) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.gap = gap;
    this.canvas = canvas;
    this.index = index;
    this.init();
  }

  init() {
    let { tick, maxTick } = this.canvas;
    this.offset = (this.x * 8) + this.y * 20;
    this.animDuration = maxTick / 2;
    this.tick = (tick + this.offset) % maxTick;
    this.maxTick = maxTick;
  }

  update() {
    if(++this.tick >= this.maxTick) this.tick = 1;
  }

  /**
   * @function draw
   */
  draw() {

    const { maxTick, ctx } = this.canvas;

    ctx.fillRect(
      this.x * (this.size + this.gap),
      this.y * (this.size + this.gap),
      this.size, this.size
    );

    let centerX = this.x + .5;
    let centerY = this.y + .5;

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.25;
    ctx.lineCap = "round";

    let spacing = .05;

    let animProgress;

    if (this.tick < this.animDuration) {
      animProgress = this.tick;
    } else {
      animProgress = this.animDuration - (this.tick % this.animDuration);
    }

    let len = 15;
    let per = animProgress / this.animDuration;
    if(per < 0) per = 0;

    ctx.beginPath();

    // right
    ctx.moveTo(
      (centerX + spacing * per) * (this.size + this.gap),
      centerY * (this.size + this.gap)
    );

    ctx.lineTo(
      (centerX + spacing * per) * (this.size + this.gap) + len * per,
      centerY * (this.size + this.gap)
    );

    // left
    ctx.moveTo(
      (centerX - spacing * per) * (this.size + this.gap),
      centerY * (this.size + this.gap)
    );

    ctx.lineTo(
      (centerX - spacing * per) * (this.size + this.gap) - len * per,
      centerY * (this.size + this.gap)
    );
    // down
    ctx.moveTo(
      centerX * (this.size + this.gap),
      (centerY + spacing * per) * (this.size + this.gap)
    );

    ctx.lineTo(
      centerX * (this.size + this.gap),
      (centerY + spacing * per) * (this.size + this.gap) + len * per
    );

    // top
    ctx.moveTo(
      centerX * (this.size + this.gap),
      (centerY - spacing * per) * (this.size + this.gap)
    );

    ctx.lineTo(
      centerX * (this.size + this.gap),
      (centerY - spacing * per) * (this.size + this.gap) - len * per
    );

    ctx.stroke();

  }
}
