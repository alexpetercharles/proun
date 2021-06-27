<script lang="ts">
import { defineComponent, computed } from 'vue';
import { draw, drawState } from '@/modules/useDraw';
import usePresentation from '@/modules/usePresentation';

import Drawable from '@/components/Drawable.vue';

import Colors from '@/enums/Colors';

export default defineComponent({
  name: 'Presentation',
  components: {
    Drawable,
  },
  setup() {
    const {
      selectDrawable,
    } = draw();

    drawState.drawables = [{
      shape: 0,
      selected: false,
      color: Colors.CFFFFFF,
      relative: false,
      position: { x: '800px', y: '300px' },
      size: { height: '200px', width: '750px' },
      rotation: '0',
    }];

    const { state } = usePresentation();
    return {
      state,
    };
  },
});
</script>

<template>
  <div class="presentation" v-if="state.step >= 0">
    <h1>Prethesis 2</h1>
    <h2>alex peter charles lehmann</h2>
    <h2>am 28.06.2020 um 13:30</h2>
  </div>
  <div class="presentation fixed" v-if="state.step >= 1">
  <drawable v-for="drawable in drawables"
    :key="drawables.indexOf(drawable)"
    :index="drawables.indexOf(drawable)"
    :shape="drawable.shape"
    :selected="drawable.selected"
    :color="drawable.color"
    :relative="drawable.relative"
    :position="drawable.position"
    :size="drawable.size"
    :rotation="drawable.rotation"
    @select="selectDrawable(drawables.indexOf(drawable))" />
  </div>
</template>

<style lang="scss" scoped>
.presentation {
  width: 85vw;
  height: 87vh;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  user-select: none;
}

h1 {
  font-size: 2rem !important;
}
</style>
