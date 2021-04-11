<script lang="ts">
import { defineComponent, ref } from 'vue';

import Colors from '@/enums/Colors';

export default defineComponent({
  name: 'ColorBar',
  setup() {
    const colors = ref(Object.values(Colors));
    return {
      colors,
    };
  },
});
</script>

<template>
  <div class="colorbar" ref="colorbar">
    <div v-for="color in colors"
      v-bind:key="color" class="color"
      :style="`--color: ${color}`"
      @click="$emit('color', color)"  />
  </div>
</template>

<style lang="scss" scoped>
.colorbar {
  width: 100vw;
  height: 6vw;

  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .color {
    height: 100%;

    width: 4vh;
    height: 4vh;

    cursor: pointer;

    background-color: var(--color);
  }
}
</style>
