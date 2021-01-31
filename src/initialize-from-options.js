import Snap from 'snapsvg-cjs';
import { formatErrorMessage as fem } from './helpers';

export default function (options) {
  const { mode = 'forward' } = options;

  this.mode = mode;

  this.paper = Snap(this.selector);
  this.parentNode = this.paper.node;

  // Get svg size
  if (this.parentNode.clientHeight !== this.parentNode.clientWidth) throw new Error(fem("Svg element's height and witdh must be the same"));
  else this.size = this.parentNode.clientHeight;

  // Set shapes options
  const { DEFAULT_SHAPES_OPTIONS } = this.constructor;
  this.shapesOptions = { ...DEFAULT_SHAPES_OPTIONS, ...options.shapes };
}
