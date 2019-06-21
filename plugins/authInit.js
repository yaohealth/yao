import cookies from 'js-cookie'

export default function ({ $http }) {
  const token = cookies.get('authorization')
  token? $http.setToken(token, 'Bearer') : $http.setToken(false)
}