import Library from '../src/index';
import faker from './shared/faker';
import { formatErrorMessage as fem } from '../src/helpers';

const EXPECTED_ERROR_MESSAGE = {
  ID_SELECTOR_IS_NULL: fem("Param 'svgSelector' is null"),
  ID_SELECTOR_IS_NOT_A_STRING: fem("Param 'svgSelector' is not a string"),
  ID_SELECTOR_IS_NOT_VALID: fem("Param 'svgSelector' is a valid id selector"),
};

let instance, instanceArguments;
let initializeFromOptionsSpy;

describe('Library', () => {
  beforeEach(() => {
    createMocks();
    initializeInstance();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should set 'selector' attribute", () => {
    const expectedSelector = instanceArguments[0];

    expect(instance.selector).toBe(expectedSelector);
  });

  it("should call 'initializeFromOptions' with the expected options", () => {
    const expectedOptions = {};
    [1, 2, 3].forEach(() => {
      expectedOptions[faker.string()] = faker.string();
    });

    initializeInstance(expectedOptions);

    expect(initializeFromOptionsSpy).toHaveBeenCalledWith(expectedOptions);
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
});

function initializeInstance(opts = {}) {
  const validIdSelector = `#${faker.string()}`;

  instanceArguments = [validIdSelector, opts];

  instance = new Library(validIdSelector, opts);
}

function createMocks() {
  initializeFromOptionsSpy = jest.fn().mockImplementation(() => {});

  Library.prototype.initializeFromOptions = initializeFromOptionsSpy;
}
