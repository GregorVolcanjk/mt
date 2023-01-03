<template>
    <Bar
      class="bar"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </template>
  
  <script>
  import axios from "axios";
  import { Bar } from "vue-chartjs";
  import { store } from '../store/store.js';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";
  
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );
  
  export default {
    store,
    name: "BarChart",
    components: { Bar },
    props: {
      chartId: {
        type: String,
        default: "bar-chart",
      },
      datasetIdKey: {
        type: String,
        default: "label",
      },
      width: {
        type: Number,
        default: 400,
      },
      height: {
        type: Number,
        default: 400,
      },
      cssClasses: {
        default: "",
        type: String,
      },
      styles: {
        type: Object,
        default: () => {},
      },
      plugins: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        chartData: {
          labels: [
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
          ],
          datasets: [
            {
              label: "Slovenia",
              backgroundColor: "#4db6ac",
              data: [
                0.1401, 0.1441, 0.1542, 0.161, 0.163, 0.1589, 0.1618, 0.1609,
                0.1613, 0.1634, 0.1448, 0.1662,
              ],
            },
            // {
            //   label: "Slovenia",
            //   backgroundColor: "#2c3e50",
            //   data: [
            //     0.1401, 0.1441, 0.1542, 0.161, 0.163, 0.1589, 0.1618, 0.1609,
            //     0.1613, 0.1634, 0.1448, 0.1662,
            //   ],
            // },
          ],
        },
        chartOptions: {
          responsive: false, //ce hoces da ni fullscreen
          maintainAspectRatio: false,
          width: 100,
        },
      };
    },
    methods: {

        async mounted() {

            if (store.currentState=='gas') {
            const response = await axios.get(
            "http://localhost:1337/gasCountry/" + target.getAttribute("id")+"/MSHH"
                );
            }
            else {
                const response = await axios.get(
                "http://localhost:1337/prices/all/" + target.getAttribute("id")
                );
            }
            console.log(response.data);
                this.chartData.datasets[0].label = target.getAttribute("name");
                let dictionary = Object.fromEntries(
                    response.data.map((x) => [x.year, x.value])
                );
                for (let i = 0; i < 12; i++) {
                    let tmp = dictionary[i + 2010];
                    this.chartData.datasets[0].data[i] = tmp === undefined ? 0 : tmp;
                }

        },
      async changeChartGas(target) {
        console.log("Logging target " + target.attributes);
  
      
      },
      async changeChart(target) {
        console.log("Logging target " + target.attributes);
  
        if (store.currentState=='gas') {
            const response = await axios.get(
            "http://localhost:1337/gasCountry/" + target.getAttribute("id")+"/MSHH"
          );
          console.log(response.data);
          this.chartData.datasets[0].label = target.getAttribute("name");
          let dictionary = Object.fromEntries(
            response.data.map((x) => [x.year, x.value])
          );
          for (let i = 0; i < 12; i++) {
            let tmp = dictionary[i + 2010];
            this.chartData.datasets[0].data[i] = tmp === undefined ? 0 : tmp;
          }
        }
        else {
          const response = await axios.get(
          "http://localhost:1337/prices/all/" + target.getAttribute("id")
          );
          console.log(response.data);
          this.chartData.datasets[0].label = target.getAttribute("name");
          let dictionary = Object.fromEntries(
            response.data.map((x) => [x.year, x.value])
          );
          for (let i = 0; i < 12; i++) {
            let tmp = dictionary[i + 2010];
            this.chartData.datasets[0].data[i] = tmp === undefined ? 0 : tmp;
          }
        }
        
  
      },
    },
  };
  </script>
  
  <style scoped>
  div {
    margin-top: 10%;
    width: 30%;
    float: left;
  }
  </style>