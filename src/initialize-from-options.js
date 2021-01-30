import Snap from 'snapsvg-cjs';
import { formatErrorMessage as fem } from './helpers';

export default function (options) {
  const { mode = 'forward' } = options;

  this.mode = mode;

  this.paper = Snap(this.selector);
  this.parentNode = this.paper.node;

  if (this.parentNode.clientHeight !== this.parentNode.clientWidth) throw new Error(fem("Svg element's height and witdh must be the same"));
  else this.size = this.parentNode.clientHeight;
}
