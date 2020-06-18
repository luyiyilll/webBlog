import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'

Vue.use(Vuex)

const state = {
  user: ls.getItem('user'),
  // 添加 auth 来保存当前用户的登录状态
  auth: ls.getItem('auth'),
  // 所有文章状态
  articles: ls.getItem('articles'),
  navIndex: 0,
  subNavIndex: 1

}

const mutations = {
  UPDATE_USER (state, user) {
    state.user = user
    ls.setItem('user', user)
  },
  // 添加 UPDATE_AUTH 来更改当前用户的登录状态
  UPDATE_AUTH (state, auth) {
    state.auth = auth
    ls.setItem('auth', auth)
  },
  // 更改所有文章的事件类型
  UPDATE_ARTICLES (state, articles) {
    state.articles = articles
    ls.setItem('articles', articles)
  },
  UPDATE_NAV (state, nav) {
    state.navIndex = nav
  },
  SUB_UPDATE_NAV (state, nav) {

    state.subNavIndex = nav

  }


}

const actions = {
  login ({ commit }, user) {
    if (user) commit('UPDATE_USER', user)
    // 更新当前用户的登录状态为已登录
    commit('UPDATE_AUTH', true)
    router.push('/')
  },
  logout ({ commit }) {
    commit('UPDATE_AUTH', false)
    router.push({ name: 'Home', params: { logout: true } })
  },
  // 更新个人信息
  updateUser ({ state, commit }, user) {
    const stateUser = state.user

    if (stateUser && typeof stateUser === 'object') {
      user = { ...stateUser, ...user }
    }

    commit('UPDATE_USER', user)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store