import ShapeConfig from '../../src/objects/shape-config';

import errors from '../../src/errors';

import random from '../shared/random';

let instance, instanceArguments;

describe('ShapeConfig', () => {
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
          fill: '#000000',
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
          remove: random.boolean(),
        };

        factoryWithGeneratedNameAndPath(shapeOptions);
      });

      it('should set the expected attributes', () => {
        const expectedKeyValuePairs = {
          fill: shapeOptions.fill,
          remove: shapeOptions.remove,
        };

        expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
      });

      describe("when 'options.fill' is not a valid hex color", () => {
        const instanceThrowingError = () => factoryWithGeneratedNameAndPath({ ...shapeOptions, fill: random.number() });

        expect(instanceThrowingError).toThrowError(errors.shapefillColorFormat.message);
      });

      describe("when 'options.remove' must be of type 'boolean'", () => {
        const instanceThrowingError = () => factoryWithGeneratedNameAndPath({ ...shapeOptions, remove: random.number() });

        expect(instanceThrowingError).toThrowError(errors.shapeRemoveMustBeOfTypeBoolean.message);
      });
    });

    describe('methods', () => {
      let shapeOptions;

      beforeEach(() => {
        shapeOptions = {
          fill: random.hexColor(),
          remove: random.boolean(),
        };

        factoryWithGeneratedNameAndPath(shapeOptions);
      });

      describe('#attributes', () => {
        it('should set the expected attributes', () => {
          const expectedKeyValuePairs = {
            attr: { fill: shapeOptions.fill },
          };

          instance.attributes();

          expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
        });

        it('should return the expected object', () => {
          expect(instance.attributes()).toEqual(instance.attr);
        });
      });
    });
  });
});

function factory(name, path, options = {}) {
  instanceArguments = [name, path, options];
  instance = new ShapeConfig(name, path, options);

  return instance;
}

function factoryWithGeneratedNameAndPath(options = {}) {
  const name = random.string();
  const path = random.string();

  return factory(name, path, options);
}
