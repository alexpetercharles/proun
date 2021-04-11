<script lang="ts">
import {
  computed, defineComponent, onMounted, ref,
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
  },
  setup(props) {
    const drawable = ref({} as HTMLElement);
    const makeDrawable = () => {
      makeResizable(drawable.value);
      makeDragable(drawable.value);
      makeRotatable(drawable.value);
    };
    onMounted(() => { if (drawable.value) { makeDrawable(); } });
    const shapeClass = computed(() => {
      switch (props.shape) {
        case Shapes.Triangle: return 'triangle';
        case Shapes.Circle: return 'circle';
        default: return '';
      }
    });
    return {
      drawable,
      shapeClass,
    };
  },
});
</script>

<template>
  <div class="drawable color" ref="drawable"
    :class="shapeClass"
    :style="`--color: ${color}`"
    @click="$emit('select')">
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

  &.color {
    content: '';
    background: var(--color);
    mix-blend-mode: difference;
  }

  &.triangle {
    width: 0;
    height: 0;
    background: none;
    $size: 2.5vw;
    border-left: $size solid transparent;
    border-right: $size solid transparent;

    border-bottom: $size solid white;
  }

  &.circle {
    border-radius: 50%;
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
