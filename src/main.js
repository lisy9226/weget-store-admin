import Vue from 'vue'
import App from './App';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import router from '@/router/router.js'
import axios from '@/plugins/axios.js'
import { http } from './api/http';
import Vuex from 'vuex'
import store from './store'
import VueI18n from 'vue-i18n'
import messages from './i18n'

// import mock from './mock'


Vue.config.productionTip = false

Vue.use(Antd);
Vue.use(axios);
Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(http);

require('./mock/index.js');


const i18n = new VueI18n({
  locale: 'ja',
  messages
})

Vue.prototype.$store = store

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')


