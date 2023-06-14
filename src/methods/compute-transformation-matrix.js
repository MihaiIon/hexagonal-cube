import Snap from 'snapsvg-cjs';

export default function () {
  const ratio = 0.6;
  const translation = (this.safeSize * ratio) / 3;

  return Snap.matrix(ratio, 0, 0, ratio, translation, translation);
}
