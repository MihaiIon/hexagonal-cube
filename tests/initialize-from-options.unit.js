import Snap from 'snapsvg-cjs';

import initializeFromOptions from '../src/initialize-from-options';

import faker from './shared/faker';
import { formatErrorMessage as fem } from '../src/helpers';

const EXPECTED_ERROR_MESSAGE = {
  SVG_HEIGHT_AND_WIDTH_MUST_BE_THE_SAME: fem("Svg element's height and witdh must be the same"),
  ATTRIBUTE_ANIMATION_MODE_MUST_BE_ONE_OF: fem("Attribute 'animationMode' must be one of <forward|reverse>"),
};

let instance, method;
let buildShapesOptionsSpy, configureShapeAnimationOrderSpy;

describe('#initializeFromOptions', () => {
  beforeEach(() => {
    initializeInstance();

    callMethodWithOptions();
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
    it("should set 'animationMode' to 'forward'", () => {
      expect(instance.animationMode).toBe(instance.constructor.ANIMATION_MODE.FORWARD);
    });

    it("should call 'configureShapeAnimationOrder' with null argument", () => {
      expect(configureShapeAnimationOrderSpy).toHaveBeenCalledWith(null);
    });
  });

  describe("when 'options' are set", () => {
    let methodOptions;

    beforeEach(() => {
      const animationModes = Object.values(instance.constructor.ANIMATION_MODE);

      methodOptions = {
        animationMode: animationModes[Math.floor(Math.random() * animationModes.length)],
        shapeAnimationOrder: [1, 2, 3].map(() => faker.string()),
        shapes: [1, 2, 3].map(() => faker.string()),
      };

      initializeInstance();
    });

    it("should set 'animationMode' to the expected value", () => {
      const expectedMode = methodOptions.animationMode;

      callMethodWithOptions(methodOptions);

      expect(instance.animationMode).toBe(expectedMode);
    });

    it("should call 'buildShapesOptions' with the expected argument", () => {
      const expectedArgument = methodOptions.shapes;

      callMethodWithOptions(methodOptions);

      expect(buildShapesOptionsSpy).toHaveBeenCalledWith(expectedArgument);
    });

    it("should call 'configureShapeAnimationOrder' with the expected argument", () => {
      const expectedArgument = methodOptions.shapeAnimationOrder;

      callMethodWithOptions(methodOptions);

      expect(configureShapeAnimationOrderSpy).toHaveBeenCalledWith(expectedArgument);
    });

    describe("when 'animationMode' is not valid", () => {
      it('should throw the expected error', () => {
        const call = () => callMethodWithOptions({ ...methodOptions, animationMode: `${faker.number()}` });

        expect(call).toThrowError(EXPECTED_ERROR_MESSAGE.ATTRIBUTE_ANIMATION_MODE_MUST_BE_ONE_OF);
      });
    });
  });

  describe("when svg element's 'clientHeight' is not equal to 'clientWidth'", () => {
    it('should throw the expected error', () => {
      initializeInstance(Snap.__mockedInvalidPaper.selector);

      expect(() => callMethodWithOptions()).toThrowError(EXPECTED_ERROR_MESSAGE.SVG_HEIGHT_AND_WIDTH_MUST_BE_THE_SAME);
    });
  });
});

function callMethodWithOptions(options = {}) {
  if (typeof method !== 'undefined') method(options);
}

function initializeInstance(selector = `#${faker.string()}`) {
  buildShapesOptionsSpy = jest.fn();
  configureShapeAnimationOrderSpy = jest.fn();

  instance = {
    selector,
    constructor: {
      ANIMATION_MODE: {
        FORWARD: 'forward',
        REVERSE: 'reverse',
      },
    },
    buildShapesOptions: buildShapesOptionsSpy,
    configureShapeAnimationOrder: configureShapeAnimationOrderSpy,
  };

  method = initializeFromOptions.bind(instance);
}
