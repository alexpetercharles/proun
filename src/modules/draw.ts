import { reactive } from 'vue';

import Colors from '@/enums/Colors';

type drawable = {
  shape: number,
  selected: boolean,
  color: string,
  relative: boolean,
  position: { x: string, y: string, },
  size: { height: string, width: string },
}

const state = reactive({
  drawables: [] as drawable[],
});

const draw = () => {
  const drawDrawable = (shape: number) => {
    state.drawables.push({
      shape,
      selected: true,
      color: Colors.CFFFFFF,
      relative: false,
      position: { x: '', y: '' },
      size: { height: '', width: '' },
    });
  };

  const selectDrawable = (i: number) => {
    const drawable = state.drawables[i];
    drawable.selected = !drawable.selected;
  };

  const changeDrawableColor = (color: string) => {
    state.drawables.forEach((drawable: drawable) => {
      if (drawable.selected) {
        drawable.color = color;
      }
    });
  };

  return {
    drawDrawable,
    selectDrawable,
    changeDrawableColor,
  };
};

export { draw, state as drawState };
