<template>
  <EuropeMap @change-chart="changeChart" msg="Europe" />
  <TestChart ref="childChart" />
</template>

<script>
import TestChart from "./components/TestChart.vue";
import EuropeMap from "./components/EuropeMap.vue";

export default {
  name: "App",
  components: {
    EuropeMap,
    TestChart,
  },
  methods: {
    changeChart(target) {
      // console.log(target);
      this.$refs.childChart.changeChart(target);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
