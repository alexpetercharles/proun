<script lang="ts">
import {
  computed,
  defineComponent, onMounted, ref,
} from 'vue';

import makeResizable from '@/modules/makeResizable';
import makeDragable from '@/modules/makeDragable';
import makeRotatable from '@/modules/makeRotatable';

import Shapes from '@/enums/Shapes';

export default defineComponent({
  name: 'Drawable',
  props: {
    shape: Number,
    selected: Boolean,
    color: String,
    relative: Boolean,
  },
  setup(props) {
    const drawable = ref({} as HTMLElement);
    const makeDrawable = () => {
      makeResizable(drawable.value);
      makeDragable(drawable.value);
      makeRotatable(drawable.value);
    };
    onMounted(() => { if (drawable.value) { makeDrawable(); } });
    const position = computed(() => (props.relative ? 'relative' : ''));
    return {
      drawable,
      position,
      Shapes,
    };
  },
});
</script>

<template>
  <div class="drawable color" ref="drawable"
    :class="position"
    :style="`--color: ${color}`"
    @click="$emit('select')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <rect v-if="shape === Shapes.Rectangle" class="geometry"/>
      <circle v-if="shape === Shapes.Circle" cx="500" cy="500" r="500" class="geometry" />
      <polygon v-if="shape === Shapes.Triangle" class="geometry"
        points="126.899 136.5 128.423 138.024 873.5 883.101 873.5 136.5 126.899 136.5"/>
      <polygon v-if="shape === Shapes.Rombus" class="geometry"
        points="352.732 203.897 946 203.897 648.155 794.743 54.888 794.743 352.732 203.897"/>
    </svg>
    <div class="resizers" v-show="selected">
      <div class="resizer tool top-left" />
      <div class="resizer tool top-right" />
      <div class="resizer tool bottom-left" />
      <div class="resizer tool bottom-right" />
    </div>
    <div class="rotator tool" v-show="selected" />
  </div>
</template>

<style lang="scss" scoped>
.drawable {
  width: 10vh;
  height: 10vh;

  position: absolute;
  top: 30vh;
  left: 30vh;

  cursor: move;

  &.relative {
    position: relative;
    top: 0;
    left: 0;
  }

  svg {
    width: 100%;
    height: 100%;
    .geometry {
      width: 100%;
      height: 100%;

      fill: var(--color);
      mix-blend-mode: difference;
    }
  }

  .resizers {
    width: 100%;
    height: 100%;

    .resizer {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: white;
      border: 3px solid #4286f4;

      position: absolute;

      &.top-left { left: -5px; top: -5px; cursor: nwse-resize; }
      &.top-right { right: -5px; top: -5px; cursor: nesw-resize; }
      &.bottom-left { left: -5px; bottom: -5px; cursor: nesw-resize; }
      &.bottom-right { right: -5px; bottom: -5px; cursor: nwse-resize; }
    }
  }

  .rotator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #4286f4;
    border: 3px solid #4286f4;

    position: absolute;
    right: -20px;
    top: -20px;
    cursor: crosshair;
  }
}
</style>
