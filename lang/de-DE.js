export default (context) => {
  return new Promise(function (resolve) {
    resolve({
      landing: {
        welcome: 'deine preventive Medizin Platform',
        snacktext: 'Aboniere unseren Newsletter',
        subscribe: 'Abonieren',
        close: 'Schließen'
      },
      navbar: {
        booking: 'Buchen',
        profile_settings: 'Profile Einstellungen'
      },
      searchbar: {
        placeholder: 'SUCHE NACH SYMPTOMEN, ZUSTÄNDEN, DOKOTOREN, PRAKTIKERN'
      },
      doctor: {
        component: {
          button: 'BUCHEN'
        },
        profile: {

        },
        settings: {

        }
      }
    })
  })
}