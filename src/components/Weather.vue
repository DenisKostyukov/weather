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

      <br />
      <p>Погода</p>

      <p>
        <span>Город: </span><span>{{ weather.name }} </span>
      </p>
      <p>
        <span>Описание: </span
        ><span>{{ weather.weather[0].description }} </span>
      </p>
      <p>
        <span>Влажность:</span><span>{{ weather.main.humidity }}</span>
      </p>
      <p>
        <span>Температура:</span><span>{{ weather.main.temp }}</span>
      </p>
      <p>
        <span>Ощущается:</span><span>{{ weather.main.feels_like }}</span>
      </p>
      <p>
        <span>Давление:</span><span>{{ weather.main.pressure }}</span>
      </p>
      <p>
        <span>Скорость ветра:</span><span>{{ weather.wind.speed }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data: function () {
    return {
      weather: {},
      cities: ["Kyiv"],
      city: "",
      selectCity: "",
    };
  },

  mounted: function () {
    this.cities = JSON.parse(localStorage.getItem("cities"));
    var getPosition = function (options) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    };
    getPosition()
      .then((position) => {
        Vue.axios
          .get(
            "http://api.openweathermap.org/data/2.5/find?lat=" +
              position.coords.latitude +
              "&lon=" +
              position.coords.longitude +
              "&cnt=3&appid=4f1eefd698127c5ee5b4f3ee7040f4bc&units=metric&lang=ru"
          )
          .then((response) => {
            console.log(response.data.list);
            this.weather = response.data.list[1];
          });
      })
      .catch((err) => {
        console.error(err.message);
      });
  },
  methods: {
    addNew: function () {
      this.cities.push(this.city);
      localStorage.setItem("cities", JSON.stringify(this.cities));
    },
  },
};
</script>

<style>
</style>
