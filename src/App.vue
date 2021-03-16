<script lang="ts">
/* eslint-disable no-new */
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup: () => {
    const sketchContainer = ref({} as HTMLElement);
    const selectImage = (event: InputEvent) => {
      const { files } = event.target as HTMLInputElement;
      if (files) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
      }
    };
    return {
      sketchContainer,
      selectImage,
    };
  },
});
</script>

<template>
  <div class="sketch-container" ref="sketchContainer">
    <div class="controls">
      <label for="image">background image:</label>
      <input id="image" type="file" accept="image/*" @change="selectImage" />
      <label for="alpha">image opacity:</label>
      <input id="alpha" type="range" min="0" max="255" v-model="prounState.imageAlpha"/>
    </div>
  </div>
  <div class="blur-test" />
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

  .sketch-container {
    height: 100vh;
    width: 100vw;
  }

  .controls {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .blur-test {
    height: 10vh;
    width: 10vh;
    backdrop-filter: blur(100px);
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
  }
}
</style>
