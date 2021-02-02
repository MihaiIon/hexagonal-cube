export default function (callback = null) {
  if (!this.animating) {
    this.animate(
      {
        animationAttributes: this.hiddenShapeAttributes,
        animationDelay: 900,
        animationDuration: 350,
        animationOrder: this.shapeAnimationOrder.slice().reverse(),
      },
      callback,
    );
  }
}
