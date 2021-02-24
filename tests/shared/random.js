const elementFromArray = (array = []) => array[Math.floor(Math.random() * array.length)];
const string = () => Math.random().toString(36).substring(7);

export default {
  boolean: () => Math.random() < 0.5,
  elementFromArray,
  hexColor: () => `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`,
  keyFromObject: (obj = []) => elementFromArray(Object.keys(obj)),
  number: (options = {}) => {
    const { min = 0, max = Number.MAX_SAFE_INTEGER } = options;

    return Math.floor(Math.random() * (max - min) + min);
  },
  string,
  stringArray: (count = 3) => new Array(count).fill(0).map(string),
  valueFromObject: (obj = {}) => elementFromArray(Object.values(obj)),
};
