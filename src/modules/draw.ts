import { reactive, computed } from 'vue';

import Colors from '@/enums/Colors';

type drawable = {
  key: number,
  shape: number,
  selected: boolean,
  color: string,
  relative: boolean,
  position: { x: string, y: string, }
}

const state = reactive({
  drawables: [] as drawable[],
});

const draw = () => {
  let key = 0;

  const drawDrawable = (shape: number) => {
    state.drawables.push({
      key,
      shape,
      selected: true,
      color: Colors.CFFFFFF,
      relative: false,
      position: { x: '100', y: '100' },
    }); key += 1;
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
    drawables: computed(() => state.drawables),
    drawDrawable,
    selectDrawable,
    changeDrawableColor,
  };
};

export default draw;
