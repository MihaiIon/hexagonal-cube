import Snap from 'snapsvg-cjs';
import { formatErrorMessage as fem } from './helpers';

export default function (options = {}) {
  const { ANIMATION_MODE } = this.constructor;

  const { animationMode = ANIMATION_MODE.FORWARD, shapeAnimationOrder = null } = options;

  // Create Snap instance
  this.paper = Snap(this.selector);
  this.parentNode = this.paper.node;

  // Set 'size' attribute with svg's 'clientHeight'
  if (this.parentNode.clientHeight !== this.parentNode.clientWidth) throw new Error(fem("Svg element's height and witdh must be the same"));
  else this.size = this.parentNode.clientHeight;

  // Set animation mode
  if (!/^forward|reverse$/.test(animationMode)) throw new Error(fem("Attribute 'animationMode' must be one of <forward|reverse>"));
  this.animationMode = animationMode;

  // Set shapes options
  this.buildShapesOptions(options.shapes);

  // Set shape animation order
  this.configureShapeAnimationOrder(shapeAnimationOrder);
}
