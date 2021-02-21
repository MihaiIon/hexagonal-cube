import Snap from 'snapsvg-cjs';

import { ANIMATION_DIRECTION, ANIMATION_MODE } from '../constants/static-properties';
import errors from '../errors';

export default function (options = {}) {
  const { animationDirection = ANIMATION_DIRECTION.LEFT, animationMode = ANIMATION_MODE.INITIAL } = options;

  // Create Snap instance
  this.paper = Snap(this.selector);
  this.parentNode = this.paper.node;

  // Set 'size' attribute with svg's 'clientHeight'
  if (this.parentNode.clientHeight !== this.parentNode.clientWidth) throw errors.svgHeightAndWidthMustBeTheSame;
  else this.size = this.parentNode.clientHeight;

  // Used to valided each property
  let propertyRegexp;

  // Set animation direction
  propertyRegexp = new RegExp(`^${Object.values(ANIMATION_DIRECTION).join('|')}$`);
  if (!propertyRegexp.test(animationDirection)) throw errors.animationDirectionMustBeOneOf;
  this.animationDirection = animationDirection;

  // Set animation mode
  propertyRegexp = new RegExp(`^${Object.values(ANIMATION_MODE).join('|')}$`);
  if (!propertyRegexp.test(animationMode)) throw errors.animationModeMustBeOneOf;
  this.animationMode = animationMode;

  // Set shapes options
  this.initializeShapesOptions(options.shapes);

  // Set shapes
  this.initializeShapes();
}
