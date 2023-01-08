const knex = require('./knex');

function getElAllPrices() {
	return knex('electricity_price_user')
		.where('geo', 'AL')
		.andWhere('indic_en', 'MSHH')
		.andWhere('year', 2015)
		.select('geo', 'year', 'value');
}

function getElCountryPrice(household, geo, year) {
	return knex('electricity_price_user')
		.where('geo', geo)
		.andWhere('indic_en', household)
		.andWhere('year', year)
		.select('geo', 'year', 'value');
}

function getAllPrice(geo) {
	return knex('electricity_price_user')
		.where('geo', geo)
		.andWhere('indic_en', 'MSHH')
		.select('year', 'value');
}

function getAllGasPrice(geo) {
	return knex('gas_price_user')
		.where('geo', geo)
		.andWhere('indic_en', 'MSHH')
		.select('year', 'value');
}

function getElYearPrices(household, year) {
	return knex('electricity_price_user')
		.where('indic_en', household)
		.andWhere('year', year)
		.select('geo', 'year', 'value');
}
function getMaxElPrice(household, geo) {
	return knex('electricity_price_user')
		.where('geo', geo)
		.andWhere('indic_en', household)
		.max('value')
		.select('geo', 'year', 'value');
}
function getMinElPrice(household, geo) {
	return knex('electricity_price_user')
		.where('geo', geo)
		.andWhere('indic_en', household)
		.min('value')
		.select('geo', 'year', 'value');
}

function getMaxGasPrice(household, geo) {
	return knex('gas_price_user')
		.where('geo', geo)
		.andWhere('indic_en', household)
		.max('value')
		.select('geo', 'year', 'value');
}
function getMinGasPrice(household, geo) {
	return knex('gas_price_user')
		.where('geo', geo)
		.andWhere('indic_en', household)
		.min('value')
		.select('geo', 'year', 'value');
}

function getElAllCountryPrices(household, geo) {
	return knex('electricity_price_user')
		.where('geo', geo)
		.andWhere('indic_en', household)
		.select('geo', 'year', 'value');
}

function getGasCountryPrice(household, geo, year) {
	return knex('gas_price_user')
		.where('geo', geo)
		.andWhere('indic_en', household)
		.andWhere('year', year)
		.select('geo', 'year', 'value');
}

function getGasYearPrices(household, year) {
	return knex('gas_price_user')
		.where('indic_en', household)
		.andWhere('year', year)
		.select('geo', 'year', 'value');
}

function getGasByCountry(household, geo) {
	return knex('gas_price_user')
		.where('indic_en', household)
		.andWhere('geo', geo)
		.select('geo', 'year', 'value');
}

// Values of fuels used
function getFuelName(siec) {
	return knex('fuel_types').where('siec', siec);
}

function getHouseholdUsageCountryFuel(geo, fuel) {
	return knex('household_by_fuel')
		.where('geo', geo)
		.andWhere('siec', fuel)
		.select('geo', 'year', 'value');
}

function getHouseholdUsageYearFuel(year, fuel) {
	return knex('household_by_fuel')
		.where('year', year)
		.andWhere('siec', fuel)
		.select('geo', 'year', 'value');
}

function getHouseholdUsageCountryYear(geo, year) {
	return knex('household_by_fuel')
		.join('fuel_types', 'fuel_types.siec', 'household_by_fuel.siec')
		.where('geo', geo)
		.andWhere('year', year)
		.select('fuel_types.fuel', 'geo', 'value');
}

function getHouseholdSize(geo, year) {
	return knex('household_size')
		.where('geo', geo)
		.andWhere('year', year)
		.select('value');
}

function getPopulation(geo, year) {
	return knex('population')
		.where('geo', geo)
		.andWhere('year', year)
		.select('value');
}

function getEarnings(geo, year) {
	return knex('net_earnings')
		.where('geo', geo)
		.andWhere('year', year)
		.select('value');
}

module.exports = {
	getElAllPrices,
	getElCountryPrice,
	getElYearPrices,
	getElAllCountryPrices,
	getGasCountryPrice,
	getGasYearPrices,
	getGasByCountry,
	getAllPrice,
	getAllGasPrice,
	getFuelName,
	getHouseholdUsageCountryFuel,
	getHouseholdUsageYearFuel,
	getHouseholdUsageCountryYear,
	getMaxElPrice,
	getMinElPrice,
	getMaxGasPrice,
	getMinGasPrice,
	getEarnings,
	getHouseholdSize,
	getPopulation,
};
