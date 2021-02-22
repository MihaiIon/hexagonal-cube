import initializeShapeConfigs from '../../src/methods/initialize-shape-configs';

import ShapeConfig from '../../src/objects/shape-config';

import random from '../shared/random';

let instance, method;

describe('#initializeFromOptions', () => {
  beforeEach(() => {
    createInstance();

    callMethod();
  });
});

function callMethod(options = {}) {
  if (typeof method !== 'undefined') return method(options);
  return null;
}

function createInstance() {
  instance = {};

  method = initializeShapeConfigs.bind(instance);
}
