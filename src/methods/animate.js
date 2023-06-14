import { ANIMATION_ACTION } from '../constants/static-properties';

export default function (animationAction, callback = null) {
  //
  const animationOrder = this.computeAnimationOrder();

  //
  const transformationMatrix = this.computeTransformationMatrix();

  // Timing function added by SnapSvg library
  const mina = window.mina || document.mina;

  // Animation helper
  const animationProps = {
    animationDuration: this.animationDuration,
    animationOrder,
    easingFunction: mina.easeout,
    lastDelay: this.delayBeforeLastShapeIsAnimated,
    shapes: this.shapes,
  };

  animationHelper(animationProps, function onShapeReady(shape) {
    if (shape === null) return callback && callback();
    if (animationAction === ANIMATION_ACTION.HIDE)
      return shape.hide(transformationMatrix, animationProps.animationDuration * 0.8, mina.easein);
    return shape.show(transformationMatrix, animationProps.animationDuration, mina.bounce);
  });
}

function animationHelper(props, onShapeReady) {
  const { animationDuration, animationOrder, lastDelay, shapes, easingFunction } = props;

  // Number of shapes to be animated
  const shapeCount = animationOrder.length;

  // Animation variables
  let delay, shape, shapeName;

  for (let i = 0; i < shapeCount; i += 1) {
    delay = lastDelay * easingFunction((1 / shapeCount) * i);

    shapeName = animationOrder[i];
    shape = shapes[shapeName];

    // Create closure to capture the correct values in the timeout functions
    ((d, s) => {
      let timer = null;
      timer = setTimeout(() => {
        // Animation callback
        onShapeReady(s);

        // Clear the timeout from memory
        clearTimeout(timer);

        // When last shape is animated, call the 'callback' function and clear the timeout from memory
        if (i === shapeCount - 1) {
          timer = setTimeout(() => onShapeReady(null) && clearTimeout(timer), animationDuration);
        }
      }, d);
    })(delay, shape);
  }
}
