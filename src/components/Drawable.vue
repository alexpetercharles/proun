<script lang="ts">
import {
  computed,
  defineComponent, onMounted, ref,
} from 'vue';

import Shapes from '@/enums/Shapes';
import makeDrawable from '@/modules/makeDrawable';

export default defineComponent({
  name: 'Drawable',
  props: {
    index: Number,
    shape: Number,
    selected: Boolean,
    color: String,
    relative: Boolean,
    position: { default: { x: 0, y: 0 } },
    size: { default: { width: '10vh', height: '10vh' } },
    rotation: String,
  },
  setup(props) {
    const drawable = ref({} as HTMLElement);
    if (!props.relative) {
      onMounted(() => { if (drawable.value) { makeDrawable(drawable.value); } });
    }
    return {
      drawable,
      relativeClass: computed(() => (props.relative ? 'relative' : '')),
      Shapes,
    };
  },
});
</script>

<template>
  <div class="drawable" ref="drawable"
    :class="`${relativeClass} ${selected ? 'selected': ''}`"
    :style="`--color: ${color};`"
    @click="$emit('select')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" :preserveAspectRatio="shape === Shapes.Circle ? '' : 'none'">
      <rect v-if="shape === Shapes.Rectangle" class="geometry" height="100%" width="100%"/>
      <circle v-if="shape === Shapes.Circle" cx="500" cy="500" r="500" class="geometry" />
      <polygon v-if="shape === Shapes.Triangle" class="geometry"
        points="126.899 136.5 128.423 138.024 873.5 883.101 873.5 136.5 126.899 136.5"/>
      <polygon v-if="shape === Shapes.Rombus" class="geometry"
        points="352.732 203.897 946 203.897 648.155 794.743 54.888 794.743 352.732 203.897"/>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.drawable {
  position: absolute;

  cursor: move;

  mix-blend-mode: difference;

  box-sizing: border-box;

  &.relative {
    position: relative;
    top: 0;
    left: 0;
  }

  &.selected {
    svg {
      outline: 3px solid #2D95C9;
    }
  }

  svg {
    transform: rotate(var(--rotation));
    width: 100%;
    height: 100%;
    .geometry {
      fill: var(--color);
      mix-blend-mode: difference;
    }
  }
}
</style>
