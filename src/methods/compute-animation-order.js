import { ANIMATION_MODE, SHAPE_NAME } from '../constants/static-properties';

const DEFAULT_ANIMATION_ORDER = [
  SHAPE_NAME.OUTER_TOP_LEFT,
  SHAPE_NAME.OUTER_TOP_RIGHT,
  SHAPE_NAME.INNER_TOP_LEFT,
  SHAPE_NAME.INNER_TOP_RIGHT,
  SHAPE_NAME.OUTER_LEFT,
  SHAPE_NAME.INNER_LEFT,
  SHAPE_NAME.INNER_RIGHT,
  SHAPE_NAME.OUTER_RIGHT,
  SHAPE_NAME.INNER_BOTTOM_LEFT,
  SHAPE_NAME.INNER_BOTTOM_RIGHT,
  SHAPE_NAME.OUTER_BOTTOM_RIGHT,
  SHAPE_NAME.OUTER_BOTTOM_LEFT,
];

export default function () {
  //
  const animatedShapeNames = Object.keys(this.shapes);

  //
  const defautOrder = DEFAULT_ANIMATION_ORDER.filter((shapeName) => animatedShapeNames.includes(shapeName));

  switch (this.animationMode) {
    case ANIMATION_MODE.INITIAL:
      return defautOrder;
  }
}
