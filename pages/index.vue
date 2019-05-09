<template>
  <v-app>
  <section class="mycontainer">
    <Navbar/>
    <div class="bg">
      <div class="searchContainer">
          <form action="submit">
              <label>WAS</label>
              <v-select class="therapyselect" @change="setChoice" :items="therapies" label="Wähle eine Therapie" solo></v-select>
            <nuxt-link :to="{name: 'results', query: { search:choice } }">
              <button type="submit" class="search-button">Suche</button>
            </nuxt-link>
          </form>
      </div>
    </div>
    <div class="betaInfo">
      <div>
        <p>YAO is the first platform dedicated to CAM</p>
        <p>Search and book for your next appointment</p>
        <p>We only support BERLIN for the BETA VERSION</p>
      </div>
    </div>
    <v-container >
      <v-layout row wrap align-baseline justify-space-around >
          <Doc v-for="doctor in doctors" :id="doctor.iddoctorprofile" :title="doctor.title" :firstname="doctor.firstname" :lastname="doctor.lastname" :speciality="doctor.speciality" :key="doctor.iddoctorprofile" :calendar-id="doctor.calendarid" :dates="doctor.dates"></Doc>
      </v-layout>
    </v-container>
    <div class="whatIsYao">
      <div>
        <img src="~assets/logo.png" alt="">
      </div>
    </div>
    <div class="network">
      <div id="networkImage">
        <img src="~assets/network.jpg" alt="">
        <div id="networkTextContainer">
          <div id="networkText">
            <h2>1. Netzwerk</h2>
            <p>Bei Fragen oder Behandlungswünschen steht ihnen das Netzwerk zur verfügung</p>
          </div>
        </div>
      </div>
    </div>
    <div class="calendar">
      <div id="calendarImage">
        <img src="~assets/calendar.jpg" alt="">
        <div id="calendarTextContainer">
          <div id="calendarText">
            <h2>2. Termine</h2>
            <p>Buchen Sie einen Termin online</p>
          </div>
        </div>
      </div>
    </div>
    <Yaofooter></Yaofooter>
  </section>
    <v-snackbar auto-height color="white" class="black--text" v-model="snackbar" bottom :timeout="0">
      Subscribe to our Newsletter:
      <v-text-field class="emailinput" v-model="email" :rules="emailRules" label="E-mail"></v-text-field>
      <v-btn color="rgba(51, 169, 181, 255)" flat @click="subscribe">Subscribe</v-btn>
      <v-btn color="rgba(51, 169, 181, 255)" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="errorsnackbar" :timeout="4000" color="error">Ups something went wrong</v-snackbar>
    <v-snackbar v-model="sucessnackbar" :timeout="4000" color="success">You successful subscribed to our newsletter</v-snackbar>
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Doc from '@/components/Doc'
  import Yaofooter from '@/components/Yaofooter'
  import { mapMutations } from 'vuex'

export default {
  components: {
    Navbar,
    Doc,
    Yaofooter
  },
  data() {
    return {
      choice: '',
      doctors: [],
      therapies: [],
      snackbar: true,
      errorsnackbar: false,
      sucessnackbar: false,
      valid: false,
      email: '',
      emailRules: [ v => /.+@.+\..+/.test(v) || 'E-mail must be valid']
    }
  },
  methods: {
    ...mapMutations({
      SET_DOCTORS: 'localStorage/SET_DOCTORS'
    }),
    setChoice: function(option) {
      this.choice = option
    },
    subscribe() {
      console.log('sub')
      if (this.email) {
        // set auth for yao api
        const x = new Buffer.from(`${process.env.YAOUSER}:${process.env.YAOPW}`)
        this.$http.setToken(x.toString('base64'), 'Basic')
        try {
          console.log('send')

          this.$http.$post(`${process.env.YAOAPI}/subscription/${this.email}`).then(res => {
            this.snackbar = false
            if (res.name === 'error') {
              this.errorsnackbar = true
            } else if(res.command === 'INSERT') {
              this.sucessnackbar = true
            }
          })
        } catch (e) {
          // show error page
        }
      }
    }
  },
  created() {
    // add expiry of localstorage
    this.SET_DOCTORS(this.doctors)
  },
  async asyncData({ $http }) {
    // set auth for yao api
    const x = new Buffer.from(`${process.env.YAOUSER}:${process.env.YAOPW}`)
    $http.setToken(x.toString('base64'), 'Basic')

    const [allDocs, specialities] = await Promise.all([
      $http.$get(`${process.env.YAOAPI}/doctors/`),
      $http.$get(`${process.env.YAOAPI}/specialities`)
      ]).catch(e => console.error('Error with YAO API:', e)) // show error page
    const doctors = []
    let therapies = []
    let allDocsCopy = allDocs.slice()
    for (let i = 0; i < 3; i++) {
      // pick and remove three doctors from the array for preview
      doctors.push(allDocsCopy.splice(Math.ceil(Math.random() * 10) % allDocsCopy.length, 1)[0])
    }
    therapies = specialities.map( speciality => speciality.speciality)
    return {doctors, therapies}
  }
}
</script>

