<script lang="ts">
import { defineComponent, ref } from 'vue';

import drawForm from '@/modes/form';

export default defineComponent({
  name: 'App',
  setup: () => {
    const mode = ref('form');

    const paperContainer = ref({} as HTMLCanvasElement);

    const {
      paperState,
      selectImage,
    } = drawForm(paperContainer);

    return {
      paperContainer,
      selectImage,
      paperState,
      mode,
    };
  },
});
</script>

<template>
    <div class="controls">
      <label for="mode">select mode:</label>
      <select name="mode" id="mode" v-model="mode">
        <option value="form">Form Only</option>
        <option value="invert">Invert</option>
      </select>
      <label for="image">background image:</label>
      <input id="image" type="file" accept="image/*" @change="selectImage" />
      <label for="opacity">background opacity:</label>
      <input id="opacity" type="range" min="0" max="100" v-model="paperState.backgroundOpacity"/>
    </div>
    <canvas class="paper-container" ref="paperContainer" />
</template>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  .paper-container {
    height: 100vh;
    width: 100vw;
  }

  .controls {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
