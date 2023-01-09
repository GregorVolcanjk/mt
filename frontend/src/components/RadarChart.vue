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
	</div>

	<Radar :data="chartData" :options="chartOptions" />
</template>
<script>
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from 'chart.js';
import { Radar } from 'vue-chartjs';
import { store } from '../store/store.js';
import axios from 'axios';

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

export default {
	name: 'RadarChart',
	components: {
		Radar,
	},
	data: () => ({
		store,
		loaded: false,
		chartData: {
			labels: [
				'Electricity',
				'Natural Gas',
				'Solid biofuel',
				'Heat Pump',
				'Gas oil and Diesel oil',
			],
			datasets: [],
		},
		chartOptions: {
			responsive: false, //ce hoces da ni fullscreen
			maintainAspectRatio: false,
		},
	}),
	methods: {
		async drawRadarChart(firstId, secondId) {
			if (store.firstTarget !== '' && store.secondTarget !== '') {
				this.loaded = true;
				console.log('Logging first and second id ' + firstId + ' ' + secondId);
				this.chartData.datasets = [];
				const firstResponse = await axios.get(
					'http://localhost:1337/householdUsageCountryYear/' + firstId + '/2020'
				);

				const secondResponse = await axios.get(
					'http://localhost:1337/householdUsageCountryYear/' +
						secondId +
						'/2020'
				);
				//console.log("Amount of first data" + JSON.stringify(firstResponse.data[0].value))
				//console.log("Output from radar "+JSON.stringify(firstData[0]));

				var firstData = {
					label: firstId,
					data: [
						parseFloat(JSON.stringify(firstResponse.data[1].value)),
						parseFloat(JSON.stringify(firstResponse.data[2].value)),
						parseFloat(JSON.stringify(firstResponse.data[7].value)),
						parseFloat(JSON.stringify(firstResponse.data[9].value)),
						parseFloat(JSON.stringify(firstResponse.data[6].value)),
					],
					backgroundColor: 'rgba(179,181,198,0.2)',
					borderColor: 'rgba(179,181,198,1)',
					pointBackgroundColor: 'rgba(179,181,198,1)',
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(179,181,198,1)',
				};
				this.chartData.datasets.push(firstData);

				var secondData = {
					label: secondId,
					data: [
						parseFloat(JSON.stringify(secondResponse.data[1].value)),
						parseFloat(JSON.stringify(secondResponse.data[2].value)),
						parseFloat(JSON.stringify(secondResponse.data[7].value)),
						parseFloat(JSON.stringify(secondResponse.data[9].value)),
						parseFloat(JSON.stringify(secondResponse.data[6].value)),
					],
					backgroundColor: 'rgba(179,181,198,0.2)',
					borderColor: 'rgba(179,181,198,1)',
					pointBackgroundColor: 'rgba(179,181,198,1)',
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(179,181,198,1)',
				};
				this.chartData.datasets.push(secondData);
				console.log(this.chartData);
			}
		},
	},
};
</script>
<style></style>
