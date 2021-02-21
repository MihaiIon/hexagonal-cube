import Shape from '../../src/objects/shape';

import errors from '../../src/errors';

import random from '../shared/random';

let instance, instanceArguments;

describe('Shape', () => {
  describe('instance', () => {
    beforeEach(() => {
      factoryWithGeneratedNameAndPath();
    });

    it('should set attributes', () => {
      const expectedKeyValuePairs = {
        name: instanceArguments[0],
        path: instanceArguments[1],
      };

      expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
    });

    describe('when options are not set', () => {
      it('should set the expected default attributes', () => {
        const expectedKeyValuePairs = {
          attr: { fill: '#000000' },
          order: 1,
          remove: false,
        };

        expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
      });
    });

    describe('when options are set', () => {
      let shapeOptions;

      beforeEach(() => {
        shapeOptions = {
          fill: random.hexColor(),
          order: random.number(),
          remove: random.boolean(),
        };

        factoryWithGeneratedNameAndPath(shapeOptions);
      });

      it('should set the expected attributes', () => {
        const expectedKeyValuePairs = {
          attr: { fill: shapeOptions.fill },
          order: shapeOptions.order,
          remove: shapeOptions.remove,
        };

        expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
      });

      describe("when 'options.fill' is not a valid hex color", () => {
        const instanceThrowingError = () => factoryWithGeneratedNameAndPath({ ...shapeOptions, fill: random.number() });

        expect(instanceThrowingError).toThrowError(errors.shapefillColorFormat.message);
      });

      describe("when 'options.order' must be of type 'number'", () => {
        const instanceThrowingError = () => factoryWithGeneratedNameAndPath({ ...shapeOptions, order: random.boolean() });

        expect(instanceThrowingError).toThrowError(errors.shapeOrderMustBeOfTypeNumber.message);
      });

      describe("when 'options.remove' must be of type 'boolean'", () => {
        const instanceThrowingError = () => factoryWithGeneratedNameAndPath({ ...shapeOptions, remove: random.number() });

        expect(instanceThrowingError).toThrowError(errors.shapeRemoveMustBeOfTypeBoolean.message);
      });
    });
  });
});

function factory(name, path, options = {}) {
  instanceArguments = [name, path, options];
  instance = new Shape(name, path, options);

  return instance;
}

function factoryWithGeneratedNameAndPath(options = {}) {
  const name = random.string();
  const path = random.string();

  return factory(name, path, options);
}
