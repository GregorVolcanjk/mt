

<template>
  <v-app>
    <v-app-bar app style="background-color: #4db6ac; ">
      <v-toolbar-title style="color: white; ">Energenti po EU</v-toolbar-title>
      <div id="nav">
        <router-link class="menu-item" to="/">Home</router-link>
        <router-link class="menu-item" to="/compare">Compare</router-link>
        <router-link class="menu-item" to="/calculator">Calculator</router-link>
      </div>
    </v-app-bar>
    <router-view/>

  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import EuropeMap from "./components/EuropeMap.vue";
import TestChart from "./components/TestChart.vue";
import RadarChart from "./components/RadarChart.vue";


export default {
  name: "App",

  components: {
    HelloWorld,
    EuropeMap,
    TestChart
  },

  data: () => ({
    //
    drawer: null,
  }),
};
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .menu-item {
    text-decoration: none;
    font-size: 1.5rem;
    margin: 0 1rem;
    color: whitesmoke;
  }
  .menu-item:hover {
    color: rgb(149, 149, 149);
  }

  v-toolbar__content {
    background-color: #4db6ac; 
  }
</style>