import errors from '../errors';
import regexps from '../regexps';

function Shape(name, path, options) {
  this.attr = {};
  this.name = name;
  this.path = path;

  const { fill = '#000000', order = 1, remove = false } = options;

  if (!regexps.fillColor.test(fill)) throw errors.shapefillColorFormat;
  this.attr = { fill };

  if (typeof order !== 'number') throw errors.shapeOrderMustBeOfTypeNumber;
  this.order = order;

  if (typeof remove !== 'boolean') throw errors.shapeRemoveMustBeOfTypeBoolean;
  this.remove = remove;
}

export default Shape;
