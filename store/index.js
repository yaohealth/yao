import cookie from 'cookie'

export const actions = {
  async nuxtServerInit ({dispatch}, context) {
      const cookies = cookie.parse(context.req.headers.cookie || '')
      if (cookies.hasOwnProperty('authorization')) {
        try {
          this.$http.setToken(cookies['authorization'], 'Bearer')
          await dispatch('auth/fetch')
        } catch (e) {
            this.$http.setToken(false)
        }
      } else {
        this.$http.setToken(false)
      }
  }
}