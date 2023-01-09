<template>
	<div class="main-container">
		<div class="top-container">
			First country:
			<p id="firstId">00</p>
			<v-btn color="green" elevation="2" @click="runEverything">GO</v-btn>
			Second country:
			<p id="secondId">00</p>
		</div>

		<div class="chart-box">
			<canvas id="radar-chart"></canvas>
		</div>
		<div class="h-container">
			<v-container>
				<EuropeMap
					@update-radar="drawChart"
					@change-chart="changeChart"
					@change-maxmin="changeMaxMin"
				/>
			</v-container>
		</div>
		<div class="h-container">
			<canvas id="line-chart"></canvas>
		</div>
		<div class="h-container">
			<v-container class="horizontal">
				<RadarChart v-if="firstClick && secondClick" ref="radarChart"
					>BingBOng</RadarChart
				>
			</v-container>
		</div>
	</div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import EuropeMap from '../components/EuropeMap.vue';
import TestChart from '../components/TestChart.vue';
import RadarChart from '../components/RadarChart.vue';
import { store } from '../store/store.js';
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
	name: 'Home',

	components: {
		HelloWorld,
		EuropeMap,
		TestChart,
		RadarChart,
	},
	async mounted() {
		// select the path on map which has id SI
		//console.log(document.getElementById("SI"))

		const firstResponse = await axios.get(
			'http://localhost:1337/householdUsageCountryYear/SI/2020'
		);

		const secondResponse = await axios.get(
			'http://localhost:1337/householdUsageCountryYear/IT/2020'
		);
		this.radarChart = new Chart('radar-chart', {
			type: 'radar',
			data: {
				labels: [
					'Electricity',
					'Natural Gas',
					'Solid biofuel',
					'Heat Pump',
					'Gas oil and Diesel oil',
				],
				datasets: [
					{
						label: 'SI',
						data: [
							parseFloat(JSON.stringify(firstResponse.data[1].value)),
							parseFloat(JSON.stringify(firstResponse.data[2].value)),
							parseFloat(JSON.stringify(firstResponse.data[7].value)),
							parseFloat(JSON.stringify(firstResponse.data[9].value)),
							parseFloat(JSON.stringify(firstResponse.data[6].value)),
						],
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1,
					},
					{
						label: 'IT',
						data: [
							parseFloat(JSON.stringify(secondResponse.data[1].value)),
							parseFloat(JSON.stringify(secondResponse.data[2].value)),
							parseFloat(JSON.stringify(secondResponse.data[7].value)),
							parseFloat(JSON.stringify(secondResponse.data[9].value)),
							parseFloat(JSON.stringify(secondResponse.data[6].value)),
						],
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
					},
				],
				chartOptions: {
					responsive: false,
					maintainAspectRatio: true,
					plugins: {
						annotation: {
							annotations: [],
						},
					},
				},
			},
		});

		this.lineChart = new Chart('line-chart', {
			type: 'line',
			data: {
				labels: [
					'2010',
					'2011',
					'2012',
					'2013',
					'2014',
					'2015',
					'2016',
					'2017',
					'2018',
					'2019',
					'2020',
					'2021',
				],
				datasets: [
					{
						label: 'SI',
						data: [1, 2, 3],
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1,
					},
					{
						label: 'HR',
						data: [4, 5, 6],
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
					},
				],
			},
		});

		console.log('awawawawawaw');
	},
	methods: {
		async runEverything() {
			//this.drawLineChart();
			console.log('Blalalal');
			this.drawRadarChart();
		},
		async drawRadarChart() {
			console.log('neki se dogaja');
			const firstResponse = await axios.get(
				'http://localhost:1337/householdUsageCountryYear/' +
					this.firstId +
					'/2020'
			);

			const secondResponse = await axios.get(
				'http://localhost:1337/householdUsageCountryYear/' +
					this.secondId +
					'/2020'
			);
			this.radarChart.data.datasets[0].data = [
				parseFloat(JSON.stringify(firstResponse.data[1].value)),
				parseFloat(JSON.stringify(firstResponse.data[2].value)),
				parseFloat(JSON.stringify(firstResponse.data[7].value)),
				parseFloat(JSON.stringify(firstResponse.data[9].value)),
				parseFloat(JSON.stringify(firstResponse.data[6].value)),
			];
			this.radarChart.data.datasets[0].label = this.firstId;

			this.radarChart.data.datasets[1].data = [
				parseFloat(JSON.stringify(secondResponse.data[1].value)),
				parseFloat(JSON.stringify(secondResponse.data[2].value)),
				parseFloat(JSON.stringify(secondResponse.data[7].value)),
				parseFloat(JSON.stringify(secondResponse.data[9].value)),
				parseFloat(JSON.stringify(secondResponse.data[6].value)),
			];
			this.radarChart.data.datasets[1].label = this.secondId;
			this.radarChart.update();
		},
		async drawLineChart() {
			const firstResponse = await axios.get(
				'http://localhost:1337/prices/all/' + this.firstId
			);
			console.log(firstResponse.data);

			let dictionary = Object.fromEntries(
				firstResponse.data.map((x) => [x.year, x.value])
			);
			console.log(dictionary);
			console.log(dictionary[2015]);
			let tmp = [];
			for (let i = 0; i < 12; i++) {
				tmp[i] = dictionary[i + 2010];
				console.log(tmp);
			}
			this.lineChart.data.datasets[0].data = tmp;
			this.lineChart.data.datasets[0].label = this.firstId;
			/*
			console.log({
				label: this.firstId,
				data: tmp,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
			});
			this.lineChart.data.datasets.push({
				label: this.firstId,
				data: tmp,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
			});
      
			this.lineChart.data.datasets[0] = {
				label: this.firstId,
				data: tmp,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
			};
			console.log(this.lineChart.data.datasets);
			*/
		},

		async changeMaxMin(target) {
			//console.log("changeMaxMin is running")
			if (store.switchChart === false) {
				if (store.currentState == 'electricity') {
					//console.log("AAAAAAAA")
					const responseMax = await axios.get(
						'http://localhost:1337/prices/getMaxEl/' +
							target.getAttribute('id') +
							'/MSHH'
					);
					const responseMin = await axios.get(
						'http://localhost:1337/prices/getMinEl/' +
							target.getAttribute('id') +
							'/MSHH'
					);

					//console.log('BBBBBBBBBBBBB')
					//console.log(responseMax.data[0])

					document.getElementById('first_max').innerText =
						'Max: ' + responseMax.data[0].value;
					document.getElementById('first_min').innerText =
						'Min: ' + responseMin.data[0].value;
				} else if (store.currentState == 'gas') {
					const responseMax = await axios.get(
						'http://localhost:1337/prices/getMaxGas/' +
							target.getAttribute('id') +
							'/MSHH'
					);
					const responseMin = await axios.get(
						'http://localhost:1337/prices/getMinGas/' +
							target.getAttribute('id') +
							'/MSHH'
					);

					document.getElementById('first_max').innerText =
						'Max: ' + responseMax.data[0].value;
					document.getElementById('first_min').innerText =
						'Min: ' + responseMin.data[0].value;
				}
			} else if (store.switchChart === true) {
				if (store.currentState == 'electricity') {
					const responseMax = await axios.get(
						'http://localhost:1337/prices/getMaxEl/' +
							target.getAttribute('id') +
							'/MSHH'
					);
					const responseMin = await axios.get(
						'http://localhost:1337/prices/getMinEl/' +
							target.getAttribute('id') +
							'/MSHH'
					);

					document.getElementById('second_max').innerText =
						'Max: ' + responseMax.data[0].value;
					document.getElementById('second_min').innerText =
						'Min: ' + responseMin.data[0].value;
				} else if (store.currentState == 'gas') {
					const responseMax = await axios.get(
						'http://localhost:1337/prices/getMaxGas/' +
							target.getAttribute('id') +
							'/MSHH'
					);
					const responseMin = await axios.get(
						'http://localhost:1337/prices/getMinGas/' +
							target.getAttribute('id') +
							'/MSHH'
					);

					document.getElementById('second_max').innerText =
						'Max: ' + responseMax.data[0].value;
					document.getElementById('second_min').innerText =
						'Min: ' + responseMin.data[0].value;
				}
			}
		},

		changeFuel() {
			if (store.currentState == 'gas') {
				store.currentState = 'electricity';
			} else if (store.currentState == 'electricity') {
				store.currentState = 'gas';
			}
			//console.log("Logging target 1" +this.target)
			//console.log("Logging target 2" +store.secondTarget)
			//this.changeChart(this.target)
			this.$refs.childChartOne.changeChart(store.firstTarget);
			this.$refs.childChartTwo.changeChart(store.secondTarget);
		},
		changeChartGas(target) {
			this.target = target;
			this.$refs.childChart.changeChartGas(target);
		},
		changeChart(target) {
			if (store.switchChart === false) {
				firstId.innerText = target.id;
				document.getElementById(this.firstId).style.fill = '#4db6ac';
				this.firstId = target.id;
				document.getElementById(this.firstId).style.fill = '#B55EAD';
				store.switchChart = true;
			} else if (store.switchChart === true) {
				secondId.innerText = target.id;
				document.getElementById(this.secondId).style.fill = '#4db6ac';
				this.secondId = target.id;
				document.getElementById(this.secondId).style.fill = '#B59D3A';
				store.switchChart = false;
			}

			/*if (store.switchChart === false) {
				firstName.innerText = target.id;
				//console.log("first chart")
				//console.log("Logging id " + target.id)
				//console.log("Loggin firstTargetId " + this.firstId)
				this.target = target;

				if (this.firstId !== '') {
					document.getElementById(this.firstId).style.fill = '#4db6ac';
				}

				var izbrana = document.getElementById(target.id);
				izbrana.style.fill = '#B55EAD';

				this.firstId = target.id;
				store.firstTarget = target;
				this.changeMaxMin(target);
				this.$refs.childChartOne.changeChart(target);
				this.$refs.radarChart.drawRadarChart(this.firstId, this.secondId);
			} else if (store.switchChart === true) {
				secondName.innerText = target.id;

				this.target = target;

				if (this.secondId !== '') {
					document.getElementById(this.secondId).style.fill = '#4db6ac';
				}

				var izbrana = document.getElementById(target.id);
				izbrana.style.fill = '#B59D3A';
				this.secondId = target.id;
				store.secondTarget = target;
				this.changeMaxMin(target);
				this.$refs.childChartTwo.changeChart(target);
				this.$refs.radarChart.drawRadarChart(this.firstId, this.secondId);
			}

			console.log('Testing radarchart');
      */
			console.log('Targeting id' + target.id);
		},
	},
	data: () => ({
		//
		barChart: null,
		radarChart: null,
		lineChart: null,
		target: null,
		drawer: null,
		firstClick: false,
		secondClick: false,
		chartColorOne: '#B55EAD',
		chartColorTwo: '#000FFF',
		chartColor: '',
		firstId: 'SI',
		secondId: 'HR',
		store,
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
	justify-content: center;
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
	margin-right: 7rem;
}
.vertical {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.chart-box {
	width: 400px !important;
}
</style>
