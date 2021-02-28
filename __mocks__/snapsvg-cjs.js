'use strict';

const __mockedInvalidPaper = {
  selector: '#invalid-svg-selector',
  node: {
    clientHeight: 300,
    clientWidth: 150,
  },
};

const __mockedValidPaper = {
  selector: '#valid-svg-selector',
  node: {
    clientHeight: 300,
    clientWidth: 300,
  },
};

const __mockedBaseTransformationMatrix = +Math.random().toFixed(4);

const Snap = jest.fn().mockImplementation((selector) => {
  if (selector === __mockedInvalidPaper.selector) return __mockedInvalidPaper;
  return __mockedValidPaper;
});

Snap.matrix = jest.fn().mockImplementation((...args) => {
  if (JSON.stringify(args) == JSON.stringify([1, 0, 0, 1, 0, 0])) return __mockedBaseTransformationMatrix;
  return null;
});

Snap.__mockedValidPaper = __mockedValidPaper;
Snap.__mockedInvalidPaper = __mockedInvalidPaper;
Snap.__mockedBaseTransformationMatrix = __mockedBaseTransformationMatrix;

module.exports = Snap;
