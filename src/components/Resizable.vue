<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import makeResizable from '@/modules/makeResizable';

export default defineComponent({
  name: 'Resizable',
  setup() {
    const resizable = ref({} as HTMLElement);
    onMounted(() => { if (resizable.value) { makeResizable(resizable.value); } });
    return { resizable };
  },
});
</script>

<template>
  <div class="resizable" ref="resizable">
    <div class='resizers'>
      <div class='resizer top-left' />
      <div class='resizer top-right' />
      <div class='resizer bottom-left' />
      <div class='resizer bottom-right' />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resizable {
  background: black;

  width: 100px;
  height: 100px;

  position: absolute;
  top: 100px;
  left: 100px;

  .resizers {
    width: 100%;
    height: 100%;

    .resizer {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: white;
      border: 3px solid #4286f4;

      position: absolute;

      &.top-left { left: -5px; top: -5px; cursor: nwse-resize; }
      &.top-right { right: -5px; top: -5px; cursor: nesw-resize; }
      &.bottom-left { left: -5px; bottom: -5px; cursor: nesw-resize; }
      &.bottom-right { right: -5px; bottom: -5px; cursor: nwse-resize; }
    }
  }
}
</style>
