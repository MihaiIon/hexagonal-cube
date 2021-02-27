import errors from '../errors';
import regexps from '../regexps';

function ShapeConfig(name, path, options) {
  // TODO: test these two props
  this.name = name;
  this.path = path;

  const { fill = '#000000', remove = false } = options;

  if (!regexps.fillColor.test(fill)) throw errors.shapefillColorFormat;
  this.fill = fill;

  if (typeof remove !== 'boolean') throw errors.shapeRemoveMustBeOfTypeBoolean;
  this.remove = remove;
}

ShapeConfig.prototype.keepToRender = function () {
  return !this.remove;
};

export default ShapeConfig;
