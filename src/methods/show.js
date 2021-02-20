export default function (callback = null) {
  if (!this.animating) {
    this.animate(
      {
        animationAttributes: this.visibleShapeAttributes,
        animationDelay: 800,
        animationDuration: 400,
        animationOrder: this.shapeAnimationOrder,
      },
      callback,
    );
  }
}
