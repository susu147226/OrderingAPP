import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import Cookie from "js-cookie";

export default createStore({
  // 存储状态
  state: {
    loginUserInfo: null,
    token: null
  },
  //改变状态
  mutations: {
    setLoginUserInfo(state, loginUserInfo) {
      state.loginUserInfo = loginUserInfo;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  //提交状态改变
  actions: {
    setLoginUserInfo({ commit }, loginUserInfo) {
      commit("setLoginUserInfo", loginUserInfo);
    },
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    //退出登录，把之前保存的登录信息去掉
    setLogOut({ commit }) {
      commit("setLoginUserInfo", null);
      commit("setToken", null);
    }
  },
  //getters除了实现了计算属性的功能，还有一个好处，它在state里面取值的时候如果发现没有值，就会偿试从缓存里面取
  //从缓存里面取值是因为我们加载了vuex-persistedstate
  getters: {
    loginUserInfo(state) {
      return state.loginUserInfo;
    },
    token(state) {
      return state.token;
    }
  },
  plugins: [
    // 这里可以加载很多插件，如异步转同步插件，如持久化插件
    createPersistedState({
      //后期如果给还要实现其它的方案也是可以的，我们还有一个框架也行，叫web-storeage-cache
      storage: {
        getItem: key => Cookie.get(key),
        setItem: (key, value) => Cookie.set(key, value, { expires: 30 }),
        removeItem: key => Cookie.remove(key)
      }
    })
  ]
})
