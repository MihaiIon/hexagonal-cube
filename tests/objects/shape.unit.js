import Shape from '../../src/objects/shape';
import ShapeConfig from '../../src/objects/shape-config';

import errors from '../../src/errors';
import { DEFAULT_COLORS } from '../../src/constants/static-properties';

import random from '../shared/random';

let instance, instanceArguments;

let paperMock, paperElementMock;
let paperPathSpy, paperElementAttrSpy;

describe('Shape', () => {
  describe('instance', () => {
    beforeEach(() => {
      createMocks();
    });

    describe('without a paper', () => {
      it('should throw the expected error', () => {
        const instanceWithInvalidPaper = () => factory();

        expect(instanceWithInvalidPaper).toThrowError(errors.shapePaperNotValid.message);
      });
    });

    describe('without a shape configuration', () => {
      it('should throw the expected error', () => {
        const instanceWithInvalidShapeConfig = () => factory(paperMock);

        expect(instanceWithInvalidShapeConfig).toThrowError(errors.shapeConfigNotValid.message);
      });
    });

    describe('with valid arguments', () => {
      beforeEach(() => {
        factoryWithValidArguments();
      });

      it('should set attributes', () => {
        const expectedKeyValuePairs = {
          _paper: instanceArguments[0],
          _config: instanceArguments[1],
          baseAttributes: {
            fill: instanceArguments[1].fill,
            opacity: 1,
          },
          hiddenAttributes: {
            fill: DEFAULT_COLORS.WHITE,
            opacity: 0,
          },
          element: paperElementMock,
        };

        expect(instance).toEqual(expect.objectContaining(expectedKeyValuePairs));
      });

      it("should call 'paper.path' with the expected path", () => {
        const expectedPath = instanceArguments[1].path;

        expect(paperPathSpy).toHaveBeenCalledWith(expectedPath);
      });

      it("should call 'element.attr' with the hidden attributes", () => {
        expect(paperElementAttrSpy).toHaveBeenCalledWith(instance.hiddenAttributes);
      });
    });
  });
});

function createMocks() {
  paperElementAttrSpy = jest.fn();
  paperElementMock = {
    attr: paperElementAttrSpy,
  };

  paperPathSpy = jest.fn().mockImplementation(() => paperElementMock);
  paperMock = {
    path: paperPathSpy,
  };
}

function factory(paper, shapeConfig) {
  instanceArguments = [paper, shapeConfig];
  instance = new Shape(paper, shapeConfig);

  return instance;
}

function factoryWithValidArguments() {
  const shapeConfig = new ShapeConfig(random.string(), random.string(), { fill: random.hexColor(), remove: random.boolean() });

  return factory(paperMock, shapeConfig);
}
