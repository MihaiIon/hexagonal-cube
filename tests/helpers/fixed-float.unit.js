import { fixedFloat } from '../../src/helpers';

import random from '../shared/random';

describe('fixedFloat', () => {
  describe('without arguments', () => {
    it('should return 0', () => {
      expect(fixedFloat()).toBe(0);
    });
  });

  describe("with 'floatNumber' argument", () => {
    let randomFloatNumber;

    beforeEach(() => {
      randomFloatNumber = random.number({ max: 20 }) + 0.123456789;
    });

    it('should return the expected float number with 2 decimals', () => {
      const expectedFloatNumber = parseFloat(randomFloatNumber.toFixed(2));

      expect(fixedFloat(randomFloatNumber)).toBe(expectedFloatNumber);
    });

    describe("with 'decimalPrecision' argument", () => {
      it('should return the expected float number', () => {
        const randomDecimalPrecision = random.number({ max: 6 }) + 1;
        const expectedFloatNumber = parseFloat(randomFloatNumber.toFixed(randomDecimalPrecision));

        expect(fixedFloat(randomFloatNumber, randomDecimalPrecision)).toBe(expectedFloatNumber);
      });
    });
  });
});
