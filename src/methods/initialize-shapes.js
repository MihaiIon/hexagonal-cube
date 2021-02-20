export default function () {
  this.buildShapesConfig();
  this.buildAnimationAttributes();

  this.shapes = {};

  const shapeNames = Object.keys(this.shapesConfig);
  shapeNames.forEach((shapeName) => {
    if (!this.shapesConfig[shapeName].remove) {
      this.shapes[this.shapesConfig[shapeName].name] = this.paper.path(this.shapesConfig[shapeName].path);
      this.shapes[this.shapesConfig[shapeName].name].attr({
        ...this.hiddenShapeAttributes,
      });
    }
  });
}
