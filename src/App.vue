<template>
  <nav>
    <h1>Emotion and Affective Computing in Data Visualization: A Systematic Survey</h1>
    <router-link to="/">Home</router-link> |
    <router-link to="/overview">Coding</router-link> |
     <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { key } from './store'
export default {
  setup() {
    const store = useStore(key)
    store.dispatch("getData")
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Open Sans', sans-serif, Avenir, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0 10vw;
    font-size: 16px;
    width: fit-content;
    margin: auto;
}

nav {
  padding: 30px 0;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #2c3e50;
      text-decoration: underline 1px #2c3e50;
    }
  }
}
</style>
