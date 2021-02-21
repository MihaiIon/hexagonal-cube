import { STATIC_PROPERTIES } from './constants';
import errors from './errors';
import methods from './methods';
import regexps from './regexps';

function HexagonalCube(svgSelector = null, options = {}) {
  if (svgSelector === null) throw errors.svgSelectorIsNull;
  if (typeof svgSelector !== 'string') throw errors.svgSelectorMustBeOfTypeString;
  if (!regexps.svgSelector.test(svgSelector)) throw errors.svgSelectorIsNotValid;

  this.selector = svgSelector;
  this.animating = false;

  this.initializeFromOptions(options);

  this.renderShapes();
}

Object.keys(STATIC_PROPERTIES).forEach((propertyName) => {
  HexagonalCube[propertyName] = STATIC_PROPERTIES[propertyName];
});

Object.keys(methods).forEach((methodName) => {
  HexagonalCube.prototype[methodName] = methods[methodName];
});

export default HexagonalCube;
