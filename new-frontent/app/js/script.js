const ctx = document.getElementById('line-chart').getContext('2d');

// Make an array to store the data from the two API endpoints
let data = [];

// Create the line chart using the Chart.js library
const chart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: ['First', 'Second', 'Third'],
		datasets: [
			{
				label: 'Data',
				data: [1, 2, 3],
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
			},
		],
	},
});
