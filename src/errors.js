import { ANIMATION_DIRECTION, ANIMATION_MODE } from './constants/static-properties';

const formatErrorMessage = (errorMessage) => `HexagonalCubeError: ${errorMessage}`;
const error = (errorMessage) => new Error(formatErrorMessage(errorMessage));

export default {
  animationDirectionMustBeOneOf: error(
    `Attribute 'animationDirection' must be one of <${Object.values(ANIMATION_DIRECTION).join('|')}>`,
  ),
  animationModeMustBeOneOf: error(`Attribute 'animationMode' must be one of <${Object.values(ANIMATION_MODE).join('|')}>`),
  shapefillColorFormat: error("Attribute 'shapeConfig.fill' must match the following pattern: /^#[0-9a-fA-F]{6}$/"),
  shapeRemoveMustBeOfTypeBoolean: error("Attribute 'shape.remove' must be of type 'boolean'"),
  svgHeightAndWidthMustBeTheSame: error("Svg element's height and witdh must be the same"),
  svgSelectorMustBeOfTypeString: error("Argument 'svgSelector' must be of type 'string'"),
  svgSelectorIsNotValid: error("Argument 'svgSelector' is not a valid id selector"),
  svgSelectorIsNull: error("Argument 'svgSelector' is null"),
};
