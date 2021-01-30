import Snap from 'snapsvg-cjs';
jest.mock('snapsvg-cjs', () =>
  jest.fn().mockImplementation(() => ({
    node: {
      clientHeight: 300,
      clientWidth: 300,
    },
  })),
);

import initializeFromOptions from '../src/initialize-from-options';
import faker from './shared/faker';
// import { formatErrorMessage as fem } from '../src/helpers';

// const EXPECTED_ERROR_MESSAGE = {
//   SIZE_MUST_BE_A_NUMBER_GREATER_OR_EQUAL_TO: fem("Svg element's height and witdh must be the same"),
// };

let instance, method;

describe('#initializeOptions', () => {
  beforeEach(() => {
    createMocks();

    initializeInstance();

    callMethodWith();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call 'Snap' library with the expected selector", () => {
    expect(Snap).toHaveBeenCalledWith(instance.selector);
  });

  it("should set 'size' to 300'", () => {
    expect(instance.size).toBe(300);
  });

  describe("when 'options' are not set", () => {
    it("should set 'mode' to 'forward'", () => {
      expect(instance.mode).toBe('forward');
    });
  });
});

function callMethodWith(options = {}) {
  if (typeof method !== 'undefined') method(options);
}

function createMocks() {}

function initializeInstance() {
  instance = {
    selector: `#${faker.string()}`,
  };

  method = initializeFromOptions.bind(instance);
}
