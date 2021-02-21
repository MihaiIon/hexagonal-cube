import initializeShapesOptions from '../../src/methods/initialize-shapes-options';

import { DEFAULT_SHAPES_OPTIONS } from '../../src/constants/static-properties';

import random from '../shared/random';

let instance, method;

describe('#initializeShapesOptions', () => {
  beforeEach(() => {
    createInstance();
  });

  describe('when there are no user defined shapes options', () => {
    it("should set 'shapesOptions' to the default value", () => {
      callMethod();

      expect(instance.shapesOptions).toEqual(DEFAULT_SHAPES_OPTIONS);
    });
  });

  describe('when there are user defined shapes options', () => {
    let userShapesOptions;

    describe('when shape name is not valid', () => {
      beforeEach(() => {
        const invalidShapeName = random.string();

        userShapesOptions = {
          [invalidShapeName]: {
            fill: random.hexColor(),
            remove: random.boolean(),
          },
        };

        callMethod(userShapesOptions);
      });

      it('should ignore it and keep the default values', () => {
        expect(instance.shapesOptions).toEqual(DEFAULT_SHAPES_OPTIONS);
      });
    });

    describe('when shape name is valid', () => {
      beforeEach(() => {
        const validShapeName = random.keyFromObject(DEFAULT_SHAPES_OPTIONS);

        userShapesOptions = {
          [validShapeName]: {
            fill: random.hexColor(),
            remove: random.boolean(),
          },
        };

        callMethod(userShapesOptions);
      });

      it('should override the default value for that shape', () => {
        const expectedShapesOptions = {
          ...DEFAULT_SHAPES_OPTIONS,
          ...userShapesOptions,
        };

        expect(instance.shapesOptions).toEqual(expectedShapesOptions);
      });
    });
  });
});

function callMethod(userShapesOptions = {}) {
  if (typeof method !== 'undefined') return method(userShapesOptions);
  return null;
}

function createInstance() {
  instance = {};

  method = initializeShapesOptions.bind(instance);
}
