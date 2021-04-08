<script lang="ts">
import { defineComponent } from 'vue';
import Resizable from './components/Resizable.vue';

export default defineComponent({
  name: 'App',
  components: {
    Resizable,
  },
});
</script>

<template>
  <resizable />
  <resizable />
  <resizable />
  <resizable />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  height: 100vh;
  width: 100vw;
}
</style>
