import initializeShapesOptions from '../../src/methods/initialize-shape-options';

import { DEFAULT_SHAPE_OPTIONS } from '../../src/constants/static-properties';

import random from '../shared/random';

let instance, method;

describe('#initializeShapesOptions', () => {
  beforeEach(() => {
    createInstance();
  });

  describe('when there are no user defined shapes options', () => {
    it("should set 'shapeOptions' to the default value", () => {
      callMethod();

      expect(instance.shapeOptions).toEqual(DEFAULT_SHAPE_OPTIONS);
    });
  });

  describe('when there are user defined shapes options', () => {
    let userShapeOptions;

    describe('when shape name is not valid', () => {
      beforeEach(() => {
        const invalidShapeName = random.string();

        userShapeOptions = {
          [invalidShapeName]: {
            fill: random.hexColor(),
            remove: random.boolean(),
          },
        };

        callMethod(userShapeOptions);
      });

      it('should ignore it and keep the default values', () => {
        expect(instance.shapeOptions).toEqual(DEFAULT_SHAPE_OPTIONS);
      });
    });

    describe('when shape name is valid', () => {
      beforeEach(() => {
        const validShapeName = random.keyFromObject(DEFAULT_SHAPE_OPTIONS);

        userShapeOptions = {
          [validShapeName]: {
            fill: random.hexColor(),
            remove: random.boolean(),
          },
        };

        callMethod(userShapeOptions);
      });

      it('should override the default value for that shape', () => {
        const expectedShapesOptions = {
          ...DEFAULT_SHAPE_OPTIONS,
          ...userShapeOptions,
        };

        expect(instance.shapeOptions).toEqual(expectedShapesOptions);
      });
    });
  });
});

function callMethod(userShapeOptions = {}) {
  if (typeof method !== 'undefined') return method(userShapeOptions);
  return null;
}

function createInstance() {
  instance = {};

  method = initializeShapesOptions.bind(instance);
}
