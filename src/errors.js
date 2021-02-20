import { ANIMATION_DIRECTION, ANIMATION_MODE } from './constants/static-properties';

const formatErrorMessage = (errorMessage) => `HexagonalCubeError: ${errorMessage}`;
const error = (errorMessage) => new Error(formatErrorMessage(errorMessage));

export default {
  animationDirectionMustBeOneOf: error(`Attribute 'animationDirection' must be one of <${Object.values(ANIMATION_DIRECTION).join('|')}>`),
  animationModeMustBeOneOf: error(`Attribute 'animationMode' must be one of <${Object.values(ANIMATION_MODE).join('|')}>`),
  svgHeightAndWidthMustBeTheSame: error("Svg element's height and witdh must be the same"),
  svgSelectorIsNotOfTypeString: error("Param 'svgSelector' is of type 'string'"),
  svgSelectorIsNotValid: error("Param 'svgSelector' is not a valid id selector"),
  svgSelectorIsNull: error("Param 'svgSelector' is null"),
};
