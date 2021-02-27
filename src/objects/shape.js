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
  };

  this.hiddenAttributes = {
    fill: DEFAULT_COLORS.WHITE,
    opacity: 0,
  };

  // Render shape with hidden attributes
  this.element = paper.path(shapeConfig.path);
  this.element.attr(this.hiddenAttributes);
}

Shape.prototype.show = function () {};

Shape.prototype.hide = function () {};

export default Shape;
