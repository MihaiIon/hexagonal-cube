import configureShapeAnimationOrder from '../src/configure-shape-animation-order';

import faker from './shared/faker';

let instance, method;

describe('#configureShapeAnimationOrder', () => {
  beforeEach(() => {
    initializeInstance();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should set '_defaultShapeAnimationOrder' with the expected value", () => {
    const { SHAPE_NAME } = instance.constructor;
    const { shapesOptions } = instance;

    const expectedValue = [
      SHAPE_NAME.OUTER_TOP_LEFT,
      SHAPE_NAME.OUTER_TOP_RIGHT,
      SHAPE_NAME.INNER_TOP_LEFT,
      SHAPE_NAME.INNER_TOP_RIGHT,
      SHAPE_NAME.OUTER_LEFT,
      SHAPE_NAME.INNER_LEFT,
      SHAPE_NAME.INNER_RIGHT,
      SHAPE_NAME.OUTER_RIGHT,
      SHAPE_NAME.INNER_BOTTOM_LEFT,
      SHAPE_NAME.INNER_BOTTOM_RIGHT,
      SHAPE_NAME.OUTER_BOTTOM_RIGHT,
      SHAPE_NAME.OUTER_BOTTOM_LEFT,
    ].filter((shapeName) => !shapesOptions[shapeName].remove);

    callMethodWithArgument();

    expect(instance._defaultShapeAnimationOrder).toStrictEqual(expectedValue);
  });

  describe("when 'userShapeAnimationOrder' is not set", () => {
    it("should set 'shapeAnimationOrder' with the expected array", () => {
      callMethodWithArgument();

      expect(instance.shapeAnimationOrder).toStrictEqual(instance._defaultShapeAnimationOrder);
    });
  });

  describe("when 'userShapeAnimationOrder' is not an array", () => {
    it("should set 'shapeAnimationOrder' with the expected array", () => {
      const invalidArguments = [faker.boolean(), faker.number(), faker.string(), {}, Object, () => {}];

      invalidArguments.forEach((invalidArgument) => {
        callMethodWithArgument(invalidArgument);

        expect(instance.shapeAnimationOrder).toStrictEqual(instance._defaultShapeAnimationOrder);
      });
    });
  });

  describe("when 'userShapeAnimationOrder' is an array", () => {
    describe("when 'userShapeAnimationOrder' contains no strings", () => {
      it("should set 'shapeAnimationOrder' with the expected array", () => {
        const invalidUserShapeAnimationOrder = [faker.boolean(), faker.number(), [], {}, Object, () => {}];

        callMethodWithArgument(invalidUserShapeAnimationOrder);

        expect(instance.shapeAnimationOrder).toStrictEqual(instance._defaultShapeAnimationOrder);
      });
    });

    describe("when 'userShapeAnimationOrder' contains valid & invalid shape names", () => {
      it("should set 'shapeAnimationOrder' with an array containing only valid shape names", () => {
        const validShapeNames = Object.values(instance.constructor.SHAPE_NAME);
        const invalidShapeNames = [1, 2, 3].map(() => `invalid-${faker.string()}`);

        callMethodWithArgument(validShapeNames.concat(invalidShapeNames));

        expect(instance.shapeAnimationOrder.sort()).toStrictEqual(validShapeNames.sort());
      });
    });
  });
});

function callMethodWithArgument(userShapeAnimationOrder = null) {
  if (typeof method !== 'undefined') method(userShapeAnimationOrder);
}

function initializeInstance() {
  const SHAPE_NAME = {
    OUTER_BOTTOM_LEFT: 'outer-bottom-left',
    OUTER_BOTTOM_RIGHT: 'outer-bottom-right',
    OUTER_LEFT: 'outer-left',
    OUTER_RIGHT: 'outer-right',
    OUTER_TOP_LEFT: 'outer-top-left',
    OUTER_TOP_RIGHT: 'outer-top-right',
    INNER_BOTTOM_LEFT: 'inner-bottom-left',
    INNER_BOTTOM_RIGHT: 'inner-bottom-right',
    INNER_LEFT: 'inner-left',
    INNER_RIGHT: 'inner-right',
    INNER_TOP_LEFT: 'inner-top-left',
    INNER_TOP_RIGHT: 'inner-top-right',
  };

  const shapesOptions = {};
  Object.values(SHAPE_NAME).forEach((shapeName) => {
    shapesOptions[shapeName] = {
      remove: faker.boolean(),
    };
  });

  instance = {
    selector: `#${faker.string()}`,
    constructor: { SHAPE_NAME },
    shapesOptions,
  };

  method = configureShapeAnimationOrder.bind(instance);
}
