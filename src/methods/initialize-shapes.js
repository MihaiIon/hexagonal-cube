import Shape from '../objects/shape';

export default function () {
  // Compute a safe zone margin for animations
  this.safeMargins = this.size * 0.1;
  this.safeSize = this.size - this.safeMargins;

  // Compute triangle dimensions
  this.equilateralTriangleWidth = f(this.safeSize / 4);
  this.equilateralTriangleHeight = f((this.equilateralTriangleWidth * Math.sqrt(3)) / 2);

  // Compute the points between each segment
  const { i, o, c } = computeHexagonPoints({
    center: this.size / 2,
    h: this.equilateralTriangleHeight,
    w: this.equilateralTriangleWidth,
  });

  // Javascript floating numbers are not precise. This will help get the desired effect
  // for some shapes - Adds a little extra space between some shapes.
  const offset = 0.2;

  // Move to the center (shortcut)
  const center = `M${c},${c}`;

  // Retrieve shape names from static variables
  const { SHAPE_NAME } = this.constructor;

  // Added closure to pass 'this.shapesOptions' to each call
  const builder = (name, path) => configBuilder(name, path, this.shapesOptions);

  const configs = [
    builder(SHAPE_NAME.INNER_BOTTOM_LEFT, `${center}L${i.b.x},${i.b.y}L${i.bl.x},${i.bl.y}`),
    builder(SHAPE_NAME.INNER_BOTTOM_RIGHT, `${center}L${i.b.x},${i.b.y}L${i.br.x},${i.br.y}`),
    builder(SHAPE_NAME.INNER_LEFT, `${center}L${i.bl.x},${i.bl.y}L${i.tl.x},${i.tl.y}`),
    builder(SHAPE_NAME.INNER_RIGHT, `${center}L${i.br.x},${i.br.y}L${i.tr.x},${i.tr.y}`),
    builder(SHAPE_NAME.INNER_TOP_LEFT, `${center}L${i.tl.x},${i.tl.y}L${i.t.x},${i.t.y}`),
    builder(SHAPE_NAME.INNER_TOP_RIGHT, `${center}L${i.tr.x},${i.tr.y}L${i.t.x},${i.t.y}`),
    builder(SHAPE_NAME.OUTER_BOTTOM_LEFT, `M${i.b.x},${i.b.y}L${o.b.x},${o.b.y}L${o.bl.x},${o.bl.y}L${i.bl.x},${i.bl.y}`),
    builder(SHAPE_NAME.OUTER_BOTTOM_RIGHT, `M${i.b.x},${i.b.y}L${o.b.x},${o.b.y}L${o.br.x},${o.br.y}L${i.br.x},${i.br.y}`),
    builder(SHAPE_NAME.OUTER_LEFT, `M${i.bl.x - offset},${i.bl.y}L${o.bl.x},${o.bl.y}L${o.tl.x},${o.tl.y}L${i.tl.x - offset},${i.tl.y}`),
    builder(SHAPE_NAME.OUTER_RIGHT, `M${i.br.x + offset},${i.br.y}L${o.br.x},${o.br.y}L${o.tr.x},${o.tr.y}L${i.tr.x + offset},${i.tr.y}`),
    builder(SHAPE_NAME.OUTER_TOP_LEFT, `M${i.t.x},${i.t.y}L${o.t.x},${o.t.y}L${o.tl.x},${o.tl.y}L${i.tl.x},${i.tl.y}`),
    builder(SHAPE_NAME.OUTER_TOP_RIGHT, `M${i.t.x},${i.t.y}L${o.t.x},${o.t.y}L${o.tr.x},${o.tr.y}L${i.tr.x},${i.tr.y}`),
  ];

  this.shapesConfig = {};
  configs.forEach((config) => {
    this.shapesConfig[config.name] = config;
  });
}

/**
 *
 *
 * @param {*} param0
 */
const computeHexagonPoints = ({ center, h, w }) => {
  const c = f(center);

  return {
    // center
    c,
    // inner hexagon
    i: {
      b: { x: c, y: f(c + w) }, // bottom
      bl: { x: f(c - h), y: f(c + w / 2) }, // bottom-left
      br: { x: f(c + h), y: f(c + w / 2) }, // bottom-right
      t: { x: c, y: f(c - w) }, // top
      tl: { x: f(c - h), y: f(c - w / 2) }, // top-left
      tr: { x: f(c + h), y: f(c - w / 2) }, // top-right
    },
    // outer hexagon
    o: {
      b: { x: c, y: f(c + w * 2) }, // bottom
      bl: { x: f(c - h * 2), y: f(c + w) }, // bottom-left
      br: { x: f(c + h * 2), y: f(c + w) }, // bottom-right
      t: { x: c, y: f(c - w * 2) }, // top
      tl: { x: f(c - h * 2), y: f(c - w) }, // top-left
      tr: { x: f(c + h * 2), y: f(c - w) }, // top-right
    },
  };
};

/**
 * Create config for SnapSvg path method
 *
 * @param {strin} name
 * @param {string} path
 * @param {object} shapesOptions
 */
const configBuilder = (name, path, shapesOptions) => {
  const currentShapeOptions = shapesOptions[name];
  const { fill, remove } = currentShapeOptions;

  return {
    attr: { fill: fill },
    name,
    path,
    remove,
  };
};

/**
 * Fix floating numbers to 2 decimals
 *
 * @param {number} n
 */
const f = (n) => +n.toFixed(2);
