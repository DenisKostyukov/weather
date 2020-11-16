import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './components/App.vue'
import Weather from './components/Weather.vue'
import Cityinfo from './components/Cityinfo.vue'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
 Vue.use(VueRouter)
const routes = [
   { path: '/', component: Weather },
   { path: '/city-info/:name', component: Cityinfo, props: true},
]
 
const router = new VueRouter({
   routes
})


new Vue({
  render: h => h(App),
  el: '#app',
  router
})
