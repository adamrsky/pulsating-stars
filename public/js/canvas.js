/**
 * @class Canvas
 */
class Canvas {

  /**
   * @constructor
   * @param {HTMLCanvasElement} canvas
   * @param {Object} options
   * @param {Array} entities
   */
  constructor(canvas, options = {}, entities = []) {
    this.element = canvas;

    this.options = options;

    this.entities = entities;

    // set context
    this.ctx = this.element.getContext("2d");

    // tick counter
    this.tick = 0;
    this.maxTick = (this.options.animDuration || 80) * 2 || 3600;

    // request animation frame id
    this.rafId = null;

    this.setCanvasSize();
    this.setupListeners();

    this.render();
  }

  /**
   * @method setupListeners
   */
  setupListeners() {
    window.addEventListener("resize", (e) => this.handleResize(e));
    window.addEventListener("blur", (e) => this.stop(e));
    window.addEventListener("focus", (e) => this.start(e));
  }

  setCanvasSize = () => {
    const { innerWidth: width, innerHeight: height } = window;

    this.element.width = width;
    this.element.height = height;
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;

    this.bounds = this.element.getBoundingClientRect();
  }

  handleResize(event) {
    this.setCanvasSize();
    this.resizeEntities(event);
  };

  static clearCanvas({ ctx }) {
    const { x, y, width, height } = this.bounds;
    ctx.clearRect(x, y, width, height);
  }

  addEntity(callback) {
    callback(this);
  }

  newEntity(newEntity) {
    this.entities.push(newEntity)
    return this.entities.length - 1;
  };

  resizeEntities(event) {
    this.entities.forEach((entity) => {
      if (entity.resize) entity.resize(this, event);
    });
  }

  cancelRaf() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  stop() {
    this.cancelRaf();
    this.paused = true;
  }

  start() {
    this.cancelRaf();
    this.paused = false;
    this.render();
  }

  render = () => {
    this.ctx.clearRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);

    this.entities.forEach((entity) => {
      if (entity.draw) entity.draw(this);
    });

    if (++this.tick >= this.maxTick) this.tick = 0;

    if (!this.paused) //this.rafId = window.requestAnimationFrame(this.render);
    setTimeout(this.render, 50);
  }
}
