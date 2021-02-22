import { DEFAULT_SHAPE_OPTIONS } from '../constants/static-properties';

export default function (userShapesOptions = {}) {
  // Set default options
  this.shapeOptions = { ...DEFAULT_SHAPE_OPTIONS };

  // For filtering typos
  const validShapeNames = Object.keys(this.shapeOptions);

  let defaultFill, defaultRemove;
  let userFill, userRemove;

  Object.keys(userShapesOptions)
    .filter((shapeName) => validShapeNames.includes(shapeName))
    .forEach((shapeName) => {
      defaultFill = this.shapeOptions[shapeName].fill;
      defaultRemove = this.shapeOptions[shapeName].remove;

      userFill = userShapesOptions[shapeName].fill;
      userRemove = userShapesOptions[shapeName].remove;

      this.shapeOptions[shapeName] = {
        fill: typeof userFill !== 'undefined' ? userFill : defaultFill,
        remove: typeof userRemove !== 'undefined' ? userRemove : defaultRemove,
      };
    });
}
