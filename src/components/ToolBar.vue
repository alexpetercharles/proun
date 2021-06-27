<script lang="ts">
import { defineComponent } from 'vue';

import Drawable from '@/components/Drawable.vue';

import Shapes from '@/enums/Shapes';
import Colors from '@/enums/Colors';

export default defineComponent({
  name: 'Toolbar',
  components: {
    Drawable,
  },
  setup() {
    return {
      Shapes,
      Colors,
    };
  },
});
</script>

<template>
  <div class="toolbar" ref="toolbar">
    <!--<label class="tool file">
        <input type="file" accept="image/*"
          @change="$emit('background-change', $event.target)"/>
        <img src="../assets/icons/img.png" />
    </label>-->
    <drawable class="tool"
      :shape="Shapes.Triangle"
      :color="Colors.CFFFFFF"
      :relative="true"
      @click="$emit('draw', Shapes.Triangle)"  />
    <drawable class="tool"
      :shape="Shapes.Rectangle"
      :color="Colors.CFFFFFF"
      :relative="true"
      @click="$emit('draw', Shapes.Rectangle)" />
    <drawable class="tool"
      :shape="Shapes.Circle"
      :color="Colors.CFFFFFF"
      :relative="true"
      @click="$emit('draw', Shapes.Circle)" />
    <drawable class="tool"
    :shape="Shapes.Rombus"
    :color="Colors.CFFFFFF"
    :relative="true"
    @click="$emit('draw', Shapes.Rombus)" />
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  height: 96vh;
  width: 60px;

  position: absolute;
  left: 0;
  top: 4vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tool {
    height: 30px;
    width: 30px;

    cursor: pointer;
    margin-bottom: 2vh;

    &.file {
      background: none;
      position: fixed;
      top: 30px;
    }

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

    input[type="file"] {
        display: none;
    }

    img {
      width: 120%;
    }
  }
}
</style>
