import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueBus from 'vue-bus';

import App from './App.vue'
import router from './router'

Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueBus);

const store = new Vuex.Store({
  state: {
    theme: localStorage.getItem('theme')||'default',
    themes: [
      {
        id: 0,
        name: 'default',
        description: 'default',
        img: require('@/assets/theme_default.jpg'),
        isvip: false
      },
      {
        id: 1,
        name: 'pink',
        description: 'pink',
        img: require('@/assets/theme_pink.jpg'),
        isvip: false
      },
      {
        id: 2,
        name: 'dark',
        description: 'dark',
        img: require('@/assets/theme_dark.jpg'),
        isvip: false
      },
      {
        id: 3,
        name: 'gold',
        description: 'gold',
        img: require('@/assets/theme_gold.jpg'),
        isvip: true
      }
    ],
    data: {}
  },
  mutations: {
    setTheme(state, tm) {
      state.theme = tm;
    }
  }
});
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "//at.alicdn.com/t/font_463713_eqy42vs5i1gojemi.js";
document.getElementsByTagName("head")[0].appendChild(script);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
