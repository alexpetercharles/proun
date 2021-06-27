<script lang="ts">
import { defineComponent } from 'vue';
import usePresentation from '@/modules/usePresentation';

export default defineComponent({
  name: 'Presentation',
  setup() {
    const { state } = usePresentation();
    return {
      state,
    };
  },
});
</script>

<template>
<transition name="fade">
  <div class="presentation" v-if="state.step === 0">
    <h1>Prethesis 2</h1>
    <h2>alex peter charles lehmann</h2>
    <h2>am 28.06.2020 um 13:30</h2>
  </div>
  <div class="presentation" v-else-if="state.step === 1">
    <h2>Werkzeug</h2>

    <p>Mit dem Werkzeug Begriff, lässt sich
    mein gesamtes gestalterisches Handeln beschreiben.</p>

    <p>Indirekte Gestaltung. Indirekt im Sinne von «fernab
    eines Endproduktes».</p>

    <p>...konkrete Aushandlungen und Problemlösungen, welche während der Gestaltung des Werkzeuges
    auftreten.</p>
  </div>
  <div class="presentation" v-else-if="state.step === 2">
    <h2>Das Produkt</h2>

    <p>Aufhebung der klassischen, industriellen
      Trennung von Entwurf, Produktion und Produkt.</p>

    <p>Dadurch verliert das Produkt die mächtige Alleinstellung...</p>

    <p>Ich brauche meine künstlerische Arbeit,
      um meine Erfahrungen, meine Traumas und meine Gedanken zu verarbeiten.</p>

    <p>Als «Output» meiner Gestaltung
      würde ich die Werkzeuge und nicht deren
      Produkt.</p>
  </div>
</transition>
</template>

<style lang="scss" scoped>
.presentation {
  width: 85vw;
  height: 85vh;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  user-select: none;

  p {
    max-width: 25%;
    font-size: 1.3rem;
  }
}

h1 {
  font-size: 2rem !important;
}

.fade-enter-active {
  transition: opacity .5s ease;
  transition-delay: .5s;
}
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
