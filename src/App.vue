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
    type drawableProp = { key: number, shape: number, selected: boolean, color: string, }
    const drawables = ref([] as drawableProp[]);
    let key = 0;

    const drawDrawable = (shape: number) => {
      drawables.value.push({
        key, shape, selected: true, color: Colors.CFFFFFF,
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
  <img class="background" :src="backgroundSource" />
  <drawable v-for="drawable in drawables"
    v-bind:key="drawable.key"
    :shape="drawable.shape"
    :selected="drawable.selected"
    :color="drawable.color"
    @select="selectDrawable(drawable.key)" />
  <color-bar @color="changeDrawableColor" />
</template>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;

  background-color: black;

  overflow: hidden;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .background {
    height: 80%;
    user-select: none;
    margin-top: -5vh;
  }
}
</style>
