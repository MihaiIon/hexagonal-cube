import Snap from 'snapsvg-cjs';

import initializeFromOptions from '../../src/methods/initialize-from-options';

import { ANIMATION_DIRECTION, ANIMATION_MODE } from '../../src/constants/static-properties';
import errors from '../../src/errors';

import random from '../shared/random';

let instance, method;
let initializeShapesOptionsSpy;

describe('#initializeFromOptions', () => {
  beforeEach(() => {
    createInstance();

    callMethod();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call 'Snap' library with the expected selector", () => {
    expect(Snap).toHaveBeenCalledWith(instance.selector);
  });

  it("should set 'size' to the expected size'", () => {
    const expectedSize = Snap.__mockedValidPaper.node.clientHeight;

    expect(instance.size).toBe(expectedSize);
  });

  describe("when 'options' are not set", () => {
    it('should set the expected default values', () => {
      const expectedKeyValuePairs = {
        animationDirection: ANIMATION_DIRECTION.LEFT,
        animationMode: ANIMATION_MODE.INITIAL,
      };

      expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
    });
  });

  describe("when 'options' are set", () => {
    let methodOptions;

    beforeEach(() => {
      methodOptions = {
        animationDirection: random.valueFromObject(ANIMATION_DIRECTION),
        animationMode: random.valueFromObject(ANIMATION_MODE),
        shapeAnimationOrder: random.stringArray(),
        shapes: random.stringArray(),
      };

      createInstance();
    });

    it('should set the expected values', () => {
      const expectedKeyValuePairs = {
        animationDirection: methodOptions.animationDirection,
        animationMode: methodOptions.animationMode,
      };

      callMethod(methodOptions);

      expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
    });

    it("should call 'initializeShapesOptions' with the expected argument", () => {
      const expectedArgument = methodOptions.shapes;

      callMethod(methodOptions);

      expect(initializeShapesOptionsSpy).toHaveBeenCalledWith(expectedArgument);
    });

    describe("when 'animationDirection' is not valid", () => {
      it('should throw the expected error', () => {
        const callMethodWithInvalidAnimationDirection = () => callMethod({ ...methodOptions, animationDirection: `${random.number()}` });

        expect(callMethodWithInvalidAnimationDirection).toThrowError(errors.animationDirectionMustBeOneOf.message);
      });
    });

    describe("when 'animationMode' is not valid", () => {
      it('should throw the expected error', () => {
        const callMethodWithInvalidAnimationMode = () => callMethod({ ...methodOptions, animationMode: `${random.number()}` });

        expect(callMethodWithInvalidAnimationMode).toThrowError(errors.animationModeMustBeOneOf.message);
      });
    });
  });

  describe("when svg element's 'clientHeight' is not equal to 'clientWidth'", () => {
    it('should throw the expected error', () => {
      createInstance(Snap.__mockedInvalidPaper.selector);

      expect(() => callMethod()).toThrowError(errors.svgHeightAndWidthMustBeTheSame.message);
    });
  });
});

function callMethod(options = {}) {
  if (typeof method !== 'undefined') return method(options);
  return null;
}

function createInstance(validSelector = `#${random.string()}`) {
  initializeShapesOptionsSpy = jest.fn();

  instance = {
    selector: validSelector,
    initializeShapesOptions: initializeShapesOptionsSpy,
  };

  method = initializeFromOptions.bind(instance);
}
