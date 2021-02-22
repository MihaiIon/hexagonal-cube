import f from './fixed-float';

export default (svgSize, equilateralTriangleHeight, equilateralTriangleWidth) => {
  const c = f(svgSize / 2);
  const h = equilateralTriangleHeight;
  const w = equilateralTriangleWidth;

  return {
    // center
    c,
    // inner hexagon
    i: {
      b: { x: c, y: f(c + w) }, // bottom
      bl: { x: f(c - h), y: f(c + w / 2) }, // bottom-left
      br: { x: f(c + h), y: f(c + w / 2) }, // bottom-right
      t: { x: c, y: f(c - w) }, // top
      tl: { x: f(c - h), y: f(c - w / 2) }, // top-left
      tr: { x: f(c + h), y: f(c - w / 2) }, // top-right
    },
    // outer hexagon
    o: {
      b: { x: c, y: f(c + w * 2) }, // bottom
      bl: { x: f(c - h * 2), y: f(c + w) }, // bottom-left
      br: { x: f(c + h * 2), y: f(c + w) }, // bottom-right
      t: { x: c, y: f(c - w * 2) }, // top
      tl: { x: f(c - h * 2), y: f(c - w) }, // top-left
      tr: { x: f(c + h * 2), y: f(c - w) }, // top-right
    },
  };
};
