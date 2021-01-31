import { formatErrorMessage as fem } from './helpers';

import buildShapesConfig from './build-shapes-config';
import buildAnimationAttributes from './build-animation-attributes';

import initializeFromOptions from './initialize-from-options';
import initializeShapes from './initialize-shapes';

import animate from './animate';
import hide from './hide';
import show from './show';

function HexagonalCube(svgSelector = null, options = {}) {
  if (svgSelector === null) throw new Error(fem("Param 'svgSelector' is null"));

  if (typeof svgSelector !== 'string') throw new Error(fem("Param 'svgSelector' is not a string"));

  if (!/^#(?:[a-zA-Z0-9]+-?)[a-zA-Z0-9]+$/.test(svgSelector)) throw new Error(fem("Param 'svgSelector' is not a valid id selector"));

  this.selector = svgSelector;

  this.animating = false;

  this.initializeFromOptions(options);
  this.initializeShapes();
}

HexagonalCube.SHAPE_NAME = {
  OUTER_BOTTOM_LEFT: 'outer-bottom-left',
  OUTER_BOTTOM_RIGHT: 'outer-bottom-right',
  OUTER_LEFT: 'outer-left',
  OUTER_RIGHT: 'outer-right',
  OUTER_TOP_LEFT: 'outer-top-left',
  OUTER_TOP_RIGHT: 'outer-top-right',
  INNER_BOTTOM_LEFT: 'inner-bottom-left',
  INNER_BOTTOM_RIGHT: 'inner-bottom-right',
  INNER_LEFT: 'inner-left',
  INNER_RIGHT: 'inner-right',
  INNER_TOP_LEFT: 'inner-top-left',
  INNER_TOP_RIGHT: 'inner-top-right',
};

HexagonalCube.DEFAULT_COLORS = {
  WHITE: '#ffffff',
  LIGHT_GREY: '#bdc2c6',
  GREY: '#7e878f',
  LIGHT_MAIN: '#b8dbee',
  MAIN: '#1c628f',
};

HexagonalCube.DEFAULT_SHAPES_OPTIONS = {
  [HexagonalCube.SHAPE_NAME.INNER_BOTTOM_LEFT]: { fill: HexagonalCube.DEFAULT_COLORS.MAIN },
  [HexagonalCube.SHAPE_NAME.INNER_BOTTOM_RIGHT]: { fill: HexagonalCube.DEFAULT_COLORS.LIGHT_MAIN },
  [HexagonalCube.SHAPE_NAME.INNER_LEFT]: { fill: HexagonalCube.DEFAULT_COLORS.MAIN },
  [HexagonalCube.SHAPE_NAME.INNER_RIGHT]: { fill: HexagonalCube.DEFAULT_COLORS.LIGHT_MAIN },
  [HexagonalCube.SHAPE_NAME.INNER_TOP_LEFT]: { fill: HexagonalCube.DEFAULT_COLORS.WHITE },
  [HexagonalCube.SHAPE_NAME.INNER_TOP_RIGHT]: { fill: HexagonalCube.DEFAULT_COLORS.LIGHT_GREY },
  [HexagonalCube.SHAPE_NAME.OUTER_BOTTOM_LEFT]: { fill: HexagonalCube.DEFAULT_COLORS.GREY },
  [HexagonalCube.SHAPE_NAME.OUTER_BOTTOM_RIGHT]: { fill: HexagonalCube.DEFAULT_COLORS.WHITE, remove: true },
  [HexagonalCube.SHAPE_NAME.OUTER_LEFT]: { fill: HexagonalCube.DEFAULT_COLORS.GREY },
  [HexagonalCube.SHAPE_NAME.OUTER_RIGHT]: { fill: HexagonalCube.DEFAULT_COLORS.WHITE, remove: true },
  [HexagonalCube.SHAPE_NAME.OUTER_TOP_LEFT]: { fill: HexagonalCube.DEFAULT_COLORS.LIGHT_GREY },
  [HexagonalCube.SHAPE_NAME.OUTER_TOP_RIGHT]: { fill: HexagonalCube.DEFAULT_COLORS.LIGHT_GREY },
};

HexagonalCube.prototype.buildAnimationAttributes = buildAnimationAttributes;
HexagonalCube.prototype.buildShapesConfig = buildShapesConfig;

HexagonalCube.prototype.initializeFromOptions = initializeFromOptions;
HexagonalCube.prototype.initializeShapes = initializeShapes;

HexagonalCube.prototype.animate = animate;
HexagonalCube.prototype.hide = hide;
HexagonalCube.prototype.show = show;

export default HexagonalCube;
