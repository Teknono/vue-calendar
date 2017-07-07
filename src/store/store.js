import Cell from '../utils/Cell.js'
import Vue from 'vue'
import VueAxios from "vue-axios"
import Vuex from 'vuex'
import axios from "axios"
import countries from "../assets/country_codes"
import moment from 'moment'
import shortid from "shortid"

Vue.use(VueAxios, axios)
Vue.use(Vuex)

export class Reason {

  constructor(code, label) {
    this.code = code
    this.label = label
  }

  render() {
    return { code: this.code, label: this.label }
  }
}

export class City {
  constructor(location) {
    this.location = location
    this.fetchedLocation = ""
    this.isFetching = false
    this.hasError = false
    this.clearWeather()
    this.id = shortid.generate()
  }

  searchLocation() {
    this.fetchedLocation = this.location
    return this.location.replace(/\s/g, '')
  }

  clearWeather() {
    this.country = ""
    this.fetchedLocation = ""
    this.hasError = false
    this.weather = {}
  }

  newLocation() {
    return this.fetchedLocation != this.location
  }

  hasWeather() {
    return Object.keys(this.weather).length != 0
  }

  updateWeatherFailure(error) {
    console.error(error)
    this.isFetching = false
    this.hasError = true
  }

  updateWeatherSuccess(json) {
    this.weather = {
      city: this.location,
      temp: Math.round(json.main.temp),
      humidity: json.main.humidity,
      conditions: json.weather[0].main,
      wind: json.wind.speed,
      windDirection: json.wind.deg,
      country: countries[json.sys.country].name
    }
    this.isFetching = false
  }
}

const state = {
  cities: [],
  sortingBy: '',
  sortAsc: true,
  isActive: false,
  selectedDate: '',
  reasons: [
    new Reason('F', 'Formation').render(),
    new Reason('I', 'Intercontrat').render(),
    new Reason('CP', 'Congé payé').render(),
    new Reason('CSS', 'Congé sans solde').render(),
    new Reason('M', 'Maladie').render(),
    new Reason('ABS', 'Absence exceptionnelle payée').render(),
    new Reason('RTTE', 'RTT Employeur').render(),
    new Reason('RTTS', 'RTT Salarié').render()],
  events: [
    { id: shortid.generate(), date: new Date(), cell: new Cell(new Date()).render(), name: "Test" },
    { id: shortid.generate(), date: new Date(2018, 1, 25), cell: new Cell(new Date(2018, 1, 25)).render(), name: "Necci" }
  ]
}

const mutations = {
  toggleModal: (state) => state.isActive = !state.isActive,

  removeEvent: (state, id) => state.events = state.events.filter(event => event.id != id),

  addEvent: (state, reason) => state.events.push({ id: shortid.generate(), date : state.selectedDate, cell: new Cell(state.selectedDate).render(), name: reason }),

  addCity: (state, location = "") => state.cities.push(new City(location)),

  removeCity: (state, id) => {
    state.cities = state.cities.filter(city => city.id != id)
  },

  replaceCities: (state, newCities) => state.cities = newCities,

  clearSort: (state) => state.sortingBy = '',

  sortCities: (state, attribute) => {
    if (state.sortingBy === attribute) {
      state.sortAsc = !state.sortAsc
    }
    else {
      state.sortingBy = attribute
      state.sortAsc = true
    }
    state.cities.sort((a, b) => {
      if (state.sortAsc) {
        [a, b] = [b, a]
      }
      if (a.weather[attribute] < b.weather[attribute]) {
        return -1
      }
      else if (a.weather[attribute] > b.weather[attribute]) {
        return 1
      }
      else {
        return 0
      }
    })
  }
}

const actions = {
  toggleModal: ({ commit, state }, date) => {
    commit("toggleModal")
    state.selectedDate = date
  },

  addEvent:({commit,state, dispatch}, payload) => {
    commit("addEvent", payload)
    dispatch("saveEvents")
  },

  removeEvent: ({commit, state, dispatch}, id) => {
    commit("removeEvent", id)
    dispatch("saveEvents")
  },

  loadEvents: ({state}) => {
    let storedEvents = localStorage.getItem('events')
    if(storedEvents) {
      storedEvents = JSON.parse(storedEvents)
    }
  },

  saveEvents:({state}) => {
    localStorage.setItem('events', JSON.stringify(state.events))
  },

  validateReason: ({ commit, state }) => {

  },
  removeCity: ({ commit, state, dispatch }, id) => {
    commit("removeCity", id)
    dispatch("saveCities")
    if (state.cities.length === 0) {
      commit("clearSort")
      commit("addCity")
    }
  },
  sortBy: ({ commit, state }, attribute) => {
    commit("sortCities", attribute)
  },
  loadCities: ({ commit, state }) => {
    let storedCities = localStorage.getItem("cities")
    if (storedCities) {
      storedCities = JSON.parse(storedCities)
      let loaded = storedCities.map(location => new City(location))
      commit("replaceCities", loaded)
    } else {
      commit("addCity")
    }
  },
  saveCities: ({ getters }) => {
    let valid = getters.validCities
    let save = valid.map(city => city.location)
    if (save.length > 0) {
      localStorage.setItem("cities", JSON.stringify(save))
    } else {
      localStorage.removeItem("cities")
    }
  },
  getWeather: ({ commit, state, dispatch }) => {
    state.cities.forEach((city) => {
      if (city.location.length == 0) {
        city.clearWeather()
        return
      }
      if (city.newLocation() || !city.hasWeather()) {
        commit('clearSort')
        city.clearWeather()
        city.isFetching = true
        let appid = 'e016111a23c680fdcc97aa4fc65a4ff6'
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city.searchLocation()}&APPID=${appid}&units=metric`)
          .then((response) => {
            city.updateWeatherSuccess(response.data)
            dispatch('saveCities')
          })
          .catch((error) => { city.updateWeatherFailure(error) })
      }
    })
  }
}

const getters = {
  reasons: (state) => state.reasons.sort((a, b) => a.code > b.code),
  validCities: (state) => state.cities.filter(city => !city.hasError && city.hasWeather()),
  noCitiesHaveLocation: (state) => { return !state.cities.some(city => city.location.length != 0) }
}

export const store = new Vuex.Store({ state, actions, mutations, getters })
