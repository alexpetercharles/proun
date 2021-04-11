<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ColorBar',
});
</script>

<template>
  <div class="colorbar" ref="colorbar">
    <div class="color orange" @click="$emit('draw', Shapes.Triangle)"  />
    <div class="color yellow" @click="$emit('draw', Shapes.Square)" />
  </div>
</template>

<style lang="scss" scoped>
.colorbar {
  width: 100vw;
  height: 3vh;

  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .color {
    height: 100%;

    flex-grow: 1;

    cursor: pointer;

    &.orange {
      background-color: orange;
    }

    &.yellow {
      background-color: lime;
    }
  }
}
</style>
