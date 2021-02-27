// Valid Path
const validCoordinate = '[0-9]{1,3}(?:[.][0-9]{0,2})?';
const validCoordinates = `(?:${validCoordinate},${validCoordinate})`;
const validPathRegExpString = `^M${validCoordinates}(?:L${validCoordinates}){2,3}$`;

export default {
  svgSelector: /^#(?:[a-zA-Z0-9]+-?)[a-zA-Z0-9]+$/,
  fillColor: /^#[0-9a-fA-F]{6}$/,
  validPath: new RegExp(validPathRegExpString),
};
