<template>
  <div>
    <p>Погода</p>

    <p>
      <span>Город: </span><span>{{ weather.name }} </span>
    </p>
    <p>
      <span>Описание: </span><span>{{ weather.weather[0].description }} </span>
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
</template>
<script>
import Vue from "vue";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      weather: {},
    };
  },
  mounted: function () {
    Vue.axios
      .get(
        "http://api.openweathermap.org/data/2.5/find?q=" +
          this.name +
          "&appid=4f1eefd698127c5ee5b4f3ee7040f4bc&units=metric&lang=ru"
      )
      .then((response) => {
        console.log(response.data.list);
        this.weather = response.data.list[0];
      });
  },
  methods: {
    cl: function () {},
  },
};
</script>