/**
 * Class representing Canvas.
 */
class Canvas {

  /**
   * Create Canvas.
   * @param {HTMLCanvasElement} canvas HTMLCanvasElement.
   * @param {Object} options Options for Canvas.
   * @param {Array} entities Initial entities.
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
   * Setup listeners.
   */
  setupListeners() {
    window.addEventListener("resize", (e) => this.handleResize(e));
    window.addEventListener("blur", (e) => this.stop(e));
    window.addEventListener("focus", (e) => this.start(e));
  }

  /**
   * Set size of canvas element.
   */
  setCanvasSize = () => {
    const { innerWidth: width, innerHeight: height } = window;

    this.element.width = width;
    this.element.height = height;
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;

    this.bounds = this.element.getBoundingClientRect();
  }

  /**
   * Handle resize of window.
   * @param {Event} event Event to be handled.
   */
  handleResize(event) {
    this.setCanvasSize();
    this.resizeEntities(event);
  };

  /**
   * Clear canvas.
   * @param {Canvas} param0 Canvas object.
   */
  static clearCanvas({ ctx, bounds }) {
    const { x, y, width, height } = bounds;
    ctx.clearRect(x, y, width, height);
  }

  /**
   * Add entity.
   * @param {*} callback Callback.
   */
  addEntity(callback) {
    callback(this);
  }

  /**
   * Add entity.
   * @param {*} newEntity Entity to be added.
   */
  newEntity(newEntity) {
    this.entities.push(newEntity)
    return this.entities.length - 1;
  };

  /**
   * Resize entities.
   * @param {Event} event Event to be handled.
   */
  resizeEntities(event) {
    this.entities.forEach((entity) => {
      if (entity.resize) entity.resize(this, event);
    });
  }

  /**
   * Cancel requested animation frame.
   */
  cancelRaf() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  /**
   * Stop animation.
   */
  stop() {
    this.cancelRaf();
    this.paused = true;
  }

  /**
   * Start animation.
   */
  start() {
    this.cancelRaf();
    this.paused = false;
    this.render();
  }

  /**
   * Render canvas.
   */
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
