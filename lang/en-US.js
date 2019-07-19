export default (context) => {
  return new Promise(function (resolve) {
    resolve({
      landing: {
        welcome: 'your preventive medicine platform',
        infotext1: 'Find the therapy adapted to you, identify the right doctor or practitioner.',
        infotext2: 'Book directly online.',
        infotext3: 'Learn about the different therapies and symptoms complementary and alternative medicine can help out.',
        findBtn: 'find',
        bookBtn: 'book',
        discoverBtn: 'discover',
        joinText: 'Are you a doctor or practitioner?',
        registerBtn: 'JOIN YAO',
        bulletpoint1: 'Yao is a network regulated by doctors and practitioners, to improve trust and the link with patients',
        bulletpoint2: 'Reduce rate of absenteeism',
        bulletpoint3: 'Improve your visibility online',
        discovertext: 'Discover more about complementary and alternative medicine',
        contentent1: 'Therapies',
        contentent2: 'Symptoms',
        contentent3: 'Topics',
        doctorhighlights: 'Meet our doctors and practitioners',
        snacktext: 'Subscribe to our Newsletter',
        subscribe: 'subscribe',
        close: 'close'
      },
      navbar: {
        booking: 'booking',
        profile_settings: 'Profile Settings'
      },
      footer: {
        text: 'Follow us'
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