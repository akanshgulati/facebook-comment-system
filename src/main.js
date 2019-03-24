// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import router from './router';

import { Get } from './utils/StorageUtils';
import { SetContent } from './utils/HttpUtils';
import Contents from '../data/post.json';

Vue.config.productionTip = true;

/* eslint-disable no-new */
(function loadDummyData() {
  if (!Get('content-meta')) {
    Contents.forEach((content) => {
      SetContent(content);
    });
  }
}());

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

