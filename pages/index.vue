<template>
  <v-app>
  <section class="mycontainer">
    <section class="searchInfoContainer">
      <div class="bg">
        <Navbar/>
        <section class="searchContainer">
          <h1 class="discoverText">
            your complementary and alternative medicine platform
          </h1>
        </section>

        <!--<div class="searchContainer">-->
        <!--<form action="submit">-->
        <!--<label>WAS</label>-->
        <!--<v-select class="therapyselect" @change="setChoice" :items="therapies" label="Wähle eine Therapie" solo></v-select>-->
        <!--<nuxt-link :to="{name: 'results', query: { search:choice } }">-->
        <!--<button type="submit" class="search-button">Suche</button>-->
        <!--</nuxt-link>-->
        <!--</form>-->
        <!--</div>-->
        <section class="information">
          <v-container>
            <v-layout row wrap fill-height align-center>
              <v-flex xs12 md4>
                <i class="iconFind"></i>
                <p>Find the therapy adapted to you, identify the right doctor or practitioner.</p>
                <v-btn round>find</v-btn>
              </v-flex>
              <v-flex xs12 md4>
                <fa class="customicon" :icon="['far', 'calendar-check']"/>
                <p>Book directly and pay online.</p>
                <v-btn round>book</v-btn>
              </v-flex>
              <v-flex xs12 md4>
                <span class="iconDiscover"></span>
                <p>Learn about the different therapies and symptoms complementary and alernative medicine can help out.</p>
                <v-btn round>discover</v-btn>
              </v-flex>
              <v-flex xs12>
                <hr>
              </v-flex>
              <v-flex xs12 md6>
                <p class="joinText">Are you a doctor or practitioner?</p>
                <v-btn round>JOIN YAO</v-btn>
              </v-flex>
              <v-flex xs12 md6>
                <ul>
                  <li>Yao is a network regulated by doctors and practitioners, to improve trust and the link with patients</li>
                  <li>Reduce rate of absenteeism</li>
                  <li>Improve your visivility online</li>
                </ul>
              </v-flex>
            </v-layout>
          </v-container>
        </section>
      </div>
    </section>
    <v-container class="discoverContainer">
      <v-layout  align-center justify-center row>
          <h1 class="discoverText">
            Discover more about complementary and alternative medicine
          </h1>
      </v-layout>
      <v-layout  align-center justify-center row wrap>
        <v-layout align-center column>
          <v-flex xs12 md4>
            <v-img class="discoverAvatar" :src="require('../assets/back.jpg')"></v-img>
          </v-flex>
          <v-flex xs12 md4>
            <span>Therapies</span>
          </v-flex>
        </v-layout>
        <v-layout align-center column>
          <v-flex xs12 md4>
            <v-img class="discoverAvatar" :src="require('../assets/belly.jpg')"></v-img>
          </v-flex>
          <v-flex xs12 md4>
            <span>Symptoms</span>
          </v-flex>
        </v-layout>
        <v-layout align-center column>
          <v-flex xs12 md4>
            <v-img class="discoverAvatar" :src="require('../assets/berries.jpg')"></v-img>
          </v-flex>
          <v-flex xs12 md4>
            <span>Topics</span>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
    <section class="docPreview">
      <h1 class="discoverText">Meet our doctors and practitioners</h1>
      <v-container>
        <v-layout row wrap justify-space-around fill-height align-center>
          <Doc v-for="doctor in doctors" :id="doctor.iddoctorprofile" :title="doctor.title" :firstname="doctor.firstname" :lastname="doctor.lastname" :speciality="doctor.speciality" :key="doctor.iddoctorprofile" :calendar-id="doctor.calendarid" :dates="doctor.dates"></Doc>
        </v-layout>
      </v-container>
    </section>
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
    const doctors = []
    let therapies = []
    // set auth for yao api
    const x = new Buffer.from(`${process.env.YAOUSER}:${process.env.YAOPW}`)
    $http.setToken(x.toString('base64'), 'Basic')
    try {
      const [allDocs, specialities] = await Promise.all([
        $http.$get(`${process.env.YAOAPI}/doctors/`),
        $http.$get(`${process.env.YAOAPI}/specialities`)
      ]).catch(e => console.error('Error with YAO API:', e)) // show error page

      let allDocsCopy = allDocs.slice()
      for (let i = 0; i < 3; i++) {
        // pick and remove three doctors from the array for preview
        doctors.push(allDocsCopy.splice(Math.ceil(Math.random() * 10) % allDocsCopy.length, 1)[0])
      }
      therapies = specialities.map( speciality => speciality.speciality)
      return {doctors, therapies}
    } catch (e) {
      console.error('Error with Acuity API:', e)
      //show Error Page
    }

  }
}
</script>

