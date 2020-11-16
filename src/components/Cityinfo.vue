<template>
  <div>
    {{ weather }}
  </div>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    name: "",
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
          "&appid=4f1eefd698127c5ee5b4f3ee7040f4bc&units=metric"
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