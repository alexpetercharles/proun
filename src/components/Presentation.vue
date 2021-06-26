<script lang="ts">
import { defineComponent } from 'vue';

import presentationState from '@/modules/usePresentation';

export default defineComponent({
  name: 'Presentation',
  setup() {
    return {
      state: presentationState,
    };
  },
});
</script>

<template>
  <div class="presentation">
    <h1 v-if="state.step === 0">Prethesis</h1>
  </div>
</template>

<style lang="scss" scoped>
.presentation {
  width: 85vw;
  height: 85vh;

  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  pointer-events: none;
  user-select: none;
}

h1 {
  font-size: 3rem !important;
}
</style>
