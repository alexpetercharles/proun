<script lang="ts">
/* eslint-disable no-new */
import { defineComponent, onMounted, ref } from 'vue';

import usePaper from '@/modules/usePaper';

export default defineComponent({
  name: 'App',
  setup: () => {
    const paperContainer = ref({} as HTMLCanvasElement);
    const {
      setupPaper,
      paperState,
      paperBackground,
    } = usePaper();

    onMounted(() => {
      if (paperContainer.value) {
        paperState.canvas = paperContainer.value;
        setupPaper();
      }
    });

    const selectImage = (event: InputEvent) => {
      const { files } = event.target as HTMLInputElement;
      if (files) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.addEventListener('load', () => {
          if (reader.result) {
            paperState.backgroundBase64 = reader.result.toString();
            paperBackground();
          }
        });
      }
    };

    return {
      paperContainer,
      selectImage,
      paperState,
    };
  },
});
</script>

<template>
    <div class="controls">
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
