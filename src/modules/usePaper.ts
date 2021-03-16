import { reactive, watch } from 'vue';
import paper from 'paper';

const paperState = reactive({
  canvas: {} as HTMLCanvasElement,
  backgroundBase64: '',
  backgroundOpacity: 100,
});

const usePaper = () => {
  const setupPaper = () => {
    if (paperState.canvas) {
      paper.setup(paperState.canvas);
    }
  };
  const paperBackground = () => {
    const raster = new paper.Raster(paperState.backgroundBase64);
    raster.position = paper.view.center;
    raster.sendToBack();
    watch(() => paperState.backgroundOpacity, (opacity) => { raster.opacity = opacity / 100; });
  };
  const drawRectangle = () => {
    const rect = new paper.Path();
    let drawnCorners = 0;
    rect.closed = true;
    rect.fillColor = new paper.Color(0, 0, 0);
    paperState.canvas.onmousedown = (event) => {
      if (drawnCorners < 4) {
        rect.add(new paper.Point(event.clientX, event.clientY));
        drawnCorners += 1;
      } else {
        paperState.canvas.onmousedown = null;
      }
    };
  };
  return {
    setupPaper,
    paperState,
    paperBackground,
    drawRectangle,
  };
};

export default usePaper;
