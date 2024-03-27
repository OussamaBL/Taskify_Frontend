<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <AppHeader></AppHeader>
  <router-view />
  <AppFooter></AppFooter>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  }
}
</script>

<style>

</style>