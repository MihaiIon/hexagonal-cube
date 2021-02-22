import { SHAPE_NAME } from '../constants/static-properties';
import { fixedFloat as f, computeHexagonPoints } from '../helpers';
import ShapeConfig from '../objects/shape-config';

export default function () {
  // Compute a safe zone margin for animations
  this.safeMargins = this.size * 0.1;
  this.safeSize = this.size - this.safeMargins;

  // Compute triangle dimensions
  this.equilateralTriangleWidth = f(this.safeSize / 4);
  this.equilateralTriangleHeight = f((this.equilateralTriangleWidth * Math.sqrt(3)) / 2);

  // Compute the points between each segment
  const { c, o, i } = computeHexagonPoints(this.size, this.equilateralTriangleHeight, this.equilateralTriangleWidth);

  // Javascript floating numbers are not precise. This will help get the desired effect
  // for some shapes - Adds a little extra space between some shapes.
  const offset = 0.2;

  // Move to the center (shortcut)
  const moveToCenter = moveTo(c.x, c.y);

  // Added closure to pass 'this.shapesOptions' to each call
  const factory = (name, path) => new ShapeConfig(name, path, this.shapesOptions);

  const configs = [
    factory(SHAPE_NAME.INNER_BOTTOM_LEFT, `${moveToCenter}${lineTo(i.b.x, i.b.y)}${lineTo(i.bl.x, i.bl.y)}`),
    factory(SHAPE_NAME.INNER_BOTTOM_RIGHT, `${moveToCenter}${lineTo(i.b.x, i.b.y)}${lineTo(i.br.x, i.br.y)}`),
    factory(SHAPE_NAME.INNER_LEFT, `${moveToCenter}${lineTo(i.bl.x, i.bl.y)}${lineTo(i.tl.x, i.tl.y)}`),
    factory(SHAPE_NAME.INNER_RIGHT, `${moveToCenter}${lineTo(i.br.x, i.br.y)}${lineTo(i.tr.x, i.tr.y)}`),
    factory(SHAPE_NAME.INNER_TOP_LEFT, `${moveToCenter}${lineTo(i.tl.x, i.tl.y)}${lineTo(i.t.x, i.t.y)}`),
    factory(SHAPE_NAME.INNER_TOP_RIGHT, `${moveToCenter}${lineTo(i.tr.x, i.tr.y)}${lineTo(i.t.x, i.t.y)}`),
    factory(
      SHAPE_NAME.OUTER_BOTTOM_LEFT,
      `${moveTo(i.b.x, i.b.y)}${lineTo(o.b.x, o.b.y)}${lineTo(o.bl.x, o.bl.y)}${lineTo(i.bl.x, i.bl.y)}`,
    ),
    factory(
      SHAPE_NAME.OUTER_BOTTOM_RIGHT,
      `${moveTo(i.b.x, i.b.y)}${lineTo(o.b.x, o.b.y)}${lineTo(o.br.x, o.br.y)}${lineTo(i.br.x, i.br.y)}`,
    ),
    factory(
      SHAPE_NAME.OUTER_LEFT,
      `${moveTo(i.bl.x - offset, i.bl.y)}${lineTo(o.bl.x, o.bl.y)}${lineTo(o.tl.x, o.tl.y)}${lineTo(i.tl.x - offset, i.tl.y)}`,
    ),
    factory(
      SHAPE_NAME.OUTER_RIGHT,
      `${moveTo(i.br.x + offset, i.br.y)}${lineTo(o.br.x, o.br.y)}${lineTo(o.tr.x, o.tr.y)}${lineTo(i.tr.x + offset, i.tr.y)}`,
    ),
    factory(
      SHAPE_NAME.OUTER_TOP_LEFT,
      `${moveTo(i.t.x, i.t.y)}${lineTo(o.t.x, o.t.y)}${lineTo(o.tl.x, o.tl.y)}${lineTo(i.tl.x, i.tl.y)}`,
    ),
    factory(
      SHAPE_NAME.OUTER_TOP_RIGHT,
      `${moveTo(i.t.x, i.t.y)}${lineTo(o.t.x, o.t.y)}${lineTo(o.tr.x, o.tr.y)}${lineTo(i.tr.x, i.tr.y)}`,
    ),
  ];

  this.shapesConfig = {};
  configs.forEach((config) => {
    this.shapesConfig[config.name] = config;
  });
}

// =====================================================================================
// Svvg path helpers
// =====================================================================================

const moveTo = (x, y) => `M${x},${y}`;

const lineTo = (x, y) => `L${x},${y}`;
