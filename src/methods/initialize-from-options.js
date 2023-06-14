import Snap from 'snapsvg-cjs';

import { ANIMATION_DIRECTION, ANIMATION_DURATION, ANIMATION_MODE } from '../constants/static-properties';
import errors from '../errors';

export default function (options = {}) {
  const {
    animationDirection = ANIMATION_DIRECTION.LEFT,
    animationDuration = ANIMATION_DURATION,
    animationMode = ANIMATION_MODE.INITIAL,
    delayBeforeLastShapeIsAnimated,
  } = options;

  // Create Snap instance
  this.paper = Snap(this.selector);
  this.parentNode = this.paper.node;

  // Set 'size' attribute with svg's 'clientHeight'
  if (this.parentNode.clientHeight !== this.parentNode.clientWidth) throw errors.svgHeightAndWidthMustBeTheSame;
  this.size = this.parentNode.clientHeight;

  // Compute a safe zone for animations
  this.safeMarginsRatio = 0.2;
  this.safeMargins = this.size * this.safeMarginsRatio;
  this.safeSize = this.size - this.safeMargins;

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

  // Set animation duration
  if (typeof animationDuration !== 'number') throw errors.animationDurationMustBeOfTypeNumber;
  this.animationDuration = animationDuration < 0 ? ANIMATION_DURATION : animationDuration;

  // Set delay before the last shape is animated
  const defaultDelayBeforeLastShapeIsAnimated = Math.floor(this.animationDuration * 0.8);

  if (typeof delayBeforeLastShapeIsAnimated === 'undefined') {
    this.delayBeforeLastShapeIsAnimated = defaultDelayBeforeLastShapeIsAnimated;
  } else if (typeof delayBeforeLastShapeIsAnimated !== 'number') {
    throw errors.delayBeforeLastShapeIsAnimatedMustBeOfTypeNumber;
  } else {
    this.delayBeforeLastShapeIsAnimated =
      delayBeforeLastShapeIsAnimated < 0 ? defaultDelayBeforeLastShapeIsAnimated : delayBeforeLastShapeIsAnimated;
  }

  // Set shape objects
  this.initializeShapes(options);
}
