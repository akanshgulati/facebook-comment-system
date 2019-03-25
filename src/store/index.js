import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {}
  },
  mutations: {
    addUsers (state, payload = []) {
      payload.forEach(load => state.userData[load.id] = load);
    },
    setCurrentUser (state, payload){
      state.currentUser = payload;
    }
  },
  actions: {
    setUsers(context, payload) {
      context.commit('addUsers', payload);
    }
  }
});
