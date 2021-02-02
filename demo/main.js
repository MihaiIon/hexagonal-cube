const HexagonalCube = window.MyLibrary.default;

const instances = [];

// Default
instances.push(new HexagonalCube('#svg1'));

// Subset
instances.push(
  new HexagonalCube('#svg2', {
    shapes: {
      [HexagonalCube.SHAPE_NAME.OUTER_TOP_RIGHT]: { remove: true },
      [HexagonalCube.SHAPE_NAME.OUTER_TOP_LEFT]: { remove: true },
      [HexagonalCube.SHAPE_NAME.OUTER_LEFT]: { remove: true },
      [HexagonalCube.SHAPE_NAME.OUTER_BOTTOM_LEFT]: { remove: true },
    },
  }),
);

// Multicolor
instances.push(
  new HexagonalCube('#svg3', {
    shapes: {
      [HexagonalCube.SHAPE_NAME.OUTER_TOP_RIGHT]: { fill: '#E74C3C' },
      [HexagonalCube.SHAPE_NAME.OUTER_TOP_LEFT]: { fill: '#3498DB' },
      [HexagonalCube.SHAPE_NAME.OUTER_RIGHT]: { fill: '#EC7063', remove: false },
      [HexagonalCube.SHAPE_NAME.OUTER_LEFT]: { fill: '#5499C7' },
      [HexagonalCube.SHAPE_NAME.OUTER_BOTTOM_RIGHT]: { fill: '#AF7AC5', remove: false },
      [HexagonalCube.SHAPE_NAME.OUTER_BOTTOM_LEFT]: { fill: '#A569BD' },
      [HexagonalCube.SHAPE_NAME.INNER_TOP_RIGHT]: { fill: '#2ECC71' },
      [HexagonalCube.SHAPE_NAME.INNER_TOP_LEFT]: { fill: '#F1C40F' },
      [HexagonalCube.SHAPE_NAME.INNER_RIGHT]: { fill: '#45B39D' },
      [HexagonalCube.SHAPE_NAME.INNER_LEFT]: { fill: '#F5B041' },
      [HexagonalCube.SHAPE_NAME.INNER_BOTTOM_RIGHT]: { fill: '#16A085' },
      [HexagonalCube.SHAPE_NAME.INNER_BOTTOM_LEFT]: { fill: '#E67E22' },
    },
  }),
);

// Subset & colored
instances.push(
  new HexagonalCube('#svg4', {
    shapes: {
      [HexagonalCube.SHAPE_NAME.OUTER_TOP_RIGHT]: { fill: '#5DADE2' },
      [HexagonalCube.SHAPE_NAME.OUTER_TOP_LEFT]: { fill: '#4294ca' },
      [HexagonalCube.SHAPE_NAME.OUTER_RIGHT]: { fill: '#3498DB', remove: false },
      [HexagonalCube.SHAPE_NAME.OUTER_LEFT]: { remove: true },
      [HexagonalCube.SHAPE_NAME.OUTER_BOTTOM_RIGHT]: { fill: '#2b8dd0', remove: false },
      [HexagonalCube.SHAPE_NAME.OUTER_BOTTOM_LEFT]: { fill: '#1f7bb9' },
      [HexagonalCube.SHAPE_NAME.INNER_TOP_RIGHT]: { fill: '#fff' },
      [HexagonalCube.SHAPE_NAME.INNER_TOP_LEFT]: { fill: '#5DADE2' },
      [HexagonalCube.SHAPE_NAME.INNER_RIGHT]: { fill: '#f2f9fd' },
      [HexagonalCube.SHAPE_NAME.INNER_LEFT]: { fill: '#3498DB' },
      [HexagonalCube.SHAPE_NAME.INNER_BOTTOM_RIGHT]: { fill: '#EAF2F8' },
      [HexagonalCube.SHAPE_NAME.INNER_BOTTOM_LEFT]: { fill: '#328fce' },
    },
  }),
);

let show = false;
instances.forEach((instance) => {
  instance.show();
});

setInterval(() => {
  if (show) {
    instances.forEach((instance) => {
      instance.show();
    });
  } else {
    instances.forEach((instance) => {
      instance.hide();
    });
  }

  show = !show;
}, 3000);
