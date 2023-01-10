$(document).ready(function() {
	$("#SI").css("fill","#B55EAD")
	$("#HR").css("fill","#B59D3A")

	var switchState = false;
	var firstId = "SI";
	var secondId = "HR";
	sessionStorage.setItem("firstId", firstId);
	sessionStorage.setItem("secondId", secondId);

	$(window).on("load",async function() {

		var ctx = document.getElementById('priceChart').getContext('2d');

		var firstResponse = await axios.get(
			"http://localhost:1337/prices/all/SI")

		var secondResponse = await axios.get(
			"http://localhost:1337/prices/all/HR")
		
		let dictionaryOne = Object.fromEntries(
			firstResponse.data.map((x) => [x.year, x.value])
			);
		let dictionaryTwo = Object.fromEntries(
			secondResponse.data.map((x) => [x.year, x.value])
			);
		let tmp = []
		let mtp = []
		for (let i = 0; i < 12; i++) {
		tmp[i] = dictionaryOne[i+2010];
		mtp[i] = dictionaryTwo[i+2010];
		}

		var dataset = {
			labels: ["2010",
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
			"2021",],
			datasets: [
				{
				label: 'SI',
				borderColor: 'rgb(255, 99, 132)',
				data: tmp
				},
				{
				label: 'HR',
				borderColor: 'rgb(54, 162, 235)',
				data: mtp
				}
			]
		};

		var options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
            title: {
                display: true,
                text: 'Cena elektrike v eur/kwh'
            }
        }
		};

		new Chart(ctx, {
		type: 'line',
		data: dataset,
		options: options
		});

		// Graph that shows
		// amount of electricity between the two countries

		ctx = document.getElementById('elChart').getContext('2d');

		
		firstResponse = await axios.get(
			"http://localhost:1337/electricityCountry/SI")

		secondResponse = await axios.get(
			"http://localhost:1337/electricityCountry/HR")

		console.log(firstResponse.data)
			dictionaryOne = Object.fromEntries(
				firstResponse.data.map((x) => [x.year, x.value])
				);
				console.log(dictionaryOne)
			dictionaryTwo = Object.fromEntries(
				secondResponse.data.map((x) => [x.year, x.value])
				);
			tmp = []
			mtp = []
			for (let i = 0; i < 12; i++) {
			tmp[i] = 0.01163*dictionaryOne[i+2009];
			mtp[i] = 0.01163*dictionaryTwo[i+2009];
			}

			console.log(tmp)

			var dataset = {
				labels: ["2009",
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
				],
				datasets: [
					{
					label: 'SI',
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
      				borderColor: 'rgba(255, 99, 132, 1)',
      				borderWidth: 1,
					data: tmp
					},
					{
					label: 'HR',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
      				borderColor: 'rgba(54, 162, 235, 1)',
      				borderWidth: 1,
					data: mtp
					}
				]
			};

			options = {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					title: {
						display: true,
						text: 'Poraba elektrike v Gwh'
					}
				}
				};
		
				new Chart(ctx, {
				type: 'bar',
				data: dataset,
				options: options
				});


		// Radar graph that shows the chosen year
		ctx = document.getElementById('radarChart').getContext('2d');

		firstResponse = await axios.get(
			'http://localhost:1337/householdUsageCountryYear/SI/2015')

		secondResponse = await axios.get(
			'http://localhost:1337/householdUsageCountryYear/HR/2015')

		console.log(firstResponse.data)
			tmp = [
				parseFloat(JSON.stringify(firstResponse.data[1].value)),
				parseFloat(JSON.stringify(firstResponse.data[2].value)),
				parseFloat(JSON.stringify(firstResponse.data[7].value)),
				parseFloat(JSON.stringify(firstResponse.data[9].value)),
				parseFloat(JSON.stringify(firstResponse.data[6].value)),
			]
			mtp = [
				parseFloat(JSON.stringify(secondResponse.data[1].value)),
				parseFloat(JSON.stringify(secondResponse.data[2].value)),
				parseFloat(JSON.stringify(secondResponse.data[7].value)),
				parseFloat(JSON.stringify(secondResponse.data[9].value)),
				parseFloat(JSON.stringify(secondResponse.data[6].value)),
			]

		

			console.log(tmp)

			var dataset = {
				labels: [
					'Elektrika',
					'Naraven plin',
					'Trdno biogorivo',
					'Toplotna črpalka',
					'Kurilno in dizelsko olje',
				],
				datasets: [
					{
					label: 'SI',
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
      				borderColor: 'rgba(255, 99, 132, 1)',
      				borderWidth: 1,
					data: tmp
					},
					{
					label: 'HR',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
      				borderColor: 'rgba(54, 162, 235, 1)',
      				borderWidth: 1,
					data: mtp
					}
				]
			};

			options = {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					title: {
						display: true,
						text: 'Poraba v srednjih gospodinjstvih v KTOE'
					}
				}
				};
		
				new Chart(ctx, {
				type: 'radar',
				data: dataset,
				options: options
				});
	});



	$("#SI").css("fill","#B55EAD")
	$("#HR").css("fill","#B59D3A")





	async function updateLineChart() {
		const ctx = document.getElementById('priceChart').getContext('2d');

		// Get chart object
		const priceChart = Chart.getChart(ctx);


		var firstResponse = await axios.get(
			"http://localhost:1337/prices/all/" + sessionStorage.getItem("firstId")
			)

		var secondResponse = await axios.get(
			"http://localhost:1337/prices/all/"+ sessionStorage.getItem("secondId")
			)

		let dictionaryOne = Object.fromEntries(
			firstResponse.data.map((x) => [x.year, x.value])
			);
		let dictionaryTwo = Object.fromEntries(
			secondResponse.data.map((x) => [x.year, x.value])
			);
		let tmp = []
		let mtp = []
		for (let i = 0; i < 12; i++) {
		tmp[i] = dictionaryOne[i+2010];
		mtp[i] = dictionaryTwo[i+2010];
		}
	

		// Update values in dataset
		priceChart.data.datasets[0].data = tmp;
		priceChart.data.datasets[0].label = sessionStorage.getItem("firstId");
		priceChart.data.datasets[1].data = mtp;
		priceChart.data.datasets[1].label = sessionStorage.getItem("secondId");

		// Update chart
		console.log("")
		priceChart.update();
	}

	async function updateElChart() {
		const ctx = document.getElementById('elChart').getContext('2d');

		// Get chart object
		const elChart = Chart.getChart(ctx);


		var firstResponse = await axios.get(
			"http://localhost:1337/electricityCountry/" + sessionStorage.getItem("firstId")
			)

		var secondResponse = await axios.get(
			"http://localhost:1337/electricityCountry/"+ sessionStorage.getItem("secondId")
			)

		let dictionaryOne = Object.fromEntries(
			firstResponse.data.map((x) => [x.year, x.value])
			);
		let dictionaryTwo = Object.fromEntries(
			secondResponse.data.map((x) => [x.year, x.value])
			);
		let tmp = []
		let mtp = []
		for (let i = 0; i < 12; i++) {
		tmp[i] = 0.01163*dictionaryOne[i+2009];
		mtp[i] = 0.01163*dictionaryTwo[i+2009];
		}

		// Update values in dataset
		
		elChart.data.datasets[0].label = sessionStorage.getItem("firstId");
		elChart.data.datasets[0].data = tmp;
		elChart.data.datasets[1].data = mtp;
		elChart.data.datasets[1].label = sessionStorage.getItem("secondId");

		// Update chart
		console.log("Change elchart has been fulfilled")
		elChart.update();
	}

	async function updateRadarChart() {
		const ctx = document.getElementById('radarChart').getContext('2d');

		// Get chart object
		const radarChart = Chart.getChart(ctx);


		const firstResponse = await axios.get(
			'http://localhost:1337/householdUsageCountryYear/'+ sessionStorage.getItem("firstId") +"/"+sessionStorage.getItem("selectedYear"))

		const secondResponse = await axios.get(
			'http://localhost:1337/householdUsageCountryYear/'+ sessionStorage.getItem("secondId") +"/"+sessionStorage.getItem("selectedYear"))

		
			const tmp = [
				parseFloat(JSON.stringify(firstResponse.data[1].value)),
				parseFloat(JSON.stringify(firstResponse.data[2].value)),
				parseFloat(JSON.stringify(firstResponse.data[7].value)),
				parseFloat(JSON.stringify(firstResponse.data[9].value)),
				parseFloat(JSON.stringify(firstResponse.data[6].value)),
			]
			const mtp = [
				parseFloat(JSON.stringify(secondResponse.data[1].value)),
				parseFloat(JSON.stringify(secondResponse.data[2].value)),
				parseFloat(JSON.stringify(secondResponse.data[7].value)),
				parseFloat(JSON.stringify(secondResponse.data[9].value)),
				parseFloat(JSON.stringify(secondResponse.data[6].value)),
			]
	

		// Update values in dataset
		radarChart.data.datasets[0].data = tmp;
		radarChart.data.datasets[0].label = sessionStorage.getItem("firstId");
		radarChart.data.datasets[1].data = mtp;
		radarChart.data.datasets[1].label = sessionStorage.getItem("secondId");

		// Update chart
		console.log("")
		radarChart.update();
	}

	$('input[type=range]').on('input', function () {
		console.log($(this).val());
		$("#sliderVal").text($(this).val());
	});

	$("#go_search").on("click", function() {
		sessionStorage.setItem("selectedYear",$('input[type=range]').val());
		updateLineChart();
		updateElChart();
		updateRadarChart();
		window.scrollBy(0,210);
	})


	//write jquery and javascript code that shows path id when mouse is over the path
	$("path").mouseover(function() {
		//show path id
		$(".map_title").text($(this).attr("id"));
	});
	$("path").mouseleave(function() {
		//hide path id
		$(".map_title").text("");
	});



	$("path").click(function() {
		if (switchState == false) {
			$(`#${firstId}`).css("fill", "#4db6ac");
			//$(this).css("fill", "#B55EAD");
			$(this).css("fill","rgba(255, 99, 132, 1)")
			
			switchState = true;
			firstId = $(this).attr("id");
			sessionStorage.setItem("firstId", firstId);
			$(".first_country").text(firstId)
		} else {
			$(`#${secondId}`).css("fill", "#4db6ac");
			//$(this).css("fill", "#B59D3A");
			$(this).css("fill","rgba(54, 162, 235, 1)")
			switchState = false;
			secondId = $(this).attr("id");
			sessionStorage.setItem("secondId", secondId);
			$(".second_country").text(secondId)
		}
	});

	
});