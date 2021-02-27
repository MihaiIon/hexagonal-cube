import Shape from '../objects/shape';

export default function (options) {
  // Build shape options from default values and the user's configuration
  const shapeOptions = this.buildShapeOptions(options.shape);

  // Build the shape configuration from the shape options
  const shapeConfigs = this.buildShapeConfigs(shapeOptions);

  // Set shapes objects (these will be animated through SnapSvg library)
  this.shapes = {};

  shapeConfigs.forEach((config) => {
    if (config.keepToRender()) {
      this.shapes[config.name] = new Shape(this.paper, config);
    }
  });
}
