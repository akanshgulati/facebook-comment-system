// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// Setting Dummy data
import { Get } from './utils/StorageUtils';
import { SetContent, SetUser, StorageKeys } from './utils/HttpUtils';
import ContentData from '../data/post.json';
import UserData from '../data/user.json';

(function loadDummyData() {
  if (!Get(StorageKeys.CONTENT_META) || !Get(StorageKeys.USER_META)) {
    ContentData.forEach((content) => {
      SetContent(content);
    });
    UserData.forEach((user) => {
      SetUser(user);
    });
  }
}());

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

