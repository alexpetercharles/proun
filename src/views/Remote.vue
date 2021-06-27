<script lang="ts">
import { defineComponent, ref } from 'vue';
import usePresentation from '@/modules/usePresentation';

export default defineComponent({
  name: 'Remote',
  setup() {
    const stopWatchElement = ref({} as HTMLElement);
    const { state, prevStep, nextStep } = usePresentation();
    return {
      state,
      prevStep,
      nextStep,

      stopWatchElement,
    };
  },
});
</script>

<template>
  <div class="remote">
    <h1>prethesis remote</h1>
    <div class="button-group">
      <p>current step</p>
      <span class="button" @click="prevStep">
        <p>previous</p>
      </span>
      <span class="button" @click="nextStep">
        <p>next</p>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.remote {
  width: 85vw;
  height: 85vh;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  user-select: none;

  .button-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 20px;

     width: 300px;

  }

  .button {
    width: 100px;
    height: 20px;
    border: 1px solid white;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }
}

p {
  margin: 0
}
</style>
