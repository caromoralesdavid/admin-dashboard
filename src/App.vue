<template>
  <div id="app">
    <div id="nav">
      <Navcomponents />
    </div>
  </div>

  <router-view />
</template>

<script>

import Navcomponents from '@/components/layout/Navcomponents.vue';

export default {
  components: {
    Navcomponents
  }
}

</script>

<style lang="scss">
@import "./scss/App.scss";
</style>