<style lang="scss">
$yaoOld: rgba(51, 169, 181, 1);
$yao: rgba(0, 174, 163, 1);
$yaoLow: rgba(236, 247, 251, 0.5);
$yaobg: #effafc;
$yaoGradient: radial-gradient(circle at center, #074f65 0, #00afa4 100%);

.customicon {
  font-size: 100px;
  margin: 0 10px;
  color: $yao;
}

.searchInfoContainer {
  position: relative;

  .bg {
    background: url("../assets/bgWomen.jpg") no-repeat center;
    background-size: cover;
    min-height: 200vh;
    display: flex;
    flex-flow: column;

    .searchContainer {
      height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .information {
      background-color: $yaoLow;
      min-height: 100vh;
      height: auto;
      width: 100%;
      display: flex;
      flex-flow: column;
      align-items: center;

      .iconFind {
        background-image: url("../assets/customIcons/iconFind.png");
        height: 100px;
        width: 100px;
        display: inline-block;
      }

      .iconDiscover {
        background-image: url("../assets/customIcons/iconLearn.png");
        height: 100px;
        width: 100px;
        display: inline-block;
      }

      .iconBook {
        background-image: url("../assets/customIcons/iconBook.png");
        height: 100px;
        width: 100px;
        display: inline-block;
      }

      @media only screen and (max-width: 1000px) {
        .iconFind {
          height: 50px;
          width: 50px;
        }

        .iconDiscover {
          height: 50px;
          width: 50px;
        }

        .iconBook {
          height: 50px;
          width: 50px;
        }

        .customicon {
          font-size: 50px;
        }
      }

      p {
        height: 6vw;
      }

      button {
        background-color: $yao !important;
        color: white;
        box-shadow: none;
      }

      .joinText {
        height: fit-content;
        text-transform: capitalize;
        font-size: 50px;
        background-image: $yaoGradient;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      @media only screen and (max-width: 1200px) {
        .joinText {
          font-size: 40px;
        }
      }

      @media only screen and (max-width: 1000px) {
        .joinText {
          font-size: 30px;
        }
      }

      @media only screen and (max-width: 600px) {
        .joinText {
          font-size: 30px;
        }
      }

      hr {
        display: inline-block;
        height: 1px;
        border: 0;
        border-top: 4px solid #909090;
        margin: 1em 0;
        padding: 0;
        width: 70vw;
      }
    }
  }
}

.discoverContainer {
  height: auto;
}

.discoverAvatar {
  margin: 30px;
  height: 300px;
  width: 300px;
  border: double 4px transparent;
  border-radius: 150px;
  background-image: linear-gradient(white, white), radial-gradient(circle at top left, #00afa4,#074f65);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 0 14px #e5eeed;
}



.discoverText {
  text-transform: capitalize;
  font-size: 50px;
  background-image: $yaoGradient;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 70vw;
}

@media only screen and (max-width: 1200px) {
  .discoverText {
    font-size: 40px;
  }
}

@media only screen and (max-width: 1000px) {
  .discoverAvatar {
    width: 150px;
    height: 150px;
  }
}

@media only screen and (max-width: 600px) {
  .discoverText {
    font-size: 30px;
  }
}

.docPreview {
  background: $yaobg;
  height: auto;
  display: flex;
  flex-flow: column;
  align-items: center;

  .discoverText {
    padding-top: 10vh;
  }
}

.emailinput {
  padding-left: 20px;
}
</style>
