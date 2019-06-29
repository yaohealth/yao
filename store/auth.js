import cookies from 'js-cookie'

export const state = () => ({
  user: null
})

export const mutations = {
  set_user (store, data) {
    store.user = data
  },
  reset_user (store) {
    store.user = null
  }
}

export const actions = {
  async fetch ({commit, dispatch}) {
    try {
      const response = await this.$http.$get('me')
      commit('set_user', response.user)
      return response
    } catch (e) {
      dispatch('reset')
      throw new Error(e)
    }
  },
  login ({commit}, data) {
    return this.$http.$post('auth/login', data)
      .then(response => {
        commit('set_user', response.user)
        this.$http.setToken(response.token, 'Bearer')
        cookies.set('authorization', response.token, {expires: 7})
        return response
      }).catch(e => {
        return e
      })
  },
  reset ({commit}) {
    commit('reset_user')
    this.$http.setToken(false)
    cookies.remove('authorization')
    return Promise.resolve()
  }
}

export const getters = {
  getUser: state => state.user
}