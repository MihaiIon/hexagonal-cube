export const ANIMATION_ACTION = {
  SHOW: 'show',
  HIDE: 'hide',
};

export const ANIMATION_DIRECTION = {
  BOTTOM: 'bottom',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
};

export const ANIMATION_DURATION = 1200;

export const ANIMATION_MODE = {
  INITIAL: 'initial',
  FORWARD: 'forward',
  CYCLE: 'cycle',
};

export const DEFAULT_COLORS = {
  WHITE: '#ffffff',
  LIGHT_GREY: '#bdc2c6',
  GREY: '#7e878f',
  LIGHT_MAIN: '#b8dbee',
  MAIN: '#1c628f',
};

export const SHAPE_NAME = {
  OUTER_BOTTOM_LEFT: 'outer-bottom-left',
  OUTER_BOTTOM_RIGHT: 'outer-bottom-right',
  OUTER_LEFT: 'outer-left',
  OUTER_RIGHT: 'outer-right',
  OUTER_TOP_LEFT: 'outer-top-left',
  OUTER_TOP_RIGHT: 'outer-top-right',
  INNER_BOTTOM_LEFT: 'inner-bottom-left',
  INNER_BOTTOM_RIGHT: 'inner-bottom-right',
  INNER_LEFT: 'inner-left',
  INNER_RIGHT: 'inner-right',
  INNER_TOP_LEFT: 'inner-top-left',
  INNER_TOP_RIGHT: 'inner-top-right',
};

export const DEFAULT_SHAPE_OPTIONS = {
  [SHAPE_NAME.INNER_BOTTOM_LEFT]: { fill: DEFAULT_COLORS.MAIN, remove: false },
  [SHAPE_NAME.INNER_BOTTOM_RIGHT]: { fill: DEFAULT_COLORS.LIGHT_MAIN, remove: false },
  [SHAPE_NAME.INNER_LEFT]: { fill: DEFAULT_COLORS.MAIN, remove: false },
  [SHAPE_NAME.INNER_RIGHT]: { fill: DEFAULT_COLORS.LIGHT_MAIN, remove: false },
  [SHAPE_NAME.INNER_TOP_LEFT]: { fill: DEFAULT_COLORS.WHITE, remove: false },
  [SHAPE_NAME.INNER_TOP_RIGHT]: { fill: DEFAULT_COLORS.LIGHT_GREY, remove: false },
  [SHAPE_NAME.OUTER_BOTTOM_LEFT]: { fill: DEFAULT_COLORS.GREY, remove: false },
  [SHAPE_NAME.OUTER_BOTTOM_RIGHT]: { fill: DEFAULT_COLORS.WHITE, remove: true },
  [SHAPE_NAME.OUTER_LEFT]: { fill: DEFAULT_COLORS.GREY, remove: false },
  [SHAPE_NAME.OUTER_RIGHT]: { fill: DEFAULT_COLORS.WHITE, remove: true },
  [SHAPE_NAME.OUTER_TOP_LEFT]: { fill: DEFAULT_COLORS.LIGHT_GREY, remove: false },
  [SHAPE_NAME.OUTER_TOP_RIGHT]: { fill: DEFAULT_COLORS.LIGHT_GREY, remove: false },
};

export default {
  ANIMATION_ACTION,
  ANIMATION_DIRECTION,
  ANIMATION_DURATION,
  ANIMATION_MODE,
  DEFAULT_SHAPE_OPTIONS,
  DEFAULT_COLORS,
  SHAPE_NAME,
};
