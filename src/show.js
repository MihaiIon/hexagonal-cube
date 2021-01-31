export default function (callback = null) {
  if (!this.animating) {
    this.animate(
      {
        animationAttributes: this.visibleShapeAttributes,
        animationDelay: 1800,
        animationDuration: 350,
      },
      callback,
    );
  }
}
