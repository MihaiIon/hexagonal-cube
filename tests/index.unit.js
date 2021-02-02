import Library from '../src/index';
import faker from './shared/faker';
import { formatErrorMessage as fem } from '../src/helpers';

const EXPECTED_ERROR_MESSAGE = {
  ID_SELECTOR_IS_NULL: fem("Param 'svgSelector' is null"),
  ID_SELECTOR_IS_NOT_A_STRING: fem("Param 'svgSelector' is not a string"),
  ID_SELECTOR_IS_NOT_VALID: fem("Param 'svgSelector' is not a valid id selector"),
};

let instance, instanceArguments;
let initializeFromOptionsSpy, initializeShapesSpy;

describe('Library', () => {
  beforeEach(() => {
    createMocks();

    initializeInstanceWithValidSelector();
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
      expect(() => new Library()).toThrowError(EXPECTED_ERROR_MESSAGE.ID_SELECTOR_IS_NULL);
    });
  });

  describe("when 'svgSelector' argument is null", () => {
    it('should throw the expected error', () => {
      const invalidArguments = [Object, [], {}, false, true, faker.number()];

      invalidArguments.forEach((invalidArgument) => {
        expect(() => new Library(invalidArgument)).toThrowError(EXPECTED_ERROR_MESSAGE.ID_SELECTOR_IS_NOT_A_STRING);
      });
    });
  });

  describe("when 'svgSelector' argument is an invalid selector", () => {
    it('should throw the expected error', () => {
      expect(() => new Library(faker.string())).toThrowError(EXPECTED_ERROR_MESSAGE.ID_SELECTOR_IS_NOT_VALID);
    });
  });

  describe('method', () => {
    it("should call 'initializeFromOptions' with the expected options", () => {
      const expectedOptions = {};
      [1, 2, 3].forEach(() => {
        expectedOptions[faker.string()] = faker.string();
      });

      initializeInstanceWithValidSelector(expectedOptions);

      expect(initializeFromOptionsSpy).toHaveBeenCalledWith(expectedOptions);
    });

    it("should call 'initializeShapesSpy'", () => {
      expect(initializeShapesSpy).toHaveBeenCalled();
    });
  });

  describe('static', () => {
    describe('ANIMATION_MODE', () => {
      const expectedObject = {
        FORWARD: 'forward',
        REVERSE: 'reverse',
      };

      expect(Library.ANIMATION_MODE).toStrictEqual(expectedObject);
    });

    describe('DEFAULT_COLORS', () => {
      it('should have the expected key/value pairs', () => {
        const expectedObject = {
          WHITE: '#ffffff',
          LIGHT_GREY: '#bdc2c6',
          GREY: '#7e878f',
          LIGHT_MAIN: '#b8dbee',
          MAIN: '#1c628f',
        };

        expect(Library.DEFAULT_COLORS).toStrictEqual(expectedObject);
      });
    });

    describe('DEFAULT_SHAPES_OPTIONS', () => {
      it('should have the expected key/value pairs', () => {
        const expectedObject = {
          [Library.SHAPE_NAME.INNER_BOTTOM_LEFT]: { fill: Library.DEFAULT_COLORS.MAIN, remove: false },
          [Library.SHAPE_NAME.INNER_BOTTOM_RIGHT]: { fill: Library.DEFAULT_COLORS.LIGHT_MAIN, remove: false },
          [Library.SHAPE_NAME.INNER_LEFT]: { fill: Library.DEFAULT_COLORS.MAIN, remove: false },
          [Library.SHAPE_NAME.INNER_RIGHT]: { fill: Library.DEFAULT_COLORS.LIGHT_MAIN, remove: false },
          [Library.SHAPE_NAME.INNER_TOP_LEFT]: { fill: Library.DEFAULT_COLORS.WHITE, remove: false },
          [Library.SHAPE_NAME.INNER_TOP_RIGHT]: { fill: Library.DEFAULT_COLORS.LIGHT_GREY, remove: false },
          [Library.SHAPE_NAME.OUTER_BOTTOM_LEFT]: { fill: Library.DEFAULT_COLORS.GREY, remove: false },
          [Library.SHAPE_NAME.OUTER_BOTTOM_RIGHT]: { fill: Library.DEFAULT_COLORS.WHITE, remove: true },
          [Library.SHAPE_NAME.OUTER_LEFT]: { fill: Library.DEFAULT_COLORS.GREY, remove: false },
          [Library.SHAPE_NAME.OUTER_RIGHT]: { fill: Library.DEFAULT_COLORS.WHITE, remove: true },
          [Library.SHAPE_NAME.OUTER_TOP_LEFT]: { fill: Library.DEFAULT_COLORS.LIGHT_GREY, remove: false },
          [Library.SHAPE_NAME.OUTER_TOP_RIGHT]: { fill: Library.DEFAULT_COLORS.LIGHT_GREY, remove: false },
        };

        expect(Library.DEFAULT_SHAPES_OPTIONS).toStrictEqual(expectedObject);
      });
    });

    describe('SHAPE_NAME', () => {
      it('should have the expected key/value pairs', () => {
        const expectedObject = {
          INNER_BOTTOM_LEFT: 'inner-bottom-left',
          INNER_BOTTOM_RIGHT: 'inner-bottom-right',
          INNER_LEFT: 'inner-left',
          INNER_RIGHT: 'inner-right',
          INNER_TOP_LEFT: 'inner-top-left',
          INNER_TOP_RIGHT: 'inner-top-right',
          OUTER_BOTTOM_LEFT: 'outer-bottom-left',
          OUTER_BOTTOM_RIGHT: 'outer-bottom-right',
          OUTER_LEFT: 'outer-left',
          OUTER_RIGHT: 'outer-right',
          OUTER_TOP_LEFT: 'outer-top-left',
          OUTER_TOP_RIGHT: 'outer-top-right',
        };

        expect(Library.SHAPE_NAME).toStrictEqual(expectedObject);
      });
    });
  });
});

function createMocks() {
  initializeFromOptionsSpy = jest.fn();
  initializeShapesSpy = jest.fn();

  Library.prototype.initializeFromOptions = initializeFromOptionsSpy;
  Library.prototype.initializeShapes = initializeShapesSpy;
}

function initializeInstanceWithValidSelector(opts = {}) {
  const validIdSelector = `#${faker.string()}`;

  instanceArguments = [validIdSelector, opts];

  instance = new Library(validIdSelector, opts);
}
