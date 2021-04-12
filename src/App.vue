<script lang="ts">
import { defineComponent, ref } from 'vue';
import ToolBar from '@/components/ToolBar.vue';
import ColorBar from '@/components/ColorBar.vue';
import Drawable from '@/components/Drawable.vue';

import Colors from '@/enums/Colors';

export default defineComponent({
  name: 'App',
  components: {
    ToolBar,
    ColorBar,
    Drawable,
  },
  setup() {
    type drawableProp = {
      key: number, shape: number, selected: boolean, color: string, relative: boolean, }
    const drawables = ref([] as drawableProp[]);
    let key = 0;

    const drawDrawable = (shape: number) => {
      drawables.value.push({
        key, shape, selected: true, color: Colors.CFFFFFF, relative: false,
      }); key += 1;
    };

    const selectDrawable = (i: number) => {
      const drawable = drawables.value[i];
      drawable.selected = !drawable.selected;
    };

    const changeDrawableColor = (color: string) => {
      drawables.value.forEach((drawable) => {
        if (drawable.selected) {
          drawable.color = color;
        }
      });
    };

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
  <span class="title"><h1>proun</h1></span>
  <img class="background" :src="backgroundSource" />
  <drawable v-for="drawable in drawables"
    v-bind:key="drawable.key"
    :shape="drawable.shape"
    :selected="drawable.selected"
    :color="drawable.color"
    :relative="drawable.relative"
    @select="selectDrawable(drawable.key)" />
  <color-bar @color="changeDrawableColor" />
  <span class="logo"><img src="./assets/tape.png" /></span>
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
  }

  .logo {
    height: 25px;
    position: absolute;
    right: 15px;
    bottom: 15px;
    img {
      height: 100%;
    }
  }
}
</style>
