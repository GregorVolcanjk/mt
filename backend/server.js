const express = require('express');
const app = express();
const db = require('./db/prices');


//test
app.get('/test', (req, res) => {
	res.status(200).json({ success: true });
});

app.get('/testfunkcija/:household/:geo', async (req,res) => {
	values = await db.testFunkcija(req.params['household'],req.params['geo'])
	res.status(200).json(values)
})

// Vse cene vsi stolpci
app.get('/prices', async (req, res) => {
	const prices = await db.getElAllPrices();
	res.status(200).json(prices);
});

// Razpored po letih za posamezno drzavo
app.get('/electricity/one/:geo/:year/:household', async (req, res) => {
	const prices = await db.getElCountryPrice(req.params['household'],req.params['geo'],req.params['year']);
	res.status(200).json(prices);
});

// cene vseh drzav v dolocenem letu
app.get('/electricity/year/:year/:household', async (req, res) => {
	console.log('electricity year')
	const prices = await db.getElYearPrices(req.params['household'],req.params['year']);
	res.status(200).json(prices);
});

//Dobi ceno po letih za drzavo
// Ne dela? DEla!
app.get('/electricityCountry/:geo/:household', async (req, res) => {
	const prices = await db.getElAllCountryPrices(req.params['household'],req.params['geo']);
	console.log("ja;asodkasokd")
	console.log(prices)
	res.status(200).json(prices);
});

app.get('/gasOne/:geo/:year/:household', async (req, res) => {
	const prices = await db.getGasCountryPrice(req.params['household'],req.params['geo'],req.params['year']);
	res.status(200).json(prices);
});

app.get('/gasYear/:year/:household', async (req, res) => {
	const prices = await db.getGasYearPrices(req.params['household'],req.params['year']);
	res.status(200).json(prices);
});

app.get('/gasCountry/:geo/:household', async (req, res) => {
	console.log(req.params['geo'])
	const prices = await db.getGasByCountry(req.params['household'],req.params['geo']);
	res.status(200).json(prices);
});

//app.get('/prices/:household')

app.listen(1337, () => console.log('Server is running on port 1337'));
