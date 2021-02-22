import errors from '../errors';
import regexps from '../regexps';

function ShapeConfig(name, path, options) {
  this.name = name;
  this.path = path;

  const { fill = '#000000', remove = false } = options;

  if (!regexps.fillColor.test(fill)) throw errors.shapefillColorFormat;
  this.fill = fill;

  if (typeof remove !== 'boolean') throw errors.shapeRemoveMustBeOfTypeBoolean;
  this.remove = remove;
}

ShapeConfig.prototype.attributes = function () {
  this.attr = { fill: this.fill };

  return this.attr;
};

export default ShapeConfig;
