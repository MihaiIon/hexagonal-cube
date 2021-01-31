export default function (animationOptions = {}, callback = null) {
  // Animation options
  const { animationDelay = 10, animationDuration = 10, animationAttributes = this.visibleShapeAttributes } = animationOptions;

  // Animation helpers
  let delay, shape, shapeAttributes;

  // Timing function added by SnapSvg library
  const mina = window.mina || document.mina;

  // Done callback
  const done = callback && typeof callback === 'function' ? callback : () => null;

  // Animate
  const shapeNames = Object.keys(this.shapes);
  for (let i = 0; i < shapeNames.length; i += 1) {
    delay = animationDelay * mina.linear((1 / shapeNames.length) * i);
    shape = this.shapes[shapeNames[i]];
    shapeAttributes = this.shapesConfig[shapeNames[i]].attr;

    ((d, s, attr) => {
      let timer = null;
      timer = setTimeout(() => {
        s.animate({ transform: animationAttributes.transform }, animationDuration, mina.easeinout);
        s.animate({ fill: animationAttributes.fill || attr.fill, opacity: animationAttributes.opacity }, animationDuration, mina.easeinout);
        clearTimeout(timer);

        if (i === shapeNames.length) {
          timer = setTimeout(() => done() && clearTimeout(timer), animationDuration);
        }
      }, d);
    })(delay, shape, shapeAttributes);
  }
}