<style lang="scss" scoped>
$yao: rgba(51, 169, 181, 255);

.bg {
  background: url("../assets/landing.jpg") no-repeat center;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.searchContainer {
  width: 80vw;
  min-width: 400px;
  height: 80px;
  background-color: rgba(255,255,255,0.7);
  display: flex;
  justify-content: center;

  .specialities {
    width: 20vw;
    background-color: $yao !important;
    color: white;
  }

  label {
    color: $yao !important;
    font-size: 20pt;
  }

  .search-button {
    width: 100px;
    height: 30px;
    background-color: $yao;
    color: white;
    font-size: 16px;
    border-radius: 16px;
    border: none;
  }

  .search-button:hover {
    background-color: white;
    color: $yao;
    border: 1px solid $yao;
  }

  form {
    display: flex;
    align-items: center;
  }

  .therapyselect {
    padding: 25px 0 0 2vw;
    width: 50vw;
    max-width: 400px !important;
  }

  a {
    padding-left: 2vw;
  }

}

.betaInfo {
  position: relative;
  background-color: $yao;
  height: 30vw;

  div {
    position: relative;
    float: left;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    p{
      color: white;
      font-size: 4vw;
      line-height: 110%;
    }
  }

}



.docPreview {
  margin: 5vw 0 5vw 0;
}

.whatIsYao {
  background: url("../assets/herb.jpg") no-repeat center;
  background-size: cover;
  /*display: block;
  position: relative;*/
  height: 100vh;
  div {
    position: relative;
    float: left;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 80vw;
    }
  }
}

/*.whatIsYao::after {
  content: "";
  background: url("../assets/herb.jpg") no-repeat center;
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}*/

.network {
  height: 40vw;

  #networkImage {
    position: relative;
    margin: 4vh 0 0 4vw;
    width: 40vw;
    img {
      width: 45vw;
    }
    #networkTextContainer {
      position: absolute;
      top: 50%;
      left: 85%;
      width: 55vw;
      height: 20vw;
      min-height: 100px;
      background-color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      #networkText {
        text-transform: uppercase;
        color: white;
        h2 {
          font-size: 4vw;

        }
        p {
          font-size: 1.5vw;
          line-height: 2;
          padding: 0 1vw;
        }
      }
    }
  }
}

.calendar {
  height: 40vw;
  display: flex;
  justify-content: flex-end;
  #calendarImage {
    position: relative;
    margin: 4vh 6vw 0 0;
    width: 40vw;
    img {
      width: 45vw;
    }
    #calendarTextContainer {
      position: absolute;
      top: 50%;
      right: 85%;
      width: 55vw;
      height: 16vw;
      min-height: 100px;
      background-color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      #calendarText {
        text-transform: uppercase;
        color: white;
        h2 {
          font-size: 4vw;
        }
        p {
          font-size: 1.5vw;
          line-height: 2;
        }
      }
    }
  }
}

.emailinput {
  padding-left: 20px;
}
</style>
