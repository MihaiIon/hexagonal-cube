import { ANIMATION_ACTION } from '../constants/static-properties';

export default function (callback = null) {
  if (!this.animating) {
    this.animate(ANIMATION_ACTION.SHOW, callback);
  }
}
