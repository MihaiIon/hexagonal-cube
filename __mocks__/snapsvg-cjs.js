'use strict';

const __mockedValidPaper = {
  selector: '#valid-svg-selector',
  node: {
    clientHeight: 300,
    clientWidth: 300,
  },
};

const __mockedInvalidPaper = {
  selector: '#invalid-svg-selector',
  node: {
    clientHeight: 300,
    clientWidth: 150,
  },
};

const Snap = jest.fn().mockImplementation((selector) => {
  if (selector === __mockedInvalidPaper.selector) return __mockedInvalidPaper;
  return __mockedValidPaper;
});

Snap.__mockedValidPaper = __mockedValidPaper;
Snap.__mockedInvalidPaper = __mockedInvalidPaper;

module.exports = Snap;
