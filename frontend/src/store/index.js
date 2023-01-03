import Vue from 'vue'
import Vuex from 'vuex'



export default new Vuex.Store({
    state: {
        elprices: {}
    },
    getters: {
        getElPrices: state => {
            return state.elprices
        }
    },
    mutations: {},
    actions: {}
});