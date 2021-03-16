import paper from 'paper';

const drawShapes = (
  Scope: paper.PaperScope,
  canvas: HTMLCanvasElement,
  BackgroundRaster: paper.Raster,
) => {
  let lastPath: paper.Path;

  const getAverageFillColor = (shape: paper.Path) => BackgroundRaster.getAverageColor(shape);

  const rectangle = () => {
    const rect = new Scope.Path();
    rect.closed = true;
    let drawnCorners = 0;
    canvas.onmousedown = (event: MouseEvent) => {
      if (drawnCorners < 4) {
        drawnCorners += 1;
        rect.add(new Scope.Point(event.clientX, event.clientY));
        rect.fillColor = getAverageFillColor(rect);
      } else {
        canvas.onmousedown = null;
        console.log(lastPath);
        rect.insertBelow(lastPath);
        lastPath = rect;
      }
    };
  };
  const circle = () => {
    canvas.onmousedown = (event: MouseEvent) => {
      let radius = 0;
      let mousedown: number;
      let circ: paper.Path;
      canvas.onmousedown = () => {
        mousedown = setInterval(() => {
          radius += 10;
          circ = new Scope.Path.Circle(new Scope.Point(event.clientX, event.clientY), radius);
          circ.fillColor = BackgroundRaster.getAverageColor(
            new Scope.Point(event.clientX, event.clientY),
          );
        }, 100);
      };
      canvas.onmouseup = () => {
        clearInterval(mousedown);
        circ.insertBelow(lastPath);
        lastPath = circ;
      };
    };
  };
  return {
    rectangle,
    circle,
  };
};

export default drawShapes;
