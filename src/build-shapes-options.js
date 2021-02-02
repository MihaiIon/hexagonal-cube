export default function (userShapesOptions = {}) {
  const { DEFAULT_SHAPES_OPTIONS } = this.constructor;

  // Set default options
  this.shapesOptions = { ...DEFAULT_SHAPES_OPTIONS };

  // Keep track of valid shape names
  const validShapeNames = Object.keys(this.shapesOptions);

  let defaultFill, userFill;
  let defaultRemove, userRemove;

  Object.keys(userShapesOptions)
    .filter((shapeName) => validShapeNames.includes(shapeName))
    .forEach((shapeName) => {
      defaultFill = this.shapesOptions[shapeName].fill;
      defaultRemove = this.shapesOptions[shapeName].remove;
      userFill = userShapesOptions[shapeName].fill;
      userRemove = userShapesOptions[shapeName].remove;

      this.shapesOptions[shapeName] = {
        fill: typeof userFill === 'string' ? userFill : defaultFill,
        remove: typeof userRemove === 'boolean' ? userRemove : defaultRemove,
      };
    });
}
