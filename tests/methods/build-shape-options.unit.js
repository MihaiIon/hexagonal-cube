import instanceMethod from '../../src/methods/build-shape-options';

import { DEFAULT_SHAPE_OPTIONS } from '../../src/constants/static-properties';

import random from '../shared/random';

let instance, method;

describe('#buildShapeOptions', () => {
  beforeEach(() => {
    createInstance();
  });

  describe('when there are no user defined shapes options', () => {
    it('should return the default values', () => {
      const shapeOptions = callMethod();

      expect(shapeOptions).toEqual(DEFAULT_SHAPE_OPTIONS);
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
      });

      it('should return the default values', () => {
        const shapeOptions = callMethod(userShapeOptions);

        expect(shapeOptions).toEqual(DEFAULT_SHAPE_OPTIONS);
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
      });

      it("should return and override the default values by the user's configuration", () => {
        const expectedShapesOptions = {
          ...DEFAULT_SHAPE_OPTIONS,
          ...userShapeOptions,
        };

        const shapeOptions = callMethod(userShapeOptions);

        expect(shapeOptions).toEqual(expectedShapesOptions);
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

  method = instanceMethod.bind(instance);
}
