// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import rk from 'rk-kit';
// import Vuex from 'vuex';
import App from './App';
import store from './vuex/store';

import components from './components/';

Vue.use(rk);
Vue.use(components);

// lumi.theme.use('dark');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
});
