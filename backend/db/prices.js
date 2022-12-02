const knex = require('./knex');

function getElAllPrices() {
    return knex('electricity_price_user').where("geo", "AL").andWhere('indic_en', 'MSHH').andWhere('year', 2015).select('geo', 'year', 'value');
}

function getElCountryPrice(household, geo, year) {
    return knex('electricity_price_user').where("geo", geo).andWhere('indic_en', household).andWhere('year', year).select('geo', 'year', 'value');
}

function getAllPrice(geo) {
    return knex('electricity_price_user').where("geo", geo).andWhere('indic_en', 'MSHH').select('year', 'value');
}

function getElYearPrices(household, year) {
    return knex('electricity_price_user').where("indic_en", household).andWhere('year', year).select('geo', 'year', 'value');
}

function getElAllCountryPrices(household, geo) {
    return knex('electricity_price_user').where("geo", geo).andWhere('indic_en', household).select('geo', 'year', 'value');
}

function getGasCountryPrice(household, geo, year) {
    return knex('gas_price_user').where("geo", geo).andWhere('indic_en', household).andWhere('year', year).select('geo', 'year', 'value');
}

function getGasYearPrices(household, year) {
    return knex('gas_price_user').where("indic_en", household).andWhere('year', year).select('geo', 'year', 'value');
}

function getGasByCountry(household, geo) {
    return knex('gas_price_user').where("indic_en", household).andWhere('geo', geo).select('geo', 'year', 'value')
}



module.exports = {
    getElAllPrices,
    getElCountryPrice,
    getElYearPrices,
    getElAllCountryPrices,
    getGasCountryPrice,
    getGasYearPrices,
    getGasByCountry,
    getAllPrice
};