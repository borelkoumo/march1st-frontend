const state = {
  notifications: [],
};
const getters = {
  getMyNotifications(state) {
    return state.notifications;
  },
};
const mutations = {
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications;
  },
};
const actions = {
  CREATE_NOTIFICATION({ commit, dispatch }, param) {},
  GET_MYNOTIFICATION({ commit, dispatch }) {
    const user =
      localStorage.getItem("user") != null
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    if (user) {
    }
  },
  CHANGE_STATE({ commit, dispatch }, notification) {},
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
