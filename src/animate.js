export default function (animationOptions = {}, callback = null) {
  // Animation options
  const {
    animationAttributes = this.visibleShapeAttributes,
    animationDelay = 10,
    animationDuration = 10,
    animationOrder = this.shapeAnimationOrder,
  } = animationOptions;

  // Animation helpers
  let delay, shape, shapeAttributes;

  // Timing function added by SnapSvg library
  const mina = window.mina || document.mina;

  // Done callback
  const done = callback && typeof callback === 'function' ? callback : () => null;

  // Animate
  for (let i = 0; i < animationOrder.length; i += 1) {
    delay = animationDelay * mina.easeout((1 / animationOrder.length) * i);
    shape = this.shapes[animationOrder[i]];
    shapeAttributes = this.shapesConfig[animationOrder[i]].attr;

    ((d, s, attr) => {
      let timer = null;
      timer = setTimeout(() => {
        s.animate({ transform: animationAttributes.transform }, animationDuration, mina.easeinout);
        s.animate({ fill: animationAttributes.fill || attr.fill, opacity: animationAttributes.opacity }, animationDuration, mina.easeinout);
        clearTimeout(timer);

        if (i === animationOrder.length - 1) {
          timer = setTimeout(() => done() && clearTimeout(timer), animationDuration);
        }
      }, d);
    })(delay, shape, shapeAttributes);
  }
}
