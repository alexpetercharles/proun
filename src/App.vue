<template>
  <router-view/>
</template>

<style lang="scss">
body { margin: 0; }
@font-face {
  font-family: 'Bandeins-Strange';
  src: url('./assets/fonts/BandeinsStrangeVariable.woff2') format('woff2 supports variations'),
       url('./assets/fonts/BandeinsStrangeVariable.woff2') format('woff2-variations');
  font-stretch: 100% 800%;
  font-weight: 200 800;
  font-display: block;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  color: white;
  background: url(assets/background-min.png);
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h1 {
    font-family: 'Bandeins-Strange';
    font-size: 1.5rem;
    font-weight: 400;
    font-stretch: 800%;
    margin: 0;
  }
  h2 {
    font-family: 'Bandeins-Strange';
    font-size: 1.3rem;
    font-weight: 400;
    font-stretch: 800%;
    margin: 0;
  }
}
</style>
