export default (svgSize, equilateralTriangleHeight, equilateralTriangleWidth) => {
  const c = svgSize / 2;
  const h = equilateralTriangleHeight;
  const w = equilateralTriangleWidth;

  return {
    // center
    c: { x: c, y: c },
    // inner hexagon
    i: {
      b: { x: c, y: c + w }, // bottom
      bl: { x: c - h, y: c + w / 2 }, // bottom-left
      br: { x: c + h, y: c + w / 2 }, // bottom-right
      t: { x: c, y: c - w }, // top
      tl: { x: c - h, y: c - w / 2 }, // top-left
      tr: { x: c + h, y: c - w / 2 }, // top-right
    },
    // outer hexagon
    o: {
      b: { x: c, y: c + w * 2 }, // bottom
      bl: { x: c - h * 2, y: c + w }, // bottom-left
      br: { x: c + h * 2, y: c + w }, // bottom-right
      t: { x: c, y: c - w * 2 }, // top
      tl: { x: c - h * 2, y: c - w }, // top-left
      tr: { x: c + h * 2, y: c - w }, // top-right
    },
  };
};
