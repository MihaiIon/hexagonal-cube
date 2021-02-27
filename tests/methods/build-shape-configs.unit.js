import buildShapeConfigs from '../../src/methods/build-shape-configs';

import ShapeConfig from '../../src/objects/shape-config';
import { DEFAULT_SHAPE_OPTIONS, SHAPE_NAME } from '../../src/constants/static-properties';
import regexps from '../../src/regexps';

import random from '../shared/random';

let instance, method;

describe('#buildShapeConfigs', () => {
  beforeEach(() => {
    createInstance();
  });

  it('should be an array of ShapeConfig instances', () => {
    const shapeConfigs = callMethod();

    const onlyShapeConfigInstances = shapeConfigs
      .map((config) => config instanceof ShapeConfig)
      .reduce((allTrue, current) => allTrue && current, true);

    expect(onlyShapeConfigInstances).toBe(true);
  });

  it('should contain a config for every shape name', () => {
    const shapeConfigs = callMethod();
    const shapeConfigNames = shapeConfigs.map((config) => config.name);

    expect(shapeConfigNames.sort()).toEqual(Object.values(SHAPE_NAME).sort());
  });

  it('should contain only valid paths', () => {
    const shapeConfigs = callMethod();

    shapeConfigs.forEach((config) => {
      expect(config.path).toMatch(regexps.validPath);
    });
  });
});

function callMethod(shapeOptions = DEFAULT_SHAPE_OPTIONS) {
  if (typeof method !== 'undefined') return method(shapeOptions);
  return null;
}

function createInstance() {
  const randomSize = random.number({ min: 300, max: 800 });

  instance = {
    size: randomSize,
    safeSize: (randomSize * random.number({ min: 6, max: 9 })) / 10,
  };

  method = buildShapeConfigs.bind(instance);
}
