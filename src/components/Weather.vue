<template>
  <div>
    <div class="wrapper">
      <p>Введите Город</p>
      <input type="text" v-model="city" /><br />
      <br />
      <button @click="addNew()">Add</button>
      <p>Выберите город</p>
      <select v-model="selectCity">
        <option v-for="city in cities" v-bind:key="city">
          {{ city }}
        </option></select
      ><br /><br />

      <button>
        <router-link v-bind:to="'/city-info/' + selectCity"
          >Weather
        </router-link>
      </button>
      <button @click="cityWeather()">city</button>
      <br />
      <p>Погода</p>
      {{ latitude }}
      {{ longitude }}
      {{ weather }}
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data: function () {
    return {
      weather: {},
      cities: ["Kyiv", "Zaporizhzhia"],
      city: "",
      selectCity: "",
      latitude: "",
      longitude: "",
      position: "",
    };
  },
  beforeMount: function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setlocation);
    } else {
      this.position = "Geolocation is not supported by this browser.";
    }
  },
  mounted: function () {
    Vue.axios
      .get(
        "http://api.openweathermap.org/data/2.5/find?lat=" +
          this.latitude +
          "&lon=" +
          this.longitude +
          "&cnt=10&appid=4f1eefd698127c5ee5b4f3ee7040f4bc&units=metric"
      )
      .then((response) => {
        console.log(response.data.list);
        this.weather = response.data.list[0];
      });
  },
  methods: {
    setlocation: function (position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    },
    addNew: function () {
      this.cities.push(this.city);
    },
    cityWeather: function () {
      Vue.axios
        .get(
          "http://api.openweathermap.org/data/2.5/find?q=" +
            this.selectCity +
            "&appid=4f1eefd698127c5ee5b4f3ee7040f4bc&units=metric"
        )
        .then((response) => {
          console.log(response.data.list);
          this.weather = response.data.list[0];
        });
    },
  },
};
</script>

<style>
</style>
