<script lang="ts">
import { defineComponent } from 'vue';

import Shapes from '@/enums/Shapes';

export default defineComponent({
  name: 'Toolbar',
  setup() {
    return {
      Shapes,
    };
  },
});
</script>

<template>
  <div class="toolbar" ref="toolbar">
    <!--<div class="tool triangle" @click="$emit('draw', Shapes.Triangle)"  />-->
    <div class="tool square" @click="$emit('draw', Shapes.Square)" />
    <div class="tool circle" @click="$emit('draw', Shapes.Circle)" />
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  height: 100vh;
  width: 6vw;

  position: absolute;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tool {
    height: 2vw;
    width: 2vw;

    cursor: pointer;

    background-color: white;
    margin-bottom: 2vh;

    &.triangle {
      width: 0;
      height: 0;
      background: none;
      $size: 1vw;
      border-left: $size solid transparent;
      border-right: $size solid transparent;

      border-bottom: $size solid white;
    }

    &.circle {
      border-radius: 50%;
    }
  }
}
</style>
