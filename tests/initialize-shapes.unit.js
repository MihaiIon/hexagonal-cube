import initializeShapes from '../src/initialize-shapes';
import faker from './shared/faker';

let instance, method;

describe('#initializeShapes', () => {
  beforeEach(() => {
    initializeInstance();

    // callMethodWith();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should ', () => {
    expect(1 < 2).toBe(true);
  });
});

function callMethodWith(options = {}) {
  if (typeof method !== 'undefined') method(options);
}

function initializeInstance() {
  instance = {
    selector: `#${faker.string()}`,
  };

  method = initializeShapes.bind(instance);
}
