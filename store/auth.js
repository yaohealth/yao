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
  fetch ({commit}) {
    return this.$http.$get('me')
      .then(response => {
        commit('set_user', response.result)
        return response
      })
      .catch(error => {
        commit('reset_user')
        return error
      })
  },
  login ({commit}, data) {
    return this.$http.$post('auth/login', data)
      .then(response => {
        commit('set_user', response.user)
        this.$http.setToken(response.token, 'Bearer')
        cookies.set('authorization', response.token, {expires: 7})
        return response
      }).catch(e => e)
  },
  reset ({commit}) {
    commit('reset_user')
    this.$http.setToken(false)
    cookies.remove('authorization')
    return Promise.resolve()
  }
}