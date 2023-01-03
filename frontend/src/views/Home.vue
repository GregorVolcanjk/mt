<template>
    
    <div class="main-container">
      <div class="top-container">
        <v-container><h3>Cena elektrike</h3></v-container>
        <v-container>
          <v-switch
            v-model="drawer"
            color="green"
            inset

            @change = 'changeFuel'
            
            ></v-switch>
        </v-container>
        <v-container><h3>Cena plina</h3></v-container>
      </div>
        
        <div class="h-container">
          <v-container class="vertical">
            <v-container>
              <h3  id="firstName"></h3>
              <p class="maxmin_text" id="first_max"></p>
              <p class="maxmin_text" id="first_min"></p>
              <TestChart chartColor="#B55EAD" v-if="firstClick" ref="childChartOne"/>
            </v-container>
          </v-container>
          
          <v-container>
            <EuropeMap  @click="switchChart" @update-radar="drawChart" @change-chart="changeChart" @change-maxmin="changeMaxMin"/>
          </v-container>
          <v-container class="vertical">
            <v-container>
              <h3  id="secondName"></h3>
              <p class="maxmin_text" id="second_max"></p>
              <p class="maxmin_text" id="second_min"></p>
              <TestChart chartColor="#B59D3A" v-if="secondClick" ref="childChartTwo"/>
            </v-container>
          </v-container>
        
          
        </div>
        <div class="h-container">
          <v-container class="horizontal">
            <RadarChart v-if="firstClick&&secondClick" ref="radarChart">BingBOng</RadarChart>
          </v-container>
        </div>

        
    </div>
    
  </template>
  
  <script>
    import HelloWorld from "../components/HelloWorld.vue";
    import EuropeMap from "../components/EuropeMap.vue";
    import TestChart from "../components/TestChart.vue";
    import RadarChart from "../components/RadarChart.vue";
    import { store } from '../store/store.js';
    import axios from "axios";
    
    
    export default {
      name: "Home",
    
      components: {
        HelloWorld,
        EuropeMap,
        TestChart,
        RadarChart
      },
      methods: {

        created() {
          // select the path on map which has id SI
          //console.log(document.getElementById("SI"))
          this.$refs.childChartOne.changeChart(document.getElementById("SI"))
          this.$refs.childChartTwo.changeChart(document.getElementById("HR"))
          firstName.innerText="SI";
          secondName.innerText="HR";
        },
        drawRadarChart(target) {

        },
        async changeMaxMin(target) {
          //console.log("changeMaxMin is running")
            if(store.switchChart===false) 
            {
              if(store.currentState=="electricity") 
              {
                //console.log("AAAAAAAA")
                const responseMax = await axios.get(
                  "http://localhost:1337/prices/getMaxEl/" + target.getAttribute("id")+"/MSHH"
                );
                const responseMin = await axios.get(
                  "http://localhost:1337/prices/getMinEl/" + target.getAttribute("id")+"/MSHH"
                );

                //console.log('BBBBBBBBBBBBB')
                //console.log(responseMax.data[0])

                document.getElementById("first_max").innerText = "Max: " + responseMax.data[0].value;
                document.getElementById("first_min").innerText = "Min: " + responseMin.data[0].value;
              }
              else if(store.currentState=="gas") 
              {
                const responseMax = await axios.get(
                  "http://localhost:1337/prices/getMaxGas/" + target.getAttribute("id")+"/MSHH"
                );
                const responseMin = await axios.get(
                  "http://localhost:1337/prices/getMinGas/" + target.getAttribute("id")+"/MSHH"
                );

                document.getElementById("first_max").innerText = "Max: " + responseMax.data[0].value;
                document.getElementById("first_min").innerText = "Min: " + responseMin.data[0].value;
              }
            }
            else if(store.switchChart===true) 
            {
              if(store.currentState=="electricity") 
              {
                const responseMax = await axios.get(
                  "http://localhost:1337/prices/getMaxEl/" + target.getAttribute("id")+"/MSHH"
                );
                const responseMin = await axios.get(
                  "http://localhost:1337/prices/getMinEl/" + target.getAttribute("id")+"/MSHH"
                );

                document.getElementById("second_max").innerText = "Max: " + responseMax.data[0].value;
                document.getElementById("second_min").innerText = "Min: " + responseMin.data[0].value;
              }
              else if(store.currentState=="gas") 
              {
                const responseMax = await axios.get(
                  "http://localhost:1337/prices/getMaxGas/" + target.getAttribute("id")+"/MSHH"
                );
                const responseMin = await axios.get(
                  "http://localhost:1337/prices/getMinGas/" + target.getAttribute("id")+"/MSHH"
                );

                document.getElementById("second_max").innerText = "Max: " + responseMax.data[0].value;
                document.getElementById("second_min").innerText = "Min: " + responseMin.data[0].value;
              }
            }
        },
        switchChart() {
          store.switchChart = !store.switchChart;
          if(this.firstClick===false) {
            this.firstClick = true;
          }
          else if(this.secondClick===false) {
            this.secondClick = true;
          }
        }
        ,
        changeFuel() {
          if(store.currentState=="gas") {
            store.currentState="electricity"
          } else if(store.currentState=="electricity") {
            store.currentState="gas"
          }
          //console.log("Logging target 1" +this.target)
          //console.log("Logging target 2" +store.secondTarget)
          //this.changeChart(this.target)
          this.$refs.childChartOne.changeChart(store.firstTarget)
          this.$refs.childChartTwo.changeChart(store.secondTarget)
        },
        changeChartGas(target) {
          this.target = target;
        this.$refs.childChart.changeChartGas(target);
      },
      changeChart(target) {

        if(store.switchChart===false) {
          firstName.innerText=target.id;
          //console.log("first chart")
          //console.log("Logging id " + target.id)
          //console.log("Loggin firstTargetId " + this.firstId)
          this.target = target;

          if(this.firstId!==""){
            document.getElementById(this.firstId).style.fill="#4db6ac"
          }
          
          var izbrana = document.getElementById(target.id)
          izbrana.style.fill = "#B55EAD";

          this.firstId = target.id;
          store.firstTarget = target;
          this.changeMaxMin(target);
          this.$refs.childChartOne.changeChart(target);
          this.$refs.radarChart.drawRadarChart(this.firstId,this.secondId);
          
        }
        else if(store.switchChart===true) {
          secondName.innerText=target.id;
          //console.log("second chart")
          //console.log("Logging secondid " + this.secondId)
          this.target = target;
          
          if(this.secondId!==""){
            document.getElementById(this.secondId).style.fill="#4db6ac"
          }

          var izbrana = document.getElementById(target.id)
          izbrana.style.fill = "#B59D3A";
          this.secondId = target.id;
          store.secondTarget = target;
          this.changeMaxMin(target);
          this.$refs.childChartTwo.changeChart(target);
          this.$refs.radarChart.drawRadarChart(this.firstId,this.secondId);
        }

        console.log("Testing radarchart")
        /*
        if (store.firstChart===false && store.secondChart===false) {
          console.log("first chart")
          store.firstChart = true;
          this.$refs.childChartOne.changeChart(target);
        }
        else if(store.firstChart===true && store.secondChart===false) {
          console.log("second chart")
          store.secondChart = true;
          this.$refs.childChartTwo.changeChart(target);
        }
        else if(store.firstChart===true && store.secondChart===true) {
          if(store.switchChart===false) {
            console.log("first chart")
            store.switchChart = true;
            this.$refs.childChartOne.changeChart(target);
          }
          else if(store.switchChart===true) {
            console.log("second chart")
            store.switchChart = false;
            this.$refs.childChartTwo.changeChart(target);
          }
        }
        */
        // console.log(target);
        },
      },
      data: () => ({
        //
        target: null,
        drawer: null,
        firstClick: false,
        secondClick: false,
        chartColorOne: "#B55EAD",
        chartColorTwo: "#000FFF",
        chartColor: "",
        firstId: "",
        secondId:"",
        store
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
    .top-container {
      display: flex;
      flex-direction: row;
      justify-content:center;
      gap: 20px;
      align-items: center;
    }
    .main-container {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .h-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-items: center;
    }
    
    .top-container h3 {
      margin: 0;
    }
    #map {
      margin-right:7rem;
    }
    .vertical {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  </style>