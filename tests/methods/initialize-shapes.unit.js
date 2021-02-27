import initializeShapes from '../../src/methods/initialize-shapes';

import Shape from '../../src/objects/shape';
import ShapeConfig from '../../src/objects/shape-config';

import { DEFAULT_SHAPE_OPTIONS, SHAPE_NAME } from '../../src/constants/static-properties';

import random from '../shared/random';

jest.mock('../../src/objects/shape-config');
jest.mock('../../src/objects/shape');

let instance, instanceOptions, method;
let buildShapeConfigsSpy, buildShapeOptionsSpy;
let buildShapeConfigsReturnedValue, buildShapeOptionsReturnedValue;

describe('#initializeShapes', () => {
  beforeEach(() => {
    createMocks();
    createInstance();

    callMethod(instanceOptions);
  });

  it("should call 'buildShapeOptions' with the instance's shape options", () => {
    expect(buildShapeOptionsSpy).toHaveBeenCalledWith(instanceOptions.shape);
  });

  it("should call 'buildShapeConfigs with the returned value from 'buildShapeOptions'", () => {
    expect(buildShapeConfigsSpy).toHaveBeenCalledWith(buildShapeOptionsReturnedValue);
  });

  describe("attribute 'shapes'", () => {
    it('should set it with the shapes that should be rendered', () => {
      const expectedShapeNames = buildShapeConfigsReturnedValue
        .filter((shapeConfig) => shapeConfig.keepToRender())
        .map((shapeConfig) => shapeConfig.name);

      const instanceShapeNamesKeptToRender = Object.keys(instance.shapes);

      expect(instanceShapeNamesKeptToRender.sort()).toEqual(expectedShapeNames.sort());
    });

    it("should initialize each 'Shape' instance with the expected arguments", () => {
      const instanceRenderedShapeNames = Object.keys(instance.shapes);
      const expectedShapeConfigs = buildShapeConfigsReturnedValue
        .filter((shapeConfig) => shapeConfig.keepToRender())
        .reduce((obj, shapeConfig) => {
          obj[shapeConfig.name] = shapeConfig;

          return obj;
        }, {});

      instanceRenderedShapeNames.forEach((instanceRenderedShapeName) => {
        const expectedArguments = [instance.paper, expectedShapeConfigs[instanceRenderedShapeName]];

        expect(Shape).toHaveBeenCalledWith(...expectedArguments);
      });
    });
  });
});

function callMethod(options = {}) {
  if (typeof method !== 'undefined') return method(options);
  return null;
}

function createInstance() {
  instance = {
    size: random.number({ min: 300, max: 800 }),
    shapeOptions: DEFAULT_SHAPE_OPTIONS,
    buildShapeOptions: buildShapeOptionsSpy,
    buildShapeConfigs: buildShapeConfigsSpy,
    paper: random.string(),
  };

  instanceOptions = { shape: {} };
  random.stringArray().forEach((propertyName) => {
    instanceOptions.shape[propertyName] = random.string();
  });

  method = initializeShapes.bind(instance);
}

function createMocks() {
  buildShapeOptionsReturnedValue = DEFAULT_SHAPE_OPTIONS;
  buildShapeOptionsSpy = jest.fn().mockImplementation(() => buildShapeOptionsReturnedValue);

  // Mock 'ShapeConfig' objects
  buildShapeConfigsReturnedValue = Object.values(SHAPE_NAME).map((shapeName) => {
    const shapeConfig = new ShapeConfig();

    shapeConfig.name = shapeName;

    return shapeConfig;
  });

  // Mock the returned value of 'keepToRender' function (some true, some false)
  const numberOfConfigs = buildShapeConfigsReturnedValue.length;
  const numberOfConfigsThatWillReturnTrue = random.number({ min: 1, max: Math.floor(numberOfConfigs * 0.8) });

  for (let i = 0, shapeConfig = null; i < numberOfConfigs; i += 1) {
    shapeConfig = buildShapeConfigsReturnedValue[i];

    shapeConfig.keepToRender.mockImplementation(() => i <= numberOfConfigsThatWillReturnTrue);
  }

  buildShapeConfigsSpy = jest.fn().mockImplementation(() => buildShapeConfigsReturnedValue);
}
