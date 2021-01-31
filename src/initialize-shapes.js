export default function () {
  this.buildShapesConfig();
  this.buildAnimationAttributes();

  this.shapes = {};
  this.shapesConfig.forEach((shapeConfig) => {
    if (!shapeConfig.remove) {
      this.shapes[shapeConfig.name] = this.paper.path(shapeConfig.path);
      this.shapes[shapeConfig.name].attr({
        ...this.hiddenShapeAttributes,
      });
    }
  });
}
