export default {
  boolean: () => Math.random() < 0.5,
  string: () => Math.random().toString(36).substring(7),
  number: () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
};
