<script lang="ts">
/* eslint-disable no-new */
import { defineComponent, onMounted, ref } from 'vue';
import P5 from 'p5';

import proun from '@/sketches/proun';

export default defineComponent({
  name: 'App',
  setup: () => {
    const sketchContainer = ref({} as HTMLElement);
    onMounted(() => new P5(proun(sketchContainer.value.offsetHeight,
      sketchContainer.value.offsetWidth), sketchContainer.value));
    return {
      sketchContainer,
    };
  },
});
</script>

<template>
  <div class="sketch-container" ref="sketchContainer" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .sketch-container {
    height: 100vh;
    width: 100vw;
  }
}
</style>
