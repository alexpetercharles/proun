<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import Presentation from '@/components/Presentation.vue';
import ToolBar from '@/components/ToolBar.vue';
import ColorBar from '@/components/ColorBar.vue';
import Drawable from '@/components/Drawable.vue';

import { draw, drawState } from '@/modules/useDraw';

export default defineComponent({
  name: 'App',
  components: {
    ToolBar,
    ColorBar,
    Drawable,
    Presentation,
  },
  setup() {
    const {
      drawDrawable,
      selectDrawable,
      changeDrawableColor,
    } = draw();

    const drawables = computed(() => drawState.drawables);

    const backgroundSource = ref('');
    const changeBackground = (target: HTMLInputElement) => {
      const { files } = target;
      if (files) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.addEventListener('load', () => {
          if (reader.result) { backgroundSource.value = reader.result.toString(); }
        });
      }
    };
    return {
      drawDrawable,
      selectDrawable,
      changeDrawableColor,
      drawables,
      changeBackground,
      backgroundSource,
    };
  },
});
</script>

<template>
  <presentation />
  <tool-bar @draw="drawDrawable" @background-change="changeBackground"  />
  <span class="title"><h1>pro_un</h1></span>
  <img class="background" :src="backgroundSource" />
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
  <color-bar @color="changeDrawableColor" />
</template>

<style lang="scss" scoped>
.title {
  position: fixed;
  top: 30px;
  left: 60px;
}
.background {
  height: 80%;
  user-select: none;
  pointer-events: none;
}
.logo {
  height: 10px;
  position: absolute;
  right: 15px;
  bottom: 20px;
  img {
    height: 100%;
  }
}
</style>
