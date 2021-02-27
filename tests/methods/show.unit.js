import instanceMethod from '../../src/methods/show';

import { ANIMATION_ACTION } from '../../src/constants/static-properties';

let instance, method;
let animateSpy;

describe('#show', () => {
  beforeEach(() => {
    createInstance();
  });

  it("should call 'animate' with the expected arguments", () => {
    const expectedArguments = [ANIMATION_ACTION.SHOW, null];

    callMethod();

    expect(animateSpy).toHaveBeenCalledWith(...expectedArguments);
  });

  describe("when 'animating' is true", () => {
    it("should not call 'animate'", () => {
      instance.animating = true;

      callMethod();

      expect(animateSpy).not.toHaveBeenCalled();
    });
  });

  describe('when there is a callback', () => {
    it("should call 'animate' with the expected arguments", () => {
      const expectedCallback = jest.fn();
      const expectedArguments = [ANIMATION_ACTION.SHOW, expectedCallback];

      callMethod(expectedCallback);

      expect(animateSpy).toHaveBeenCalledWith(...expectedArguments);
    });
  });
});

function callMethod(callback = null) {
  if (typeof method !== 'undefined') return method(callback);
  return null;
}

function createInstance() {
  animateSpy = jest.fn();

  instance = {
    animating: false,
    animate: animateSpy,
  };

  method = instanceMethod.bind(instance);
}
