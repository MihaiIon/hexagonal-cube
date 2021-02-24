import initializeShapes from '../../src/methods/initialize-shapes';

import ShapeConfig from '../../src/objects/shape-config';
import { DEFAULT_SHAPE_OPTIONS, SHAPE_NAME } from '../../src/constants/static-properties';

import random from '../shared/random';

let instance, method;

describe('#initializeShapes', () => {
  beforeEach(() => {
    createInstance();

    callMethod();
  });

  it('should set the expected values', () => {
    const safeMarginsRatio = 0.2;

    const expectedKeyValuePairs = {
      safeMargins: instance.size * safeMarginsRatio,
      safeSize: instance.size - instance.safeMargins,
      equilateralTriangleWidth: instance.safeSize / 4,
      equilateralTriangleHeight: (instance.equilateralTriangleWidth * Math.sqrt(3)) / 2,
    };

    expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
  });

  describe('attribute shapeConfigs', () => {
    it('should contain all shape names associated ', () => {
      const expectedShapeConfigs = {};
      Object.values(SHAPE_NAME).forEach((shapeName) => {
        expectedShapeConfigs[shapeName] = expect.any(ShapeConfig);
      });

      expect(instance.shapeConfigs).toEqual(expectedShapeConfigs);
    });

    it('should contain only valid paths', () => {
      const validCoordinate = '[0-9]{1,3}(?:[.][0-9]{0,2})?';
      const validCoordinates = `(?:${validCoordinate},${validCoordinate})`;
      const validPathRegExp = new RegExp(`M${validCoordinates}(?:L${validCoordinates}){2,3}`);

      let path;
      Object.values(SHAPE_NAME).forEach((shapeName) => {
        path = instance.shapeConfigs[shapeName].path;

        expect(path).toMatch(validPathRegExp);
      });
    });
  });
});

function callMethod(options = {}) {
  if (typeof method !== 'undefined') return method(options);
  return null;
}

function createInstance() {
  instance = {
    size: random.number({ min: 300, max: 800 }),
    shapeOptions: DEFAULT_SHAPE_OPTIONS,
  };

  method = initializeShapes.bind(instance);
}
