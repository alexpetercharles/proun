import { reactive, watch } from 'vue';
import paper from 'paper';

import useKeys from '@/modules/useKeys';

const State = reactive({
  Scope: {} as paper.PaperScope,
  canvas: {} as HTMLCanvasElement,
  backgroundBase64: '',
  backgroundOpacity: 100,
  BackgroundRaster: {} as paper.Raster,
});

const drawShapes = (
  Scope: paper.PaperScope,
  canvas: HTMLCanvasElement,
  BackgroundRaster: paper.Raster,
) => {
  let lastPath: paper.Path;

  const getAverageFillColor = (shape: paper.Path) => BackgroundRaster.getAverageColor(shape);

  const insertBelowEvent = (path: paper.Path) => {
    path.onClick = () => {
      path.insertBelow(lastPath);
      lastPath = path;
    };
  };

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
      }
    };
    insertBelowEvent(rect);
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
          insertBelowEvent(circ);
        }, 30);
      };
      canvas.onmouseup = () => {
        clearInterval(mousedown);
        insertBelowEvent(circ);
      };
    };
  };
  return {
    rectangle,
    circle,
  };
};

const usePaper = () => {
  const setupPaper = () => {
    if (State.canvas) {
      State.Scope = new paper.PaperScope();
      State.Scope.setup(State.canvas);
    }
  };

  const paperBackground = () => {
    State.BackgroundRaster = new State.Scope.Raster(State.backgroundBase64);
    State.BackgroundRaster.onLoad = () => {
      State.BackgroundRaster.position = State.Scope.view.center;
      State.BackgroundRaster.fitBounds(State.Scope.view.bounds as paper.Rectangle);
      State.BackgroundRaster.sendToBack();
    };
    watch(() => State.backgroundOpacity, (opacity) => {
      State.BackgroundRaster.opacity = opacity / 100;
    });

    const {
      rectangle,
      circle,
    } = drawShapes(State.Scope, State.canvas, State.BackgroundRaster);
    useKeys((shape: string) => {
      if (shape === 'rect') {
        rectangle();
      }
      if (shape === 'circ') {
        circle();
      }
    });
  };

  return {
    setupPaper,
    paperState: State,
    paperBackground,
  };
};

export default usePaper;
