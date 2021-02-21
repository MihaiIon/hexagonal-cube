import { DEFAULT_SHAPES_OPTIONS } from '../constants/static-properties';

export default function (userShapesOptions = {}) {
  // Set default options
  this.shapesOptions = { ...DEFAULT_SHAPES_OPTIONS };

  // For filtering typos
  const validShapeNames = Object.keys(this.shapesOptions);

  let defaultFill, defaultRemove;
  let userFill, userRemove;

  Object.keys(userShapesOptions)
    .filter((shapeName) => validShapeNames.includes(shapeName))
    .forEach((shapeName) => {
      defaultFill = this.shapesOptions[shapeName].fill;
      defaultRemove = this.shapesOptions[shapeName].remove;

      userFill = userShapesOptions[shapeName].fill;
      userRemove = userShapesOptions[shapeName].remove;

      this.shapesOptions[shapeName] = {
        fill: typeof userFill !== 'undefined' ? userFill : defaultFill,
        remove: typeof userRemove !== 'undefined' ? userRemove : defaultRemove,
      };
    });
}
