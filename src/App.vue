<template>
  <div id="app">
    <GithubRibbon/>
    <router-view/>
  </div>
</template>

<script>
import GithubRibbon from './components/GithubRibbon';

export default {
  name: 'App',
  components: {
    GithubRibbon,
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  body {
    background-color: #f8faff;
  }

  #app {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #2c3e50;
    margin-top: 60px;
    background: #f8faff;
    box-sizing: border-box;
    font-size: 14px;
  }

  .v-enter-active, .v-leave-active {
    transition: opacity .5s;
  }

  .v-enter, .v-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  a {
    cursor: pointer;
  }

</style>
