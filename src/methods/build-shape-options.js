import { DEFAULT_SHAPE_OPTIONS, SHAPE_NAME } from '../constants/static-properties';

export default function (userShapesOptions = {}) {
  // Set default options
  const shapeOptions = { ...DEFAULT_SHAPE_OPTIONS };

  // For filtering typos
  const validShapeNames = Object.values(SHAPE_NAME);

  let defaultFill, defaultRemove;
  let userFill, userRemove;

  Object.keys(userShapesOptions)
    .filter((shapeName) => validShapeNames.includes(shapeName))
    .forEach((shapeName) => {
      defaultFill = shapeOptions[shapeName].fill;
      defaultRemove = shapeOptions[shapeName].remove;

      userFill = userShapesOptions[shapeName].fill;
      userRemove = userShapesOptions[shapeName].remove;

      shapeOptions[shapeName] = {
        fill: typeof userFill !== 'undefined' ? userFill : defaultFill,
        remove: typeof userRemove !== 'undefined' ? userRemove : defaultRemove,
      };
    });

  return shapeOptions;
}
