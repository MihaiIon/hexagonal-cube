import { formatErrorMessage as fem } from './helpers';

import initializeFromOptions from './initialize-from-options';

function CubicLogo(svgSelector = null, options = {}) {
  if (svgSelector === null) throw new Error(fem("Param 'svgSelector' is null"));

  if (typeof svgSelector !== 'string') throw new Error(fem("Param 'svgSelector' is not a string"));

  if (!/^#(?:[a-zA-Z0-9]+-?)[a-zA-Z0-9]+$/.test(svgSelector)) throw new Error(fem("Param 'svgSelector' is a valid id selector"));

  this.selector = svgSelector;

  this.initializeFromOptions(options);
}

CubicLogo.prototype.initializeFromOptions = initializeFromOptions;

export default CubicLogo;
