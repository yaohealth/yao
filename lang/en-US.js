export default (context) => {
  return new Promise(function (resolve) {
    resolve({
      landing: {
        welcome: 'your preventive medicine platform',
        snacktext: 'Subscribe to our Newsletter',
        subscribe: 'subscribe',
        close: 'close'
      },
      navbar: {
        booking: 'booking',
        profile_settings: 'Profile Settings'
      },
      searchbar: {
        placeholder: 'SEARCH FOR SYMPTOMS, CONDITIONS, DOCTORS, PRACTITIONERS'
      },
      doctor: {
        component: {
          button: 'BOOKING'
        },
        profile: {

        },
        settings: {

        }
      }
    })
  })
}