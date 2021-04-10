<script lang="ts">
import { defineComponent } from 'vue';
import Drawable from './components/Drawable.vue';

export default defineComponent({
  name: 'App',
  components: {
    Drawable,
  },
});
</script>

<template>
  <drawable />
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
