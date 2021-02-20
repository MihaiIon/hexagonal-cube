const elementFromArray = (array = []) => array[Math.floor(Math.random() * array.length)];
const string = () => Math.random().toString(36).substring(7);

export default {
  boolean: () => Math.random() < 0.5,
  elementFromArray,
  keyFromObject: (obj = []) => elementFromArray(Object.keys(obj)),
  number: () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
  string,
  stringArray: (count = 3) => new Array(count).fill(0).map(string),
  valueFromObject: (obj = {}) => elementFromArray(Object.values(obj)),
};
