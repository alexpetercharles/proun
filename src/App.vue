<script lang="ts">
import { defineComponent, ref } from 'vue';
import ToolBar from '@/components/ToolBar.vue';
import Drawable from './components/Drawable.vue';

export default defineComponent({
  name: 'App',
  components: {
    ToolBar,
    Drawable,
  },
  setup() {
    type drawalbeProp = {
      key: number,
      shape: number,
    }
    const drawables = ref([] as drawalbeProp[]);
    let key = 0;
    const draw = (shape: number) => {
      drawables.value.push({ key, shape });
      key += 1;
    };
    return { draw, drawables };
  },
});
</script>

<template>
  <tool-bar @draw=draw />
  <img class="background" src="./assets/test.jpg" />
  <drawable v-for="drawable in drawables" v-bind:key="drawable.key" :shape="drawable.shape" />
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
    height: 90%;
    user-select: none;
  }
}
</style>
