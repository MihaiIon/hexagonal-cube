import Snap from 'snapsvg-cjs';

import ShapeConfig from './shape-config';

import { DEFAULT_COLORS } from '../constants/static-properties';
import errors from '../errors';

function Shape(paper = null, shapeConfig = null) {
  if (paper === null) throw errors.shapePaperNotValid;
  this._paper = paper;

  if (!(shapeConfig instanceof ShapeConfig)) throw errors.shapeConfigNotValid;
  this._config = shapeConfig;

  this.baseAttributes = {
    fill: this._config.fill,
    opacity: 1,
    transform: Shape.BASE_TRANSFORMATION_MATRIX,
  };

  this.hiddenAttributes = {
    fill: DEFAULT_COLORS.WHITE,
    opacity: 0,
  };

  // Render shape with hidden attributes
  this.element = paper.path(shapeConfig.path);
  this.element.attr(this.hiddenAttributes);
}

// TODO: test this
Shape.prototype.hide = function (
  transformationMatrix = Shape.BASE_TRANSFORMATION_MATRIX,
  animationDuration = 0,
  timingFunction = null,
) {
  const animationAttributes = { ...this.hiddenAttributes, transform: transformationMatrix };

  this.element.animate(animationAttributes, animationDuration, timingFunction);
};

// TODO: test this
Shape.prototype.show = function (transformationMatrix, animationDuration = 0, timingFunction = null) {
  const animationAttributes = { ...this.baseAttributes };

  this.element.attr({ transform: transformationMatrix });
  this.element.animate(animationAttributes, animationDuration, timingFunction);
};

Shape.BASE_TRANSFORMATION_MATRIX = Snap.matrix(1, 0, 0, 1, 0, 0);

export default Shape;
