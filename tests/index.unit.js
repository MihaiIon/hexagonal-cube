import HexagonalCube from '../src/index';

import { STATIC_PROPERTIES } from '../src/constants';
import errors from '../src/errors';

import random from './shared/random';

let instance, instanceArguments;
let initializeFromOptionsSpy, renderShapesSpy;

describe('HexagonalCube', () => {
  describe('instance', () => {
    beforeEach(() => {
      createMocks();

      factoryWithValidSelector();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should set attributes', () => {
      const expectedKeyValuePairs = {
        animating: false,
        selector: instanceArguments[0],
      };

      expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
    });

    it("should set 'selector' attribute with the expected value", () => {
      const expectedSelector = instanceArguments[0];

      expect(instance.selector).toBe(expectedSelector);
    });

    describe("when 'svgSelector' argument is null", () => {
      it('should throw the expected error', () => {
        expect(() => factory()).toThrowError(errors.svgSelectorIsNull.message);
      });
    });

    describe("when 'svgSelector' argument is null", () => {
      it('should throw the expected error', () => {
        const invalidArguments = [Object, [], {}, false, true, random.number()];

        invalidArguments.forEach((invalidArgument) => {
          expect(() => factory(invalidArgument)).toThrowError(errors.svgSelectorMustBeOfTypeString.message);
        });
      });
    });

    describe("when 'svgSelector' argument is an invalid selector", () => {
      it('should throw the expected error', () => {
        expect(() => factory(random.string())).toThrowError(errors.svgSelectorIsNotValid.message);
      });
    });

    describe('method', () => {
      describe('#initializeFromOptionsSpy', () => {
        let expectedOptions;

        beforeEach(() => {
          expectedOptions = {};
          [1, 2, 3].forEach(() => {
            expectedOptions[random.string()] = random.string();
          });
        });

        it('should be called with the expected options', () => {
          factoryWithValidSelector(expectedOptions);

          expect(initializeFromOptionsSpy).toHaveBeenCalledWith(expectedOptions);
        });
      });

      describe('#initializeShapes', () => {
        it('should be called', () => {
          expect(renderShapesSpy).toHaveBeenCalled();
        });
      });
    });
  });

  describe('static property', () => {
    describe('ANIMATION_DIRECTION', () => {
      it('should have the expected key/value pairs', () => {
        expect(HexagonalCube.ANIMATION_DIRECTION).toStrictEqual(STATIC_PROPERTIES.ANIMATION_DIRECTION);
      });
    });

    describe('DEFAULT_COLORS', () => {
      it('should have the expected key/value pairs', () => {
        expect(HexagonalCube.DEFAULT_COLORS).toStrictEqual(STATIC_PROPERTIES.DEFAULT_COLORS);
      });
    });

    describe('DEFAULT_SHAPES_OPTIONS', () => {
      it('should have the expected key/value pairs', () => {
        expect(HexagonalCube.DEFAULT_SHAPES_OPTIONS).toStrictEqual(STATIC_PROPERTIES.DEFAULT_SHAPES_OPTIONS);
      });
    });

    describe('SHAPE_NAME', () => {
      it('should have the expected key/value pairs', () => {
        expect(HexagonalCube.SHAPE_NAME).toStrictEqual(STATIC_PROPERTIES.SHAPE_NAME);
      });
    });
  });
});

function createMocks() {
  initializeFromOptionsSpy = jest.spyOn(HexagonalCube.prototype, 'initializeFromOptions');
  renderShapesSpy = jest.spyOn(HexagonalCube.prototype, 'renderShapes');

  [initializeFromOptionsSpy, renderShapesSpy].forEach((spy) => spy.mockImplementation(() => true));
}

function factory(svgSelector = null, opts = {}) {
  instanceArguments = [svgSelector, opts];
  instance = new HexagonalCube(svgSelector, opts);

  return instance;
}

function factoryWithValidSelector(opts = {}) {
  const validIdSelector = `#${random.string()}`;

  return factory(validIdSelector, opts);
}
