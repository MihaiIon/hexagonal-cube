import Snap from 'snapsvg-cjs';

import instanceMethod from '../../src/methods/initialize-from-options';

import { ANIMATION_DIRECTION, ANIMATION_DURATION, ANIMATION_MODE } from '../../src/constants/static-properties';
import errors from '../../src/errors';

import random from '../shared/random';

let instance, method;
let initializeShapesSpy;

describe('#initializeFromOptions', () => {
  beforeEach(() => {
    createInstance();

    callMethod();
  });

  it("should call 'Snap' library with the expected selector", () => {
    expect(Snap).toHaveBeenCalledWith(instance.selector);
  });

  it("should set 'size' to the expected size'", () => {
    const expectedSize = Snap.__mockedValidPaper.node.clientHeight;

    expect(instance.size).toBe(expectedSize);
  });

  it('should set the expected values', () => {
    const expectedKeyValuePairs = {};

    expectedKeyValuePairs.safeMarginsRatio = 0.2;
    expectedKeyValuePairs.safeMargins = Snap.__mockedValidPaper.node.clientHeight * expectedKeyValuePairs.safeMarginsRatio;
    expectedKeyValuePairs.safeSize = Snap.__mockedValidPaper.node.clientHeight - expectedKeyValuePairs.safeMargins;

    expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
  });

  describe("when 'options' are not set", () => {
    it('should set the expected default values', () => {
      const expectedKeyValuePairs = {
        animationDirection: ANIMATION_DIRECTION.LEFT,
        animationDuration: ANIMATION_DURATION,
        animationMode: ANIMATION_MODE.INITIAL,
        delayBeforeLastShapeIsAnimated: Math.floor(ANIMATION_DURATION * 0.4),
      };

      expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
    });
  });

  describe("when 'options' are set", () => {
    let instanceOptions;

    beforeEach(() => {
      const randomAnimationDuration = random.number({ min: 600 });

      instanceOptions = {
        animationDirection: random.valueFromObject(ANIMATION_DIRECTION),
        animationDuration: randomAnimationDuration,
        animationMode: random.valueFromObject(ANIMATION_MODE),
        delayBeforeLastShapeIsAnimated: random.number({ max: randomAnimationDuration }),
        shapeAnimationOrder: random.stringArray(),
        shapes: random.stringArray(),
      };

      createInstance();
    });

    it('should set the expected values', () => {
      const expectedKeyValuePairs = {
        animationDirection: instanceOptions.animationDirection,
        animationDuration: instanceOptions.animationDuration,
        animationMode: instanceOptions.animationMode,
        delayBeforeLastShapeIsAnimated: instanceOptions.delayBeforeLastShapeIsAnimated,
      };

      callMethod(instanceOptions);

      expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
    });

    it("should call 'initializeShapes' with the instance options", () => {
      callMethod(instanceOptions);

      expect(initializeShapesSpy).toHaveBeenCalledWith(instanceOptions);
    });

    describe("when 'animationDirection' is not valid", () => {
      it('should throw the expected error', () => {
        const callMethodWithInvalidAnimationDirection = () =>
          callMethod({ ...instanceOptions, animationDirection: `${random.number()}` });

        expect(callMethodWithInvalidAnimationDirection).toThrowError(errors.animationDirectionMustBeOneOf.message);
      });
    });

    describe("when 'animationDuration' is not valid", () => {
      it('should throw the expected error', () => {
        const callMethodWithInvalidAnimationDuration = () =>
          callMethod({ ...instanceOptions, animationDuration: random.string() });

        expect(callMethodWithInvalidAnimationDuration).toThrowError(errors.animationDurationMustBeOfTypeNumber.message);
      });
    });

    describe("when 'animationDuration' is under 0", () => {
      it('should set it to the default animation duration', () => {
        callMethod({ ...instanceOptions, animationDuration: -1 });

        expect(instance.animationDuration).toBe(ANIMATION_DURATION);
      });
    });

    describe("when 'animationMode' is not valid", () => {
      it('should throw the expected error', () => {
        const callMethodWithInvalidAnimationMode = () => callMethod({ ...instanceOptions, animationMode: `${random.number()}` });

        expect(callMethodWithInvalidAnimationMode).toThrowError(errors.animationModeMustBeOneOf.message);
      });
    });

    describe("when 'delayBeforeLastShapeIsAnimated' is not a number", () => {
      it('should throw the expected error', () => {
        const callMethodWithInvalidDelayBeforeLastShapeIsAnimated = () =>
          callMethod({ ...instanceOptions, delayBeforeLastShapeIsAnimated: random.string() });

        expect(callMethodWithInvalidDelayBeforeLastShapeIsAnimated).toThrowError(
          errors.delayBeforeLastShapeIsAnimatedMustBeOfTypeNumber.message,
        );
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
  initializeShapesSpy = jest.fn();

  instance = {
    selector: validSelector,
    initializeShapes: initializeShapesSpy,
  };

  method = instanceMethod.bind(instance);
}
