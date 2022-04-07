import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import SpinnerPlugin from 'bootstrap-vue'
import TablePlugin from 'bootstrap-vue'
import VeeValidate from 'vee-validate';


import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import Highcharts from 'highcharts'


// import VuePaginate from 'vuejs-paginate'
import VuePaginate from 'vue-paginate';
Vue.use(VuePaginate);

import Multiselect from 'vue-multiselect'

// Plugins
import './plugins/vuex';

// Vue.use(Chartkick.use(Chart))
Vue.use(Chartkick.use(Highcharts))
Vue.use(VeeValidate);
Vue.config.productionTip = true

Vue.use(ArgonDashboard);
Vue.use(SpinnerPlugin);
Vue.use(TablePlugin)
// Vue.component('paginate', VuePaginate)
// Vue.use(VuePaginate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
