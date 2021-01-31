import Snap from 'snapsvg-cjs';

export default function () {
  const { DEFAULT_COLORS } = this.constructor;

  // Resets transformation matrix & opacity
  this.visibleShapeAttributes = {
    transform: Snap.matrix(1, 0, 0, 1, 0, 0),
    opacity: 1,
  };

  // Magic offset fixer for pixel perfect alignment
  const offsetFix = 1.065;

  // X-axis modifiers
  const xInclination = -0.2;
  const xTranslation = this.safeSize * -(xInclination * offsetFix);

  // Y-axis modifiers
  const yScale = 0.3;
  const yTranslation = this.safeSize * (1 - yScale) * offsetFix;

  // Shadow-like attributes for hidden shapes
  this.hiddenShapeAttributes = {
    transform: Snap.matrix(1, 0, xInclination, yScale, xTranslation, yTranslation),
    fill: DEFAULT_COLORS.LIGHT_GREY,
    opacity: 0,
  };
}
