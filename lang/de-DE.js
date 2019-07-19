export default (context) => {
  return new Promise(function (resolve) {
    resolve({
      landing: {
        welcome: 'Ihre Plattform für Präventivmedizin',
        infotext1: 'Suchen Sie nach der passenden Therapie und finden Sie den richtigen Arzt oder Praktiker',
        infotext2: 'Buchen Sie online.',
        infotext3: 'Erfahren Sie mehr über die verschiedenen Therapien der Alternativ- und Komplementärmedizin und bei welchen Symptomen sie angewandt werden.',
        findBtn: 'Suchen',
        bookBtn: 'Buchen',
        discoverBtn: 'Entdecken',
        joinText: 'Sie sind Arzt oder Praktiker?',
        registerBtn: 'Registrieren',
        bulletpoint1: 'Yao ist ein Netzwerk, das von Ärzten und Praktikern reguliert wird, um das Vertrauen und die Beziehung zu Patienten zu verbessern',
        bulletpoint2: 'Reduzieren Sie Abwesenheitsraten',
        bulletpoint3: 'Verbessern Sie Ihre Sichtbarkeit online',
        discovertext: 'Erfahren Sie mehr über Präventivmedizin',
        contentent1: 'Therapien',
        contentent2: 'Symptome',
        contentent3: 'Themen',
        doctorhighlights: 'Informieren Sie sich über die Profile unserer Ärzte und Praktiker',
        snacktext: 'Aboniere unseren Newsletter',
        subscribe: 'Abonieren',
        close: 'Schließen'
      },
      resultpage: {
        therapytext: 'Folgende Therapien sind für die von Ihnen angegebenen Beschwerden und Symptome geeignet',
        doctortext: 'Entdecken Sie {number} Ärzte oder Praktiker, die Ihnen helfen können'
      },
      navbar: {
        booking: 'Terminbuchung',
        profile_settings: 'Profile Einstellungen'
      },
      footer: {
        text: 'Folgen Sie uns und bleiben Sie auf dem Laufenden'
      },
      searchbar: {
        placeholder: 'SUCHE NACH SYMPTOMEN, ÄRZTEN UND PRAKTIKERN'
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