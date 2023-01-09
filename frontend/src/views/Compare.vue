<template>
	<div class="main-container">
		<div class="top-container">
			<v-container><h3>Cena elektrike</h3></v-container>
			<v-container>
				<v-switch
					v-model="drawer"
					color="green"
					inset
					@change="changeFuel"
				></v-switch>
			</v-container>
			<v-container><h3>Cena plina</h3></v-container>
		</div>
		<v-container class="horizontal">
			<EuropeMap @click="switchChart" />
			<v-container class="vertical">
				<canvas id="bar-chart-one" width="400" height="400"></canvas>
			</v-container>
		</v-container>

		<!-- <canvas id="radar-chart"></canvas> -->
	</div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';
import { store } from '../store/store.js';
import EuropeMap from '../components/EuropeMap.vue';

export default {
	name: 'SecondHome',

	components: {
		EuropeMap,
	},

	data: () => ({
		radarChart: null,
		barChartOne: null,
		target: null,
		firstClick: true,
		secondClick: true,
		chartColorOne: '#B55EAD',
		chartColorTwo: '#000FFF',
		chartColor: '',
		firstId: 'SI',
		secondId: 'HR',
		store,
		drawer: null,
	}),
	methods: {
		created() {
			var izbrana1 = document.getElementById(this.firstId);
			console.log(izbrana1);
			izbrana1.style.fill = '#B55EAD';
			var izbrana2 = document.getElementById(this.secondId);
			izbrana2.style.fill = '#B59D3A';
			console.log('asdasdasdasdasdasdasdasdadsdas');
		},
		async mounted() {
			var izbrana1 = document.getElementById(this.firstId);
			izbrana1.style.fill = '#B55EAD';
			var izbrana2 = document.getElementById(this.secondId);
			izbrana2.style.fill = '#B59D3A';
			console.log(izbrana1);

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
					options: {
						responsive: false,
					},
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
				},
			});
		},
		switchChart() {
			store.switchChart = !store.switchChart;
			if (this.firstClick === false) {
				this.firstClick = true;
			} else if (this.secondClick === false) {
				this.secondClick = true;
			}
		},
		changeFuel() {
			if (store.currentState == 'gas') {
				store.currentState = 'electricity';
				console.log('asdasdasdas');
			} else if (store.currentState == 'electricity') {
				store.currentState = 'gas';
				console.log('ass');
			}
		},
		async createBarChartOne() {
			this.barChartOne = new Chart('bar-chart-one', {
				type: 'bar',
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
					datasets: [{}],
				},
			});

			const firstResponse = await axios.get(
				'http://localhost:1337/prices/all/' + this.firstId
			);
			let firstDictionary = Object.fromEntries(
				firstResponse.data.map((x) => [x.year, x.value])
			);
			for (let i = 0; i < 12; i++) {
				let tmp = firstDictionary[i + 2010];
				this.barChartOne.datasets[0].data[i] = tmp === undefined ? 0 : tmp;
			}
			this.barChartOne.datasets[0].label = this.firstId;
		},
	},
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

.v-row {
	margin-top: 2rem;
}
#radar-chart {
	margin-top: 10rem;
	height: 500px;
	width: 500px;
}
</style>
