export default function ({store, redirect, route}) {
  store.dispatch('auth/fetch').then(res => {
    const userIsLoggedIn = !!res.user
    const urlRequiresAuth = /^\/admin(\/|$)/.test(route.fullPath)
    const urlRequiresNonAuth = /^\/login(\/|$)/.test(route.fullPath)
    if (!userIsLoggedIn && urlRequiresAuth) {
      return redirect('/login')
    }
    if (userIsLoggedIn && urlRequiresNonAuth) {
      return redirect('/admin')
    }
    return Promise.resolve()
  }).catch(e => {
    return redirect('/login')
  })
}