export default function (callback = null) {
  if (!this.animating) {
    this.animate(
      {
        animationAttributes: this.hiddenShapeAttributes,
        animationDelay: 1800,
        animationDuration: 350,
      },
      callback,
    );
  }
}
