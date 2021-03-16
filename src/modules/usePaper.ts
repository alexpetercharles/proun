import { reactive } from 'vue';
import paper from 'paper';

const paperState = reactive({
  canvas: {} as HTMLCanvasElement,
  backgroundBase64: '',
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
  };
  return {
    setupPaper,
    paperState,
    paperBackground,
  };
};

export default usePaper;
