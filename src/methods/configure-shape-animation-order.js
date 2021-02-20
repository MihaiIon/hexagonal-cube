export default function (userShapeAnimationOrder = null) {
  const { SHAPE_NAME } = this.constructor;

  // Keep only the shape names that are not removed by the user or the default shape options
  this._defaultShapeAnimationOrder = [
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
  ].filter((shapeName) => !this.shapesOptions[shapeName].remove);

  // Check if user's input is an array
  const userInputIsValid = userShapeAnimationOrder !== null && Array.isArray(userShapeAnimationOrder);
  if (!userInputIsValid) {
    this.shapeAnimationOrder = this._defaultShapeAnimationOrder;
    return;
  }

  // Exclude any shape name not matching the existing shape names.
  const validShapeNames = Object.values(SHAPE_NAME);
  const filteredShapeNameArray = userShapeAnimationOrder.filter((obj) => typeof obj === 'string').filter((str) => validShapeNames.includes(str));

  if (filteredShapeNameArray.length === 0) {
    this.shapeAnimationOrder = this._defaultShapeAnimationOrder;
    return;
  }

  this.shapeAnimationOrder = filteredShapeNameArray;
}
