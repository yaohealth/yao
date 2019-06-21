import cookie from 'cookie'

export const actions = {
  nuxtServerInit ({dispatch}, context) {
    return new Promise((resolve, reject) => {
      const cookies = cookie.parse(context.req.headers.cookie || '')
      if (cookies.hasOwnProperty('authorization')) {
        this.$http.setToken(cookies['authorization'], 'Bearer')
        dispatch('auth/fetch')
          .then(result => {
            resolve(true)
          })
          .catch(error => {
            console.log('Provided token is invalid:', error)
            this.$http.setToken(false)
            resolve(false)
          })
      } else {
        this.$http.setToken(false)
        resolve(false)
      }
    })
  }
}