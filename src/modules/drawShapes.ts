import paper from 'paper';

const drawShapes = (
  Scope: paper.PaperScope,
  canvas: HTMLCanvasElement,
  BackgroundRaster: paper.Raster,
) => {
  console.log(paper);
  const getFillColor = (shape: paper.Path) => BackgroundRaster.getAverageColor(shape);

  const rectangle = () => {
    const rect = new Scope.Path();
    rect.closed = true;
    let drawnCorners = 0;
    canvas.onmousedown = (event: MouseEvent) => {
      if (drawnCorners < 3) {
        rect.add(new Scope.Point(event.clientX, event.clientY));
        rect.fillColor = getFillColor(rect);
        drawnCorners += 1;
      } else {
        canvas.onmousedown = null;
      }
    };
  };
  return {
    rectangle,
  };
};

export default drawShapes;
