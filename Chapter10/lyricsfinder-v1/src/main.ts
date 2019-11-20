import './polyfills';
import './styles/lyricsfinder.css';

import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import {router} from '@/router/router';

import 'element-ui/lib/theme-chalk/reset.css';
import 'element-ui/lib/theme-chalk/index.css';

import ElementUI from 'element-ui';
import * as enLocale from 'element-ui/lib/locale/lang/en';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(ElementUI, { locale: enLocale });

new Vue({
  render: (h) => h(App),
  router, // short for router: router
}).$mount('#app');
