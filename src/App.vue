<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import ToolBar from '@/components/ToolBar.vue';
import ColorBar from '@/components/ColorBar.vue';
import Drawable from '@/components/Drawable.vue';

import { draw, drawState } from '@/modules/draw';

export default defineComponent({
  name: 'App',
  components: {
    ToolBar,
    ColorBar,
    Drawable,
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

<style lang="scss">
body { margin: 0; }

@font-face {
  font-family: 'Bandeins-Strange';
  src: url('./assets/fonts/BandeinsStrangeVariable.woff2') format('woff2 supports variations'),
       url('./assets/fonts/BandeinsStrangeVariable.woff2') format('woff2-variations');
  font-stretch: 100% 800%;
  font-weight: 200 800;
  font-display: block;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;

  color: white;

  background-color: black;

  overflow: hidden;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: 'Bandeins-Strange';
    font-size: 1.5rem;
    font-weight: 400;
    font-stretch: 800%;

    margin: 0;
  }

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
}
</style>
